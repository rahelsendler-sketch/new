/**
 * XI-4 KFC Chat - Avatar Data & Procedural SVG Engine
 * Menu: Paha Bawah, Paha Atas, Sayap, Dada, Kentang Goreng (Fries), & 1 Ayam Utuh (Miss Eva)
 * 11 Kelompok Meja Sebangku, Kejar-kejaran, Percik Sambel, Catatan Fisika, & Miss Eva
 */

const CHICKEN_CUTS = {
    drumstick: {
        id: 'drumstick',
        name: 'Paha Bawah (Drumstick)',
        desc: 'Potongan paha bawah KFC legendaris juicy meat dengan tepung kribo renyah keemasan.',
        shape: 'drumstick',
        icon: '🍗',
        width: 110,
        height: 120,
        defaultScale: 1.0
    },
    thigh: {
        id: 'thigh',
        name: 'Paha Atas (Thigh)',
        desc: 'Paha atas tebal gurih berbalut kulit krispi renyah warna golden brown.',
        shape: 'thigh',
        icon: '🍗',
        width: 125,
        height: 115,
        defaultScale: 1.05
    },
    wing: {
        id: 'wing',
        name: 'Sayap (Crispy Wing)',
        desc: 'Sayap ayam krispi super garing dengan bumbu meresap sempurna.',
        shape: 'wing',
        icon: '🍗',
        width: 130,
        height: 110,
        defaultScale: 0.95
    },
    breast: {
        id: 'breast',
        name: 'Dada Ayam (Keel Breast)',
        desc: 'Potongan dada ayam besar, padat daging empuk bertepung renyah gurih.',
        shape: 'breast',
        icon: '🍗',
        width: 120,
        height: 125,
        defaultScale: 1.1
    },
    fries: {
        id: 'fries',
        name: 'Kentang Goreng (French Fries)',
        desc: 'Kentang goreng crinkle krispi gurih bertabur bumbu dalam wadah merah khas KFC.',
        shape: 'fries',
        icon: '🍟',
        width: 115,
        height: 125,
        defaultScale: 1.05
    },
    whole_chicken: {
        id: 'whole_chicken',
        name: 'Ayam Utuh (Wali Kelas Miss Eva)',
        desc: '1 Ekor Ayam Utuh panggang/goreng montok berkilau emas mewah khusus Wali Kelas.',
        shape: 'whole_chicken',
        icon: '👑',
        width: 135,
        height: 135,
        defaultScale: 1.25
    }
};

const CHICKEN_FLAVORS = {
    original: {
        id: 'original',
        name: 'Golden Crispy (Original 11 Bumbu)',
        tag: 'Golden Crispy',
        primaryColor: '#e59524',
        secondaryColor: '#ca7512',
        crustColor: '#8a4b08',
        highlightColor: '#fed7aa',
        sauceGlow: 'rgba(245, 158, 11, 0.35)',
        effect: 'sparkles',
        badge: '🍗 Golden Crispy'
    },
    'splash-chili': {
        id: 'splash-chili',
        name: 'Percik Saus Sambal Pedas',
        tag: 'Percik Sambal',
        primaryColor: '#d97706',
        secondaryColor: '#b45309',
        crustColor: '#78350f',
        highlightColor: '#fde68a',
        sauceGlow: 'rgba(239, 68, 68, 0.45)',
        effect: 'chili-splash',
        badge: '🌶️ Percik Sambal'
    },
    'splash-cheese': {
        id: 'splash-cheese',
        name: 'Percik Saus Keju Lumer',
        tag: 'Percik Keju',
        primaryColor: '#e59524',
        secondaryColor: '#ca7512',
        crustColor: '#8a4b08',
        highlightColor: '#fef08a',
        sauceGlow: 'rgba(251, 191, 36, 0.45)',
        effect: 'cheese-splash',
        badge: '🧀 Percik Keju'
    },
    'splash-bbq': {
        id: 'splash-bbq',
        name: 'Percik Saus BBQ Manis Gurih',
        tag: 'Percik BBQ',
        primaryColor: '#d97706',
        secondaryColor: '#92400e',
        crustColor: '#451a03',
        highlightColor: '#fed7aa',
        sauceGlow: 'rgba(180, 83, 9, 0.4)',
        effect: 'bbq-splash',
        badge: '🍖 Percik BBQ'
    }
};

const ACCESSORIES = {
    none: { id: 'none', name: 'Tanpa Aksesoris', icon: '❌' },
    glasses_teacher: { id: 'glasses_teacher', name: 'Kacamata Guru', icon: '👓' },
    crown: { id: 'crown', name: 'Mahkota Juara Kelas', icon: '👑' },
    sunglasses: { id: 'sunglasses', name: 'Kacamata Keren', icon: '😎' },
    chef: { id: 'chef', name: 'Topi Kolonel', icon: '👨‍🍳' },
    party: { id: 'party', name: 'Topi Ultah / Pesta', icon: '🥳' },
    headband: { id: 'headband', name: 'Ikat Kepala Pejuang', icon: '🥷' },
    broom: { id: 'broom', name: 'Sapu Piket Kelas', icon: '🧹' },
    laptop: { id: 'laptop', name: 'Laptop Belajar', icon: '💻' },
    halo: { id: 'halo', name: 'Cincin Malaikat', icon: '😇' }
};

const EXPRESSIONS = {
    happy: { id: 'happy', name: 'Senyum Ceria 😊' },
    wink: { id: 'wink', name: 'Kedip Manis 😉' },
    cool: { id: 'cool', name: 'Santuy Santai 😎' },
    spicy: { id: 'spicy', name: 'Kena Percik Pedas 🥵' },
    hungry: { id: 'hungry', name: 'Ngeces Ngiler 🤤' },
    fire: { id: 'fire', name: 'Semangat Belajar 🔥' }
};

/**
 * 11 SEATING DESK GROUPS + TEACHER DESK
 */
