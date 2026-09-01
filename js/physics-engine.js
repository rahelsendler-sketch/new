/**
 * XI-4 KFC Chat - Floating Physics & Lively Classroom Engine
 * Energetic movements, autonomous chase sequences, sauce shooting, and stealth note stealing.
 */

class FloatingChicken {
    constructor(data) {
        this.id = data.id || 'chicken_' + Math.random().toString(36).substr(2, 9);
        this.name = data.name || 'rahel';
        this.cut = data.cut || 'thigh';
        this.flavor = data.flavor || 'splash-chili';
        this.accessory = data.accessory || 'crown';
        this.expression = data.expression || 'spicy';
        this.status = data.status || '🌶️ Meja 6 • Paha Sambal';
        this.isUser = data.isUser || false;
        this.isTeacher = data.isTeacher || (data.name && data.name.includes('Miss Eva'));
        this.deskId = data.deskId || 'desk_6';

        // Home Desk Anchor coordinates
        this.homeX = data.homeX !== undefined ? data.homeX : (data.x || 600);
        this.homeY = data.homeY !== undefined ? data.homeY : (data.y || 400);

        // Position & Physics (Lively & Dynamic)
        this.x = data.x !== undefined ? data.x : this.homeX;
        this.y = data.y !== undefined ? data.y : this.homeY;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.targetX = this.x;
        this.targetY = this.y;
        this.isMovingToTarget = false;

        // Chase & Flee States
        this.isChasing = false;
        this.isFleeing = false;
        this.chaseTarget = null;
        this.fleeFrom = null;

        // Frozen (Teacher rage) or Spicy Hit or Stealth
        this.isFrozen = false;
        this.isSpicyHit = false;
        this.isStealthing = false;

        // Buoyancy Float phase
        this.floatPhase = Math.random() * Math.PI * 2;
        this.floatSpeed = 0.04 + Math.random() * 0.03;
        this.floatAmplitude = this.isTeacher ? 5 : (10 + Math.random() * 6);

        // Tilt & Wobble
        this.wobble = (Math.random() - 0.5) * 8;
        this.targetWobble = 0;

        // State flags
        this.isDragging = false;
        this.isDancing = false;
        this.danceTimer = null;

        // DOM Element references
        this.el = null;
    }

    createDOM(container) {
        const wrap = document.createElement('div');
        wrap.className = `chicken-avatar-node ${this.isUser ? 'user-avatar' : ''} ${this.isTeacher ? 'teacher-avatar' : ''} flavor-${this.flavor}`;
        wrap.id = `avatar-${this.id}`;
        wrap.setAttribute('data-id', this.id);

        let badgeText = CHICKEN_FLAVORS[this.flavor]?.badge || '🍗';
        if (this.isUser) badgeText = '⭐ Kamu';
        else if (this.isTeacher) badgeText = '👩‍🏫 Wali Kelas';

        wrap.innerHTML = `
            <div class="chicken-speech-bubble-slot" id="bubble-slot-${this.id}"></div>
            <div class="chicken-body-container">
                <div class="chicken-svg-wrapper" id="svg-wrap-${this.id}">
                    ${renderChickenSVG(this)}
                </div>
            </div>
            <div class="chicken-nametag">
                <div class="nametag-badge">${badgeText}</div>
                <div class="nametag-text">${this.name}</div>
                <div class="nametag-flavor-tag">${CHICKEN_CUTS[this.cut]?.name.split(' ')[0] || ''}</div>
            </div>
        `;

        container.appendChild(wrap);
        this.el = wrap;
        this.updatePositionDOM(0);
        return wrap;
    }

