/**
 * XI-4 KFC Chat - Chat Engine, Desk Conversations & Clean Dialogues
 * Ensures Miss Eva speaks teacher lines, students speak their specific desk lines, and desk mates reply accurately.
 */

class ChatEngine {
    constructor(arenaManager, soundEngine) {
        this.arena = arenaManager;
        this.sound = soundEngine;
        this.messages = [];
        this.chatLogEl = document.getElementById('chat-messages-container');
        this.channel = null;
        this.botBanterInterval = null;
        this.isBotBanterActive = true;

        this.initBroadcastChannel();
        this.startBotBanterScheduler();
    }

    initBroadcastChannel() {
        if ('BroadcastChannel' in window) {
            try {
                this.channel = new BroadcastChannel('kfc_xi4_classroom_chat');
                this.channel.onmessage = (event) => {
                    const { type, payload } = event.data;
                    if (type === 'CHAT_MESSAGE') {
                        this.handleRemoteMessage(payload);
                    } else if (type === 'USER_JOIN' || type === 'USER_UPDATE') {
                        this.handleRemoteUser(payload);
                    } else if (type === 'EMOTE_ACTION') {
                        this.handleRemoteEmote(payload);
                    }
                };
            } catch (err) {
                console.warn('BroadcastChannel error, using single-tab mode', err);
            }
        }
    }

    broadcast(type, payload) {
        if (this.channel) {
            this.channel.postMessage({ type, payload });
        }
    }

    // Send a message from a chicken / teacher / fries in classroom
    sendMessage(senderId, text, isSpecialEmote = false, isTeacherAngry = false) {
        const chicken = this.arena.chickens.get(senderId);
        if (!chicken) return;

        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const messageObj = {
            id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            senderId: chicken.id,
            senderName: chicken.name,
            flavor: chicken.flavor,
            cut: chicken.cut,
            deskId: chicken.deskId,
            isTeacher: chicken.isTeacher || chicken.name.includes('Miss Eva'),
            text: text,
            time: timeStr,
            isUser: chicken.isUser,
            isSpecialEmote: isSpecialEmote,
            isTeacherAngry: isTeacherAngry
        };

        this.messages.push(messageObj);

        // 1. Show Floating Speech Bubble
        this.showFloatingSpeechBubble(chicken, text, isSpecialEmote, isTeacherAngry);

        // 2. Add to Sidebar Chat Log Feed
        this.appendChatLog(messageObj);

        // 3. Play audio effect
        if (isTeacherAngry) {
            this.sound.playSpicy();
        } else if (isSpecialEmote) {
            if (text.includes('🌶️') || text.includes('Sambal')) this.sound.playSizzle();
            else if (text.includes('🧀') || text.includes('Keju')) this.sound.playCheese();
            else if (text.includes('💃') || text.includes('Joget')) this.sound.playDance();
            else this.sound.playCrunch();
        } else {
            this.sound.playPop();
        }

        // 4. Broadcast to other open browser tabs if user sent it
        if (chicken.isUser) {
            this.broadcast('CHAT_MESSAGE', messageObj);
        }

        // 5. Trigger Desk Mate Reaction (Niko or Noah respond to Rahel at Desk 6!)
        if (chicken.isUser && this.isBotBanterActive) {
            this.triggerDeskMateReaction(chicken, text);
        }
    }

    showFloatingSpeechBubble(chicken, text, isSpecialEmote = false, isTeacherAngry = false) {
        const slot = document.getElementById(`bubble-slot-${chicken.id}`);
        if (!slot) return;

        slot.innerHTML = '';

        const bubble = document.createElement('div');
        bubble.className = `chicken-speech-bubble ${isSpecialEmote ? 'special-emote' : ''} ${chicken.isUser ? 'user-bubble' : ''} ${chicken.isTeacher ? 'teacher-bubble' : ''} ${isTeacherAngry ? 'teacher-angry-bubble' : ''}`;
        
        let flavorColor = CHICKEN_FLAVORS[chicken.flavor]?.primaryColor || '#f59e0b';
        if (chicken.isTeacher) flavorColor = isTeacherAngry ? '#ef4444' : '#f59e0b';
        else if (chicken.cut === 'fries') flavorColor = '#e11d48';

        bubble.style.setProperty('--bubble-border-color', flavorColor);

        bubble.innerHTML = `
            <div class="bubble-content">${this.escapeHTML(text)}</div>
            <div class="bubble-tail"></div>
        `;

        slot.appendChild(bubble);

        if (chicken.el) {
            const bodyEl = chicken.el.querySelector('.chicken-body-container');
            if (bodyEl) {
                bodyEl.classList.remove('speech-bounce');
                void bodyEl.offsetWidth;
                bodyEl.classList.add('speech-bounce');
            }
        }

        const duration = Math.min(8000, Math.max(3500, text.length * 90));
        setTimeout(() => {
            if (bubble.parentNode === slot) {
                bubble.classList.add('fade-out');
                setTimeout(() => {
                    if (bubble.parentNode === slot) {
                        slot.removeChild(bubble);
                    }
                }, 300);
            }
        }, duration);
    }

