/**
 * ASAH C++ — Micro-Question & Quiz Engine
 * Renders interactive micro-questions, predictions, multi-stage hints, and positive feedback.
 */

class QuizEngine {
    constructor() {
        this.selectedOption = null;
        this.currentAttempts = 0;
    }

    renderQuestion(questionData, containerEl, onSolvedCallback) {
        if (!containerEl || !questionData) return;

        this.selectedOption = null;
        this.currentAttempts = 0;

        const card = document.createElement('div');
        card.className = 'micro-question-card';
        card.innerHTML = `
            <div class="question-prompt">
                ${this.formatQuestionText(questionData.text)}
            </div>

            <div class="options-grid" id="options-grid-${questionData.id}">
                ${questionData.options.map((opt, idx) => `
                    <button class="option-btn" data-opt-id="${opt.id}">
                        <span class="option-key-badge">${opt.id}</span>
                        <span class="option-text">${opt.text}</span>
                    </button>
                `).join('')}
            </div>

            <div id="quiz-feedback-container-${questionData.id}"></div>
        `;

        containerEl.appendChild(card);

        const optionsGrid = card.querySelector(`#options-grid-${questionData.id}`);
        const feedbackContainer = card.querySelector(`#quiz-feedback-container-${questionData.id}`);

        optionsGrid.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const optId = btn.getAttribute('data-opt-id');
                this.handleOptionSelect(questionData, optId, optionsGrid, feedbackContainer, onSolvedCallback);
            });
        });
    }

    formatQuestionText(text) {
        // Format markdown-like code blocks in text
        return text.replace(/```cpp([\s\S]*?)```/g, '<pre class="code-snippet-pre">$1</pre>')
                   .replace(/`([^`]+)`/g, '<code class="line-code-token">$1</code>')
                   .replace(/\n/g, '<br>');
    }

    handleOptionSelect(qData, selectedOptId, optionsGrid, feedbackContainer, onSolvedCallback) {
        this.currentAttempts++;
        const targetOption = qData.options.find(o => o.id === selectedOptId);
        const isCorrect = targetOption && targetOption.isCorrect;

        progressStore.recordQuestionAttempt(qData.id, isCorrect);

        optionsGrid.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('selected', 'correct', 'wrong');
            const id = btn.getAttribute('data-opt-id');
            if (id === selectedOptId) {
                btn.classList.add(isCorrect ? 'correct' : 'wrong');
            }
        });

        if (isCorrect) {
            feedbackContainer.innerHTML = `
                <div class="feedback-box correct">
                    <strong>🎉 Jawaban Kamu Tepat Sekali!</strong>
                    <p>${qData.explanation || 'Kerja bagus! Kamu berhasil memahami konsep ini dengan sempurna.'}</p>
                </div>
            `;
            if (typeof onSolvedCallback === 'function') {
                onSolvedCallback(true);
            }
        } else {
            // Multi-tier hints system
            let hintContent = '';
            if (this.currentAttempts === 1) {
                hintContent = `💡 <strong>Hint 1:</strong> Coba tinjau kembali definisi dan fungsi dari sintaks tersebut. Pilih opsi yang paling sesuai.`;
            } else {
                hintContent = `💡 <strong>Petunjuk Penjelasan:</strong> ${qData.explanation || 'Perhatikan detail pada kode dan bandingkan dengan contoh di atas.'}`;
            }

            feedbackContainer.innerHTML = `
                <div class="feedback-box wrong">
                    <strong>❌ Jawaban Belum Tepat (Percobaan ke-${this.currentAttempts})</strong>
                    <div class="hint-tier-box">
                        ${hintContent}
                    </div>
                </div>
            `;
            if (typeof onSolvedCallback === 'function') {
                onSolvedCallback(false);
            }
        }
    }
}

const quizEngine = new QuizEngine();