const DESK_GROUPS = [
    {
        id: 'desk_teacher',
        number: 0,
        name: 'Meja Guru Miss Eva',
        members: ['Miss Eva (Wali Kelas)'],
        prop: '💻📚🔔',
        posX: 0.12,
        posY: 0.20
    },
    {
        id: 'desk_1',
        number: 1,
        name: 'Meja 1',
        members: ['nesi', 'palala', 'stecu'],
        prop: '📓🍟',
        posX: 0.35,
        posY: 0.28
    },
    {
        id: 'desk_2',
        number: 2,
        name: 'Meja 2',
        members: ['panpan', 'gio', 'monang'],
        prop: '✏️📖',
        posX: 0.60,
        posY: 0.26
    },
    {
        id: 'desk_3',
        number: 3,
        name: 'Meja 3',
        members: ['enidp', 'kaisar', 'jeris'],
        prop: '📄🥫',
        posX: 0.85,
        posY: 0.30
    },
    {
        id: 'desk_4',
        number: 4,
        name: 'Meja 4',
        members: ['joeng', 'marmar', 'piman'],
        prop: '📒📏',
        posX: 0.16,
        posY: 0.50
    },
    {
        id: 'desk_5',
        number: 5,
        name: 'Meja 5',
        members: ['monana', 'briant', 'dominggo'],
        prop: '🍟🥤',
        posX: 0.40,
        posY: 0.52
    },
    {
        id: 'desk_6',
        number: 6,
        name: 'Meja 6 (Meja Rahel)',
        members: ['rahel', 'niko', 'noah'],
        prop: '📚📝',
        posX: 0.65,
        posY: 0.48
    },
    {
        id: 'desk_7',
        number: 7,
        name: 'Meja 7',
        members: ['meloo', 'lepinas', 'gipan'],
        prop: '✏️🧽',
        posX: 0.88,
        posY: 0.55
    },
    {
        id: 'desk_8',
        number: 8,
        name: 'Meja 8',
        members: ['milo', 'j.agung'],
        prop: '📓🍟',
        posX: 0.20,
        posY: 0.74
    },
    {
        id: 'desk_9',
        number: 9,
        name: 'Meja 9',
        members: ['catty', 'septian', 'jejep'],
        prop: '🥫📑',
        posX: 0.45,
        posY: 0.76
    },
    {
        id: 'desk_10',
        number: 10,
        name: 'Meja 10',
        members: ['nia', 'nakula', 'ben elpekwu'],
        prop: '📚🥤',
        posX: 0.70,
        posY: 0.73
    },
    {
        id: 'desk_11',
        number: 11,
        name: 'Meja 11',
        members: ['salsa', 'geo', 'jon'],
        prop: '🍟✏️',
        posX: 0.90,
        posY: 0.77
    }
];

/**
 * Procedurally generates SVG markup for official KFC Chicken & Fries avatars
 */
