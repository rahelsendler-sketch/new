/**
 * ASAH C++ — Dashboard View Renderer
 * Displays user progress, current active lesson card, XP stats, streak, and lesson list.
 */

class DashboardView {
    render(containerEl, onSelectLessonCallback) {
        if (!containerEl) return;

        const data = progressStore.data;
        const totalLessons = LESSONS_DATABASE.length;
        const completedCount = data.completedLessons.length;
        const progressPct = Math.round((completedCount / totalLessons) * 100);

        // Find current active lesson or first uncompleted
        const currentLesson = LESSONS_DATABASE.find(l => l.id === data.currentLessonId) || LESSONS_DATABASE[0];

        containerEl.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:24px;">
                <!-- Welcome Hero Card -->
                <div class="glass-panel" style="padding:24px; background:linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8)); border-color:var(--border-active);">
                    <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px;">
                        <div>
                            <div style="font-size:0.82rem; font-weight:800; color:var(--cyan-primary); text-transform:uppercase; letter-spacing:1px; margin-bottom:4px;">
                                Selamat Datang Kembali! 👋
                            </div>
                            <h2 style="font-size:1.6rem; margin-bottom:6px;">Hi, ${data.displayName}!</h2>
                            <p style="color:var(--text-secondary); font-size:0.9rem;">
                                Kamu sudah menyelesaikan <strong>${completedCount} dari ${totalLessons} lesson</strong>. Siap untuk melatih logika kodingmu hari ini?
                            </p>
                        </div>
                        <button class="btn-nav-next" id="btn-continue-learning" style="padding:12px 24px; font-size:1rem;">
                            Continue Learning (${currentLesson.title.split('—')[0].trim()}) →
                        </button>
                    </div>

                    <div style="margin-top:20px;">
                        <div style="display:flex; justify-content:space-between; font-size:0.82rem; font-weight:700; margin-bottom:6px;">
                            <span>Progress Kurikulum C++</span>
                            <span style="color:var(--amber-primary);">${progressPct}% Selesai</span>
                        </div>
                        <div class="xp-progress-bar-wrap" style="height:10px;">
                            <div class="xp-progress-fill" style="width: ${progressPct}%;"></div>
                        </div>
                    </div>
                </div>

                <!-- Stats Overview Grid -->
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:16px;">
                    <div class="glass-panel" style="padding:16px; display:flex; align-items:center; gap:14px;">
                        <div style="font-size:2rem; background:rgba(245,158,11,0.15); width:50px; height:50px; border-radius:12px; display:flex; align-items:center; justify-content:center;">🔥</div>
                        <div>
                            <div style="font-size:0.78rem; color:var(--text-muted); font-weight:700;">STREAK BELAJAR</div>
                            <div style="font-size:1.4rem; font-weight:900; color:var(--amber-primary);">${data.streak} Hari</div>
                        </div>
                    </div>

                    <div class="glass-panel" style="padding:16px; display:flex; align-items:center; gap:14px;">
                        <div style="font-size:2rem; background:rgba(56,189,248,0.15); width:50px; height:50px; border-radius:12px; display:flex; align-items:center; justify-content:center;">⚡</div>
                        <div>
                            <div style="font-size:0.78rem; color:var(--text-muted); font-weight:700;">TOTAL XP</div>
                            <div style="font-size:1.4rem; font-weight:900; color:var(--cyan-primary);">${data.xp} XP</div>
                        </div>
                    </div>

                    <div class="glass-panel" style="padding:16px; display:flex; align-items:center; gap:14px;">
                        <div style="font-size:2rem; background:rgba(16,185,129,0.15); width:50px; height:50px; border-radius:12px; display:flex; align-items:center; justify-content:center;">🏆</div>
                        <div>
                            <div style="font-size:0.78rem; color:var(--text-muted); font-weight:700;">LEVEL PERSONAL</div>
                            <div style="font-size:1.4rem; font-weight:900; color:var(--emerald-success);">Level ${data.level}</div>
                        </div>
                    </div>
                </div>

                <!-- Lessons Roadmap Cards -->
                <div>
                    <h3 style="font-size:1.2rem; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
                        <span>📚</span> Kurikulum Phase 1 — Fundamental C++
                    </h3>

                    <div style="display:flex; flex-direction:column; gap:12px;">
                        ${LESSONS_DATABASE.map(lesson => {
                            const isCompleted = data.completedLessons.includes(lesson.id);
                            const isCurrent = lesson.id === currentLesson.id;

                            return `
                                <div class="glass-panel" style="padding:16px 20px; display:flex; align-items:center; justify-content:space-between; gap:16px; ${isCurrent ? 'border-color:var(--border-active); background:rgba(30,41,59,0.85);' : ''}">
                                    <div style="display:flex; align-items:center; gap:16px;">
                                        <div style="font-size:1.8rem; width:48px; height:48px; background:rgba(255,255,255,0.05); border-radius:12px; display:flex; align-items:center; justify-content:center;">
                                            ${lesson.icon}
                                        </div>
                                        <div>
                                            <div style="font-size:0.75rem; font-weight:800; color:var(--cyan-primary); text-transform:uppercase;">${lesson.levelTitle}</div>
                                            <h4 style="font-size:1.05rem; margin:2px 0;">${lesson.title}</h4>
                                            <p style="font-size:0.82rem; color:var(--text-secondary);">${lesson.description}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <button class="btn-select-lesson ${isCompleted ? 'btn-reset-code' : 'btn-nav-next'}" data-lesson-id="${lesson.id}" style="padding:10px 18px; font-size:0.86rem;">
                                            ${isCompleted ? '✓ Selesai (Review)' : (isCurrent ? '▶ Mulai Belajar' : 'Buka Lesson')}
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;

        // Bind Continue Button
        const continueBtn = containerEl.querySelector('#btn-continue-learning');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                if (typeof onSelectLessonCallback === 'function') {
                    onSelectLessonCallback(currentLesson.id);
                }
            });
        }

        // Bind Lesson Selection Buttons
        containerEl.querySelectorAll('.btn-select-lesson').forEach(btn => {
            btn.addEventListener('click', () => {
                const lessonId = btn.getAttribute('data-lesson-id');
                if (typeof onSelectLessonCallback === 'function') {
                    onSelectLessonCallback(lessonId);
                }
            });
        });
    }
}

const dashboardView = new DashboardView();
