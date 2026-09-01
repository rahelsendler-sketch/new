/**
 * XI-4 KFC Chat - Main Application Controller
 * Classroom Seating (11 Desks), Lively Movement, Chase Games, Sauce Fights, Physics Notes, Stealth Stealing, and Miss Eva.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM Element References
    const arenaEl = document.getElementById('floating-arena');
    const minimapCanvas = document.getElementById('minimap-canvas');
    const onlineCounterEl = document.getElementById('online-chicken-count');
    const minimapCountEl = document.getElementById('minimap-count');
    const chatCountBadge = document.getElementById('chat-count-badge');
    const rosterCountBadge = document.getElementById('roster-count-badge');
    const rosterListContainer = document.getElementById('roster-list-container');

    // Sidebar & Tabs
    const sidebarDrawer = document.getElementById('sidebar-drawer');
    const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
    const tabBtnChat = document.getElementById('tab-btn-chat');
    const tabBtnRoster = document.getElementById('tab-btn-roster');
    const paneChatLog = document.getElementById('tab-chat-log');
    const paneRoster = document.getElementById('tab-roster');

    // Controls & Toggles
    const btnSoundToggle = document.getElementById('btn-sound-toggle');
    const soundIcon = document.getElementById('sound-icon');
    const btnOpenCustomizer = document.getElementById('btn-open-customizer');
    const btnOpenPhysics = document.getElementById('btn-open-physics');

    // Interactive Action Dock Buttons
    const btnActionStealth = document.getElementById('btn-action-stealth');
    const btnActionChase = document.getElementById('btn-action-chase');
    const btnActionSauce = document.getElementById('btn-action-sauce');
    const btnActionNotes = document.getElementById('btn-action-notes');
    const btnActionFries = document.getElementById('btn-action-fries');
    const btnActionTeacher = document.getElementById('btn-action-teacher');
    const teacherDeskBell = document.getElementById('teacher-desk-bell');
    const propPhysicsBook6 = document.getElementById('prop-physics-book-6');

    // Chat Inputs
    const chatInput = document.getElementById('chat-input');
    const btnSendChat = document.getElementById('btn-send-chat');
    const quickPhraseSelect = document.getElementById('quick-phrase-select');

    // Physics Notes Modal
    const physicsModal = document.getElementById('physics-notes-modal');
    const btnClosePhysics = document.getElementById('btn-close-physics');
    const btnClosePhysicsBottom = document.getElementById('btn-close-physics-bottom');
    const btnShareNotes = document.getElementById('btn-share-notes');

    // Customizer Modal
    const modalOverlay = document.getElementById('customizer-modal-overlay');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnCancelCustomizer = document.getElementById('btn-cancel-customizer');
    const btnSaveCustomizer = document.getElementById('btn-save-customizer');
    const modalPreviewSvg = document.getElementById('modal-preview-svg');
    const inputChickenName = document.getElementById('input-chicken-name');
    const cutsSelectorGrid = document.getElementById('cuts-selector-grid');
    const flavorsSelectorGrid = document.getElementById('flavors-selector-grid');
    const expressionsSelectorGrid = document.getElementById('expressions-selector-grid');
    const accessoriesSelectorGrid = document.getElementById('accessories-selector-grid');

    const particleLayer = document.getElementById('particle-layer');

    // 2. Initialize Engines
    const arena = new ArenaManager(arenaEl, minimapCanvas);
    const chat = new ChatEngine(arena, soundFX);

    // 3. User Profile State: Rahel (Meja 6) by default
    const savedUser = localStorage.getItem('xi4_kfc_classroom_user_v2');
    let userProfile = savedUser ? JSON.parse(savedUser) : {
        id: 'user_rahel_' + Math.random().toString(36).substr(2, 6),
        name: 'rahel',
        cut: 'thigh',
        flavor: 'splash-chili',
        accessory: 'crown',
        expression: 'spicy',
        status: '🌶️ Meja 6 • Paha Atas Sambal',
        deskId: 'desk_6',
        isUser: true,
        homeX: window.innerWidth * 0.64,
        homeY: window.innerHeight * 0.48,
        x: window.innerWidth * 0.64,
        y: window.innerHeight * 0.48
    };

    // Spawn User Chicken (Rahel) at Desk 6
    const userChicken = arena.addChicken(userProfile);

    // Populate all 11 desk groups + Miss Eva
    arena.populateClassroom(userProfile.name);
    arena.startLoop();

    // Broadcast user join
    chat.broadcast('USER_JOIN', userProfile);

    // Update Counts & Roster grouped by Desk
    function updateCountersAndRoster() {
        const total = arena.chickens.size;
        onlineCounterEl.textContent = `${total} Warga XI-4 Online`;
        minimapCountEl.textContent = `${total}/33`;
        rosterCountBadge.textContent = total;
        chatCountBadge.textContent = chat.messages.length;

        // Render Roster grouped by 11 desks
        if (rosterListContainer) {
            rosterListContainer.innerHTML = '';

            DESK_GROUPS.forEach(group => {
                const groupHeader = document.createElement('div');
                groupHeader.className = 'roster-desk-group-header';
                groupHeader.innerHTML = `<span>${group.name}</span> <span>${group.prop}</span>`;
                rosterListContainer.appendChild(groupHeader);

                const membersAtDesk = Array.from(arena.chickens.values()).filter(c => c.deskId === group.id);
                membersAtDesk.forEach(c => {
                    const item = document.createElement('div');
                    item.className = `roster-item ${c.isTeacher ? 'roster-teacher' : ''}`;
                    const flavor = CHICKEN_FLAVORS[c.flavor] || CHICKEN_FLAVORS.original;
                    const cut = CHICKEN_CUTS[c.cut] || CHICKEN_CUTS.drumstick;

                    let iconDisplay = cut.icon || '🍗';
                    if (c.isUser) iconDisplay = '⭐';
                    if (c.isTeacher) iconDisplay = '👩‍🏫';

                    item.innerHTML = `
                        <div class="chat-log-avatar-mini" style="background:${flavor.sauceGlow}; border-color:${c.isTeacher ? '#f59e0b' : flavor.primaryColor}">
                            ${iconDisplay}
                        </div>
                        <div class="roster-info">
                            <div class="roster-name">
                                ${c.name} 
                                ${c.isTeacher ? '<span style="color:#f59e0b; font-size:0.75rem;">(Wali Kelas)</span>' : ''}
                                ${c.isUser ? '<span style="color:#38bdf8; font-size:0.75rem;">(Kamu)</span>' : ''}
                            </div>
                            <div class="roster-status">${c.isTeacher ? '1 Ekor Ayam Utuh' : cut.name.split(' ')[0]} • ${flavor.name.split('(')[0]}</div>
                        </div>
                    `;
                    rosterListContainer.appendChild(item);
                });
            });
        }
    }

    updateCountersAndRoster();
    setInterval(updateCountersAndRoster, 3000);

    // Initial greeting from Rahel at Desk 6
    setTimeout(() => {
        chat.sendMessage(userChicken.id, `Halo guys! Saya ${userChicken.name} di Meja 6 bareng Niko & Noah! Siap belajar fisika sambil makan ayam KFC! 🍗🍟✨`);
    }, 800);

    // 4. Interactive Action Buttons
    // A. Stealth: Ambil Catatan Sebangku Tanpa Ketahuan
    if (btnActionStealth) {
        btnActionStealth.addEventListener('click', () => {
            const deskMates = Array.from(arena.chickens.values()).filter(c => !c.isUser && c.deskId === userChicken.deskId);
            const missEva = Array.from(arena.chickens.values()).find(c => c.isTeacher);
            if (deskMates.length === 0) return;

            const targetMate = deskMates[Math.floor(Math.random() * deskMates.length)];
            const isCaught = Math.random() < 0.28; // 28% chance caught by Miss Eva

            if (!isCaught) {
                // Success: Sneaked away without getting caught!
                soundFX.playCrunch();
                spawnParticleBurst(userChicken.x + 60, userChicken.y + 60, '📓🤫✨');
                chat.sendMessage(userChicken.id, `Sip! Berhasil nyomot catatan fisika ${targetMate.name} diam-diam tanpa ketahuan Miss Eva! 📓🤫`, true);

                // Desk mate reacts in confusion
                setTimeout(() => {
                    chat.sendMessage(targetMate.id, `Eh, kok buku catatan fisika bab GLBB gue mendadak raib di kolong meja?! 😲📓`, false);
                }, 1400);
            } else {
                // Caught by Miss Eva!
                soundFX.playSpicy();
                arena.triggerTeacherRage('Meja 6');
                chat.sendMessage(userChicken.id, `Aduh! Miss Eva tiba-tiba nengok ke Meja 6 pas gue lagi narik buku ${targetMate.name}! 😱💦`, true);

                if (missEva) {
                    setTimeout(() => {
                        chat.sendMessage(missEva.id, `RAHEL! Kembalikan buku catatan itu ke meja ${targetMate.name} sekarang juga! Jangan coba-coba nyontek di kelas saya! 👩‍🏫💢`, false, true);
                    }, 1200);
                }
            }
        });
    }

    // B. Kejar Sebangku (Chase Game)
    btnActionChase.addEventListener('click', () => {
        soundFX.playDance();
        const deskMates = Array.from(arena.chickens.values()).filter(c => !c.isUser && c.deskId === userChicken.deskId);
        if (deskMates.length > 0) {
            const targetMate = deskMates[Math.floor(Math.random() * deskMates.length)];
            targetMate.isFleeing = true;
            targetMate.fleeFrom = userChicken;
            if (targetMate.el) targetMate.el.classList.add('is-fleeing');

            userChicken.isChasing = true;
            userChicken.chaseTarget = targetMate;
            if (userChicken.el) userChicken.el.classList.add('is-chasing');

            spawnParticleBurst(userChicken.x + 60, userChicken.y + 60, '🏃‍♂️💨');
            chat.sendMessage(userChicken.id, `Woy ${targetMate.name}! Sini lu jangan kabur bawa buku catatan fisika gue! 🏃‍♂️💨`, true);

            setTimeout(() => {
                targetMate.isFleeing = false;
                userChicken.isChasing = false;
                if (targetMate.el) targetMate.el.classList.remove('is-fleeing');
                if (userChicken.el) userChicken.el.classList.remove('is-chasing');
            }, 4500);
        }
    });

    // C. Percik Sambel (Sauce Fight)
    btnActionSauce.addEventListener('click', () => {
        soundFX.playSizzle();
        const deskMates = Array.from(arena.chickens.values()).filter(c => !c.isUser && c.deskId === userChicken.deskId);
        if (deskMates.length > 0) {
            const targetMate = deskMates[Math.floor(Math.random() * deskMates.length)];
            arena.shootSauce(userChicken, targetMate, '🌶️');
            spawnParticleBurst(userChicken.x + 60, userChicken.y + 60, '🌶️🔥');
            chat.sendMessage(userChicken.id, `Crot! 🌶️ Nih ${targetMate.name}, rasain percikan saus sambal pedas level 10!`, true);
        }
    });

    // D. Lempar Kentang (Fries Throw)
    btnActionFries.addEventListener('click', () => {
        soundFX.playCrunch();
        const deskMates = Array.from(arena.chickens.values()).filter(c => !c.isUser && c.deskId === userChicken.deskId);
        if (deskMates.length > 0) {
            const targetMate = deskMates[Math.floor(Math.random() * deskMates.length)];
            arena.shootSauce(userChicken, targetMate, '🍟');
            spawnParticleBurst(userChicken.x + 60, userChicken.y + 60, '🍟✨');
            chat.sendMessage(userChicken.id, `Tangkap kentang goreng KFC krispi ini, ${targetMate.name}! 🍟😋`, true);
        }
    });

    // E. Miss Eva Marah (Teacher Anger Event)
    btnActionTeacher.addEventListener('click', () => {
        soundFX.playSpicy();
        arena.triggerTeacherRage('Meja 6');
        const missEva = Array.from(arena.chickens.values()).find(c => c.isTeacher);
        if (missEva) {
            chat.sendMessage(missEva.id, `DIAM SEMUANYA! Siapa itu di Meja 6 yang kejar-kejaran dan lempar-lempar sambal di kelas saya?! 👩‍🏫💢`, false, true);
        }
    });

    // Bell click on Teacher Desk
    if (teacherDeskBell) {
        teacherDeskBell.addEventListener('click', () => {
            soundFX.playPop();
            arena.triggerTeacherRage('Kelas XI-4');
            const missEva = Array.from(arena.chickens.values()).find(c => c.isTeacher);
            if (missEva) {
                chat.sendMessage(missEva.id, `*Ting-ting-ting!* 🔔 Waktu istirahat habis, rapikan meja kalian dan buka buku fisika halaman 52! 👩‍🏫📖`, false, true);
            }
        });
    }

    // Book click on Desk 6
    if (propPhysicsBook6) {
        propPhysicsBook6.addEventListener('click', () => {
            physicsModal.classList.add('open');
        });
    }

    // 5. Physics Notes Modal
    btnOpenPhysics.addEventListener('click', () => {
        physicsModal.classList.add('open');
    });
    btnActionNotes.addEventListener('click', () => {
        physicsModal.classList.add('open');
    });

    function closePhysicsModal() {
        physicsModal.classList.remove('open');
    }

    btnClosePhysics.addEventListener('click', closePhysicsModal);
    btnClosePhysicsBottom.addEventListener('click', closePhysicsModal);

    btnShareNotes.addEventListener('click', () => {
        closePhysicsModal();
        soundFX.playCrunch();
        spawnParticleBurst(userChicken.x + 60, userChicken.y + 60, '📓✨');
        chat.sendMessage(userChicken.id, `Guys, nih rumus gerak parabola dari buku catatan gue: Xmaks = (v0² sin 2α) / g. Jawaban No. 5 = B! 📐🤫`, true);
    });

    // 6. Chat Sending Logic
    function handleSendUserMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        chat.sendMessage(userChicken.id, text, false);
        chatInput.value = '';
        chatCountBadge.textContent = chat.messages.length;
    }

    btnSendChat.addEventListener('click', handleSendUserMessage);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleSendUserMessage();
        }
    });

    // Quick Phrases Dropdown
    quickPhraseSelect.addEventListener('change', () => {
        const phrase = quickPhraseSelect.value;
        if (phrase) {
            chatInput.value = phrase;
            handleSendUserMessage();
            quickPhraseSelect.value = '';
        }
    });

    // 7. Particle FX Generator
    function spawnParticleBurst(originX, originY, typeText) {
        if (!particleLayer) return;

        let particles = ['🍗', '✨', '⭐', '🍟', '🔥'];
        if (typeText.includes('Sambal') || typeText.includes('🌶️')) particles = ['🌶️', '🔥', '💥', '⚡', '🌋'];
        else if (typeText.includes('Kentang') || typeText.includes('🍟')) particles = ['🍟', '🥔', '✨', '🟡', '😋'];
        else if (typeText.includes('Kejar') || typeText.includes('🏃‍♂️')) particles = ['💨', '👟', '🏃‍♂️', '⚡', '💥'];
        else if (typeText.includes('Miss Eva') || typeText.includes('👩‍🏫')) particles = ['👩‍🏫', '📚', '👑', '✨', '🔔'];
        else if (typeText.includes('🤫') || typeText.includes('Catatan')) particles = ['📓', '🤫', '👀', '📄', '✨'];

        for (let i = 0; i < 18; i++) {
            const p = document.createElement('div');
            p.className = 'flying-particle';
            p.textContent = particles[Math.floor(Math.random() * particles.length)];
            p.style.left = originX + 'px';
            p.style.top = originY + 'px';
            p.style.fontSize = (16 + Math.random() * 16) + 'px';

            const angle = Math.random() * Math.PI * 2;
            const dist = 60 + Math.random() * 120;
            p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
            p.style.setProperty('--ty', (Math.sin(angle) * dist - 30) + 'px');

            particleLayer.appendChild(p);
            setTimeout(() => {
                if (p.parentNode === particleLayer) {
                    particleLayer.removeChild(p);
                }
            }, 900);
        }
    }

    // 8. Sidebar & Tabs Control
    btnToggleSidebar.addEventListener('click', () => {
        sidebarDrawer.classList.toggle('open');
        btnToggleSidebar.classList.toggle('btn-gold');
    });

    tabBtnChat.addEventListener('click', () => {
        tabBtnChat.classList.add('active');
        tabBtnRoster.classList.remove('active');
        paneChatLog.classList.add('active');
        paneRoster.classList.remove('active');
    });

    tabBtnRoster.addEventListener('click', () => {
        tabBtnRoster.classList.add('active');
        tabBtnChat.classList.remove('active');
        paneRoster.classList.add('active');
        paneChatLog.classList.remove('active');
        updateCountersAndRoster();
    });

    btnSoundToggle.addEventListener('click', () => {
        const isEnabled = soundFX.toggle();
        soundIcon.textContent = isEnabled ? '🔊' : '🔇';
        btnSoundToggle.style.opacity = isEnabled ? '1' : '0.6';
    });

    // 9. Customizer Studio Modal
    let previewConfig = { ...userProfile };

    function renderModalPreview() {
        modalPreviewSvg.innerHTML = renderChickenSVG(previewConfig);
    }

    function initCustomizerModal() {
        cutsSelectorGrid.innerHTML = '';
        Object.values(CHICKEN_CUTS).forEach(cut => {
            const card = document.createElement('div');
            card.className = `cut-option-card ${previewConfig.cut === cut.id ? 'selected' : ''}`;
            card.setAttribute('data-cut', cut.id);
            card.innerHTML = `
                <div style="font-size:1.5rem; margin-bottom:4px">${cut.icon || '🍗'}</div>
                <div class="cut-option-name">${cut.name.split('(')[0].trim()}</div>
            `;
            card.addEventListener('click', () => {
                previewConfig.cut = cut.id;
                document.querySelectorAll('.cut-option-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                renderModalPreview();
            });
            cutsSelectorGrid.appendChild(card);
        });

        flavorsSelectorGrid.innerHTML = '';
        Object.values(CHICKEN_FLAVORS).forEach(flavor => {
            const card = document.createElement('div');
            card.className = `flavor-option-card ${previewConfig.flavor === flavor.id ? 'selected' : ''}`;
            card.setAttribute('data-flavor', flavor.id);
            card.innerHTML = `
                <div class="flavor-color-dot" style="background:${flavor.primaryColor}"></div>
                <div class="flavor-name">${flavor.name.split('(')[0].trim()}</div>
            `;
            card.addEventListener('click', () => {
                previewConfig.flavor = flavor.id;
                document.querySelectorAll('.flavor-option-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                renderModalPreview();
            });
            flavorsSelectorGrid.appendChild(card);
        });

        expressionsSelectorGrid.innerHTML = '';
        Object.values(EXPRESSIONS).forEach(expr => {
            const card = document.createElement('div');
            card.className = `expr-option-card ${previewConfig.expression === expr.id ? 'selected' : ''}`;
            card.textContent = expr.name;
            card.addEventListener('click', () => {
                previewConfig.expression = expr.id;
                document.querySelectorAll('.expr-option-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                renderModalPreview();
            });
            expressionsSelectorGrid.appendChild(card);
        });

        accessoriesSelectorGrid.innerHTML = '';
        Object.values(ACCESSORIES).forEach(acc => {
            const card = document.createElement('div');
            card.className = `acc-option-card ${previewConfig.accessory === acc.id ? 'selected' : ''}`;
            card.innerHTML = `<span>${acc.icon}</span> ${acc.name.split(' ')[0]}`;
            card.addEventListener('click', () => {
                previewConfig.accessory = acc.id;
                document.querySelectorAll('.acc-option-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                renderModalPreview();
            });
            accessoriesSelectorGrid.appendChild(card);
        });

        inputChickenName.value = previewConfig.name;
        renderModalPreview();
    }

    inputChickenName.addEventListener('input', () => {
        previewConfig.name = inputChickenName.value.trim() || 'rahel';
    });

    btnOpenCustomizer.addEventListener('click', () => {
        previewConfig = { ...userProfile };
        initCustomizerModal();
        modalOverlay.classList.add('open');
    });

    function closeModal() {
        modalOverlay.classList.remove('open');
    }

    btnCloseModal.addEventListener('click', closeModal);
    btnCancelCustomizer.addEventListener('click', closeModal);

    btnSaveCustomizer.addEventListener('click', () => {
        userProfile = { ...previewConfig };
        userProfile.name = inputChickenName.value.trim() || 'rahel';
        localStorage.setItem('xi4_kfc_classroom_user_v2', JSON.stringify(userProfile));

        userChicken.updateConfig(userProfile);

        soundFX.playCrunch();
        spawnParticleBurst(userChicken.x + 60, userChicken.y + 60, '🍗✨');
        chat.broadcast('USER_UPDATE', userProfile);

        updateCountersAndRoster();
        closeModal();
    });
});