    appendChatLog(msg) {
        if (!this.chatLogEl) return;

        const logItem = document.createElement('div');
        logItem.className = `chat-log-item ${msg.isUser ? 'is-user-msg' : ''} ${msg.isSpecialEmote ? 'is-emote-msg' : ''} ${msg.isTeacher ? 'is-teacher-msg' : ''}`;

        const flavorInfo = CHICKEN_FLAVORS[msg.flavor] || CHICKEN_FLAVORS.original;
        const cutInfo = CHICKEN_CUTS[msg.cut] || CHICKEN_CUTS.drumstick;

        let avatarBadge = cutInfo.icon || '🍗';
        if (msg.isUser) avatarBadge = '⭐';
        if (msg.isTeacher) avatarBadge = '👩‍🏫';

        logItem.innerHTML = `
            <div class="chat-log-avatar-mini" style="background: ${flavorInfo.sauceGlow}; border-color: ${msg.isTeacher ? '#f59e0b' : flavorInfo.primaryColor};">
                ${avatarBadge}
            </div>
            <div class="chat-log-body">
                <div class="chat-log-header">
                    <span class="chat-log-name">${this.escapeHTML(msg.senderName)}</span>
                    <span class="chat-log-tag" style="color:${msg.isTeacher ? '#fbbf24' : flavorInfo.primaryColor}">${msg.isTeacher ? 'Wali Kelas' : cutInfo.name.split(' ')[0]}</span>
                    <span class="chat-log-time">${msg.time}</span>
                </div>
                <div class="chat-log-text">${this.escapeHTML(msg.text)}</div>
            </div>
        `;

        this.chatLogEl.appendChild(logItem);
        this.chatLogEl.scrollTop = this.chatLogEl.scrollHeight;

        if (this.chatLogEl.children.length > 100) {
            this.chatLogEl.removeChild(this.chatLogEl.firstChild);
        }
    }

    handleRemoteMessage(payload) {
        let remoteChicken = this.arena.chickens.get(payload.senderId);
        if (!remoteChicken) {
            remoteChicken = this.arena.addChicken({
                id: payload.senderId,
                name: payload.senderName,
                flavor: payload.flavor,
                cut: payload.cut,
                deskId: payload.deskId,
                isTeacher: payload.isTeacher || false,
                isUser: false
            });
        }
        this.messages.push(payload);
        this.showFloatingSpeechBubble(remoteChicken, payload.text, payload.isSpecialEmote, payload.isTeacherAngry);
        this.appendChatLog(payload);
        this.sound.playPop();
    }

    handleRemoteUser(payload) {
        let chicken = this.arena.chickens.get(payload.id);
        if (chicken) {
            chicken.updateConfig(payload);
        } else {
            this.arena.addChicken({
                id: payload.id,
                name: payload.name,
                flavor: payload.flavor,
                cut: payload.cut,
                accessory: payload.accessory,
                expression: payload.expression,
                deskId: payload.deskId,
                isTeacher: payload.isTeacher || false,
                isUser: false
            });
        }
    }

    handleRemoteEmote(payload) {
        const chicken = this.arena.chickens.get(payload.senderId);
        if (chicken) {
            chicken.triggerDance();
            this.sendMessage(payload.senderId, payload.text, true);
        }
    }

