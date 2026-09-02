/**
 * ASAH C++ — Roadmap View Renderer
 * Visual Learning Roadmap tree displaying prerequisites and unlocked/locked lesson nodes.
 */

class RoadmapView {
    render(containerEl, onSelectLessonCallback) {
        if (!containerEl) return;

        const data = progressStore.data;

        containerEl.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:20px; max-width:800px; margin:0 auto;">
                <div style="text-align:center; margin-bottom:10px;">
                    <h2 style="font-size:1.6rem; margin-bottom:4px;">🗺️ Peta Alur Belajar (Learning Roadmap)</h2>
                    <p style="color:var(--text-secondary); font-size:0.88rem;">Selesaikan setiap modul secara bertahap untuk membuka materi di tingkat berikutnya.</p>
                </div>

                <div style="display:flex; flex-direction:column; gap:24px; position:relative;">
                    ${LESSONS_DATABASE.map((lesson, idx) => {
                        const isCompleted = data.completedLessons.includes(lesson.id);
                        const isUnlocked = idx === 0 || data.completedLessons.includes(LESSONS_DATABASE[idx - 1].id);

                        return `
                            <div class="glass-panel" style="padding:20px; display:flex; align-items:center; justify-content:space-between; gap:16px; opacity:${isUnlocked ? '1' : '0.6'}; border-color:${isCompleted ? 'var(--emerald-success)' : (isUnlocked ? 'var(--border-active)' : 'var(--border-subtle)')};">
                                <div style="display:flex; align-items:center; gap:16px;">
                                    <div style="font-size:2rem; width:54px; height:54px; border-radius:14px; background:${isCompleted ? 'rgba(16,185,129,0.15)' : 'rgba(15,23,42,0.8)'}; border:1px solid ${isCompleted ? 'var(--emerald-success)' : 'var(--border-subtle)'}; display:flex; align-items:center; justify-content:center;">
                                        ${isCompleted ? '✅' : lesson.icon}
                                    </div>
                                    <div>
                                        <div style="font-size:0.75rem; font-weight:800; color:var(--cyan-primary); text-transform:uppercase;">${lesson.levelTitle}</div>
                                        <h3 style="font-size:1.1rem; margin:2px 0;">${lesson.title}</h3>
                                        <p style="font-size:0.84rem; color:var(--text-secondary);">${lesson.description}</p>
                                    </div>
                                </div>

                                <div>
                                    <button class="btn-roadmap-node ${isUnlocked ? 'btn-nav-next' : 'btn-reset-code'}" data-lesson-id="${lesson.id}" ${!isUnlocked ? 'disabled' : ''} style="padding:10px 20px;">
                                        ${isCompleted ? '✓ Review Kode' : (isUnlocked ? '▶ Masuk Lesson' : '🔒 Terkunci')}
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        containerEl.querySelectorAll('.btn-roadmap-node').forEach(btn => {
            btn.addEventListener('click', () => {
                const lessonId = btn.getAttribute('data-lesson-id');
                if (typeof onSelectLessonCallback === 'function') {
                    onSelectLessonCallback(lessonId);
                }
            });
        });
    }
}

const roadmapView = new RoadmapView();
