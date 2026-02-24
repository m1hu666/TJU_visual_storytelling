import { CFG, THEMES } from './data/time_config.js';
import { timelineData } from './data/time_events.js';
import { getRiverSpine, project } from './modules/utils.js';
import { initDynamicMap, updateMapHighlight } from './modules/map.js';
import { updateUI, initDraggableMenu, initDraggableMap, menuAction } from './modules/ui.js';
import { drawNode } from './modules/renderer.js';
import { state } from './modules/state.js';

// Global variables for canvas contexts
const cvs = {
    bg: document.getElementById('bg-layer').getContext('2d'),
    fx: document.getElementById('fx-layer').getContext('2d'),
    main: document.getElementById('main-layer').getContext('2d')
};

let W, H;
const nodes = [];
const river = [];
const stars = [];

// Initialize derived constants
const startYear = timelineData[0].year;
const totalZ = (timelineData[timelineData.length - 1].year - startYear) * CFG.pixelsPerYear;

function resize() {
    W = window.innerWidth; H = window.innerHeight;
    [cvs.bg.canvas, cvs.fx.canvas, cvs.main.canvas].forEach(c => { c.width = W; c.height = H; });
}

function init() {
    resize();
    initDraggableMenu();
    initDraggableMap(); 
    initDynamicMap(); 
    
    // Initialize Particles
    for(let i=0; i<CFG.particleCount; i++) {
        river.push({
            z: Math.random() * CFG.viewDepth * 2, 
            xOff: (Math.random()-0.5) * CFG.riverWidth * (Math.random() + 0.1), 
            yOff: (Math.random()-0.5) * 60,
            size: Math.random() * 2 + 0.5,
            speed: Math.random() * 0.5 + 0.2,
            phase: Math.random() * Math.PI * 2
        });
    }

    // Initialize Nodes
    timelineData.forEach((d, i) => {
        nodes.push({
            ...d,
            z: (d.year - startYear) * CFG.pixelsPerYear,
            rings: [
                { r: 1.0, speed: 0.02, angle: Math.random()*6 },
                { r: 0.7, speed: -0.03, angle: Math.random()*6 },
                { r: 1.4, speed: 0.01, angle: Math.random()*6 }
            ]
        });
    });

    // Initialize Stars
    for(let i=0; i<300; i++) {
        stars.push({
            x: (Math.random()-0.5) * W * 3,
            y: (Math.random()-0.5) * H * 3,
            z: Math.random() * 3000,
            sz: Math.random() * 2
        });
    }

    // Start Loop
    requestAnimationFrame(render);
}

