import { RAW_DATA as rawData } from './data/history_data.js';

// 按年份排序
const data = rawData.sort((a, b) => {
    const ya = a.tju_years.length > 0 ? a.tju_years[0] : 9999;
    const yb = b.tju_years.length > 0 ? b.tju_years[0] : 9999;
    return ya - yb;
});

// --- 1. 粒子背景 ---
const canvas = document.getElementById('dust-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
const particles = Array.from({length: 120}, () => ({
    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
    r: Math.random() * 1.5, dx: (Math.random()-0.5)*0.2, dy: (Math.random()-0.5)*0.2
}));

function drawDust() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "rgba(212, 175, 55, 0.4)";
    particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if(p.x<0) p.x=canvas.width; if(p.x>canvas.width) p.x=0;
        if(p.y<0) p.y=canvas.height; if(p.y>canvas.height) p.y=0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(drawDust);
}
drawDust();

// --- 2. 滚轮逻辑 ---
const wheelStage = document.getElementById('carousel');
const COUNT = data.length;
const RADIUS = 600;
const THETA = 360 / COUNT;
let currentIndex = 0;
let isScrolling = false;

window.handleImageError = function(img, name) {
    if (img.src.endsWith('.jpg')) img.src = `images/${name}.webp`;
    else img.src = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzIyMiIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZmlsbD0iIzQ0NCIgZm9udC1zaXplPSI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9IjE1Ij4${name[0]}</text></svg>`;
};

function initWheel() {
    data.forEach((d, i) => {
        const card = document.createElement('div');
        card.className = 'wheel-card';
        const angle = THETA * i;
        card.style.transform = `rotateX(${-angle}deg) translateZ(${RADIUS}px)`;
        card.innerHTML = `
            <img src="images/${d.name}.jpg" onerror="handleImageError(this, '${d.name}')">
            <div><h3>${d.name}</h3><p>${d.role}</p></div>
        `;
        card.onclick = () => scrollToIndex(i);
        wheelStage.appendChild(card);
    });
    resetToStart();
    initTimeline();
    initGraph();
}

function scrollToIndex(index) {
    if (index < 0) index = COUNT - 1;
    if (index >= COUNT) index = 0;
    currentIndex = index;
    const targetAngle = currentIndex * THETA;
    wheelStage.style.transform = `translateZ(-${RADIUS}px) rotateX(${targetAngle}deg)`;
    document.querySelectorAll('.wheel-card').forEach((c, i) => c.classList.toggle('active', i === currentIndex));
    updateContent(currentIndex);
}

window.addEventListener('wheel', e => {
    if(isScrolling) return; isScrolling=true; setTimeout(()=>isScrolling=false, 200);
    if(e.deltaY > 0) scrollToIndex(currentIndex+1); else scrollToIndex(currentIndex-1);
});
window.addEventListener('keydown', e => {
    if(e.key==='ArrowDown' || e.key==='ArrowRight') scrollToIndex(currentIndex+1);
    if(e.key==='ArrowUp' || e.key==='ArrowLeft') scrollToIndex(currentIndex-1);
});

// Expose resetToStart to window for the button onclick
window.resetToStart = function() {
    const shengIndex = data.findIndex(d => d.name === "盛宣怀");
    scrollToIndex(shengIndex !== -1 ? shengIndex : 0);
}

// --- 3. 内容更新 ---
const wrapper = document.getElementById('portrait-wrapper');
// Check if elements exist before adding listeners to avoid errors if HTML structure changes
if (wrapper) {
    const card = document.getElementById('portrait-card');
    wrapper.addEventListener('mousemove', e => {
        const x = (e.offsetX - wrapper.offsetWidth/2) / 10;
        const y = (e.offsetY - wrapper.offsetHeight/2) / 10;
        card.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });
    wrapper.addEventListener('mouseleave', () => card.style.transform = `rotateY(0) rotateX(0)`);
}

let typeInterval;
function typeWriter(text) {
    const el = document.getElementById('typewriter-text');
    if (!el) return;
    el.innerText = "";
    clearInterval(typeInterval);
    let i = 0;
    // 加快打字速度
    typeInterval = setInterval(() => {
        el.innerText += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(typeInterval);
    }, 35); // 35ms per char
}

function updateContent(index) {
    const d = data[index];
    const nameEl = document.getElementById('disp-name');
    if (nameEl) nameEl.innerText = d.name;
    const roleEl = document.getElementById('disp-role');
    if (roleEl) roleEl.innerText = d.role;
    const nativeEl = document.getElementById('disp-native');
    if (nativeEl) nativeEl.innerText = d.native;

    typeWriter(d.bio); // 使用全量 bio
    
    const eventsEl = document.getElementById('disp-events');
    if (eventsEl) eventsEl.innerHTML = d.events.map(e => `<div class="event-item">${e}</div>`).join('');
    
    const img = document.getElementById('hero-img');
    if (img) {
        img.src = `images/${d.name}.jpg`;
        img.onerror = () => handleImageError(img, d.name);
    }

    updateMap(d);
    updateTimelineBar(d);
    updateGraph(d);
}

// --- 4. 地图逻辑 (飞线防溢出) ---
const worldPaths = ["M425,65 L445,60 L470,65 L480,90 L460,110 L440,100 Z", "M480,70 L550,60 L650,50 L700,100 L650,150 L580,180 L520,140 Z", "M420,120 L470,120 L480,180 L440,220 L400,160 Z", "M100,50 L250,40 L280,100 L200,140 L120,120 Z", "M220,150 L260,150 L280,220 L240,280 L200,200 Z", "M650,200 L750,200 L730,280 L630,260 Z"];
/* Fixed coords for simplified map */
const coords = { "Tianjin": {x: 610, y: 110}, "USA": {x: 180, y: 100}, "Europe": {x: 440, y: 90}, "Japan": {x: 660, y: 100} };
const mapSvg = d3.select("#map-svg");

if (!mapSvg.empty()) {
    mapSvg.selectAll("path").data(worldPaths).enter().append("path").attr("d", d => d).style("fill", "#222").style("stroke", "#333");
    const labels = [{t: "TIANJIN", x: 610, y: 130}, {t: "USA", x: 180, y: 80}, {t: "EUR", x: 440, y: 70}, {t: "JPN", x: 670, y: 90}];
    mapSvg.selectAll("text").data(labels).enter().append("text").attr("x", d=>d.x).attr("y", d=>d.y).text(d=>d.t).attr("class", "map-label");
    mapSvg.append("circle").attr("cx", coords.Tianjin.x).attr("cy", coords.Tianjin.y).attr("r", 4).attr("fill", "#d4af37");
}

function updateMap(d) {
    if (mapSvg.empty()) return;
    mapSvg.selectAll(".flight-line").remove();
    let target = null;
    // Search in bio/events string
    const txt = d.bio + d.events.join('');
    if (txt.includes("美")||txt.includes("耶鲁")||txt.includes("哈佛")||txt.includes("康奈尔")) target = coords.USA;
    else if (txt.includes("欧")||txt.includes("德")||txt.includes("英")||txt.includes("法")) target = coords.Europe;
    else if (txt.includes("日")) target = coords.Japan;

    if (target) {
        const start = coords.Tianjin;
        const midX = (start.x + target.x) / 2;
        // Limit Y to keep curve inside top edge (20px buffer)
        let midY = Math.min(start.y, target.y) - 80;
        if (midY < 20) midY = 20;

        const pathData = `M${start.x},${start.y} Q${midX},${midY} ${target.x},${target.y}`;
        const path = mapSvg.append("path").attr("d", pathData).attr("class", "flight-line")
            .attr("stroke-dasharray", 1000).attr("stroke-dashoffset", 1000);
        path.transition().duration(1000).attr("stroke-dashoffset", 0);
    }
}

// --- 5. 动态关系图谱 (350px 宽, 可交互) ---
const graphData = { nodes: [], links: [] };
let simulation, link, node; // Module-level variables

function initGraph() {
    // Re-build graph data only if empty (or clear it first if needed)
    graphData.nodes = [];
    graphData.links = [];
    
    data.forEach(d => graphData.nodes.push({ id: d.name, group: 1 }));
    for(let i=0; i<data.length; i++) {
        for(let j=i+1; j<data.length; j++) {
            const a = data[i], b = data[j];
            const startA = a.tju_years.length > 0 ? a.tju_years[0] : 1800; // safe fallback
            const startB = b.tju_years.length > 0 ? b.tju_years[0] : 1800;
            const sharedTags = a.tags.filter(t => b.tags.includes(t));
            if (Math.abs(startA - startB) < 5 || sharedTags.length > 0) {
                graphData.links.push({ source: a.name, target: b.name });
            }
        }
    }

    const container = document.querySelector('.network-container');
    // Default width/height if container not found or zero size
    let width = 350;
    let height = 300;
    if (container) {
        width = container.clientWidth || 350;
        height = container.clientHeight || 300;
    }
    const svg = d3.select("#network-svg").attr("viewBox", [0, 0, width, height]);
    
    // Clear previous graph if any
    svg.selectAll("*").remove();

    simulation = d3.forceSimulation(graphData.nodes)
        .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(60))
        .force("charge", d3.forceManyBody().strength(-50))
        .force("center", d3.forceCenter(width / 2, height / 2));

    // 定义拖拽行为
    const drag = simulation => {
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    // Assign to module-level vars
    const g = svg.append("g");
    link = g.selectAll("line").data(graphData.links).join("line").attr("class", "link");
    
    // 应用拖拽到节点
    node = g.selectAll("g").data(graphData.nodes).join("g").attr("class", "node")
        .call(drag(simulation)); // 绑定拖拽

    node.append("circle").attr("r", 3);
    node.append("text").text(d => d.id).attr("x", 5).attr("y", 2);

    simulation.on("tick", () => {
        link.attr("x1", d => d.source.x).attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
        node.attr("transform", d => `translate(${d.x},${d.y})`);
    });
}

function updateGraph(d) {
    if (!node || !link) return;
    
    node.classed("main", n => n.id === d.name);
    node.classed("peer", false);
    link.style("stroke-opacity", 0.1);
    
    const related = graphData.links.filter(l => l.source.id === d.name || l.target.id === d.name);
    related.forEach(l => {
        const peer = l.source.id === d.name ? l.target.id : l.source.id;
        node.filter(n => n.id === peer).classed("peer", true);
    });
    link.filter(l => l.source.id === d.name || l.target.id === d.name).style("stroke-opacity", 1).style("stroke", "#d4af37");
}

// --- 6. Timeline ---
function initTimeline() {
    // FIX: Using querySelector to find element with class 'time-track' since id might be missing or confusing in legacy HTML
    let track = document.getElementById('time-track');
    if (!track) {
         track = document.querySelector('.time-track');
    }
    
    if (!track) return; // robustness

    [1895, 1911, 1949, 1978, 2000, 2025].forEach(y => {
        const m = document.createElement('div');
        m.className = 'time-mark'; m.innerText = y;
        // Simple positioning logic
        m.style.left = `${((y-1890)/(2030-1890))*100}%`;
        // We might need to add style for .time-mark since it wasn't in the CSS file?
        // Checking CSS file I just wrote... NO, .time-mark is MISSING in the extracted CSS.
        // It's possible it was missing in the original HTML CSS block or I missed it?
        // Let's check the HTML read again.
        // Line 18 in CSS? No.
        // I will add inline style for now or assume it inherits defaults.
        m.style.position = 'absolute';
        m.style.bottom = '5px';
        m.style.color = '#555';
        m.style.fontSize = '10px';
        
        track.appendChild(m);
    });
}

function updateTimelineBar(d) {
    const bar = document.getElementById('time-bar');
    const lbl = document.getElementById('time-label');
    if (!bar || !lbl) return;

    let y = (d.tju_years && d.tju_years[0]) ? d.tju_years[0] : d.year;
    let left = ((y-1890)/(2030-1890))*100;
    bar.style.left = left+"%"; bar.style.width = "20px";
    lbl.style.left = left+"%"; lbl.innerText = y;
}

// Start
initWheel();