function renderChickenSVG(config = {}) {
    const cutId = config.cut || 'drumstick';
    const flavorId = config.flavor || 'original';
    const accessoryId = config.accessory || 'none';
    const expressionId = config.expression || 'happy';
    const isDancing = config.isDancing || false;

    const cut = CHICKEN_CUTS[cutId] || CHICKEN_CUTS.drumstick;
    const flavor = CHICKEN_FLAVORS[flavorId] || CHICKEN_FLAVORS.original;

    const p = flavor.primaryColor;
    const s = flavor.secondaryColor;
    const c = flavor.crustColor;
    const h = flavor.highlightColor;

    let bodyShapeMarkup = '';
    let sauceOverlayMarkup = '';
    let accessoryMarkup = '';
    let expressionMarkup = '';
    let extraAura = '';

    if (flavor.effect === 'chili-splash') {
        extraAura = `
            <g class="spice-flecks">
                <circle cx="28" cy="35" r="2" fill="#ef4444" opacity="0.8"/>
                <circle cx="102" cy="40" r="1.8" fill="#dc2626" opacity="0.8"/>
                <circle cx="95" cy="85" r="2.2" fill="#ef4444" opacity="0.7"/>
            </g>
        `;
    } else if (flavor.effect === 'cheese-splash') {
        extraAura = `
            <g class="cheese-glow">
                <circle cx="25" cy="30" r="2.5" fill="#facc15" opacity="0.85"/>
                <circle cx="105" cy="35" r="2.5" fill="#fbbf24" opacity="0.85"/>
            </g>
        `;
    } else {
        extraAura = `
            <g class="sparkles-aura">
                <circle cx="22" cy="32" r="2.5" fill="#fef08a" opacity="0.8"/>
                <circle cx="106" cy="38" r="2.5" fill="#fef08a" opacity="0.8"/>
                <circle cx="32" cy="94" r="2" fill="#fed7aa" opacity="0.7"/>
            </g>
        `;
    }

    switch (cut.shape) {
        case 'drumstick':
            // Paha Bawah: Iconic bulbous drumstick meat with distinct dual bone knobs at bottom
            bodyShapeMarkup = `
                <g class="chicken-bone">
                    <path d="M42,92 L22,112 C16,118 10,110 14,104 C8,98 16,90 22,94 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2.5" stroke-linejoin="round"/>
                    <circle cx="16" cy="112" r="5" fill="#e2e8f0"/>
                    <circle cx="24" cy="116" r="4.5" fill="#f8fafc"/>
                    <rect x="22" y="94" width="22" height="14" rx="3" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" transform="rotate(-38 33 101)"/>
                </g>
                <g class="chicken-meat">
                    <!-- Distinct teardrop drumstick meat shape -->
                    <path d="M38,94 C18,78 14,38 42,18 C64,4 106,12 112,42 C118,72 96,96 70,102 C52,104 42,98 38,94 Z" 
                          fill="url(#grad_crispy_${cutId})" stroke="${c}" stroke-width="3.5" stroke-linejoin="round"/>
                    <!-- Crispy skin ridges and golden crunches -->
                    <path d="M40,32 Q54,22 68,28 Q84,20 100,32" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round" opacity="0.75"/>
                    <path d="M32,58 Q48,50 64,56 Q80,44 104,54" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round" opacity="0.75"/>
                    <path d="M42,82 Q60,74 80,82" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" opacity="0.65"/>
                    <!-- Golden Highlights -->
                    <ellipse cx="64" cy="28" rx="20" ry="7" fill="${h}" opacity="0.5" transform="rotate(-12 64 28)"/>
                    <circle cx="92" cy="38" r="3" fill="${c}"/>
                    <circle cx="42" cy="72" r="2.8" fill="${c}"/>
                    <circle cx="84" cy="78" r="3.2" fill="${c}"/>
                    <circle cx="68" cy="94" r="2.5" fill="${c}"/>
                </g>
            `;
            break;

        case 'thigh':
            // Paha Atas: Flat-ish quadrilateral meaty piece with visible bone joint edge
            bodyShapeMarkup = `
                <g class="chicken-meat">
                    <path d="M22,46 C16,22 48,12 78,14 C110,16 120,42 114,78 C108,108 78,116 44,108 C20,102 14,76 22,46 Z" 
                          fill="url(#grad_crispy_${cutId})" stroke="${c}" stroke-width="3.5" stroke-linejoin="round"/>
                    <!-- Inner thigh bone notch indicator -->
                    <path d="M26,92 C20,86 24,78 30,82 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.8"/>
                    <!-- Crispy skin ripples -->
                    <path d="M32,32 Q58,22 90,28 Q106,40 108,58" fill="none" stroke="${c}" stroke-width="3.8" stroke-linecap="round" opacity="0.75"/>
                    <path d="M28,64 Q60,54 100,66" fill="none" stroke="${c}" stroke-width="3.2" stroke-linecap="round" opacity="0.7"/>
                    <path d="M38,88 Q66,80 90,90" fill="none" stroke="${c}" stroke-width="2.8" stroke-linecap="round" opacity="0.6"/>
                    <ellipse cx="68" cy="26" rx="26" ry="9" fill="${h}" opacity="0.5"/>
                    <circle cx="32" cy="46" r="3" fill="${c}"/>
                    <circle cx="98" cy="44" r="3.2" fill="${c}"/>
                    <circle cx="58" cy="98" r="2.8" fill="${c}"/>
                </g>
            `;
            break;

        case 'wing':
            // Sayap (Crispy Wing): Distinct 2-joint V-wing shape with wingette & drumette bone tips
            bodyShapeMarkup = `
                <g class="chicken-bone">
                    <!-- Wingtip bones -->
                    <path d="M12,48 L22,34 L28,42 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
                    <path d="M110,48 L100,34 L94,42 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
                </g>
                <g class="chicken-meat">
                    <!-- Angular V-Wing Shape -->
                    <path d="M16,52 Q12,32 35,26 Q60,20 64,42 Q68,20 93,26 Q116,32 112,52 C106,78 88,106 64,106 C40,106 22,78 16,52 Z" 
                          fill="url(#grad_crispy_${cutId})" stroke="${c}" stroke-width="3.5" stroke-linejoin="round"/>
                    <!-- Wing joint cleft line -->
                    <path d="M64,42 L64,100" fill="none" stroke="${c}" stroke-width="3" stroke-dasharray="4 3" opacity="0.6"/>
                    <!-- Wing crispy fold lines -->
                    <path d="M26,44 Q44,32 58,46" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round" opacity="0.7"/>
                    <path d="M102,44 Q84,32 70,46" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round" opacity="0.7"/>
                    <path d="M32,74 Q64,62 96,74" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" opacity="0.65"/>
                    <ellipse cx="42" cy="32" rx="14" ry="6" fill="${h}" opacity="0.5" transform="rotate(-15 42 32)"/>
                    <ellipse cx="86" cy="32" rx="14" ry="6" fill="${h}" opacity="0.5" transform="rotate(15 86 32)"/>
                    <circle cx="28" cy="58" r="2.8" fill="${c}"/>
                    <circle cx="100" cy="58" r="2.8" fill="${c}"/>
                    <circle cx="64" cy="88" r="3.2" fill="${c}"/>
                </g>
            `;
            break;

        case 'breast':
            // Dada Ayam (Keel Breast): Triangular heart-shaped large breast meat with center keel bone line
            bodyShapeMarkup = `
                <g class="chicken-meat">
                    <path d="M64,14 C94,14 122,34 116,78 C110,110 86,120 64,122 C42,120 18,110 12,78 C6,34 34,14 64,14 Z" 
                          fill="url(#grad_crispy_${cutId})" stroke="${c}" stroke-width="3.8" stroke-linejoin="round"/>
                    <!-- Keel bone center ridge line -->
                    <path d="M64,20 L64,116" stroke="${c}" stroke-width="3.5" opacity="0.5" stroke-dasharray="6 4"/>
                    <path d="M22,46 Q64,30 106,46" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round" opacity="0.7"/>
                    <path d="M22,76 Q64,62 106,76" fill="none" stroke="${c}" stroke-width="3.2" stroke-linecap="round" opacity="0.7"/>
                    <path d="M34,100 Q64,90 94,100" fill="none" stroke="${c}" stroke-width="2.8" stroke-linecap="round" opacity="0.6"/>
                    <ellipse cx="64" cy="26" rx="28" ry="9" fill="${h}" opacity="0.5"/>
                    <circle cx="28" cy="62" r="3.2" fill="${c}"/>
                    <circle cx="100" cy="62" r="3.2" fill="${c}"/>
                    <circle cx="64" cy="88" r="3.5" fill="${c}"/>
                </g>
            `;
            break;

        case 'fries':
            bodyShapeMarkup = `
                <g class="kfc-fries">
                    <rect x="36" y="16" width="10" height="60" rx="4" fill="#facc15" stroke="#ca8a04" stroke-width="2" transform="rotate(-12 41 46)"/>
                    <rect x="48" y="10" width="11" height="65" rx="4" fill="#fbbf24" stroke="#d97706" stroke-width="2" transform="rotate(-4 53 42)"/>
                    <rect x="62" y="8" width="11" height="68" rx="4" fill="#f59e0b" stroke="#b45309" stroke-width="2" transform="rotate(3 67 42)"/>
                    <rect x="76" y="14" width="10" height="62" rx="4" fill="#facc15" stroke="#ca8a04" stroke-width="2" transform="rotate(10 81 45)"/>
                    <rect x="88" y="24" width="9" height="52" rx="4" fill="#fbbf24" stroke="#d97706" stroke-width="2" transform="rotate(18 92 50)"/>
                    <rect x="25" y="26" width="9" height="50" rx="4" fill="#f59e0b" stroke="#b45309" stroke-width="2" transform="rotate(-20 29 51)"/>

                    <circle cx="48" cy="22" r="1.2" fill="#78350f"/>
                    <circle cx="65" cy="18" r="1.2" fill="#78350f"/>
                    <circle cx="78" cy="26" r="1.2" fill="#78350f"/>
                    <circle cx="38" cy="30" r="1.2" fill="#78350f"/>

                    <path d="M22,54 L30,114 Q64,120 98,114 L106,54 Q64,62 22,54 Z" fill="#e11d48" stroke="#9f1239" stroke-width="3"/>
                    <path d="M30,114 Q64,120 98,114 L94,85 Q64,88 34,85 Z" fill="#be123c" opacity="0.5"/>
                    <path d="M42,60 L45,116" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>
                    <path d="M64,62 L64,117" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
                    <path d="M86,60 L83,116" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>
                    <rect x="48" y="76" width="32" height="18" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
                    <text x="64" y="89" font-family="'Outfit', sans-serif" font-size="9" font-weight="900" fill="#fbbf24" text-anchor="middle">XI-4</text>
                </g>
            `;
            break;

        case 'whole_chicken':
            bodyShapeMarkup = `
                <g class="whole-chicken-special">
                    <ellipse cx="64" cy="68" rx="46" ry="38" fill="url(#grad_crispy_whole)" stroke="#8a4b08" stroke-width="3.5"/>
                    <ellipse cx="64" cy="56" rx="30" ry="20" fill="${h}" opacity="0.35"/>
                    
                    <g transform="rotate(-25 32 75)">
                        <path d="M22,65 C12,50 18,30 32,38 C42,44 40,65 30,72 Z" fill="url(#grad_crispy_whole)" stroke="#8a4b08" stroke-width="3"/>
                        <circle cx="16" cy="35" r="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
                    </g>
                    
                    <g transform="rotate(25 96 75)">
                        <path d="M106,65 C116,50 110,30 96,38 C86,44 88,65 98,72 Z" fill="url(#grad_crispy_whole)" stroke="#8a4b08" stroke-width="3"/>
                        <circle cx="112" cy="35" r="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
                    </g>

                    <path d="M24,68 Q18,85 30,95 Q38,85 34,70" fill="url(#grad_crispy_whole)" stroke="#8a4b08" stroke-width="3"/>
                    <path d="M104,68 Q110,85 98,95 Q90,85 94,70" fill="url(#grad_crispy_whole)" stroke="#8a4b08" stroke-width="3"/>

                    <path d="M48,52 Q64,44 80,52" fill="none" stroke="#8a4b08" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
                    <path d="M42,70 Q64,62 86,70" fill="none" stroke="#8a4b08" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
                    <path d="M48,86 Q64,80 80,86" fill="none" stroke="#8a4b08" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                    <circle cx="52" cy="60" r="2" fill="#15803d" opacity="0.8"/>
                    <circle cx="76" cy="62" r="2" fill="#15803d" opacity="0.8"/>
                    <circle cx="64" cy="76" r="2.2" fill="#8a4b08"/>
                </g>
            `;
            break;
    }

    if (flavorId === 'splash-chili') {
        sauceOverlayMarkup = `
            <g class="sauce-splatter-chili" opacity="0.95">
                <path d="M42,42 Q48,34 56,40 Q62,32 72,42 Q76,52 68,54 Q58,56 46,50 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="1.2"/>
                <path d="M78,65 Q85,58 92,66 Q88,76 80,74 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="1"/>
                <circle cx="36" cy="38" r="3.2" fill="#ef4444"/>
                <circle cx="32" cy="46" r="2" fill="#dc2626"/>
                <circle cx="82" cy="36" r="3" fill="#ef4444"/>
                <circle cx="88" cy="42" r="2" fill="#dc2626"/>
                <circle cx="58" cy="80" r="3.5" fill="#ef4444"/>
                <circle cx="52" cy="88" r="2.2" fill="#dc2626"/>
                <ellipse cx="50" cy="43" rx="1.8" ry="1.2" fill="#fef08a"/>
                <ellipse cx="64" cy="45" rx="1.8" ry="1.2" fill="#fef08a"/>
                <ellipse cx="85" cy="68" rx="1.5" ry="1" fill="#fef08a"/>
            </g>
        `;
    } else if (flavorId === 'splash-cheese') {
        sauceOverlayMarkup = `
            <g class="sauce-splatter-cheese" opacity="0.95">
                <path d="M38,44 Q50,34 65,42 Q80,36 88,48 Q82,62 76,64 Q70,52 62,56 Q56,68 48,68 Q42,56 38,44 Z" 
                      fill="#fbbf24" stroke="#d97706" stroke-width="1.5"/>
                <ellipse cx="62" cy="46" rx="12" ry="4" fill="#fef08a" opacity="0.7"/>
                <circle cx="48" cy="74" r="3" fill="#f59e0b"/>
                <circle cx="48" cy="82" r="2" fill="#fbbf24"/>
                <circle cx="78" cy="70" r="2.8" fill="#f59e0b"/>
                <circle cx="30" cy="48" r="2.5" fill="#fbbf24"/>
                <circle cx="94" cy="52" r="2.5" fill="#fbbf24"/>
            </g>
        `;
    } else if (flavorId === 'splash-bbq') {
        sauceOverlayMarkup = `
            <g class="sauce-splatter-bbq" opacity="0.92">
                <path d="M40,40 Q55,32 70,42 Q82,34 90,46 Q78,56 64,52 Q50,60 40,40 Z" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
                <path d="M52,65 Q65,58 78,66 Q72,76 58,74 Z" fill="#78350f" stroke="#451a03" stroke-width="1.2"/>
                <circle cx="34" cy="42" r="2.8" fill="#78350f"/>
                <circle cx="86" cy="38" r="2.5" fill="#78350f"/>
                <circle cx="68" cy="80" r="3" fill="#78350f"/>
                <circle cx="46" cy="78" r="2" fill="#92400e"/>
                <ellipse cx="62" cy="44" rx="8" ry="2.5" fill="#fed7aa" opacity="0.35"/>
            </g>
        `;
    }

    let faceYOffset = 0;
    if (cut.shape === 'fries') faceYOffset = 18;
    if (cut.shape === 'whole_chicken') faceYOffset = -2;

    switch (expressionId) {
        case 'happy':
            expressionMarkup = `
                <g class="chicken-face" transform="translate(0, ${faceYOffset})">
                    <circle cx="50" cy="55" r="4.5" fill="#1e293b"/>
                    <circle cx="48.5" cy="53.5" r="1.5" fill="#ffffff"/>
                    <circle cx="74" cy="55" r="4.5" fill="#1e293b"/>
                    <circle cx="72.5" cy="53.5" r="1.5" fill="#ffffff"/>
                    <ellipse cx="43" cy="61" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6"/>
                    <ellipse cx="81" cy="61" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6"/>
                    <path d="M57,60 Q62,67 67,60" fill="none" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round"/>
                </g>
            `;
            break;

        case 'wink':
            expressionMarkup = `
                <g class="chicken-face" transform="translate(0, ${faceYOffset})">
                    <path d="M46,55 Q51,49 56,55" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>
                    <circle cx="74" cy="54" r="4.5" fill="#1e293b"/>
                    <circle cx="72.5" cy="52.5" r="1.5" fill="#ffffff"/>
                    <ellipse cx="43" cy="61" rx="4" ry="2.5" fill="#f43f5e" opacity="0.65"/>
                    <ellipse cx="81" cy="61" rx="4" ry="2.5" fill="#f43f5e" opacity="0.65"/>
                    <path d="M58,59 Q62,67 68,59 Z" fill="#f43f5e" stroke="#1e293b" stroke-width="1.8"/>
                </g>
            `;
            break;

        case 'cool':
            expressionMarkup = `
                <g class="chicken-face" transform="translate(0, ${faceYOffset})">
                    <path d="M55,62 Q64,66 72,59" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
                    <circle cx="50" cy="54" r="4" fill="#1e293b"/>
                    <circle cx="49" cy="53" r="1.2" fill="#ffffff"/>
                    <circle cx="74" cy="54" r="4" fill="#1e293b"/>
                    <circle cx="73" cy="53" r="1.2" fill="#ffffff"/>
                </g>
            `;
            break;

        case 'spicy':
            expressionMarkup = `
                <g class="chicken-face" transform="translate(0, ${faceYOffset})">
                    <path d="M46,52 L54,56 L46,60" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
                    <path d="M78,52 L70,56 L78,60" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
                    <path d="M83,45 Q87,50 83,54 Q80,50 83,45 Z" fill="#38bdf8"/>
                    <ellipse cx="62" cy="64" rx="7" ry="6" fill="#7f1d1d" stroke="#1e293b" stroke-width="1.8"/>
                    <path d="M59,65 Q62,61 65,65 Q62,70 59,65 Z" fill="#ef4444"/>
                    <ellipse cx="42" cy="62" rx="5" ry="3" fill="#ef4444" opacity="0.8"/>
                    <ellipse cx="82" cy="62" rx="5" ry="3" fill="#ef4444" opacity="0.8"/>
                </g>
            `;
            break;

        case 'hungry':
            expressionMarkup = `
                <g class="chicken-face" transform="translate(0, ${faceYOffset})">
                    <circle cx="50" cy="54" r="6" fill="#1e293b"/>
                    <circle cx="48" cy="52" r="2.5" fill="#ffffff"/>
                    <circle cx="53" cy="56" r="1.2" fill="#ffffff"/>
                    <circle cx="74" cy="54" r="6" fill="#1e293b"/>
                    <circle cx="72" cy="52" r="2.5" fill="#ffffff"/>
                    <circle cx="77" cy="56" r="1.2" fill="#ffffff"/>
                    <path d="M57,62 Q62,70 67,62" fill="none" stroke="#1e293b" stroke-width="2"/>
                    <path d="M66,64 Q68,72 65,74 Q63,72 65,64 Z" fill="#38bdf8" opacity="0.85"/>
                    <ellipse cx="42" cy="62" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6"/>
                    <ellipse cx="82" cy="62" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6"/>
                </g>
            `;
            break;

        case 'fire':
            expressionMarkup = `
                <g class="chicken-face" transform="translate(0, ${faceYOffset})">
                    <path d="M47,58 Q50,48 54,58 Q50,62 47,58 Z" fill="#f97316" stroke="#ea580c" stroke-width="1"/>
                    <circle cx="51" cy="56" r="1.5" fill="#fef08a"/>
                    <path d="M70,58 Q73,48 77,58 Q73,62 70,58 Z" fill="#f97316" stroke="#ea580c" stroke-width="1"/>
                    <circle cx="74" cy="56" r="1.5" fill="#fef08a"/>
                    <path d="M45,49 L55,53" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
                    <path d="M79,49 L69,53" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
                    <path d="M56,65 Q62,69 68,65" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
                </g>
            `;
            break;
    }

    let accYOffset = faceYOffset;

    switch (accessoryId) {
        case 'glasses_teacher':
            accessoryMarkup = `
                <g class="chicken-accessory teacher-glasses" transform="translate(0, ${accYOffset + 2})">
                    <circle cx="50" cy="54" r="10" fill="rgba(255,255,255,0.2)" stroke="#e11d48" stroke-width="2.5"/>
                    <circle cx="74" cy="54" r="10" fill="rgba(255,255,255,0.2)" stroke="#e11d48" stroke-width="2.5"/>
                    <path d="M60,54 L64,54" stroke="#e11d48" stroke-width="3"/>
                    <path d="M40,52 L34,50" stroke="#e11d48" stroke-width="2" stroke-linecap="round"/>
                    <path d="M84,52 L90,50" stroke="#e11d48" stroke-width="2" stroke-linecap="round"/>
                    <ellipse cx="48" cy="50" rx="3" ry="1.5" fill="#ffffff" opacity="0.8"/>
                    <ellipse cx="72" cy="50" rx="3" ry="1.5" fill="#ffffff" opacity="0.8"/>
                </g>
            `;
            break;

        case 'crown':
            accessoryMarkup = `
                <g class="chicken-accessory" transform="translate(0, ${cut.shape === 'fries' ? 2 : -5})">
                    <path d="M46,24 L52,10 L62,18 L72,10 L78,24 Z" fill="#f59e0b" stroke="#b45309" stroke-width="2" stroke-linejoin="round"/>
                    <circle cx="52" cy="10" r="2" fill="#ef4444"/>
                    <circle cx="62" cy="18" r="2" fill="#3b82f6"/>
                    <circle cx="72" cy="10" r="2" fill="#10b981"/>
                    <rect x="47" y="22" width="30" height="3" fill="#d97706"/>
                </g>
            `;
            break;

        case 'sunglasses':
            accessoryMarkup = `
                <g class="chicken-accessory" transform="translate(0, ${accYOffset})">
                    <path d="M40,50 L60,50 L58,62 L42,62 Z" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
                    <path d="M64,50 L84,50 L82,62 L66,62 Z" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
                    <path d="M58,52 L66,52" stroke="#0f172a" stroke-width="2.5"/>
                    <path d="M44,52 L48,60" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M68,52 L72,60" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round"/>
                </g>
            `;
            break;

        case 'chef':
            accessoryMarkup = `
                <g class="chicken-accessory" transform="translate(0, ${cut.shape === 'fries' ? 0 : -8})">
                    <path d="M45,26 C38,15 48,2 62,5 C76,2 86,15 79,26 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
                    <rect x="47" y="24" width="30" height="7" rx="2" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
                    <rect x="48" y="27" width="28" height="2.5" fill="#dc2626"/>
                </g>
            `;
            break;

        case 'party':
            accessoryMarkup = `
                <g class="chicken-accessory" transform="translate(0, ${cut.shape === 'fries' ? 2 : -6})">
                    <path d="M50,26 L62,5 L74,26 Z" fill="#8b5cf6" stroke="#6d28d9" stroke-width="2"/>
                    <circle cx="62" cy="4" r="3.5" fill="#ec4899"/>
                    <path d="M54,20 L70,20" stroke="#facc15" stroke-width="2"/>
                    <path d="M58,13 L66,13" stroke="#06b6d4" stroke-width="2"/>
                </g>
            `;
            break;

        case 'headband':
            accessoryMarkup = `
                <g class="chicken-accessory" transform="translate(0, ${accYOffset})">
                    <rect x="36" y="44" width="52" height="6" rx="2" fill="#dc2626" stroke="#991b1b" stroke-width="1.2"/>
                    <circle cx="62" cy="47" r="2.5" fill="#ffffff"/>
                    <path d="M86,47 L95,44 L92,53 Z" fill="#dc2626"/>
                    <path d="M86,49 L94,56 L89,58 Z" fill="#b91c1c"/>
                </g>
            `;
            break;

        case 'broom':
            accessoryMarkup = `
                <g class="chicken-accessory" transform="translate(10, ${accYOffset + 12})">
                    <rect x="75" y="20" width="4" height="60" fill="#92400e" rx="1.5"/>
                    <path d="M68,75 L86,75 L92,105 L62,105 Z" fill="#facc15" stroke="#ca8a04" stroke-width="1.5"/>
                    <path d="M65,85 L89,85" stroke="#b45309" stroke-width="2"/>
                </g>
            `;
            break;

        case 'laptop':
            accessoryMarkup = `
                <g class="chicken-accessory" transform="translate(0, ${accYOffset + 24})">
                    <rect x="42" y="70" width="44" height="26" rx="3" fill="#334155" stroke="#1e293b" stroke-width="1.5"/>
                    <path d="M36,96 L92,96 L88,102 L40,102 Z" fill="#64748b" stroke="#334155" stroke-width="1"/>
                    <circle cx="64" cy="83" r="3" fill="#38bdf8"/>
                </g>
            `;
            break;

        case 'halo':
            accessoryMarkup = `
                <g class="chicken-accessory" transform="translate(0, ${cut.shape === 'fries' ? 2 : 0})">
                    <ellipse cx="62" cy="14" rx="22" ry="6" fill="none" stroke="#facc15" stroke-width="3" opacity="0.9"/>
                    <ellipse cx="62" cy="14" rx="22" ry="6" fill="none" stroke="#fef08a" stroke-width="1" opacity="0.8"/>
                </g>
            `;
            break;
    }

    return `
        <svg viewBox="0 0 128 128" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="chicken-svg ${isDancing ? 'dancing' : ''}">
            <defs>
                <linearGradient id="grad_crispy_${cutId}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#f59e0b" />
                    <stop offset="50%" stop-color="#d97706" />
                    <stop offset="100%" stop-color="#b45309" />
                </linearGradient>
                <linearGradient id="grad_crispy_whole" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fbbf24" />
                    <stop offset="45%" stop-color="#d97706" />
                    <stop offset="100%" stop-color="#8a4b08" />
                </linearGradient>
                <filter id="flavor-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="${flavor.sauceGlow}"/>
                </filter>
            </defs>

            <ellipse cx="64" cy="118" rx="34" ry="7" fill="rgba(0,0,0,0.25)" class="chicken-ground-shadow"/>

            <g filter="url(#flavor-glow)">
                ${extraAura}
                ${bodyShapeMarkup}
                ${sauceOverlayMarkup}
                ${expressionMarkup}
                ${accessoryMarkup}
            </g>
        </svg>
    `;
}