    updateConfig(newConfig) {
        if (newConfig.name) {
            this.name = newConfig.name;
            this.isTeacher = this.name.includes('Miss Eva');
        }
        if (newConfig.cut) this.cut = newConfig.cut;
        if (newConfig.flavor) this.flavor = newConfig.flavor;
        if (newConfig.accessory) this.accessory = newConfig.accessory;
        if (newConfig.expression) this.expression = newConfig.expression;

        if (this.el) {
            if (this.isTeacher) this.el.classList.add('teacher-avatar');
            else this.el.classList.remove('teacher-avatar');

            const svgWrap = this.el.querySelector(`#svg-wrap-${this.id}`);
            if (svgWrap) {
                svgWrap.innerHTML = renderChickenSVG(this);
            }
            const nameEl = this.el.querySelector('.nametag-text');
            if (nameEl) nameEl.textContent = this.name;

            const badgeEl = this.el.querySelector('.nametag-badge');
            if (badgeEl) {
                if (this.isUser) badgeEl.textContent = '⭐ Kamu';
                else if (this.isTeacher) badgeEl.textContent = '👩‍🏫 Wali Kelas';
                else badgeEl.textContent = CHICKEN_FLAVORS[this.flavor]?.badge || '🍗';
            }
        }
    }

    setTarget(tx, ty) {
        this.targetX = tx;
        this.targetY = ty;
        this.isMovingToTarget = true;
    }

    setSpicyHit(duration = 2500) {
        this.isSpicyHit = true;
        if (this.el) this.el.classList.add('spicy-hit');
        setTimeout(() => {
            this.isSpicyHit = false;
            if (this.el) this.el.classList.remove('spicy-hit');
        }, duration);
    }

    setFrozen(duration = 3000) {
        this.isFrozen = true;
        this.vx = 0;
        this.vy = 0;
        if (this.el) this.el.classList.add('is-frozen');
        setTimeout(() => {
            this.isFrozen = false;
            if (this.el) this.el.classList.remove('is-frozen');
        }, duration);
    }

    triggerDance(duration = 3000) {
        this.isDancing = true;
        if (this.el) this.el.classList.add('dancing');
        if (this.danceTimer) clearTimeout(this.danceTimer);
        this.danceTimer = setTimeout(() => {
            this.isDancing = false;
            if (this.el) this.el.classList.remove('dancing');
        }, duration);
    }

    update(bounds, arenaChickens) {
        if (this.isDragging || this.isFrozen) return;

        this.floatPhase += this.floatSpeed;
        const buoyancyOffsetY = Math.sin(this.floatPhase) * this.floatAmplitude;

        // 1. Chase & Flee Logic (Fast Lively Sprint)
        if (this.isChasing && this.chaseTarget) {
            const dx = this.chaseTarget.x - this.x;
            const dy = this.chaseTarget.y - this.y;
            const dist = Math.hypot(dx, dy);

            if (dist > 35) {
                this.vx = (dx / dist) * 5.2;
                this.vy = (dy / dist) * 5.2;
                this.targetWobble = (dx > 0 ? 1 : -1) * 18;
            } else {
                // Caught!
                this.isChasing = false;
                if (this.el) this.el.classList.remove('is-chasing');
            }
        } else if (this.isFleeing && this.fleeFrom) {
            const dx = this.x - this.fleeFrom.x;
            const dy = this.y - this.fleeFrom.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 260) {
                this.vx = (dx / Math.max(dist, 1)) * 4.8;
                this.vy = (dy / Math.max(dist, 1)) * 4.8;
                this.targetWobble = (dx > 0 ? 1 : -1) * 18;
            } else {
                this.isFleeing = false;
                if (this.el) this.el.classList.remove('is-fleeing');
            }
        } else if (this.isMovingToTarget) {
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            const dist = Math.hypot(dx, dy);

            if (dist > 6) {
                this.vx = (dx / dist) * Math.min(dist * 0.15, 4.5);
                this.vy = (dy / dist) * Math.min(dist * 0.15, 4.5);
                this.targetWobble = (dx > 0 ? 1 : -1) * Math.min(dist * 0.1, 14);
            } else {
                this.x = this.targetX;
                this.y = this.targetY;
                this.vx = 0;
                this.vy = 0;
                this.isMovingToTarget = false;
                this.targetWobble = 0;
            }
        } else {
            // Lively Autonomous Roaming & Bouncing
            const distFromHome = Math.hypot(this.x - this.homeX, this.y - this.homeY);
            const maxDeskRadius = this.isTeacher ? 30 : 75;

            // Frequent lively nudges so characters are never still
            if (Math.random() < 0.08) {
                this.vx += (Math.random() - 0.5) * 1.6;
                this.vy += (Math.random() - 0.5) * 1.6;
            }

            if (distFromHome > maxDeskRadius) {
                const pullBackX = (this.homeX - this.x) * 0.035;
                const pullBackY = (this.homeY - this.y) * 0.035;
                this.vx += pullBackX;
                this.vy += pullBackY;
            }

            // Speed limits
            const maxSpeed = this.isTeacher ? 0.9 : 2.4;
            const currentSpeed = Math.hypot(this.vx, this.vy);
            if (currentSpeed > maxSpeed) {
                this.vx = (this.vx / currentSpeed) * maxSpeed;
                this.vy = (this.vy / currentSpeed) * maxSpeed;
            }

            this.vx *= 0.97;
            this.vy *= 0.97;
            this.targetWobble = this.vx * 7;
        }

