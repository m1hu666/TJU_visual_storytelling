import { RAW_DATA } from './data/science_data.js';

// 1. 数据准备
const rawData = RAW_DATA;

const items = rawData.scientific_achievements;
items.forEach(item => {
    if (!item.college) item.college = ["人文社科与综合"];
    else if (!Array.isArray(item.college)) item.college = [item.college]; // Ensure array
    if (!item.introduction) item.introduction = "暂无详细介绍。";
});
const totalCount = items.length;
document.getElementById('total-count').innerText = totalCount;
document.getElementById('current-count').innerText = totalCount;

const groupedData = {};
items.forEach(item => {
    item.college.forEach(col => {
        if (!groupedData[col]) groupedData[col] = [];
        groupedData[col].push(item);
    });
});

// 颜色映射
const colors = [
    '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', 
    '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#00539B', 
    '#FF9F7F', '#FB7293', '#E062AE', '#E690D1', '#e7bcf3'
];
const collegeColorMap = {};
Object.keys(groupedData).forEach((college, index) => {
    collegeColorMap[college] = colors[index % colors.length];
});

// --- 图表数据构建 ---
const sunburstData = Object.keys(groupedData).map((college) => {
    return {
        name: college,
        itemStyle: { color: collegeColorMap[college] },
        children: groupedData[college].map(proj => ({
            name: proj.project,
            value: 1,
            introduction: proj.introduction,
            college: college // Specific parent college for this path
        }))
    };
});

const graphNodes = [];
const graphLinks = [];
const categories = [];

const addedNodes = new Set(); // Track added nodes by ID

graphNodes.push({ id: "TJU", name: "天津大学", symbolSize: 50, category: -1, itemStyle: { color: '#ffffff' }, fixed: true, x: 500, y: 300 }); 
addedNodes.add("TJU");

Object.keys(groupedData).forEach((college, index) => {
    categories.push({ name: college });
    if (!addedNodes.has(college)) {
        graphNodes.push({
            id: college,
            name: college,
            symbolSize: 30,
            category: index,
            itemStyle: { color: collegeColorMap[college] },
            value: groupedData[college].length
        });
        addedNodes.add(college);
        graphLinks.push({ source: "TJU", target: college });
    }

    groupedData[college].forEach(proj => {
        if (!addedNodes.has(proj.project)) {
            graphNodes.push({
                id: proj.project,
                name: proj.project,
                symbolSize: 10,
                category: index, // Just pick the first college's category for color logic base
                itemStyle: { color: collegeColorMap[proj.college[0]] }, // Use primary college color? Or mix? Use first one.
                introduction: proj.introduction,
                college: proj.college // All colleges
            });
            addedNodes.add(proj.project);
        }
        // Link logic: Project connects to ALL its colleges. Loop above iterates colleges, so just add link here.
        // But wait, if we iterate groupedData, we will visit (collegeA, proj1) and later (collegeB, proj1).
        // So we can just add link here safely.
        
        // Ensure link uniqueness? d3 force handles dupes but better to be clean.
        // Actually d3 force link doesn't mind multiple links? It adds strength. 
        // Let's check if link exists.
        const linkId = `${college}-${proj.project}`;
        // Simple check not needed if we iterate hierarchy.
        graphLinks.push({ source: college, target: proj.project });
    });
});

const treemapData = sunburstData.map(group => ({
    ...group,
    children: group.children.map(child => ({
        ...child,
        value: child.introduction.length > 20 ? child.introduction.length : 20
    }))
}));

// 填充右侧列表
const cardList = document.getElementById('cardList');
items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'card';
    div.dataset.college = item.college;
    div.dataset.project = item.project;
    div.id = 'card-' + item.project.replace(/\s+/g, '-');
    
    // 点击列表卡片也触发详细信息展示
    div.onclick = function() {
        handleInteraction({ name: item.project });
    };

    // Render multiple tags for colleges
    const tagsHtml = item.college.map(c => 
        `<span class="card-college" style="background:${collegeColorMap[c]}44; margin-right:4px;">${c}</span>`
    ).join('');

    div.innerHTML = `
        <div style="margin-bottom:4px;">
            ${tagsHtml}
        </div>
        <div class="card-title">${item.project}</div>
        <div class="card-desc">${item.introduction}</div>
    `;
    cardList.appendChild(div);
});

// --- D3 初始化 ---

// 清空现有容器
document.getElementById('sunburstChart').innerHTML = '';
document.getElementById('graphChart').innerHTML = '';
document.getElementById('treemapChart').innerHTML = '';

let chartInstances = {};
let hoverTimer = null;

