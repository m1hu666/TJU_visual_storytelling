
import { COLORS, GEO_COORD_MAP, DEPT_ICONS, DEPTS } from './data/dept_config.js';
import { RAW_DATA } from './data/dept_data.js';

export function initChart() {
    // Aliases to match original code style where convenient
    const colors = COLORS;
    const geoCoordMap = GEO_COORD_MAP;
    const rawData = RAW_DATA;

    let currentFilterYear = null;
    const sankeyChart = echarts.init(document.getElementById('sankey-chart'));
    const mapChart = echarts.init(document.getElementById('map-chart'));
    const timelineChart = echarts.init(document.getElementById('timeline-chart'));

    // --- D3 Force Graph for Network Relation ---
    const forceContainer = document.getElementById('force-chart');
    let forceSvg = null;
    let forceLinkGroup = null;
    let forceNodeGroup = null;
    let forceLabelGroup = null;
    let forceSimulation = null;

    function ensureForceGraphBase() {
        if (!forceContainer || typeof d3 === 'undefined') return;
        if (forceSvg) return;

        const rect = forceContainer.getBoundingClientRect();
        const width = rect.width || 300;
        const height = rect.height || 260;

        forceSvg = d3.select(forceContainer)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`)
            .style('overflow', 'visible');

        const gRoot = forceSvg.append('g');

        const zoom = d3.zoom().scaleExtent([0.5, 3]).on('zoom', (event) => {
            gRoot.attr('transform', event.transform);
        });
        forceSvg.call(zoom);

        forceLinkGroup = gRoot.append('g').attr('class', 'force-links');
        forceNodeGroup = gRoot.append('g').attr('class', 'force-nodes');
        forceLabelGroup = gRoot.append('g').attr('class', 'force-labels');
    }

    function getCategoryColor(catIdx) {
        if (catIdx === 0) return colors.tju;
        if (catIdx === 1) return colors.source;
        if (catIdx === 2) return colors.target;
        return colors.text;
    }

    function updateForceGraph(forceData, highlightCfg) {
        ensureForceGraphBase();
        if (!forceSvg || !forceLinkGroup || !forceNodeGroup || !forceLabelGroup) return;

        const rect = forceContainer.getBoundingClientRect();
        const width = rect.width || 300;
        const height = rect.height || 260;
        forceSvg.attr('viewBox', `0 0 ${width} ${height}`)
            .attr('width', width)
            .attr('height', height);

        const highlightNodes = new Set((highlightCfg && highlightCfg.nodes) || []);
        const highlightLinks = new Set(((highlightCfg && highlightCfg.links) || []).map(l => `${l[0]}->${l[1]}`));

        const nodes = forceData.nodes.map(n => ({ ...n }));
        const links = forceData.links.map(l => ({ ...l }));

        const linkSel = forceLinkGroup.selectAll('line').data(links, d => `${d.source}-${d.target}`);
        linkSel.exit().remove();
        const linkEnter = linkSel.enter().append('line')
            .attr('stroke-width', 1.5)
            .attr('stroke', '#555')
            .attr('stroke-opacity', 0.3);
        const linkMerged = linkEnter.merge(linkSel)
            .attr('stroke-width', d => highlightLinks.has(`${d.source}->${d.target}`) ? 3 : 1.5)
            .attr('stroke', d => highlightLinks.has(`${d.source}->${d.target}`) ? getCategoryColor(2) : '#555')
            .attr('stroke-opacity', d => highlightLinks.has(`${d.source}->${d.target}`) ? 0.9 : 0.2);

        const nodeSel = forceNodeGroup.selectAll('circle').data(nodes, d => d.name);
        nodeSel.exit().remove();
        const nodeEnter = nodeSel.enter().append('circle')
            .attr('r', d => d.name === '天津大学' ? 16 : 8)
            .attr('fill', d => getCategoryColor(d.category))
            .attr('stroke', '#fff')
            .attr('stroke-width', 1.2)
            .style('cursor', 'move');
        const nodeMerged = nodeEnter.merge(nodeSel)
            .attr('r', d => {
                if (highlightNodes.has(d.name)) return 18;
                return d.name === '天津大学' ? 14 : 8;
            })
            .attr('fill', d => highlightNodes.size && !highlightNodes.has(d.name)
                ? '#333'
                : getCategoryColor(d.category))
            .attr('fill-opacity', d => highlightNodes.size && !highlightNodes.has(d.name) ? 0.15 : 1);

        const labelSel = forceLabelGroup.selectAll('text').data(nodes, d => d.name);
        labelSel.exit().remove();
        const labelEnter = labelSel.enter().append('text')
            .attr('font-size', 11)
            .attr('fill', colors.text)
            .attr('dy', -12)
            .style('pointer-events', 'none');
        const labelMerged = labelEnter.merge(labelSel)
            .text(d => d.name)
            .attr('font-weight', d => highlightNodes.has(d.name) ? 'bold' : 'normal')
            .attr('fill', d => highlightNodes.has(d.name) ? '#fff' : '#ccc')
            .attr('opacity', d => highlightNodes.size && !highlightNodes.has(d.name) ? 0.2 : 0.9);

        if (forceSimulation) {
            forceSimulation.stop();
        }

        forceSimulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.name).distance(90).strength(0.9))
            .force('charge', d3.forceManyBody().strength(-260))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(d => d.name === '天津大学' ? 22 : 14));

        const drag = d3.drag()
            .on('start', (event, d) => {
                if (!event.active) forceSimulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on('drag', (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on('end', (event, d) => {
                if (!event.active) forceSimulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            });

        nodeMerged.call(drag);

        forceSimulation.on('tick', () => {
            linkMerged
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            nodeMerged
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);

            labelMerged
                .attr('x', d => d.x)
                .attr('y', d => d.y - (d.name === '天津大学' ? 20 : 14));
        });
    }

    // 保存桑基图节点位置
    const SANKY_POS_KEY = 'tju_sankey_positions_v1';
    let sankeyNodePositions = {};
    try { sankeyNodePositions = JSON.parse(localStorage.getItem(SANKY_POS_KEY)) || {}; } catch(e) { sankeyNodePositions = {}; }

    function matchYear(itemYear, filterYear) {
        if (!filterYear || filterYear === 'NOW') return true;
        if (filterYear === 'VIEW_PRE' || filterYear === 'VIEW_REBUILD') return false;
        let iYear = parseInt(itemYear);
        let fYear = parseInt(filterYear);
        if (!isNaN(iYear) && !isNaN(fYear)) {
            return iYear <= fYear;
        }
        return false;
    }

    function getSankeyData(yearFilter) {
        if (yearFilter === 'VIEW_PRE' || yearFilter === 'VIEW_REBUILD') return { nodes: [], links: [] };
        
        const nodes = [], links = [], addedNodes = new Set();
        const centerNode = "天津大学";
        let hasData = false;

        const processLink = (source, target, val, item, type) => {
            if (!matchYear(item.year, yearFilter)) return;
            hasData = true;
            if (!addedNodes.has(source)) { 
                const sourceColor = (source === centerNode) ? colors.tju : colors.source;
                const nodeDef = { name: source, label: { formatter: item.source || item.target }, itemStyle: { color: sourceColor } };
                if (sankeyNodePositions[source]) { nodeDef.x = sankeyNodePositions[source].x; nodeDef.y = sankeyNodePositions[source].y; }
                nodes.push(nodeDef);
                addedNodes.add(source); 
            }
            if (!addedNodes.has(target)) { 
                const targetColor = (target === centerNode) ? colors.tju : colors.target;
                const targetLabel = (target === centerNode) ? { color: '#fff', fontWeight: '600' } : { color: colors.target };
                const nodeDef = { name: target, itemStyle: { color: targetColor }, label: targetLabel };
                if (sankeyNodePositions[target]) { nodeDef.x = sankeyNodePositions[target].x; nodeDef.y = sankeyNodePositions[target].y; }
                nodes.push(nodeDef);
                addedNodes.add(target); 
            }
            links.push({ 
                source: source, target: target, value: val, 
                edgeData: { 
                    type: type,
                    rawSource: item.source || "天津大学",
                    rawTarget: item.target || item.evolution || "天津大学",
                    dept: item.dept || item.label,
                    desc: item.desc,
                    intro: (typeof item.intro !== 'undefined') ? item.intro : '',
                    year: item.year,
                    image: item.image
                } 
            });
        };

        rawData.inflows.forEach(i => processLink(i.source + "_src", centerNode, 5, i, 'INFLOW'));
        rawData.outflows.forEach(i => processLink(centerNode, i.target, 3, i, 'OUTFLOW'));
        rawData.branches.forEach(i => processLink(centerNode, i.target, 4, i, 'BRANCH'));

        if (hasData || !yearFilter) {
            if(!addedNodes.has(centerNode)) {
                nodes.push({ name: centerNode, itemStyle: { color: colors.tju, borderColor: '#fff', borderWidth: 1 } });
            }
        }
        return { nodes, links };
    }

    let originalForceNodes = [], originalForceLinks = [];
    let forceCategories = [
        {name: '主体', itemStyle: {color: colors.tju}}, 
        {name: '来源', itemStyle: {color: colors.source}}, 
        {name: '去向', itemStyle: {color: colors.target}}
    ];
    
    function getForceData(yearFilter) {
        const nodes = [{ name: "天津大学", symbolSize: 35, category: 0, draggable: true }];
        const links = [];
        const exist = new Set(["天津大学"]);
        function addNode(name, cat) { if (!exist.has(name)) { nodes.push({ name: name, category: cat, symbolSize: 12, draggable: true }); exist.add(name); } }
        
        rawData.inflows.forEach(i => { if(matchYear(i.year, yearFilter)) { addNode(i.source, 1); links.push({ source: i.source, target: "天津大学" }); } });
        rawData.outflows.forEach(i => { if(matchYear(i.year, yearFilter)) { addNode(i.target, 2); links.push({ source: "天津大学", target: i.target }); } });
        rawData.branches.forEach(i => { if(matchYear(i.year, yearFilter)) { addNode(i.target, 2); links.push({ source: "天津大学", target: i.target }); } });
        
        if (!yearFilter) { originalForceNodes = JSON.parse(JSON.stringify(nodes)); originalForceLinks = JSON.parse(JSON.stringify(links)); }
        return { nodes, links, categories: forceCategories };
    }
    
    let originalMapLines = [], originalMapScatter = [];
    function getMapLines(yearFilter) {
        const lines = [], scatter = [], tju = geoCoordMap["天津大学"];
        const activeLocs = new Set(["天津大学"]);
        
        const addLine = (i, from, to, color, fName, tName) => {
            if(matchYear(i.year, yearFilter) && geoCoordMap[fName] && geoCoordMap[tName]) {
                lines.push({ fromName: fName, toName: tName, coords: [geoCoordMap[fName], geoCoordMap[tName]], lineStyle: { color: color } });
                activeLocs.add(fName); activeLocs.add(tName);
            }
        }

        rawData.inflows.forEach(i => addLine(i, i.source, "天津大学", colors.source, i.source, "天津大学"));
        rawData.outflows.forEach(i => addLine(i, "天津大学", i.target, colors.target, "天津大学", i.target));
        rawData.branches.forEach(i => addLine(i, "天津大学", i.target, colors.target, "天津大学", i.target));

        activeLocs.forEach(name => {
            if(geoCoordMap[name]) {
                let nodeColor = colors.source;
                if (name === "天津大学") nodeColor = colors.tju;
                else if (rawData.outflows.some(o => o.target === name) || rawData.branches.some(b => b.target === name)) nodeColor = colors.target;
                
                scatter.push({ name: name, value: geoCoordMap[name].concat([1]), itemStyle: { color: nodeColor } });
            }
        });

        if (!yearFilter) { originalMapLines = JSON.parse(JSON.stringify(lines)); originalMapScatter = JSON.parse(JSON.stringify(scatter)); }
        return { lines, scatter };
    }

    // --- Update Charts ---
    function updateDashboard(year) {
        currentFilterYear = year;
        stop1958Animation();

        const mergerView = document.getElementById('merger-view');
        const rebuildView = document.getElementById('rebuild-view');

        const sankeyDiv = document.getElementById('sankey-chart');
        const infoTerminal = document.getElementById('info-terminal');
        const statusDiv = document.getElementById('sys-status');
        
        if(rebuildView) rebuildView.style.display = 'none';
        mergerView.style.display = 'none';
        sankeyDiv.style.visibility = 'visible';
        sankeyDiv.style.opacity = '1';

        
        if (year === 'VIEW_PRE') {
            sankeyDiv.style.visibility = 'hidden';
            mergerView.style.display = 'block';
            
            const scene = document.getElementById('mv-scene');
            const deptContainer = document.getElementById('mv-dept-container');
            
            scene.classList.remove('active'); scene.classList.remove('init');
            deptContainer.innerHTML = ''; 

            void scene.offsetWidth; 
            scene.classList.add('init');
            setTimeout(() => scene.classList.add('active'), 500);

            const deptIcons = DEPT_ICONS;
            const depts = DEPTS;

            const radius = 230; 
            const total = depts.length;
            
            depts.forEach((d, i) => {
                const angle = (i / total) * 2 * Math.PI - Math.PI / 2; 
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                const el = document.createElement('div');
                el.className = 'mv-dept';
                el.dataset.fate = d.fate;
                el.innerHTML = `
                    <div class="mv-dept-dot">
                        <svg viewBox="0 0 24 24">${deptIcons[d.icon] || ''}</svg>
                    </div>
                    <div class="mv-dept-name">${d.name}</div>
                    <div class="mv-dept-sub">${d.note}</div>
                `;
                
                el.style.left = `calc(50% + ${x}px)`;
                el.style.top = `calc(50% + ${y}px)`;
                el.style.transitionDelay = `${1.2 + i * 0.1}s`; 
                
                deptContainer.appendChild(el);
            });

            infoTerminal.innerHTML = `
                <h3 style="color:${colors.tju}; border-color:${colors.tju}">历史沿革 · 1951</h3>
                <div class="term-group">
                    <div class="term-card">
                        <span class="term-label">重大事件</span>
                        <div class="term-value">院校合并与更名</div>
                    </div>
                    <div class="term-card">
                        <span class="term-label">合并方</span>
                        <div class="term-value">北洋大学 & 河北工学院</div>
                    </div>
                    <div class="term-card" style="border-color:${colors.tju}">
                        <span class="term-label">成立院系</span>
                        <div class="term-value" style="color:${colors.tju}">下设 11 个系</div>
                    </div>
                </div>
                <div class="term-desc" style="border-left-color:${colors.tju}">
                “中央人民政府教育部下令，将北洋大学与河北工学院合并，更名为‘天津大学’。”
                </div>
                <div class="guide-list">
                    <div class="guide-item">
                         <div class="guide-text" style="color:var(--text-sub); font-size:12px;">当前显示: <b style="color:#fff;">1951 年快照</b></div>
                    </div>
                </div>
            `;
            
            statusDiv.innerText = `FILTER: 1951`; statusDiv.style.borderColor = colors.tju; statusDiv.style.color = colors.tju;
            
            const fData = {
                nodes: [
                    { name: '天津大学', category: 0, symbolSize: 45, draggable: true, itemStyle: { color: colors.tju } },
                    { name: '北洋大学', category: 1, symbolSize: 30, draggable: true },
                    { name: '河北工学院', category: 1, symbolSize: 30, draggable: true },
                ],
                links: [
                    { source: '北洋大学', target: '天津大学' },
                    { source: '河北工学院', target: '天津大学' }
                ],
                categories: forceCategories
            };
            updateForceGraph(fData);

            const mData = {
                lines: [
                    { coords: [geoCoordMap['北洋大学'], geoCoordMap['天津大学']], lineStyle: { color: colors.source } },
                    { coords: [geoCoordMap['河北工学院'], geoCoordMap['天津大学']], lineStyle: { color: colors.source } }
                ],
                scatter: [
                    { name: '北洋大学', value: geoCoordMap['北洋大学'].concat([1]), itemStyle: { color: colors.source } },
                    { name: '河北工学院', value: geoCoordMap['河北工学院'].concat([1]), itemStyle: { color: colors.source } },
                    { name: '天津大学', value: geoCoordMap['天津大学'].concat([1]), itemStyle: { color: colors.tju } }
                ]
            };
            mapChart.setOption({ series: [{ data: mData.lines }, { data: mData.scatter }] });

        } else if (year === 'VIEW_REBUILD') {
             const sankeyDiv = document.getElementById('sankey-chart');
             const rebuildView = document.getElementById('rebuild-view');
             sankeyDiv.style.visibility = 'hidden';
             rebuildView.style.display = 'flex';

             const scene = rebuildView.querySelector('.rb-scene');
             scene.classList.remove('active');
             void scene.offsetWidth;
             setTimeout(() => {
                 scene.classList.add('active');
                 start1958Animation();
             }, 100);

             infoTerminal.innerHTML = `
                <h3 style="color:${colors.target}; border-color:${colors.target}">历史沿革 · 1958</h3>
                <div style="font-size:12px; color:#aaa; margin-bottom:15px; font-style:italic;">背景：河北省会迁往天津，大跃进工业需求激增。</div>
                <div class="term-group">
                    <div class="term-card">
                        <span class="term-label">重大决策</span>
                        <div class="term-value">重建河北工学院</div>
                    </div>
                    <div class="term-card" style="border-color:${colors.target}">
                        <span class="term-label">核心人物</span>
                        <div class="term-value" style="color:${colors.tju}">潘承孝 <span style="font-size:12px;opacity:0.7">(原天大副校长)</span></div>
                    </div>
                    <div class="term-card">
                        <span class="term-label">师资输送</span>
                        <div class="term-value">50名教师 + 50名毕业生</div>
                    </div>
                    <div class="term-card">
                        <span class="term-label">地理变迁</span>
                        <div class="term-value" style="font-size:14px">天大七里台 <span style="color:${colors.target}">➜</span> 红桥丁字沽</div>
                    </div>
                </div>
                
                <div class="term-desc" style="border-left-color:${colors.target}">
                “这次复校并非简单的‘新建’，而是‘搬迁’和‘分离’。天津大学输出了极高规格的师资和管理团队（如化学工程、机电工程），并将丁字沽校区让出，用于重建河北工学院。”
                </div>
                <div class="guide-list">
                    <div class="guide-item">
                         <div class="guide-text" style="color:var(--text-sub); font-size:12px;">当前显示: <b style="color:#fff;">1958 年快照</b></div>
                    </div>
                </div>
            `;
            statusDiv.innerText = `FILTER: 1958`; statusDiv.style.borderColor = colors.target; statusDiv.style.color = colors.target;

            const fData = {
                nodes: [
                    { name: '天津大学', category: 0, symbolSize: 45, draggable: true, itemStyle: { color: colors.tju } },
                    { name: '河北工学院', category: 2, symbolSize: 45, draggable: true, itemStyle: { color: colors.target } }
                ],
                links: [{ source: '天津大学', target: '河北工学院', lineStyle: { width: 5, curveness: 0, color: colors.target } }],
                categories: forceCategories
            };
            updateForceGraph(fData);

             const mData = {
                lines: [
                    { coords: [geoCoordMap['天津大学'], geoCoordMap['河北工学院']], lineStyle: { color: colors.target, width: 3, curveness: 0.2 } }
                ],
                scatter: [
                    { name: '天津大学', value: geoCoordMap['天津大学'].concat([1]), itemStyle: { color: colors.tju } },
                    { name: '河北工学院', value: geoCoordMap['河北工学院'].concat([1]), itemStyle: { color: colors.target } }
                ]
            };
            mapChart.setOption({ series: [{ data: mData.lines }, { data: mData.scatter }] });

        } else {
            const sankeyDiv = document.getElementById('sankey-chart');
            const mergerView = document.getElementById('merger-view');
            sankeyDiv.style.visibility = 'visible';
            mergerView.style.display = 'none';

            const defaultHTML = `<h3>交互指南 <span class="subtitle">INTERACTION GUIDE</span></h3><div class="guide-list"><div class="guide-item"><div class="guide-icon">1</div><div class="guide-text">点击底部 <b>时间轴节点</b><br/>可筛选特定年份数据</div></div><div class="guide-item"><div class="guide-icon">2</div><div class="guide-text">悬停在 <b>流向连线</b> 上<br/>查看详细叙事与图片资料</div></div><div class="guide-item" style="border-style: solid; border-color: rgba(255,186,0,0.2);"><div class="guide-icon" style="background: var(--color-tju); color: black;">i</div><div class="guide-text" style="align-self:center;">当前视图: <span id="current-view-label" style="color:var(--color-tju); font-weight:bold;">${year ? year + (year==='NOW'?'':' 年累计') : '全历史全景'}</span></div></div></div>`;

            if (infoTerminal.innerHTML.includes('1951') || infoTerminal.innerHTML.includes('1958')) {
                infoTerminal.innerHTML = defaultHTML;
            } else {
                const descDiv = document.getElementById('current-view-label');
                if(descDiv) descDiv.innerText = year ? year + (year==='NOW'?'':' 年累计') : '全历史全景';
                else infoTerminal.innerHTML = defaultHTML; 
            }

            if (year) {
                statusDiv.innerText = `FILTER: ${year}`; statusDiv.style.borderColor = colors.tju; statusDiv.style.color = colors.tju;
            } else {
                statusDiv.innerText = `ALL HISTORY`; statusDiv.style.borderColor = colors.source; statusDiv.style.color = colors.text;
            }

            const sData = getSankeyData(year); 
            sankeyChart.setOption({ 
                series: [{ data: sData.nodes, links: sData.links }] 
            }, { notMerge: false, lazyUpdate: false });

            const fData = getForceData(year);
            updateForceGraph(fData);
            const mData = getMapLines(year); mapChart.setOption({ series: [{ data: mData.lines }, { data: mData.scatter }] });
        }

        const timelinePoints = [
            { id: 'VIEW_PRE', label: '院系调整前概况' },
            { id: 'VIEW_REBUILD', label: '重新支援' },
            { id: '1952', label: '1952' },
            { id: '1954', label: '1954' },
            { id: '1955', label: '1955' },
            { id: '1956', label: '1956' },
            { id: '1960', label: '1960' },
            { id: '1970', label: '1970' },
            { id: '1978', label: '1978' },
            { id: 'NOW', label: 'NOW' }
        ];

        const chartTimelinePoints = timelinePoints.filter(p => !p.id.startsWith('VIEW'));
        const timelineDataForChart = chartTimelinePoints.map(p => {
            const isSelected = p.id === year;
            return {
                value: p.id,
                name: p.label,
                symbolSize: isSelected ? 22 : 10,
                symbolOffset: [0, 30], 
                itemStyle: { color: isSelected ? colors.tju : colors.source, shadowBlur: isSelected ? 15 : 0, shadowColor: colors.tju },
                label: { show: isSelected, position: 'bottom', formatter: p.label, color: isSelected?colors.tju:'#888' }
            };
        });

        timelineChart.setOption({ 
            series: [{ data: timelineDataForChart }],
            xAxis: { data: chartTimelinePoints.map(p => p.id) } 
        });

        try {
            const preBtn = document.getElementById('view-pre-btn');
            const rebBtn = document.getElementById('view-rebuild-btn');
            if (preBtn) preBtn.classList.toggle('active', currentFilterYear === 'VIEW_PRE');
            if (rebBtn) rebBtn.classList.toggle('active', currentFilterYear === 'VIEW_REBUILD');
        } catch (e) {}
    }

    // --- Init ---
    const initSankey = getSankeyData(null);
    sankeyChart.setOption({
        tooltip: { show: false },
        animationDuration: 1500,        
        animationDurationUpdate: 2000, 
        animationEasing: 'cubicOut',
        animationEasingUpdate: 'quinticInOut', 
        series: [{
            type: 'sankey', 
            layout: 'sankey', 
            draggable: true,
            data: initSankey.nodes, links: initSankey.links,
            left: '2%', right: '15%', top: '10%', bottom: '10%', nodeWidth: 15, nodeGap: 15,
            lineStyle: { color: 'source', curveness: 0.5, opacity: 0.15 },
            itemStyle: { borderWidth: 0, borderRadius: 2 },
            emphasis: { 
                focus: 'adjacency', blurScope: 'global', 
                itemStyle: { borderWidth: 1, borderColor: '#fff' }, 
                lineStyle: { 
                    opacity: 0.8, 
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: 'rgba(255,255,255,0)'}, {offset: 0.5, color: '#fff'}, {offset: 1, color: 'rgba(255,255,255,0)'}]),
                    shadowBlur: 20, shadowColor: '#fff' 
                } 
            },
            label: { color: colors.text, fontSize: 12 }
        }]
    });

    const initForce = getForceData(null);
    updateForceGraph(initForce);

    const timelinePoints = [
        { id: 'VIEW_PRE', label: '院系调整前概况' },
        { id: 'VIEW_REBUILD', label: '重新支援' },
        { id: '1952', label: '1952' },
        { id: '1954', label: '1954' },
        { id: '1955', label: '1955' },
        { id: '1956', label: '1956' },
        { id: '1960', label: '1960' },
        { id: '1970', label: '1970' },
        { id: '1978', label: '1978' },
        { id: 'NOW', label: 'NOW' }
    ];

    const chartTimelinePoints = timelinePoints.filter(p => !p.id.startsWith('VIEW'));

    timelineChart.setOption({
        grid: { top: 35, bottom: 35, left: 40, right: 40 },
        xAxis: { type: 'category', data: chartTimelinePoints.map(p => p.id), axisLine: { lineStyle: { color: colors.source } }, axisLabel: {color: colors.text, formatter: (val) => {
            const match = timelinePoints.find(p => p.id === val);
            return match ? (match.label.length > 5 ? match.label.substring(0,4)+'..' : match.label) : val;
        }} },
        yAxis: { show: false },
        series: [{ 
            type: 'scatter', 
            data: chartTimelinePoints.map(p => ({value: p.id, symbolSize: 10, symbolOffset: [0, 30]})), 
            itemStyle: { color: colors.source, shadowBlur: 5, shadowColor: colors.source },
        }]
    });

    let playTimer = null;
    let isPlaying = false;
    const playBtn = document.getElementById('play-btn');
    
    playBtn.addEventListener('click', () => {
        if(isPlaying) {
            stopPlay();
        } else {
            startPlay();
        }
    });

    const viewPreBtn = document.getElementById('view-pre-btn');
    const viewRebuildBtn = document.getElementById('view-rebuild-btn');
    if (viewPreBtn) {
        viewPreBtn.addEventListener('click', () => {
            stopPlay();
            if (currentFilterYear === 'VIEW_PRE') updateDashboard(null);
            else updateDashboard('VIEW_PRE');
        });
    }
    if (viewRebuildBtn) {
        viewRebuildBtn.addEventListener('click', () => {
            stopPlay();
            if (currentFilterYear === 'VIEW_REBUILD') updateDashboard(null);
            else updateDashboard('VIEW_REBUILD');
        });
    }

    
    function startPlay() {
        isPlaying = true;
        playBtn.innerText = '⏸ PAUSE';
        playBtn.style.background = '#e74c3c';
        playBtn.style.color = '#fff';
        
        const validTimelinePoints = timelinePoints.filter(p => !p.id.startsWith('VIEW'));
        
        let idx = 0;
        const currentId = currentFilterYear;
        const currentIdx = validTimelinePoints.findIndex(p => p.id === currentId);
        
        if (currentIdx === -1 || currentIdx >= validTimelinePoints.length - 1) {
             idx = 0; 
        } else {
             idx = currentIdx + 1;
        }

        updateDashboard(validTimelinePoints[idx].id);

        playTimer = setInterval(() => {
            idx++;
            if (idx >= validTimelinePoints.length) {
                stopPlay();
                return;
            }
            updateDashboard(validTimelinePoints[idx].id);
        }, 2100); 
    }

    function stopPlay() {
        isPlaying = false;
        playBtn.innerText = '▶ PLAY';
        playBtn.style.background = colors.tju;
        playBtn.style.color = '#000';
        if (playTimer) clearInterval(playTimer);
        playTimer = null;
    }

    $.get('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json', function (chinaJson) {
        echarts.registerMap('china', chinaJson);
        const initMap = getMapLines(null);
        mapChart.setOption({
            geo: {
                map: 'china', roam: true, center: [110, 36], zoom: 1.2,
                itemStyle: { areaColor: '#232122', borderColor: '#4a4744', shadowColor: 'rgba(0,0,0,0.3)', shadowBlur: 10 },
                emphasis: { label: { show: true, color: '#fff' }, itemStyle: { areaColor: '#3d3a38' } }
            },
            series: [
                { type: 'lines', coordinateSystem: 'geo', data: initMap.lines, effect: { show: true, period: 4, trailLength: 0.5, symbolSize: 3, color: '#fff' }, lineStyle: { width: 1, opacity: 0.4, curveness: 0.2 } },
                { type: 'effectScatter', coordinateSystem: 'geo', data: initMap.scatter, symbolSize: 5, itemStyle: { shadowBlur: 5 }, rippleEffect: { brushType: 'stroke', scale: 4 } }
            ]
        });
        setTimeout(() => {
            mapChart.setOption({
                animationDurationUpdate: 2000, animationEasingUpdate: 'cubicInOut',
                geo: { center: [117.20, 39.08], zoom: 6 },
                series: [{ lineStyle: { width: 2, opacity: 0.6 } }, { symbolSize: 12, itemStyle: { shadowBlur: 10 } }]
            });
        }, 1500);
    });

    // --- 交互 ---
    timelineChart.on('click', function(params) {
        let id = null;
        if (params && params.data) {
            if (typeof params.data.value !== 'undefined' && params.data.value !== null) id = params.data.value;
            else if (params.data.id) id = params.data.id;
        }
        if (!id) id = params.value || params.name;

        if (typeof id === 'number') {
            id = (chartTimelinePoints && chartTimelinePoints[id]) ? chartTimelinePoints[id].id : null;
        }

        if (!id) return;

        if (currentFilterYear === id) updateDashboard(null);
        else updateDashboard(id);
    });

    const infoTerminal = document.getElementById('info-terminal');
    sankeyChart.on('mouseover', function (params) {
        if (params.dataType === 'edge') {
            const info = params.data.edgeData;
            let activeColor = info.type === 'INFLOW' ? colors.source : colors.target;
            let typeStr = info.type === 'INFLOW' ? "汇入调整" : (info.type === 'BRANCH' ? "分院独立" : "院系调出");
            const srcName = info.rawSource; const tgtName = info.rawTarget;

            // --- 标题逻辑修复 ---
            let titleText = "";
            if (info.type === 'INFLOW') {
                titleText = srcName; // 流入：显示来源 (如北洋大学)
            } else {
                titleText = tgtName; // 流出/分院：显示目的 (如北京大学)
            }
            if (!titleText) titleText = typeStr;

            const imageFile = (info.image && info.image.trim()) ? info.image.trim() : (titleText ? (titleText + '.png') : '');
            
            infoTerminal.innerHTML = `
                <h3 style="color:${activeColor}; border-color:${activeColor}; margin-bottom:15px">
                    ${titleText}
                    <span class="subtitle">${typeStr}</span>
                </h3>
                
                <div class="term-group">
                    <div class="term-card">
                        <span class="term-label">发生时间</span>
                        <div class="term-value">${info.year}</div>
                    </div>
                    
                    <div class="term-card" style="border-color:${activeColor}">
                        <span class="term-label">流向 (Flow)</span>
                        <div class="flow-visual-box">
                            <div class="fv-row">
                                <div class="fv-node">${info.rawSource}</div>
                                <div class="fv-arrow-anim" style="color:${activeColor}">
                                    <div class="fv-line"><div class="fv-particle"></div></div>
                                    <div class="fv-arrow-head"></div>
                                </div>
                                <div class="fv-node">${info.rawTarget}</div>
                            </div>
                            <div class="fv-dept">${info.dept}</div>
                        </div>
                    </div>
                </div>
                
                <div class="term-desc" style="border-left-color:${activeColor}">“${info.intro || ''}”</div>
                
                ${imageFile ? `<div class="term-img-box"><img src="${imageFile}" alt="${titleText}"/></div>` : ''}
            `;

            let fData = getForceData(currentFilterYear);
            const highlightCfg = {
                nodes: [srcName, tgtName],
                links: [
                    [srcName, tgtName],
                    [tgtName, srcName]
                ]
            };
            updateForceGraph(fData, highlightCfg);

            let mData = getMapLines(currentFilterYear);
            mData.lines.forEach(line => {
                if ((line.fromName === srcName && line.toName === tgtName) || (line.fromName === tgtName && line.toName === srcName)) {
                    line.lineStyle = { width: 5, color: '#fff', opacity: 1, shadowBlur: 20, shadowColor: activeColor }; line.z = 100;
                } else { line.lineStyle.opacity = 0.05; }
            });
            mData.scatter.forEach(point => {
                if (point.name === srcName || point.name === tgtName) {
                    point.symbolSize = 20; point.itemStyle = { color: activeColor, borderColor: '#fff', borderWidth: 3, shadowBlur: 20, shadowColor: activeColor };
                    point.label = { show: true, color: '#fff', fontSize: 14, fontWeight: 'bold', position: 'top', backgroundColor: 'rgba(0,0,0,0.5)', padding: 4, borderRadius: 4 }; point.z = 100;
                } else { point.itemStyle.opacity = 0.1; }
            });
            mapChart.setOption({ series: [{ data: mData.lines }, { data: mData.scatter }] });
        }
    });

    sankeyChart.on('mouseout', function () {
        updateDashboard(currentFilterYear);
    });

    sankeyChart.on('mouseup', function() {
        try {
            const opt = sankeyChart.getOption();
            const nodes = (opt.series && opt.series[0] && opt.series[0].data) || [];
            let changed = false;
            nodes.forEach(n => {
                if (n && n.name && typeof n.x !== 'undefined' && typeof n.y !== 'undefined') {
                    sankeyNodePositions[n.name] = { x: n.x, y: n.y };
                    changed = true;
                }
            });
            if (changed) localStorage.setItem(SANKY_POS_KEY, JSON.stringify(sankeyNodePositions));
        } catch (e) {}
    });

    window.onresize = function() {
        sankeyChart.resize();
        mapChart.resize();
        timelineChart.resize();
        if (forceSvg && forceContainer) {
            const rect = forceContainer.getBoundingClientRect();
            const width = rect.width || 300;
            const height = rect.height || 260;
            forceSvg.attr('viewBox', `0 0 ${width} ${height}`)
                .attr('width', width)
                .attr('height', height);
        }
    };

    let animationTimer1958 = null;
    function start1958Animation() {
        const container = document.querySelector('.rb-flow-container');
        if (!container) return;
        
        if (animationTimer1958) clearInterval(animationTimer1958);
        
        const createParticle = () => {
             const p = document.createElement('div');
             p.className = 'rb-particle';
             p.style.animation = `flyToRight ${1.5 + Math.random()}s linear forwards`;
             p.style.top = `${30 + Math.random() * 40}%`;
             container.appendChild(p);
             p.addEventListener('animationend', () => p.remove());
        };

        animationTimer1958 = setInterval(createParticle, 300);
        createParticle();
    }

    function stop1958Animation() {
        if (animationTimer1958) {
            clearInterval(animationTimer1958);
            animationTimer1958 = null;
        }
        document.querySelectorAll('.rb-particle').forEach(p => p.remove());
    }
}
