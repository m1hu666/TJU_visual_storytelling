import { THEMES } from '../data/time_config.js';
import { state } from './state.js';

export function updateUI(node) {
    const card = document.getElementById('holo-card');
    const cursor = document.getElementById('cursor');
    const btn = document.getElementById('c-detail-btn');
    const mapContainer = document.getElementById('c-map-container');
    
    if (node) {
        if (state.activeTitle !== node.title) {
            const theme = THEMES[node.era];
            document.getElementById('c-year-bg').innerText = node.year;
            document.getElementById('c-era').innerText = node.era.toUpperCase();
            document.getElementById('c-era').style.color = theme.hex;
            document.getElementById('c-title').innerText = node.title;
            document.getElementById('c-title').style.color = theme.hex;
            document.getElementById('c-desc').innerText = node.desc;
            
            const imgEl = document.getElementById('c-image');
            let desiredImage = null;
            if (node.link) {
                try {
                    const normalized = node.link.replace(/\\/g, '/');
                    desiredImage = normalized.replace(/\/[^\/]+\.html$/, '/raw_picture/map.png');
                } catch (e) { desiredImage = node.link; }
            }
            if (!desiredImage && node.image) desiredImage = node.image;

            if (desiredImage) {
                imgEl.style.display = 'block';
                imgEl.classList.remove('visible');
                imgEl.onload = () => { setTimeout(() => imgEl.classList.add('visible'), 20); imgEl.onload = null; };
                imgEl.src = desiredImage;
            } else {
                imgEl.classList.remove('visible'); imgEl.style.display = 'none'; imgEl.src = '';
            }

            if (node.link) {
                btn.style.display = 'inline-block'; mapContainer.style.display = 'block';
                btn.style.borderColor = theme.hex; btn.style.color = theme.hex;
                btn.style.background = `rgba(${theme.rgb}, 0.1)`;
                mapContainer.style.borderColor = `rgba(${theme.rgb}, 0.3)`;
                btn.onclick = () => {
                    document.body.style.transition = 'all 1.5s cubic-bezier(0.6, -0.28, 0.735, 0.045)';
                    document.body.style.filter = 'brightness(0) blur(20px) contrast(120%)';
                    document.body.style.transform = 'scale(1.5)';
                    document.getElementById('ui-layer').style.opacity = 0;
                    setTimeout(() => { window.location.href = node.link; }, 1200);
                };
            } else {
                btn.style.display = 'none'; mapContainer.style.display = 'none';
            }

            card.style.borderLeftColor = theme.hex;
            card.classList.add('active');
            // 允许 UI 层接收事件，否则 #ui-layer 的 pointer-events: none 会阻止按钮点击
            const uiLayer = document.getElementById('ui-layer');
            if (uiLayer) uiLayer.style.pointerEvents = 'auto';
            cursor.classList.add('active'); cursor.style.borderColor = theme.hex;
            state.activeTitle = node.title;
        }
    } else {
        card.classList.remove('active');
        const uiLayer = document.getElementById('ui-layer');
        if (uiLayer) uiLayer.style.pointerEvents = 'none';
        state.activeTitle = null;
    }
}

export function initDraggableMenu() {
    const container = document.getElementById('tech-menu-container');
    const trigger = document.getElementById('menu-trigger');
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;
    let hasMoved = false;

    trigger.addEventListener('mousedown', (e) => {
        isDragging = true; hasMoved = false;
        startX = e.clientX; startY = e.clientY;
        const rect = container.getBoundingClientRect();
        initialLeft = rect.left; initialTop = rect.top;
        e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved = true;
        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;
        // 拖拽边界改为与主按钮大小一致（110px），避免被拖出视窗
        newLeft = Math.max(0, Math.min(window.innerWidth - 110, newLeft));
        newTop = Math.max(0, Math.min(window.innerHeight - 110, newTop));
        container.style.left = newLeft + 'px'; container.style.top = newTop + 'px';
    });

    window.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        if (!hasMoved) toggleTechMenu();
    });
}

export function initDraggableMap() {
    const mapOverlay = document.getElementById('geo-overlay');
    const header = mapOverlay.querySelector('.geo-header');
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    header.addEventListener('mousedown', (e) => {
        if(e.target.classList.contains('geo-close')) return;
        e.stopPropagation();
        
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = mapOverlay.offsetLeft;
        initialTop = mapOverlay.offsetTop;
        
        header.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        mapOverlay.style.left = (initialLeft + dx) + 'px';
        mapOverlay.style.top = (initialTop + dy) + 'px';
    });

    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            header.style.cursor = 'move';
        }
    });
}

export function toggleTechMenu() { document.getElementById('tech-menu-container').classList.toggle('active'); }

export function menuAction(action) {
    if (action === 'GEO_LOC') {
        const mapOverlay = document.getElementById('geo-overlay');
        state.mapActive = !state.mapActive;
        if (state.mapActive) {
            mapOverlay.classList.add('active');
        } else {
            mapOverlay.classList.remove('active');
        }
        return;
    }

    const NAV_MAP = {
        'RELATIONS': './history_people/history_wheel.html',
        'DEPARTMENTS': './departmental_adjustment/departmental_adjustment.html',
        'RADAR_SCAN': './Weijinlu_Campus/Weijinlu_Campus.html',
        'MAP_VIEW': './Beiyangyuan_Campus/Beiyangyuan_Campus_completed.html',
        'SCI': './Scientific_Research_Achievements/Scientific_Research_Achievements.html'
    };

    const targetUrl = NAV_MAP[action];
    const cursor = document.getElementById('cursor');
    cursor.classList.add('active');
    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    setTimeout(() => {
        cursor.classList.remove('active');
        cursor.style.transform = 'translate(-50%, -50%)';
    }, 300);

    if (targetUrl) {
        document.body.classList.add('warp-exit');
        document.getElementById('ui-layer').style.opacity = 0;
        document.getElementById('tech-menu-container').style.opacity = 0;
        setTimeout(() => { window.location.href = targetUrl; }, 1200); 
    }
}