    /**
     * Smart Classroom Reaction Engine
     * Dynamically replies from the mentioned student / desk or from user's desk mates (Niko/Noah).
     */
    triggerDeskMateReaction(userChicken, userText) {
        const lower = userText.toLowerCase();
        const allChickens = Array.from(this.arena.chickens.values());
        const missEva = allChickens.find(c => c.isTeacher);

        setTimeout(() => {
            let responder = null;
            let reply = '';

            // 1. Check if user is addressing Miss Eva
            if (lower.includes('miss eva') || lower.includes('bu eva') || lower.includes('bu guru') || lower.includes('lapor')) {
                responder = missEva;
                if (lower.includes('panpan') || lower.includes('meja 2')) {
                    reply = `Miss Eva: 'Panpan, Gio, Monang! Duduk tertib di Meja 2 atau saya suruh berdiri di depan kelas!' 👩‍🏫📏`;
                } else if (lower.includes('meja 10') || lower.includes('kentang')) {
                    reply = `Miss Eva: 'Nakula, Ben! Simpan kentang goreng kalian sampai jam istirahat!' 👩‍🏫🍟`;
                } else if (lower.includes('toilet') || lower.includes('izin')) {
                    reply = `Miss Eva: 'Iya ${userChicken.name}, silakan ke toilet tapi jangan lebih dari 5 menit ya!' 👩‍🏫`;
                } else if (lower.includes('papan') || lower.includes('rumus') || lower.includes('ulang')) {
                    reply = `Miss Eva: 'Perhatikan baik-baik! Rumus gerak parabola Xmaks = (v0² sin 2α) / g. Catat di buku kalian!' 👩‍🏫📐`;
                } else {
                    reply = `Miss Eva: 'Ada apa ${userChicken.name}? Perhatikan materi fisika di depan ya!' 👩‍🏫✨`;
                }
            } else {
                // 2. Check if a specific classmate was mentioned
                const mentioned = allChickens.find(c => !c.isUser && !c.isTeacher && lower.includes(c.name.toLowerCase()));

                if (mentioned) {
                    responder = mentioned;
                    const mName = mentioned.name.toLowerCase();

                    if (mName === 'panpan' || mName === 'gio' || mName === 'monang') {
                        const replies = [
                            `Nih Rahel, kentang goreng saus keju Meja 2 emang paling juara se-XI-4! 🍟🧀`,
                            `Wkwk jangan teriak-teriak Rahel, nanti Miss Eva nyita kentang kita! 🤫🍟`,
                            `Kejar Meja 2 dulu sini kalau mau kentang krispi! 🏃‍♂️💨`
                        ];
                        reply = replies[Math.floor(Math.random() * replies.length)];
                    } else if (mName === 'nesi' || mName === 'palala' || mName === 'stecu') {
                        const replies = [
                            `Rahel, contekan Meja 1 lengkap banget nih, mau rumus GLBB atau parabola? 📐✨`,
                            `Ayam krispi Meja 1 aman terkendali di bawah laci wkwk! 🍗🤫`,
                            `Ntar istirahat kita kejar-kejaran bareng ke kantin ya Rahel! 🏃‍♂️🍗`
                        ];
                        reply = replies[Math.floor(Math.random() * replies.length)];
                    } else if (mName === 'enidp' || mName === 'kaisar' || mName === 'jeris') {
                        const replies = [
                            `Jawaban no 3 yang C ya Rahel! Saos sambal Meja 3 pedas level 10! 🌶️🥵`,
                            `Kaisar & Jeris lagi fokus ngitung momen inersia ayam nih! 📐🍗`,
                            `Awas Rahel, Meja 3 siap bales lempar percikan sambal! 🌶️🤣`
                        ];
                        reply = replies[Math.floor(Math.random() * replies.length)];
                    } else if (mName === 'joeng' || mName === 'marmar' || mName === 'piman') {
                        const replies = [
                            `Nih penghapus & tipe-x Meja 4, jangan diilangin ya Rahel! 🧽✏️`,
                            `Kentang Meja 4 renyah banget emang, mau seporsi? 🍟😋`,
                            `Saus BBQ udah dioper ke mejamu tuh Rahel! 🍖🥫`
                        ];
                        reply = replies[Math.floor(Math.random() * replies.length)];
                    } else if (mName === 'nakula' || mName === 'nia' || (mName.includes('ben'))) {
                        const replies = [
                            `Wkwk kentang sultan Meja 10 eksklusif bro! Ambil satu nih 🍟👑`,
                            `Catatan halaman 52 ada di buku Nia tuh Rahel, contek aja! 📐📖`,
                            `Aduh sambel gue hampir tumpah kena lari-larian! 🌶️💨`
                        ];
                        reply = replies[Math.floor(Math.random() * replies.length)];
                    } else if (mName === 'salsa' || mName === 'geo' || mName === 'jon') {
                        const replies = [
                            `Gass kejar-kejaran habis bel bunyi ya Rahel! 🏃‍♂️💨`,
                            `Nih Jon lemparin saus sachet sambel ke Meja 6! 🥫🌶️`,
                            `Kentang Meja 11 krispi garing gurih banget parah! 🍟✨`
                        ];
                        reply = replies[Math.floor(Math.random() * replies.length)];
                    } else {
                        reply = `Halo Rahel! Salam dari meja kami, siap lanjut belajar fisika sambil makan ayam! 🍗✨`;
                    }
                } else {
                    // 3. Default to Desk 6 Mates (Niko or Noah)
                    const deskMates = allChickens.filter(c => !c.isUser && c.deskId === userChicken.deskId);
                    if (deskMates.length > 0) {
                        responder = deskMates[Math.floor(Math.random() * deskMates.length)];

                        if (lower.includes('fisika') || lower.includes('rumus') || lower.includes('catatan') || lower.includes('glbb') || lower.includes('parabola') || lower.includes('nyontek')) {
                            const physicsReplies = [
                                `Nih Rahel, rumus gerak parabola: Xmaks = (v0² sin 2α) / g. Jangan berisik tapi! 📐🤫`,
                                `Jawaban nomor 4 yang B ya Rahel! Sttt buku catatan gue jangan ditumpahin saos! 📓🍟`,
                                `Rahel, liat contekan GLBB lu dong, rumus ketinggian maks apa? 📝👀`
                            ];
                            reply = physicsReplies[Math.floor(Math.random() * physicsReplies.length)];
                        } else if (lower.includes('sambal') || lower.includes('sambel') || lower.includes('percik') || lower.includes('pedas')) {
                            const sauceReplies = [
                                `Woy ${userChicken.name}! Sambel lu kena sayap krispi gue nih, pedas abis! 🌶️🥵`,
                                `Awas ya lu Rahel, gue bales percik saus keju cheddar nih! 🧀🤣`,
                                `Splat! Kena paha ayam lu duluan wkwk! 🍗🌶️`
                            ];
                            reply = sauceReplies[Math.floor(Math.random() * sauceReplies.length)];
                        } else if (lower.includes('kejar') || lower.includes('buku') || lower.includes('balikin') || lower.includes('lari')) {
                            const chaseReplies = [
                                `Wkwk kejar gue dulu kalau mau buku fisika lu balik! 🏃‍♂️💨`,
                                `Ayo tangkap gue sebelum bel masuk bunyi! 🏃‍♂️🍗`,
                                `Jangan lari-larian woy, Miss Eva lagi noleh ke Meja 6! 🤫👩‍🏫`
                            ];
                            reply = chaseReplies[Math.floor(Math.random() * chaseReplies.length)];
                        } else {
                            const genericReplies = [
                                `Wkwk setuju banget Rahel! Sambil makan kentang goreng nih 🍟😋`,
                                `Meja 6 emang paling solid ya gengs! 🍗✨`,
                                `Rahel, minta kentang KFC lu satu dong, sausnya melimpah! 🤤🍟`
                            ];
                            reply = genericReplies[Math.floor(Math.random() * genericReplies.length)];
                        }
                    }
                }
            }

            if (responder && reply) {
                const isTeacher = responder.isTeacher || responder.name.includes('Miss Eva');
                this.sendMessage(responder.id, reply, false, isTeacher);
            }
        }, 1200 + Math.random() * 800);
    }