        // Apply velocities
        this.x += this.vx;
        this.y += this.vy;

        // Boundary constraints
        const padX = 40;
        const padY = 60;
        if (this.x < padX) {
            this.x = padX;
            this.vx = Math.abs(this.vx);
        } else if (this.x > bounds.width - padX) {
            this.x = bounds.width - padX;
            this.vx = -Math.abs(this.vx);
        }

        if (this.y < padY) {
            this.y = padY;
            this.vy = Math.abs(this.vy);
        } else if (this.y > bounds.height - padY) {
            this.y = bounds.height - padY;
            this.vy = -Math.abs(this.vy);
        }

        // Wobble smoothing
        this.wobble += (this.targetWobble - this.wobble) * 0.15;

        this.updatePositionDOM(buoyancyOffsetY);
    }

    updatePositionDOM(buoyancyOffsetY = 0) {
        if (!this.el) return;

        const depthZ = Math.round(this.y);
        const depthScale = 0.88 + (this.y / 1200) * 0.25;

        this.el.style.transform = `translate3d(${this.x}px, ${this.y + buoyancyOffsetY}px, 0) scale(${depthScale}) rotate(${this.wobble}deg)`;
        this.el.style.zIndex = depthZ;
    }
}

class ArenaManager {
    constructor(arenaEl, minimapCanvas) {
        this.arenaEl = arenaEl;
        this.minimapCanvas = minimapCanvas;
        this.minimapCtx = minimapCanvas ? minimapCanvas.getContext('2d') : null;
        this.chickens = new Map();
        this.userChicken = null;
        this.bounds = { width: 1600, height: 900 };
        this.animationFrame = null;
        this.draggedChicken = null;
        this.dragOffset = { x: 0, y: 0 };
        this.autoChaseInterval = null;

        this.initEvents();
        this.startAutonomousChaseEngine();
    }