/**
 * EXACT 33 ROSTER (Miss Eva + 32 students in 11 Desk Groups)
 */
const BOT_NAMES_AND_PROFILES = [
    // Teacher
    { 
        name: 'Miss Eva (Wali Kelas)', 
        cut: 'whole_chicken', 
        flavor: 'original', 
        accessory: 'glasses_teacher', 
        expression: 'happy', 
        status: '👩‍🏫 Wali Kelas XI-4 (Ayam Utuh)',
        deskId: 'desk_teacher',
        isTeacher: true 
    },
    // Meja 1: nesi, palala, stecu
    { name: 'nesi', cut: 'drumstick', flavor: 'original', accessory: 'party', expression: 'happy', status: '🍗 Meja 1 • Paha Bawah', deskId: 'desk_1' },
    { name: 'palala', cut: 'drumstick', flavor: 'original', accessory: 'halo', expression: 'wink', status: '🍗 Meja 1 • Paha Bawah', deskId: 'desk_1' },
    { name: 'stecu', cut: 'breast', flavor: 'original', accessory: 'none', expression: 'cool', status: '🍗 Meja 1 • Dada Ayam', deskId: 'desk_1' },

    // Meja 2: panpan, gio, monang
    { name: 'panpan', cut: 'fries', flavor: 'splash-cheese', accessory: 'crown', expression: 'hungry', status: '🍟 Meja 2 • Kentang Keju', deskId: 'desk_2' },
    { name: 'gio', cut: 'drumstick', flavor: 'splash-bbq', accessory: 'sunglasses', expression: 'cool', status: '🍖 Meja 2 • Paha BBQ', deskId: 'desk_2' },
    { name: 'monang', cut: 'breast', flavor: 'original', accessory: 'headband', expression: 'fire', status: '💪 Meja 2 • Dada Ayam', deskId: 'desk_2' },

    // Meja 3: enidp, kaisar, jeris
    { name: 'enidp', cut: 'drumstick', flavor: 'splash-cheese', accessory: 'crown', expression: 'hungry', status: '🧀 Meja 3 • Paha Keju', deskId: 'desk_3' },
    { name: 'kaisar', cut: 'drumstick', flavor: 'splash-chili', accessory: 'crown', expression: 'fire', status: '👑 Meja 3 • Paha Pedas', deskId: 'desk_3' },
    { name: 'jeris', cut: 'breast', flavor: 'splash-chili', accessory: 'headband', expression: 'fire', status: '🌶️ Meja 3 • Dada Sambal', deskId: 'desk_3' },

    // Meja 4: joeng, marmar, piman
    { name: 'joeng', cut: 'wing', flavor: 'original', accessory: 'none', expression: 'happy', status: '🍗 Meja 4 • Sayap Krispi', deskId: 'desk_4' },
    { name: 'marmar', cut: 'fries', flavor: 'splash-cheese', accessory: 'party', expression: 'happy', status: '🧀 Meja 4 • Kentang Keju', deskId: 'desk_4' },
    { name: 'piman', cut: 'fries', flavor: 'original', accessory: 'sunglasses', expression: 'cool', status: '🍟 Meja 4 • Kentang Gurih', deskId: 'desk_4' },

    // Meja 5: monana, briant, dominggo
    { name: 'monana', cut: 'wing', flavor: 'splash-cheese', accessory: 'party', expression: 'hungry', status: '🧀 Meja 5 • Sayap Keju', deskId: 'desk_5' },
    { name: 'briant', cut: 'thigh', flavor: 'splash-chili', accessory: 'sunglasses', expression: 'cool', status: '🌶️ Meja 5 • Paha Sambal', deskId: 'desk_5' },
    { name: 'dominggo', cut: 'breast', flavor: 'original', accessory: 'headband', expression: 'fire', status: '💪 Meja 5 • Dada Crispy', deskId: 'desk_5' },

    // Meja 6: rahel (User), niko, noah
    { name: 'rahel', cut: 'thigh', flavor: 'splash-chili', accessory: 'crown', expression: 'spicy', status: '🌶️ Meja 6 • Paha Atas Sambal', deskId: 'desk_6' },
    { name: 'niko', cut: 'wing', flavor: 'splash-chili', accessory: 'sunglasses', expression: 'cool', status: '🌶️ Meja 6 • Sayap Pedas', deskId: 'desk_6' },
    { name: 'noah', cut: 'breast', flavor: 'splash-bbq', accessory: 'chef', expression: 'happy', status: '🍖 Meja 6 • Dada BBQ', deskId: 'desk_6' },

    // Meja 7: meloo, lepinas, gipan
    { name: 'meloo', cut: 'thigh', flavor: 'original', accessory: 'halo', expression: 'wink', status: '🍗 Meja 7 • Paha Lembut', deskId: 'desk_7' },
    { name: 'lepinas', cut: 'thigh', flavor: 'original', accessory: 'halo', expression: 'happy', status: '🍗 Meja 7 • Paha Renyah', deskId: 'desk_7' },
    { name: 'gipan', cut: 'drumstick', flavor: 'splash-bbq', accessory: 'chef', expression: 'happy', status: '🍖 Meja 7 • Paha BBQ', deskId: 'desk_7' },

    // Meja 8: milo, j.agung
    { name: 'milo', cut: 'wing', flavor: 'splash-bbq', accessory: 'sunglasses', expression: 'cool', status: '🍖 Meja 8 • Sayap BBQ', deskId: 'desk_8' },
    { name: 'j.agung', cut: 'breast', flavor: 'splash-chili', accessory: 'crown', expression: 'cool', status: '🌶️ Meja 8 • Dada Sambal', deskId: 'desk_8' },

    // Meja 9: catty, septian, jejep
    { name: 'catty', cut: 'wing', flavor: 'splash-cheese', accessory: 'crown', expression: 'wink', status: '🧀 Meja 9 • Sayap Keju', deskId: 'desk_9' },
    { name: 'septian', cut: 'drumstick', flavor: 'splash-bbq', accessory: 'headband', expression: 'fire', status: '🍖 Meja 9 • Paha BBQ', deskId: 'desk_9' },
    { name: 'jejep', cut: 'drumstick', flavor: 'splash-cheese', accessory: 'sunglasses', expression: 'wink', status: '🧀 Meja 9 • Paha Keju', deskId: 'desk_9' },

    // Meja 10: nia, nakula, ben elpekwu
    { name: 'nia', cut: 'thigh', flavor: 'splash-cheese', accessory: 'party', expression: 'happy', status: '🧀 Meja 10 • Paha Keju', deskId: 'desk_10' },
    { name: 'nakula', cut: 'fries', flavor: 'splash-chili', accessory: 'headband', expression: 'spicy', status: '🍟 Meja 10 • Kentang Pedas', deskId: 'desk_10' },
    { name: 'ben elpekwu', cut: 'fries', flavor: 'original', accessory: 'crown', expression: 'cool', status: '🍟 Meja 10 • Kentang Sultan', deskId: 'desk_10' },

    // Meja 11: salsa, geo, jon
    { name: 'salsa', cut: 'wing', flavor: 'splash-cheese', accessory: 'party', expression: 'happy', status: '🧀 Meja 11 • Sayap Keju', deskId: 'desk_11' },
    { name: 'geo', cut: 'fries', flavor: 'splash-chili', accessory: 'sunglasses', expression: 'cool', status: '🍟 Meja 11 • Kentang Sambal', deskId: 'desk_11' },
    { name: 'jon', cut: 'thigh', flavor: 'splash-bbq', accessory: 'chef', expression: 'cool', status: '🍖 Meja 11 • Paha BBQ', deskId: 'desk_11' }
];