    startBotBanterScheduler() {
        if (this.botBanterInterval) clearInterval(this.botBanterInterval);

        // Accurate & distinct chat phrases: Teachers only say teacher lines, students only say their desk lines
        const scheduleNext = () => {
            const delay = 3500 + Math.random() * 3500;
            this.botBanterInterval = setTimeout(() => {
                if (this.isBotBanterActive) {
                    const chickens = Array.from(this.arena.chickens.values()).filter(c => !c.isUser);
                    if (chickens.length > 0) {
                        const speaker = chickens[Math.floor(Math.random() * chickens.length)];
                        let phrase = '';
                        let isAngry = false;

                        if (speaker.isTeacher) {
                            // ONLY Miss Eva speaks these!
                            phrase = TEACHER_CHAT_PHRASES[Math.floor(Math.random() * TEACHER_CHAT_PHRASES.length)];
                            isAngry = phrase.includes('💢') || phrase.includes('Siapa yang lempar');
                        } else {
                            // Students speak desk-specific lines or general student lines
                            const deskPhrases = DESK_SPECIFIC_PHRASES[speaker.deskId];
                            if (deskPhrases && Math.random() < 0.75) {
                                phrase = deskPhrases[Math.floor(Math.random() * deskPhrases.length)];
                            } else {
                                phrase = GENERAL_STUDENT_PHRASES[Math.floor(Math.random() * GENERAL_STUDENT_PHRASES.length)];
                            }
                        }

                        if (phrase) {
                            this.sendMessage(speaker.id, phrase, false, isAngry);

                            if (Math.random() < 0.25) {
                                speaker.triggerDance(2500);
                            }
                        }
                    }
                }
                scheduleNext();
            }, delay);
        };

        scheduleNext();
    }

    toggleBotBanter() {
        this.isBotBanterActive = !this.isBotBanterActive;
        return this.isBotBanterActive;
    }

    escapeHTML(str) {
        const p = document.createElement('p');
        p.textContent = str;
        return p.innerHTML;
    }
}