function initSunburst() {
    const container = document.getElementById('sunburstChart');
    let width = container.clientWidth || 600;
    let height = container.clientHeight || 600;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [-width / 2, -height / 2, width, height]);

    const data = {
        name: "root",
        children: sunburstData
    };

    const hierarchy = d3.hierarchy(data)
        .sum(d => d.value || 1);

    const partition = d3.partition()
        .size([2 * Math.PI, radius]);

    // Store references for resize
    chartInstances.sunburst = { 
        svg: svg,
        partition: partition,
        hierarchy: hierarchy,
        arc: null,
        path: null,
        labels: null,
        radius: radius,
        highlight: (name) => {
             if(!chartInstances.sunburst.path) return;

             const isCollege = groupedData[name] !== undefined;
             let parentColleges = [];
             if (!isCollege && name) {
                 const item = items.find(i => i.project === name);
                 if (item) parentColleges = item.college;
             }

             chartInstances.sunburst.path.style("opacity", d => {
                if (!name) return 1;
                const nodeName = d.data.name;
                
                // If clicked name is College
                if (isCollege) {
                    if (nodeName === name) return 1;
                    if (d.parent && d.parent.data.name === name) return 1;
                } 
                // If clicked name is Project
                else {
                    if (nodeName === name) return 1;         // The project
                    // Highlight logic: if current node is a college, check if project belongs to it
                    if (d.depth === 1 && parentColleges.includes(nodeName)) return 1; 
                }
                return 0.1;
             });
        },
        resize: () => {
             const w = container.clientWidth;
             const h = container.clientHeight;
             if (!w || !h) return;
             const r = Math.min(w, h) / 2;
             svg.attr('width', w).attr('height', h).attr('viewBox', [-w/2, -h/2, w, h]);
             partition.size([2 * Math.PI, r]);
             draw();
        }
    };

    function draw() {
        svg.selectAll("*").remove();
        const root = chartInstances.sunburst.partition(chartInstances.sunburst.hierarchy);
        
        const arc = d3.arc()
            .startAngle(d => d.x0)
            .endAngle(d => d.x1)
            .innerRadius(d => d.y0)
            .outerRadius(d => d.y1);
        chartInstances.sunburst.arc = arc;

        const path = svg.append("g")
            .selectAll("path")
            .data(root.descendants().filter(d => d.depth))
            .join("path")
            .attr("fill", d => {
                if (d.data.itemStyle && d.data.itemStyle.color) return d.data.itemStyle.color;
                if (d.depth === 1) return '#5470c6';
                return d.parent.data.itemStyle.color;
            })
            .attr("d", arc)
            .style("stroke", "#151a25")
            .style("stroke-width", "1px")
            .style("cursor", "pointer")
            .on("mouseover", (event, d) => {
                if (hoverTimer) clearTimeout(hoverTimer);
                const name = d.data.name;
                handleHover(name);
            })
            .on("mouseout", () => {
                hoverTimer = setTimeout(() => {
                    handleHover(null); 
                }, 50);
            })
            .on("click", (event, d) => {
                event.stopPropagation();
                handleInteraction({ name: d.data.name });
            })
            .append("title")
            .text(d => d.data.name);

        chartInstances.sunburst.path = svg.selectAll("path"); // Re-select for proper update

        // Labels
        svg.append("g")
            .selectAll("text")
            .data(root.descendants().filter(d => d.depth && (d.y0 + d.y1)/2 * (d.x1 - d.x0) > 10))
            .join("text")
            .attr("transform", function(d) {
                const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
                const y = (d.y0 + d.y1) / 2;
                return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
            })
            .attr("dy", "0.35em")
            .attr("fill", "#fff")
            .attr("font-size", "10px")
            .attr("text-anchor", "middle")
            .text(d => d.x1 - d.x0 > 0.05 ? d.data.name.substring(0, 10) : "");
        
        // Background click
        svg.on("click", () => resetAll());
    }

    draw();
}

