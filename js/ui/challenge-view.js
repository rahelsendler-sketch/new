/**
 * ASAH C++ — Practice & Challenge Mode View
 * Displays categorised coding challenges (Basics, Conditionals, Loops, Functions, OOP, Projects)
 */

class ChallengeView {
    render(containerEl, onSelectChallengeCallback) {
        if (!containerEl) return;

        const categories = [
            { id: 'all', name: '⚡ Semua Kategori' },
            { id: 'basics', name: '🟢 Fundamental & Variable' },
            { id: 'conditionals', name: '🔀 Percabangan (If/Else)' },
            { id: 'loops', name: '🔄 Perulangan (Loops)' },
            { id: 'functions', name: '⚙️ Fungsi (Functions)' },
            { id: 'struct_oop', name: '🏛️ Struct & OOP' },
            { id: 'projects', name: '🚀 Real-life Projects' }
        ];

        containerEl.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:20px; max-width:900px; margin:0 auto;">
                <div>
                    <h2 style="font-size:1.6rem; margin-bottom:4px;">💻 Practice & Challenge Platform</h2>
                    <p style="color:var(--text-secondary); font-size:0.88rem;">Pilih topik latihan koding untuk menguji dan memperdalam kemampuan C++ kamu secara mandiri.</p>
                </div>

                <!-- Category Pills Filter -->
                <div style="display:flex; align-items:center; gap:8px; overflow-x:auto; padding-bottom:6px;">
                    ${categories.map(c => `
                        <button class="btn-reset-code cat-filter-btn" data-cat="${c.id}" style="white-space:nowrap; padding:8px 14px; font-size:0.84rem;">
                            ${c.name}
                        </button>
                    `).join('')}
                </div>

                <!-- Challenge Cards Grid -->
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:16px;" id="challenge-cards-grid">
                    ${LESSONS_DATABASE.map(lesson => {
                        const chal = lesson.challenge;
                        if (!chal) return '';

                        return `
                            <div class="glass-panel" style="padding:18px; display:flex; flex-direction:column; justify-content:space-between; gap:14px; border-color:var(--border-subtle);">
                                <div>
                                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                                        <span style="font-size:0.72rem; font-weight:800; color:var(--cyan-primary); text-transform:uppercase;">${lesson.levelTitle.split('—')[0].trim()}</span>
                                        <span style="font-size:0.72rem; padding:2px 8px; border-radius:6px; background:rgba(16,185,129,0.15); color:#6ee7b7; font-weight:700;">🟢 Easy</span>
                                    </div>
                                    <h3 style="font-size:1.05rem; margin-bottom:6px;">${chal.title}</h3>
                                    <p style="font-size:0.82rem; color:var(--text-secondary); line-height:1.5;">${chal.instruction}</p>
                                </div>

                                <button class="btn-nav-next btn-open-challenge" data-lesson-id="${lesson.id}" style="padding:10px 14px; font-size:0.84rem; width:100%; text-align:center; justify-content:center;">
                                    ▶ Kerjakan Challenge
                                </button>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        containerEl.querySelectorAll('.btn-open-challenge').forEach(btn => {
            btn.addEventListener('click', () => {
                const lessonId = btn.getAttribute('data-lesson-id');
                if (typeof onSelectChallengeCallback === 'function') {
                    onSelectChallengeCallback(lessonId);
                }
            });
        });
    }
}

const challengeView = new ChallengeView();
