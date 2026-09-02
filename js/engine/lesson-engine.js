/**
 * ASAH C++ — Reusable Lesson Engine
 * Manages step-by-step lesson progression, section rendering, line breakdown, micro-questions, and coding exercises.
 */

class LessonEngine {
    constructor() {
        this.currentLesson = null;
        this.currentSectionIndex = 0;
        this.containerEl = null;
        this.onLessonCompleted = null;
    }

    startLesson(lessonId, containerEl, onLessonCompleted) {
        const lesson = LESSONS_DATABASE.find(l => l.id === lessonId);
        if (!lesson) {
            console.error('Lesson not found:', lessonId);
            return;
        }

        this.currentLesson = lesson;
        this.currentSectionIndex = 0;
        this.containerEl = containerEl;
        this.onLessonCompleted = onLessonCompleted;

        progressStore.setCurrentLesson(lessonId);
        this.render();
    }

    render() {
        if (!this.containerEl || !this.currentLesson) return;

        const totalSteps = this.currentLesson.sections.length + (this.currentLesson.challenge ? 1 : 0);
        const isChallengeStep = this.currentSectionIndex === this.currentLesson.sections.length;
        const currentSection = !isChallengeStep ? this.currentLesson.sections[this.currentSectionIndex] : null;

        this.containerEl.innerHTML = `
            <div class="lesson-page-grid">
                <!-- Left Panel: Lesson Explanation & Micro-questions -->
                <div class="lesson-content-panel">
                    <div class="lesson-meta-bar">
                        <div class="lesson-badge-category">${this.currentLesson.levelTitle}</div>
                        <div class="lesson-steps-dots">
                            ${Array.from({ length: totalSteps }).map((_, idx) => `
                                <div class="step-dot ${idx === this.currentSectionIndex ? 'active' : ''} ${idx < this.currentSectionIndex ? 'completed' : ''}"></div>
                            `).join('')}
                        </div>
                    </div>

                    <h2 style="font-size:1.3rem; margin-bottom:4px;">${this.currentLesson.title}</h2>
                    <p style="font-size:0.84rem; color:var(--text-secondary); margin-bottom:12px;">${this.currentLesson.description}</p>

                    <div id="section-body-slot"></div>

                    <!-- Navigation Footer -->
                    <div class="lesson-nav-footer">
                        <button class="btn-nav-prev" id="btn-lesson-prev" ${this.currentSectionIndex === 0 ? 'disabled' : ''}>
                            <span>←</span> Lambaian Sebelumnya
                        </button>

                        <button class="btn-nav-next" id="btn-lesson-next">
                            ${isChallengeStep ? '🎉 Selesaikan Lesson!' : 'Lanjut ke Step Berikutnya →'}
                        </button>
                    </div>
                </div>

                <!-- Right Panel: Code Editor & Execution Engine -->
                <div class="lesson-editor-panel" id="editor-panel-slot">
                    <!-- Editor View will be injected here -->
                </div>
            </div>
        `;

        const bodySlot = this.containerEl.querySelector('#section-body-slot');
        const editorSlot = this.containerEl.querySelector('#editor-panel-slot');

        if (!isChallengeStep && currentSection) {
            this.renderSectionBody(currentSection, bodySlot);
        } else if (isChallengeStep && this.currentLesson.challenge) {
            this.renderChallengeBody(this.currentLesson.challenge, bodySlot);
        }

        // Always render Code Editor on right panel
        if (window.editorView) {
            const activeChallenge = this.currentLesson.challenge;
            window.editorView.mount(editorSlot, activeChallenge, (isPassed) => {
                if (isPassed && isChallengeStep) {
                    this.completeCurrentLesson();
                }
            });
        }

        // Bind Nav Buttons
        const prevBtn = this.containerEl.querySelector('#btn-lesson-prev');
        const nextBtn = this.containerEl.querySelector('#btn-lesson-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (this.currentSectionIndex > 0) {
                    this.currentSectionIndex--;
                    this.render();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (this.currentSectionIndex < totalSteps - 1) {
                    this.currentSectionIndex++;
                    this.render();
                } else if (isChallengeStep) {
                    this.completeCurrentLesson();
                }
            });
        }
    }

    renderSectionBody(section, containerEl) {
        const card = document.createElement('div');
        card.className = 'lesson-card-section';

        if (section.type === 'explanation') {
            card.innerHTML = `
                <h3 class="section-title"><span>📘</span> ${section.title}</h3>
                <div class="section-text-content">${section.content}</div>
            `;
            containerEl.appendChild(card);
        } else if (section.type === 'code-breakdown') {
            card.innerHTML = `
                <h3 class="section-title"><span>🔍</span> ${section.title}</h3>
                <div class="code-example-block">
                    <div class="code-header-bar">C++ Source Code</div>
                    <pre class="code-snippet-pre">${section.codeSnippet}</pre>
                </div>
                <div style="font-weight:700; margin-top:8px; font-size:0.88rem; color:var(--cyan-primary);">Penjelasan Baris demi Baris:</div>
                <div class="line-breakdown-list">
                    ${section.breakdownLines.map(line => `
                        <div class="line-item-explain">
                            <span class="line-code-token">${line.token}</span>
                            <span>${line.explain}</span>
                        </div>
                    `).join('')}
                </div>
            `;
            containerEl.appendChild(card);
        } else if (section.type === 'micro-question') {
            card.innerHTML = `<h3 class="section-title"><span>🧠</span> ${section.title}</h3>`;
            containerEl.appendChild(card);
            quizEngine.renderQuestion(section.question, card);
        }
    }

    renderChallengeBody(challenge, containerEl) {
        const card = document.createElement('div');
        card.className = 'lesson-card-section';
        card.innerHTML = `
            <h3 class="section-title" style="color:var(--amber-primary)"><span>👨‍💻</span> ${challenge.title}</h3>
            <p style="font-weight:600; line-height:1.6; color:var(--text-primary);">${challenge.instruction}</p>
            <div style="background:rgba(15,23,42,0.8); border:1px solid var(--border-subtle); border-radius:10px; padding:12px; font-size:0.84rem; color:var(--text-secondary);">
                👉 Tuliskan kode solusi kamu di <strong>Coding Editor sebelah kanan</strong>, lalu tekan tombol <strong>▶ RUN CODE</strong> untuk menguji program kamu!
            </div>
        `;
        containerEl.appendChild(card);
    }

    completeCurrentLesson() {
        if (!this.currentLesson) return;

        progressStore.markLessonComplete(this.currentLesson.id, this.currentLesson.xpReward);
        
        if (typeof this.onLessonCompleted === 'function') {
            this.onLessonCompleted(this.currentLesson);
        }
    }
}

const lessonEngine = new LessonEngine();