function initGraph() {
    const container = document.getElementById('graphChart');
    let width = container.clientWidth || 800; // Default fallback
    let height = container.clientHeight || 600;

    const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height);

    const nodes = graphNodes.map(d => ({...d}));
    const links = graphLinks.map(d => ({...d}));

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(50))
        .force("charge", d3.forceManyBody().strength(-120))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide().radius(d => d.symbolSize + 2));

    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.4)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", 1);

    const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", d => d.symbolSize ? d.symbolSize/2 : 5)
        .attr("fill", d => d.itemStyle ? d.itemStyle.color : "#5470c6")
        .style("cursor", "pointer")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
        .on("mouseover", (event, d) => {
             if (hoverTimer) clearTimeout(hoverTimer);
             handleHover(d.name);
        })
        .on("mouseout", () => {
             hoverTimer = setTimeout(() => {
                handleHover(null);
             }, 50);
        })
        .on("click", (event, d) => {
            event.stopPropagation();
            handleInteraction({ name: d.name });
        });

    node.append("title").text(d => d.name);

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    });

    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }

    svg.on("click", () => resetAll());

    chartInstances.graph = { 
        highlight: (name) => {
             const isCollege = groupedData[name] !== undefined;
             let parentColleges = [];
             if (!isCollege && name) {
                 const item = items.find(i => i.project === name);
                 if (item) parentColleges = item.college;
             }

            node.style("opacity", d => {
                if (!name) return 1;
                if (d.name === name) return 1;
                
                if (isCollege) {
                    // Check if this node is a project that belongs to the selected college
                    if (d.college && d.college.includes && d.college.includes(name)) return 1;
                } else {
                    // Project selected: highlight its colleges
                    if (parentColleges.includes(d.name)) return 1;
                }
                return 0.1;
            });
            
            link.style("opacity", d => {
                 if (!name) return 0.4;
                 const s = d.source.name, t = d.target.name;
                 
                 // Highlight links connected to the selected item
                 if (s === name || t === name) return 0.6;
                 
                 // If college selected, find links to projects belonging to it
                 if (isCollege) {
                     // In our graph, links are TJU->College or College->Project
                     // If source is college (selected), then link to project highlight
                     if (s === name) return 0.6;
                 } else {
                     // If project selected (name), highlight links to its colleges
                     // target is project (name), source is college. Check if source is in parentColleges
                     if (t === name && parentColleges.includes(s)) return 0.6;
                 }
                 
                 return 0.05;
            });
        },
        resize: () => {
             const w = container.clientWidth;
             const h = container.clientHeight;
             if (!w || !h) return;
             svg.attr("width", w).attr("height", h);
             simulation.force("center", d3.forceCenter(w / 2, h / 2));
             simulation.alpha(1).restart();
        }
    };
}

function initTreemap() {
    const container = document.getElementById('treemapChart');
    let width = container.clientWidth || 800;
    let height = container.clientHeight || 600;

    const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height);

    const data = {
        name: "root",
        children: treemapData
    };

    const root = d3.hierarchy(data)
        .sum(d => d.value || 1)
        .sort((a, b) => b.value - a.value);

    // Initial draw
    draw(width, height);

    function draw(w, h) {
        svg.selectAll("g").remove(); // Clear
        
        d3.treemap()
            .size([w, h])
            .paddingOuter(4)
            .paddingTop(20)
            .paddingInner(1)
            (root);

        const nodes = svg.selectAll("g")
            .data(root.descendants().filter(d => d.depth === 2)) 
            .join("g")
            .attr("transform", d => `translate(${d.x0},${d.y0})`);

        nodes.append("rect")
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0)
            .attr("fill", d => d.parent.data.itemStyle.color)
            .attr("stroke", "#151a25")
            .style("cursor", "pointer")
            .on("mouseover", (event, d) => {
                 if (hoverTimer) clearTimeout(hoverTimer);
                 handleHover(d.data.name);
            })
            .on("mouseout", () => {
                 hoverTimer = setTimeout(() => {
                     handleHover(null);
                 }, 50);
            })
            .on("click", (event, d) => {
                event.stopPropagation();
                handleInteraction({ name: d.data.name });
            });

        nodes.append("text")
            .attr("x", 3)
            .attr("y", 13)
            .text(d => d.data.name.substring(0, 5) + (d.data.name.length>5?"...":""))
            .attr("font-size", "10px")
            .attr("fill", "white");
            
        nodes.append("title").text(d => d.data.name);

        // Group labels
        svg.selectAll("text.titles")
            .data(root.descendants().filter(d => d.depth === 1))
            .join("text")
            .attr("x", d => d.x0 + 5)
            .attr("y", d => d.y0 + 15)
            .text(d => d.data.name)
            .attr("font-size", "12px")
            .attr("font-weight", "bold")
            .attr("fill", "#ccc");
    }

    svg.on("click", () => resetAll());
    
    chartInstances.treemap = { 
        highlight: (name) => {
            const isCollege = groupedData[name] !== undefined;
            let parentColleges = [];
            if (!isCollege && name) {
                const item = items.find(i => i.project === name);
                if (item) parentColleges = item.college;
            }

            svg.selectAll("rect").style("opacity", d => {
                 if (!name) return 1;
                 const nodeName = d.data.name;

                 if (nodeName === name) return 1;
                 
                 if (isCollege) {
                     // Check if project belongs to this college (visual parent)
                     if (d.parent && d.parent.data.name === name) return 1;
                 } else {
                     // If project selected, highlight the colleges containing it.
                     // The rectangles are projects. We highlight the project rects.
                     // The user might want to see the hierarchy. Treemap structure is College -> Project.
                     // If we highlight a project, it appears in multiple places?
                     // Wait, in Treemap based on SunburstData, yes, projects appear multiple times under different colleges.
                     // So nodeName === name covers all instances of that project.
                 }
                 return 0.2;
            });
        },
        resize: () => {
             const w = container.clientWidth;
             const h = container.clientHeight;
             if (!w || !h) return;
             svg.attr("width", w).attr("height", h);
             draw(w, h);
        }
    };
}