    initEvents() {
        this.updateArenaBounds();
        window.addEventListener('resize', () => this.updateArenaBounds());

        // Click to move user chicken
        this.arenaEl.addEventListener('click', (e) => {
            if (e.target.closest('.chicken-avatar-node') || e.target.closest('.chicken-speech-bubble')) {
                return;
            }
            if (this.userChicken) {
                const rect = this.arenaEl.getBoundingClientRect();
                const targetX = e.clientX - rect.left - 64;
                const targetY = e.clientY - rect.top - 64;
                this.userChicken.setTarget(targetX, targetY);
            }
        });

        // Drag & Drop
        this.arenaEl.addEventListener('mousedown', (e) => {
            const node = e.target.closest('.chicken-avatar-node');
            if (!node) return;

            const id = node.getAttribute('data-id');
            const chicken = this.chickens.get(id);
            if (chicken) {
                this.draggedChicken = chicken;
                chicken.isDragging = true;
                const rect = this.arenaEl.getBoundingClientRect();
                this.dragOffset.x = (e.clientX - rect.left) - chicken.x;
                this.dragOffset.y = (e.clientY - rect.top) - chicken.y;
            }
        });

        window.addEventListener('mousemove', (e) => {
            if (this.draggedChicken) {
                const rect = this.arenaEl.getBoundingClientRect();
                const newX = e.clientX - rect.left - this.dragOffset.x;
                const newY = e.clientY - rect.top - this.dragOffset.y;
                this.draggedChicken.x = Math.max(30, Math.min(this.bounds.width - 30, newX));
                this.draggedChicken.y = Math.max(50, Math.min(this.bounds.height - 50, newY));
                this.draggedChicken.updatePositionDOM(0);
            }
        });

        window.addEventListener('mouseup', () => {
            if (this.draggedChicken) {
                this.draggedChicken.isDragging = false;
                this.draggedChicken = null;
            }
        });

        // Touch support
        this.arenaEl.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            const node = e.target.closest('.chicken-avatar-node');
            if (node) {
                const id = node.getAttribute('data-id');
                const chicken = this.chickens.get(id);
                if (chicken) {
                    this.draggedChicken = chicken;
                    chicken.isDragging = true;
                    const rect = this.arenaEl.getBoundingClientRect();
                    this.dragOffset.x = (touch.clientX - rect.left) - chicken.x;
                    this.dragOffset.y = (touch.clientY - rect.top) - chicken.y;
                }
            }
        }, { passive: false });

        window.addEventListener('touchmove', (e) => {
            if (this.draggedChicken) {
                const touch = e.touches[0];
                const rect = this.arenaEl.getBoundingClientRect();
                const newX = touch.clientX - rect.left - this.dragOffset.x;
                const newY = touch.clientY - rect.top - this.dragOffset.y;
                this.draggedChicken.x = Math.max(30, Math.min(this.bounds.width - 30, newX));
                this.draggedChicken.y = Math.max(50, Math.min(this.bounds.height - 50, newY));
                this.draggedChicken.updatePositionDOM(0);
            }
        }, { passive: false });

        window.addEventListener('touchend', () => {
            if (this.draggedChicken) {
                this.draggedChicken.isDragging = false;
                this.draggedChicken = null;
            }
        });
    }

    updateArenaBounds() {
        if (this.arenaEl) {
            this.bounds.width = this.arenaEl.clientWidth || window.innerWidth;
            this.bounds.height = this.arenaEl.clientHeight || (window.innerHeight - 130);
        }
    }

    addChicken(chickenData) {
        const chicken = new FloatingChicken(chickenData);
        chicken.createDOM(this.arenaEl);
        this.chickens.set(chicken.id, chicken);

        if (chicken.isUser) {
            this.userChicken = chicken;
        }
        return chicken;
    }

    removeChicken(id) {
        const chicken = this.chickens.get(id);
        if (chicken) {
            if (chicken.el && chicken.el.parentNode) {
                chicken.el.parentNode.removeChild(chicken.el);
            }
            this.chickens.delete(id);
        }
    }

    clearCrowd() {
        const toDelete = [];
        this.chickens.forEach((c, id) => {
            if (!c.isUser) {
                toDelete.push(id);
            }
        });
        toDelete.forEach(id => this.removeChicken(id));
    }

    populateClassroom(currentUserName = '') {
        this.clearCrowd();

        const bw = this.bounds.width;
        const bh = this.bounds.height;

        const deskMap = new Map();
        DESK_GROUPS.forEach(g => {
            deskMap.set(g.id, {
                x: bw * g.posX,
                y: bh * g.posY
            });
        });

        BOT_NAMES_AND_PROFILES.forEach((prof, idx) => {
            if (this.userChicken && (this.userChicken.name.toLowerCase() === prof.name.toLowerCase())) {
                return;
            }

            const deskPos = deskMap.get(prof.deskId) || { x: bw * 0.5, y: bh * 0.5 };
            const memberIdx = idx % 3;
            const offsetX = (memberIdx - 1) * 38 + (Math.random() - 0.5) * 15;
            const offsetY = (Math.random() - 0.5) * 20;

            const homeX = deskPos.x + offsetX;
            const homeY = deskPos.y + offsetY;

            this.addChicken({
                id: 'member_' + idx,
                name: prof.name,
                cut: prof.cut,
                flavor: prof.flavor,
                accessory: prof.accessory,
                expression: prof.expression,
                status: prof.status,
                deskId: prof.deskId,
                homeX: homeX,
                homeY: homeY,
                x: homeX + (Math.random() - 0.5) * 25,
                y: homeY + (Math.random() - 0.5) * 25,
                isTeacher: prof.isTeacher || false,
                isUser: false
            });
        });
    }

    /**
     * Autonomous Chasing Games between random desk mates
     */
    startAutonomousChaseEngine() {
        if (this.autoChaseInterval) clearInterval(this.autoChaseInterval);

        const runAutoChase = () => {
            const delay = 6000 + Math.random() * 6000;
            this.autoChaseInterval = setTimeout(() => {
                // Pick a random desk from 1 to 11
                const randomDeskNum = Math.floor(Math.random() * 11) + 1;
                const deskId = `desk_${randomDeskNum}`;
                const mates = Array.from(this.chickens.values()).filter(c => c.deskId === deskId && !c.isTeacher);

                if (mates.length >= 2) {
                    const runner = mates[0];
                    const chaser = mates[1];

                    runner.isFleeing = true;
                    runner.fleeFrom = chaser;
                    if (runner.el) runner.el.classList.add('is-fleeing');

                    chaser.isChasing = true;
                    chaser.chaseTarget = runner;
                    if (chaser.el) chaser.el.classList.add('is-chasing');

                    setTimeout(() => {
                        runner.isFleeing = false;
                        chaser.isChasing = false;
                        if (runner.el) runner.el.classList.remove('is-fleeing');
                        if (chaser.el) chaser.el.classList.remove('is-chasing');
                    }, 4500);
                }

                runAutoChase();
            }, delay);
        };

        runAutoChase();
    }

    startDeskChase(deskId = 'desk_6') {
        const mates = Array.from(this.chickens.values()).filter(c => c.deskId === deskId);
        if (mates.length < 2) return null;

        const runner = mates[0];
        const chaser = mates[1];

        runner.isFleeing = true;
        runner.fleeFrom = chaser;
        if (runner.el) runner.el.classList.add('is-fleeing');

        chaser.isChasing = true;
        chaser.chaseTarget = runner;
        if (chaser.el) chaser.el.classList.add('is-chasing');

        setTimeout(() => {
            runner.isFleeing = false;
            chaser.isChasing = false;
            if (runner.el) runner.el.classList.remove('is-fleeing');
            if (chaser.el) chaser.el.classList.remove('is-chasing');
        }, 5000);

        return { runner, chaser };
    }

    shootSauce(fromChicken, toChicken, sauceIcon = '🌶️') {
        if (!fromChicken || !toChicken) return;

        const proj = document.createElement('div');
        proj.className = 'flying-sauce-projectile';
        proj.textContent = sauceIcon;
        proj.style.left = (fromChicken.x + 40) + 'px';
        proj.style.top = (fromChicken.y + 40) + 'px';

        document.body.appendChild(proj);

        const startX = fromChicken.x + 40;
        const startY = fromChicken.y + 40;
        const targetX = toChicken.x + 40;
        const targetY = toChicken.y + 40;

        const duration = 480;
        const startTime = performance.now();

        const animateProj = (now) => {
            const progress = Math.min(1, (now - startTime) / duration);
            const curX = startX + (targetX - startX) * progress;
            const arcY = Math.sin(progress * Math.PI) * -80;
            const curY = startY + (targetY - startY) * progress + arcY;

            proj.style.transform = `translate3d(${curX - startX}px, ${curY - startY}px, 0) rotate(${progress * 720}deg) scale(${1 + Math.sin(progress * Math.PI) * 0.5})`;

            if (progress < 1) {
                requestAnimationFrame(animateProj);
            } else {
                if (proj.parentNode) proj.parentNode.removeChild(proj);
                toChicken.setSpicyHit(3000);
            }
        };

        requestAnimationFrame(animateProj);
    }

    triggerTeacherRage(culpritDeskName = 'Meja 6') {
        const appContainer = document.getElementById('app-container');
        const blackboard = document.getElementById('main-blackboard');
        const missEva = Array.from(this.chickens.values()).find(c => c.isTeacher || c.name.includes('Miss Eva'));

        if (appContainer) {
            appContainer.classList.add('classroom-shake');
            setTimeout(() => appContainer.classList.remove('classroom-shake'), 1200);
        }

        if (blackboard) {
            blackboard.classList.add('teacher-angry-mode');
            setTimeout(() => blackboard.classList.remove('teacher-angry-mode'), 4000);
        }

        if (missEva && missEva.el) {
            missEva.el.classList.add('is-angry');
            setTimeout(() => {
                if (missEva.el) missEva.el.classList.remove('is-angry');
            }, 4500);
        }

        this.chickens.forEach(c => {
            if (!c.isTeacher) {
                c.setFrozen(2500);
            }
        });
    }

    startLoop() {
        const loop = () => {
            const allChickens = Array.from(this.chickens.values());
            allChickens.forEach(c => {
                c.update(this.bounds, allChickens);
            });

            this.renderMinimap(allChickens);
            this.animationFrame = requestAnimationFrame(loop);
        };
        this.animationFrame = requestAnimationFrame(loop);
    }

    renderMinimap(chickens) {
        if (!this.minimapCtx || !this.minimapCanvas) return;
        const ctx = this.minimapCtx;
        const cw = this.minimapCanvas.width;
        const ch = this.minimapCanvas.height;

        ctx.clearRect(0, 0, cw, ch);

        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.fillRect(0, 0, cw, ch);

        DESK_GROUPS.forEach(g => {
            const dx = cw * g.posX;
            const dy = ch * g.posY;
            ctx.fillStyle = (g.id === 'desk_teacher') ? 'rgba(245, 158, 11, 0.6)' : (g.id === 'desk_6' ? 'rgba(56, 189, 248, 0.5)' : 'rgba(120, 53, 15, 0.45)');
            ctx.fillRect(dx - 5, dy - 3, 10, 6);
        });

        const scaleX = cw / Math.max(this.bounds.width, 100);
        const scaleY = ch / Math.max(this.bounds.height, 100);

        chickens.forEach(c => {
            const mx = (c.x + 64) * scaleX;
            const my = (c.y + 64) * scaleY;
            const radius = c.isUser ? 5 : (c.isTeacher ? 4.5 : 3);

            ctx.beginPath();
            ctx.arc(mx, my, radius, 0, Math.PI * 2);

            if (c.isUser) {
                ctx.fillStyle = '#38bdf8';
            } else if (c.isTeacher) {
                ctx.fillStyle = '#f59e0b';
            } else {
                ctx.fillStyle = (c.cut === 'fries') ? '#facc15' : (CHICKEN_FLAVORS[c.flavor]?.primaryColor || '#d97706');
            }
            ctx.fill();

            if (c.isUser) {
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            } else if (c.isTeacher) {
                ctx.strokeStyle = '#fef08a';
                ctx.lineWidth = 1.2;
                ctx.stroke();
            }
        });
    }
}
