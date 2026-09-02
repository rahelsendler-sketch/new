/**
 * ASAH C++ — Main Application Controller & Router
 * Initializes views, routes navigation, handles progress updates, and manages sidebar stats.
 */

document.addEventListener('DOMContentLoaded', () => {
    const viewContainer = document.getElementById('view-container');
    const pageTitle = document.getElementById('page-title');
    const pageSubtitle = document.getElementById('page-subtitle');
    const navDashboard = document.getElementById('nav-dashboard');
    const navRoadmap = document.getElementById('nav-roadmap');
    const navPractice = document.getElementById('nav-practice');
    const navTutor = document.getElementById('nav-tutor');

    const sidebarXP = document.getElementById('sidebar-xp-count');
    const sidebarStreak = document.getElementById('sidebar-streak-count');
    const sidebarLevel = document.getElementById('user-level-badge');
    const sidebarXPFill = document.getElementById('sidebar-xp-fill');
    const headerProgressPct = document.getElementById('header-progress-percent');
    const btnResetProgress = document.getElementById('btn-reset-progress');

    let currentView = 'dashboard';

    function updateSidebarStats() {
        const data = progressStore.data;
        if (sidebarXP) sidebarXP.textContent = `${data.xp} XP`;
        if (sidebarStreak) sidebarStreak.textContent = `${data.streak} Hari`;
        if (sidebarLevel) sidebarLevel.textContent = `Level ${data.level} • ${data.xp < 250 ? 'Novice' : 'Coder'}`;

        const xpRemainder = data.xp % 250;
        const fillPct = Math.round((xpRemainder / 250) * 100);
        if (sidebarXPFill) sidebarXPFill.style.width = `${fillPct}%`;

        const completedCount = data.completedLessons.length;
        const totalLessons = LESSONS_DATABASE.length;
        const pct = Math.round((completedCount / totalLessons) * 100);
        if (headerProgressPct) headerProgressPct.textContent = `${pct}% Selesai`;
    }

    function setActiveNav(viewName) {
        currentView = viewName;
        document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));

        if (viewName === 'dashboard') navDashboard.classList.add('active');
        if (viewName === 'roadmap') navRoadmap.classList.add('active');
        if (viewName === 'practice') navPractice.classList.add('active');
        if (viewName === 'tutor' && navTutor) navTutor.classList.add('active');
    }

    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast-message ${type}`;
        toast.innerHTML = `<span>${type === 'success' ? '🎉' : '⚠️'}</span> <div>${message}</div>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            if (toast.parentNode === toastContainer) {
                toastContainer.removeChild(toast);
            }
        }, 3500);
    }

    function routeToView(viewName, param = null) {
        setActiveNav(viewName);
        updateSidebarStats();

        if (viewName === 'dashboard') {
            if (pageTitle) pageTitle.textContent = 'Dashboard Pembelajaran';
            if (pageSubtitle) pageSubtitle.textContent = 'Selamat datang kembali! Lanjutkan perjalanan belajar C++ kamu.';

            dashboardView.render(viewContainer, (lessonId) => {
                routeToView('lesson', lessonId);
            });
        } else if (viewName === 'roadmap') {
            if (pageTitle) pageTitle.textContent = 'Peta Alur Belajar C++';
            if (pageSubtitle) pageSubtitle.textContent = 'Roadmap terstruktur dari dasar hingga tingkat mahir.';

            roadmapView.render(viewContainer, (lessonId) => {
                routeToView('lesson', lessonId);
            });
        } else if (viewName === 'practice') {
            if (pageTitle) pageTitle.textContent = 'Coding Playground';
            if (pageSubtitle) pageSubtitle.textContent = 'Tulis, uji, dan jalankan kode C++ bebas di browser kamu.';

            viewContainer.innerHTML = `<div id="playground-slot" style="height:100%;"></div>`;
            const slot = document.getElementById('playground-slot');
            window.editorView.mount(slot, null);
        } else if (viewName === 'tutor') {
            if (pageTitle) pageTitle.textContent = '🤖 Personal C++ AI Tutor';
            if (pageSubtitle) pageSubtitle.textContent = 'Tanyakan konsep C++, minta saran debugging, atau penjelasan matematika.';

            viewContainer.innerHTML = `
                <div class="glass-panel" style="max-width:800px; margin:0 auto; padding:20px; display:flex; flex-direction:column; gap:16px; height: calc(100vh - 150px);">
                    <div style="display:flex; align-items:center; gap:12px; border-bottom:1px solid var(--border-subtle); padding-bottom:12px;">
                        <div style="font-size:2rem; background:rgba(56,189,248,0.15); width:46px; height:46px; border-radius:12px; display:flex; align-items:center; justify-content:center;">🤖</div>
                        <div>
                            <div style="font-size:1.1rem; font-weight:800; color:var(--cyan-primary);">C++ Personal Tutor Assistant</div>
                            <div style="font-size:0.8rem; color:var(--text-secondary);">Siap membantumu memahami sintaks, variabel, percabangan, dan perulangan C++.</div>
                        </div>
                    </div>

                    <div style="display:flex; flex-wrap:wrap; gap:8px;">
                        <button class="btn-reset-code tutor-chip" data-q="Kenapa harus pakai int?">💡 Kenapa harus pakai int?</button>
                        <button class="btn-reset-code tutor-chip" data-q="Apa bedanya while dan for?">💡 Beda while & for?</button>
                        <button class="btn-reset-code tutor-chip" data-q="Apa fungsi cout dan cin?">💡 Fungsi cout & cin?</button>
                        <button class="btn-reset-code tutor-chip" data-q="Kenapa kodeku error titik koma?">💡 Error titik koma (;)</button>
                    </div>

                    <div id="tutor-chat-log" style="flex:1; overflow-y:auto; background:rgba(11,18,32,0.8); border:1px solid var(--border-subtle); border-radius:12px; padding:16px; display:flex; flex-direction:column; gap:12px;">
                        <div class="feedback-box correct" style="max-width:85%;">
                            <strong>🤖 Tutor C++:</strong> Halo! Ada materi C++ atau error sintaksis yang ingin kamu tanyakan? Ketik pertanyaan kamu di bawah!
                        </div>
                    </div>

                    <div style="display:flex; gap:10px;">
                        <input type="text" id="tutor-input-field" class="chat-input" style="flex:1; background:rgba(30,41,59,0.8); border:1px solid var(--border-active); border-radius:12px; padding:12px 16px; color:#fff; font-size:0.9rem; outline:none;" placeholder="Ketik pertanyaan C++ kamu di sini... (misal: Beda int dan double?)">
                        <button id="btn-tutor-send" class="btn-nav-next" style="padding:12px 20px;">Tanya 🚀</button>
                    </div>
                </div>
            `;

            const chatLog = document.getElementById('tutor-chat-log');
            const inputField = document.getElementById('tutor-input-field');
            const sendBtn = document.getElementById('btn-tutor-send');

            function handleTutorQuery(qText) {
                const text = qText || inputField.value.trim();
                if (!text) return;

                // User Bubble
                const userBubble = document.createElement('div');
                userBubble.className = 'feedback-box';
                userBubble.style.cssText = 'background:rgba(30,41,59,0.9); border:1px solid var(--border-active); align-self:flex-end; max-width:85%;';
                userBubble.innerHTML = `<strong>👨‍💻 Kamu:</strong> ${text}`;
                chatLog.appendChild(userBubble);

                if (inputField) inputField.value = '';

                // AI Response
                const answer = aiTutor.ask(text);
                setTimeout(() => {
                    const aiBubble = document.createElement('div');
                    aiBubble.className = 'feedback-box correct';
                    aiBubble.style.cssText = 'max-width:85%; font-size:0.88rem; line-height:1.6;';
                    aiBubble.innerHTML = `<strong>🤖 Tutor C++:</strong><br>${answer.replace(/\n/g, '<br>')}`;
                    chatLog.appendChild(aiBubble);
                    chatLog.scrollTop = chatLog.scrollHeight;
                }, 300);

                chatLog.scrollTop = chatLog.scrollHeight;
            }

            if (sendBtn) sendBtn.addEventListener('click', () => handleTutorQuery());
            if (inputField) inputField.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleTutorQuery(); });

            document.querySelectorAll('.tutor-chip').forEach(chip => {
                chip.addEventListener('click', () => {
                    handleTutorQuery(chip.getAttribute('data-q'));
                });
            });
        } else if (viewName === 'lesson') {
            const lessonId = param || progressStore.data.currentLessonId || 'lesson-1';
            const lesson = LESSONS_DATABASE.find(l => l.id === lessonId);

            if (pageTitle) pageTitle.textContent = lesson ? lesson.title : 'Interactive Lesson';
            if (pageSubtitle) pageSubtitle.textContent = lesson ? lesson.description : 'Pelajari konsep C++ interaktif.';

            lessonEngine.startLesson(lessonId, viewContainer, (completedLesson) => {
                showToast(`Selamat! Kamu berhasil menyelesaikan ${completedLesson.title} (+${completedLesson.xpReward} XP)!`, 'success');
                updateSidebarStats();
                setTimeout(() => {
                    routeToView('dashboard');
                }, 1500);
            });
        }
    }

    // Navigation Listeners
    navDashboard.addEventListener('click', () => routeToView('dashboard'));
    navRoadmap.addEventListener('click', () => routeToView('roadmap'));
    navPractice.addEventListener('click', () => routeToView('practice'));
    if (navTutor) navTutor.addEventListener('click', () => routeToView('tutor'));

    // Reset Progress Listener
    if (btnResetProgress) {
        btnResetProgress.addEventListener('click', () => {
            if (confirm('Apakah kamu yakin ingin mereset seluruh progress belajar C++ kamu?')) {
                progressStore.resetAllProgress();
                showToast('Progress belajar telah di-reset ke kondisi awal.', 'error');
                routeToView('dashboard');
            }
        });
    }

    // Initial Load
    routeToView('dashboard');
});