initSunburst();
initGraph();
initTreemap();

// --- 视图切换逻辑 ---
function switchView(viewType) {
    const sunburstDiv = document.getElementById('sunburstChart');
    const graphDiv = document.getElementById('graphChart');
    const btnSunburst = document.getElementById('btn-sunburst');
    const btnGraph = document.getElementById('btn-graph');

    if (viewType === 'sunburst') {
        sunburstDiv.classList.remove('d-none');
        graphDiv.classList.add('d-none');
        btnSunburst.classList.add('active');
        btnGraph.classList.remove('active');
        
        // Trigger resize to fix layout
        if(chartInstances.sunburst) setTimeout(() => chartInstances.sunburst.resize(), 50);

    } else {
        sunburstDiv.classList.add('d-none');
        graphDiv.classList.remove('d-none');
        btnSunburst.classList.remove('active');
        btnGraph.classList.add('active');
        
        // Trigger resize and restart simulation
        if(chartInstances.graph) setTimeout(() => chartInstances.graph.resize(), 50);
    }
}
window.switchView = switchView;

// --- 详情面板更新 ---
function updateDetailPanel(item) {
    const container = document.getElementById('detail-panel');
    if (!item) {
        container.innerHTML = `
            <div class="detail-placeholder">
                <svg viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                </svg>
                <p>请在图表或列表中点击具体的科研项目<br>以查看详细解析</p>
            </div>`;
        return;
    }

    // Prepare color and college text. If multiple colleges, show them all.
    let color = '#5470c6'; // default
    let collegeText = '未分类';
    let collegeTags = '';

    if(item.college && Array.isArray(item.college)) {
         // Use color of first college
         color = collegeColorMap[item.college[0]] || '#5470c6';
         collegeTags = item.college.map(c => `<span style="display:inline-block; border:1px solid ${collegeColorMap[c]||'#ccc'}; color:${collegeColorMap[c]||'#fff'}; border-radius:4px; padding:2px 6px; margin-right:5px; font-size:12px;">${c}</span>`).join('');
    } else if(item.college) {
         // Fallback if not array (though we enforce array now)
         color = collegeColorMap[item.college] || '#5470c6';
         collegeTags = `<span style="color: ${color}">${item.college}</span>`;
    }

    container.innerHTML = `
        <div class="detail-card">
            <div class="detail-header" style="border-left: 4px solid ${color}">
                <div class="detail-college">${collegeTags}</div>
                <div class="detail-title">${item.project}</div>
            </div>
            
            <div class="detail-body">
                <div class="detail-section">
                    <div class="section-title">✨ 项目简介</div>
                    <div class="section-text">${item.introduction || "暂无详细介绍。"}</div>
                </div>
            </div>
        </div>
    `;
}

// --- 交互处理 ---
function handleInteraction(target) {
    if (!target || !target.name) return;
    currentSelectedName = target.name;
    
    // 判断点击的是项目还是学院
    let projectItem = items.find(i => i.project === target.name);
    let collegeName = groupedData[target.name] ? target.name : (projectItem ? projectItem.college[0] : null); // Default to first college for logic
    
    // 1. 更新详情面板
    if (projectItem) {
        updateDetailPanel(projectItem);
    } else if (groupedData[target.name]) {
        // 如果是学院，显示学院概览
         updateDetailPanel({
            project: target.name,
            college: target.name, // 自身就是学院
            introduction: `该学院下共有 ${groupedData[target.name].length} 项主要科研成果。\n\n包含项目：\n` + 
                          groupedData[target.name].map(i => "• " + i.project).slice(0, 8).join("<br>") + 
                          (groupedData[target.name].length > 8 ? "<br>..." : "")
        });
    }

    // 2. 更新右侧列表筛选
    const cardList = document.getElementById('cardList');
    const cards = cardList.getElementsByClassName('card');
    let visibleCount = 0;
    
    Array.from(cards).forEach(card => {
        const pName = card.dataset.project;
        
        let match = false;
        // 如果选中具体项目，只显示该项目
        if (projectItem) {
            match = (pName === target.name);
        } 
        // 如果选中学院，显示该学院所有项目
        else if (groupedData[target.name]) {
             // Check if this card's project belongs to the selected college
             // Easier to find item by project name
             const item = items.find(i => i.project === pName);
             if(item && item.college.includes(target.name)) match = true;
        }
        
        if (match) {
            card.classList.remove('hidden');
            visibleCount++;
            if (projectItem && match) {
                 card.classList.add('active');
                 setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
            } else {
                 card.classList.remove('active');
            }
        } else {
            card.classList.add('hidden');
            card.classList.remove('active');
        }
    });
    
    document.getElementById('current-count').innerText = visibleCount;
    document.getElementById('resetBtn').style.display = 'block';

    // 3. 高亮图表联动
    highlightAll(target.name);
}