/**
 * Clean & Contextual Chat Lines (Separated between Teacher, Desks, and General)
 */
const TEACHER_CHAT_PHRASES = [
    "Anak-anak XI-4! Siapa yang lempar saos sambal dan lari-larian di kelas?! 👩‍🏫💢",
    "Meja 6 (Rahel, Niko, Noah), selesaikan soal nomor 4 di papan tulis sekarang! 👩‍🏫📝",
    "Waktu istirahat hampir habis, rapikan meja kalian dan buka buku fisika! 🔔",
    "Jangan ada yang nyontek catatan fisika teman sebangku ya! 📚👩‍🏫",
    "Siapa itu yang makan kentang pas saya lagi nulis rumus di papan tulis?! 👩‍🏫🍟",
    "Yang masih kejar-kejaran nilainya saya kurangi 20 poin! 👩‍🏫📏"
];

const DESK_SPECIFIC_PHRASES = {
    desk_1: [
        "Palala, Stecu, mau contek rumus gerak parabola gak? 📐✨",
        "Ayam krispi gue jangan dicolong ya Stecu! 🍗😤",
        "Bagi kentang goreng satu stik dong Palala! 🍟🤤",
        "Woy Nesi, habis pulang sekolah mabar Roblox yuk! 🎮✨",
        "Minta rengginang dong dari kaleng Khong Guan Meja 1! 🍘😋"
    ],
    desk_2: [
        "Gio, Monang, kejar gue sini kalau berani ambil kentang gue! 🍟🏃‍♂️",
        "Woy Panpan jangan lari nabrak meja guru! 🏃‍♂️💨",
        "Saus keju di kentang ini lumer banget parah! 🧀🤤",
        "Siapa yang bawa rengginang renyah ke kelas?! Bagi dong Panpan! 🍘✨",
        "Gas mabar Roblox Tower of Hell nanti sore jam 4! 🎮🏃‍♂️"
    ],
    desk_3: [
        "Kaisar, Jeris, bagi contekan rumus nomor 3 dong! 📓👀",
        "Percikan saos sambal di paha ayam gue pedas abis! 🌶️🥵",
        "Sttt jangan ribut, nanti Miss Eva noleh ke Meja 3! 🤫",
        "Kaisar, ntar malem mabar ML / Roblox gas gak? 🎮⚡",
        "Nih rengginang gurih kriuk buat amunisi ngerjain fisika! 🍘📚"
    ],
    desk_4: [
        "Marmar, Piman, penggaris gue jangan dipinjam buat mukul meja! 📏😂",
        "Kentang krispi KFC emang juara banget di Meja 4! 🍟✨",
        "Joeng, pinjam penghapus dong, rumus gue salah hitung! 🧽",
        "Woy Joeng, mabar Roblox Brookhaven habis piket yuk! 🎮🏠",
        "Rengginang Meja 4 garing banget parah wkwk! 🍘✨"
    ],
    desk_5: [
        "Briant, Dominggo, minta saus BBQ nya dong! 🍖😋",
        "Paha sambal ini pedasnya nampol sampe ubun-ubun! 🌶️🥵",
        "Monana, liat jawaban fisika nomor 6 dong! 📚",
        "Mabar Roblox Bedwars nanti malem ramean se-XI-4 yuk! 🎮⚔️",
        "Rengginang emang temen terbaik sambil makan ayam KFC! 🍘🍗"
    ],
    desk_6: [
        "Niko, Noah! Catatan fisika bab GLBB jangan disembunyiin! 📓👀",
        "Rahel, minta kentang gorengnya satu stik dong yang kena keju! 🍟🧀",
        "Awas Rahel, sambel gue mau kena paha ayam lu tuh wkwk! 🌶️🤣",
        "Sttt jangan ribut, Miss Eva lagi ngeliatin Meja 6! 🤫👩‍🏫",
        "Rahel, Niko, Noah! Habis bel langsung login mabar Roblox gas! 🎮🚀",
        "Woy Rahel, bagi rengginang renyah di meja lu dong! 🍘😋"
    ],
    desk_7: [
        "Lepinas, Gipan, rumus gaya gesek dan percepatan apa ya? 📚",
        "Paha atas KFC lembut banget, dagingnya super juicy! 🍗😋",
        "Meloo, pinjam pensil dong, pensil gue jatuh ke kolong meja! ✏️",
        "Gipan, mabar Roblox Blox Fruits ntar malem bareng gue! 🎮⚔️",
        "Siapa yang bawa rengginang toples di Meja 7 nih? 🍘🔥"
    ],
    desk_8: [
        "J.agung, liat nomor 5 dong, jawabannya apa? 📝",
        "Sayap BBQ ini kriuknya kedengeran sampe ruang guru! 🍖🤫",
        "Milo, jangan makan ayam pas guru nerangin wkwk! 🍗",
        "J.agung, ajak mabar Roblox sekelas XI-4 dong di grup! 🎮📢",
        "Rengginang Meja 8 rasanya gurih renyah kayak ayam KFC! 🍘🍗"
    ],
    desk_9: [
        "Septian, Jejep, saos keju lumer di sayap ini enak banget! 🧀✨",
        "Jangan senggol-senggol meja woy, lagi nulis rumus fisika! 📐✏️",
        "Catty, bagi kentang goreng KFC dong! 🍟😋",
        "Jejep, ntar malem mabar Roblox / ML ya jangan lupa! 🎮💥",
        "Bagi rengginang dong Septian, laper nih pas jam fisika! 🍘🤤"
    ],
    desk_10: [
        "Nakula, Ben, kentang goreng KFC jangan dipalak ya! 🍟😤",
        "Pedasnya sambal korek nendang banget kayak ulangan fisika! 🌶️⚡",
        "Nia, contek rumus gerak parabola dong! 📐",
        "Ben, mabar Roblox sama anak-anak XI-4 jam 7 malam ya! 🎮✨",
        "Nia, rengginang di laci lu masih ada gak? Bagi satu! 🍘😋"
    ],
    desk_11: [
        "Geo, Jon, habis bel kita kejar-kejaran yuk! 🏃‍♂️💨",
        "Bagi saus sambal sachet satu dong Jon! 🥫🌶️",
        "Salsa, pinjam penggaris fisika dong! 📏",
        "Ajak mabar Roblox se-XI-4 habis pulang sekolah yuk! 🎮🚀",
        "Salsa, rengginang gurih Meja 11 abis dipatok wkwk! 🍘🤣"
    ]
};

const GENERAL_STUDENT_PHRASES = [
    "Ada yang bawa saos sachet lebih gak di mejanya? 🥫",
    "Udah selesai ngerjain tugas fisika bab GLBB belom gengs? 📚",
    "Kriuk kulit krispi ini gurih banget, renyah abis! 🍗💥",
    "Satu kelas wangi ayam goreng sama kentang KFC! 🍟🍗✨",
    "Siapa yang bawa rengginang renyah ke kelas?! Bagi dong se-XI-4! 🍘✨",
    "Gengs, ntar malem mabar Roblox se-XI-4 rame-rame gas! 🎮🚀",
    "Ayo beresin kursi dulu biar kelas XI-4 rapi! 🧹🪑",
    "Jangan lupa piket kelas XI-4 hari ini ya! 🧹🪣"
];