function render() {
    state.globalTime += 0.05;
    state.cameraZ += (state.targetCameraZ - state.cameraZ) * CFG.camSpeed;

    const currentYear = Math.round(startYear + state.cameraZ / CFG.pixelsPerYear);
    const yearDisplay = document.getElementById('year-display');
    if(yearDisplay) yearDisplay.innerText = `CURRENT YEAR: ${currentYear}`;

    const progress = Math.max(0, Math.min(1, state.cameraZ / totalZ));
    const percent = progress * 100;
    const progressBar = document.getElementById('timeline-progress-bar');
    const indicator = document.getElementById('timeline-indicator');
    if (progressBar) progressBar.style.height = percent + '%';
    if (indicator) indicator.style.bottom = percent + '%';

    let nearestNode = null;
    let minDiff = Infinity;
    nodes.forEach(n => {
        const diff = Math.abs(n.z - state.cameraZ);
        if(diff < minDiff) { minDiff = diff; nearestNode = n; }
    });
    
    const label = document.getElementById('timeline-event-label');
    if(label && nearestNode) {
        label.innerText = `${nearestNode.year} ${nearestNode.title}`;
        label.style.opacity = Math.max(0.3, 1 - minDiff / 1000);
    }
    
    // Sync Map Highlighting based on nearest timeline node
    if (nearestNode && state.mapActive) {
        updateMapHighlight(nearestNode.location);
    }

    // Clear Canvas
    cvs.bg.fillStyle = 'rgba(0,0,0,0.6)'; cvs.bg.fillRect(0,0,W,H);
    cvs.fx.clearRect(0,0,W,H); cvs.main.clearRect(0,0,W,H);

    // Draw Stars
    cvs.bg.fillStyle = '#fff';
    stars.forEach(s => {
        s.z -= CFG.starSpeed;
        if (s.z < 1) s.z += 3000; if (s.z > 3000) s.z -= 3000;
        const p = project(s.x, s.y, s.z + state.cameraZ, state.cameraZ, state.mouse, W, H);
        if (p) {
            cvs.bg.beginPath(); cvs.bg.moveTo(p.x, p.y);
            cvs.bg.lineTo(p.x - (p.x-W/2)*0.05, p.y - (p.y-H/2)*0.05);
            cvs.bg.strokeStyle = `rgba(255,255,255,${Math.min(1, p.s)})`;
            cvs.bg.lineWidth = s.sz * p.s; cvs.bg.stroke();
        }
    });

    // Draw River
    cvs.main.globalCompositeOperation = 'lighter';
    river.forEach(p => {
        if (p.z < state.cameraZ - 500) p.z += CFG.viewDepth;
        if (p.z > state.cameraZ + CFG.viewDepth - 500) p.z -= CFG.viewDepth;
        const spine = getRiverSpine(p.z);
        const wave = Math.sin(state.globalTime * p.speed * 0.1 + p.phase) * 20;
        const x = spine.x + p.xOff + wave;
        const y = spine.y + p.yOff;
        const proj = project(x, y, p.z, state.cameraZ, state.mouse, W, H);

        if (proj) {
            let hue = THEMES.tju.h;
            if (p.z < 7000) hue = THEMES.peiyang.h;
            else if (p.z < 12000) hue = THEMES.chaos.h;
            else if (p.z > totalZ + 2000) hue = THEMES.future.h;
            const alpha = Math.min(1, proj.d / 4000) * 0.5;
            cvs.main.fillStyle = `hsla(${hue}, 80%, 60%, ${alpha})`;
            cvs.main.beginPath();
            cvs.main.ellipse(proj.x, proj.y, p.size*proj.s*2, p.size*proj.s, 0, 0, Math.PI*2);
            cvs.main.fill();
        }
    });
    cvs.main.globalCompositeOperation = 'source-over';

    // Draw Nodes
    const renderNodes = nodes.map(n => {
        const spine = getRiverSpine(n.z);
        const nY = spine.y - 180; 
        return { ...n, p: project(spine.x, nY, n.z, state.cameraZ, state.mouse, W, H), spineP: project(spine.x, spine.y, n.z, state.cameraZ, state.mouse, W, H), rawY: nY, rawX: spine.x };
    }).filter(n => n.p).sort((a,b) => b.p.d - a.p.d);

    let activeNode = null;
    renderNodes.forEach(n => {
        const p = n.p; const theme = THEMES[n.era]; const size = 35 * p.s;
        const dx = state.mouse.x - p.x; const dy = state.mouse.y - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const isHover = dist < size * 1.5;
        if(isHover) activeNode = n;

        if (n.spineP) {
            const sp = n.spineP;
            cvs.fx.save(); cvs.fx.globalCompositeOperation = 'lighter';
            cvs.fx.beginPath(); cvs.fx.moveTo(p.x, p.y); cvs.fx.lineTo(sp.x, sp.y);
            cvs.fx.strokeStyle = `rgba(${theme.rgb}, ${isHover ? 0.8 : 0.2})`;
            cvs.fx.lineWidth = (isHover ? 4 : 1) * p.s; cvs.fx.stroke();
            cvs.fx.fillStyle = theme.hex; cvs.fx.beginPath();
            cvs.fx.arc(sp.x, sp.y, (isHover?10:5)*p.s, 0, Math.PI*2); cvs.fx.fill();
            cvs.fx.restore();
        }
        drawNode(cvs.main, p, size, theme, n.rings, isHover, n.year);
    });

    if (activeNode) {
        if (state.hideTimer) { clearTimeout(state.hideTimer); state.hideTimer = null; }
        updateUI(activeNode);
    } else if (state.isHoveringCard) {
        if (state.hideTimer) { clearTimeout(state.hideTimer); state.hideTimer = null; }
    } else {
        const card = document.getElementById('holo-card');
        if (card.classList.contains('active') && !state.hideTimer) {
            state.hideTimer = setTimeout(() => { updateUI(null); state.hideTimer = null; }, 300);
        }
    }
    requestAnimationFrame(render);
}

function warpJump() {
    const nextNode = nodes.find(n => n.z > state.cameraZ + 100);
    if (nextNode) {
        state.targetCameraZ = nextNode.z;
        document.body.style.filter = 'brightness(1.5) blur(2px)';
        setTimeout(() => { document.body.style.filter = 'none'; }, 200);
    } else {
        state.targetCameraZ = 0;
        document.body.style.filter = 'invert(1)';
        setTimeout(() => { document.body.style.filter = 'none'; }, 600);
    }
}

// Event Listeners
window.addEventListener('resize', resize);
window.addEventListener('mousemove', e => {
    state.mouse.x = e.clientX; state.mouse.y = e.clientY;
    state.mouse.rx = (e.clientX/W)*2-1; state.mouse.ry = (e.clientY/H)*2-1;
    const cursor = document.getElementById('cursor');
    cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px';
});

window.addEventListener('mousedown', (e) => {
    if(document.getElementById('menu-trigger').contains(e.target)) return;
    if(document.querySelector('.sub-btn:hover')) return;
    if(document.getElementById('geo-overlay')?.contains(e.target)) return; 
    document.getElementById('cursor').classList.add('active');
    state.targetCameraZ += 300;
});
window.addEventListener('mouseup', () => {
    document.getElementById('cursor').classList.remove('active');
});

window.addEventListener('wheel', e => { state.targetCameraZ += e.deltaY * 5; });

const cardEl = document.getElementById('holo-card');
cardEl.addEventListener('mouseenter', () => state.isHoveringCard = true);
cardEl.addEventListener('mouseleave', () => state.isHoveringCard = false);

// Expose functions to window for HTML inline calls
window.menuAction = menuAction;
window.warpJump = warpJump;

// Start
init();