function resetAll() {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('hidden');
        card.classList.remove('active');
    });
    document.getElementById('current-count').innerText = totalCount;
    document.getElementById('resetBtn').style.display = 'none';
    updateDetailPanel(null);

    highlightAll(null);
}

window.resetAll = resetAll;

window.addEventListener('resize', function() {
   // Reload charts on resize for simplicity
   document.getElementById('sunburstChart').innerHTML = '';
   document.getElementById('graphChart').innerHTML = '';
   document.getElementById('treemapChart').innerHTML = '';
   initSunburst();
   initGraph();
   initTreemap();
});

// --- 悬停处理 ---
let currentSelectedName = null; // Track current clicked selection

function handleHover(name) {
    // 逻辑修改：如果当前有选中的项目（已点击），则忽略鼠标悬停效果（锁定状态）
    if (currentSelectedName) return;

    // 如果没有选中项，执行原来的悬停逻辑
    if (!name) {
        highlightAll(null); // 恢复默认全显状态
        return;
    }

    highlightAll(name);
}

function highlightAll(name) {
    if (chartInstances.sunburst) chartInstances.sunburst.highlight(name);
    if (chartInstances.graph) chartInstances.graph.highlight(name);
    if (chartInstances.treemap) chartInstances.treemap.highlight(name);
}

// Modify handleInteraction to update the currentSelectedName state
// We overwrite the previously defined handleInteraction
handleInteraction = function(target) {
    if (!target || !target.name) return;
    const name = target.name;
    currentSelectedName = name; // Update selection state
    
    // Logic from original handleInteraction
    let projectItem = items.find(i => i.project === name);
    let collegeName = groupedData[name] ? name : (projectItem ? projectItem.college[0] : null); // Default to first college for logic
    
    // 1. Update Detail Panel
    if (projectItem) {
        updateDetailPanel(projectItem);
    } else if (groupedData[name]) {
         updateDetailPanel({
            project: name,
            college: name, 
            introduction: `该学院下共有 ${groupedData[name].length} 项主要科研成果。\n\n包含项目：\n` + 
                          groupedData[name].map(i => "• " + i.project).slice(0, 8).join("<br>") + 
                          (groupedData[name].length > 8 ? "<br>..." : "")
        });
    }

    // 2. Update Card List
    const cardList = document.getElementById('cardList');
    const cards = cardList.getElementsByClassName('card');
    let visibleCount = 0;
    
    Array.from(cards).forEach(card => {
        const pName = card.dataset.project;
        
        let match = false;
        if (projectItem) {
            match = (pName === name);
        } else if (collegeName) {
             // Check if this card's project belongs to the selected college
             // Easier to find item by project name
             const item = items.find(i => i.project === pName);
             if(item && item.college.includes(name)) match = true;
        }
        
        if (match) {
            card.classList.remove('hidden');
            visibleCount++;
            if (projectItem && match) {
                 card.classList.add('active');
                 setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
            } else {
                 card.classList.remove('active');
            }
        } else {
            card.classList.add('hidden');
            card.classList.remove('active');
        }
    });
    
    document.getElementById('current-count').innerText = visibleCount;
    document.getElementById('resetBtn').style.display = 'block';

    // 3. Highlight
    highlightAll(name);
};

// Also need to reset currentSelectedName in resetAll
resetAll = function() {
    currentSelectedName = null;
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('hidden');
        card.classList.remove('active');
    });
    document.getElementById('current-count').innerText = totalCount;
    document.getElementById('resetBtn').style.display = 'none';
    updateDetailPanel(null);

    highlightAll(null);
}
window.resetAll = resetAll;


