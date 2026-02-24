// 1. 数据准备
    const rawData = {
    "scientific_achievements": [
        { "project": "基因组设计合成及应用", "college": "合成生物与生物制造学院", "introduction": "建立了基因组缺陷靶点快速定位和精准修复方法，化学全合成出两条酵母长染色体，首次实现了真核长染色体合成序列与设计序列完全一致和Mb级人类基因组DNA的从头合成与跨物种转移。" },
        { "project": "光量子显示技术", "college": "理学院", "introduction": "以光子激活有机分子的光量子效应实现新型显示,以光驱动替代传统的电驱动,实现分子级超高分辨率、超大面积、超低成本、超低能耗、本征柔性、超高透明、超薄显示(最薄10微米)等系列突破。" },
        { "project": "高比能量二次锂金属电池技术", "college": "材料科学与工程学院", "introduction": "首创离域化电解质设计理念。打破了传统设计对主导溶剂化结构的依赖，首次研制出能量密度超过600Wh/kg的软包电芯和480Wh/kg的模组电池，并兼顾循环稳定性和安全性。" },
        { "project": "高能效丙烷脱氢关键技术", "college": "化工学院", "introduction": "自主研发高能效丙烷脱氢催化剂与工艺关键技术,建立高分散催化剂筛选方法与化学链氧化服氢新工艺,显著提升丙烯收率和能量利用效率降低能耗。" },
        { "project": "超强耐热铝合金", "college": "材料科学与工程学院", "introduction": "创新提出“界面置换”分散策略,成功在铝基体中引入高密度、超细、共格分布的陶瓷纳米颗粒,攻克了纳米相分散与界面结合的瓶颈问题，抗蠕变性能国际领先,将铝合金服役温度提升至300℃以上。" },
        { "project": "晶型药物精准创制", "college": "化工学院", "introduction": "通过精准创制原料药优势品型、精准分离晶型药物关键杂质、精准控制原料药和制剂生产,确保了药品全生命周期质量。" },
        { "project": "量子传感和量子计算芯片", "college": "精密仪器与光电子工程学院", "introduction": "暂无详细介绍。" },
        { "project": "厚板折纸机构理论", "college": "机械工程学院", "introduction": "颠覆传统折纸的运动学模型,提出用空间机构代替球面机构的新思路，攻克同时满足单自由度和预定折叠路径的机构参数逆向求解和多顶点空间原板折纸的运动协调等难题。" },
        { "project": "地-气界面科学研究", "college": "地球系统科学学院", "introduction": "创新了有机分子和同位素分析技术，构建大数据分析和模拟方法,全面阐明了城市和背景地区大气气溶胶的形成机制和驱动机制，精确解译了城市和背景地区大气气溶胶来源及长距离传输。" },
        { "project": "随机系统的稳定性", "college": "数学学院", "introduction": "提出了与维数无关的Wang-Harnack不等式,发展了变测度耦合的研究工具。" },
        { "project": "智能电网技术", "college": "电气自动化与信息工程学院", "introduction": "首创大电网安全域防控技术理论与方法,攻克超高压交直流输电线路新型保护技术,自主研发大地网安全防系统及保护控制装置,成为防范大规模停电事故的有力保障。" },
        { "project": "内燃机复合循环技术", "college": "机械工程学院", "introduction": "研制了车用Diesel-ORC构型原理样机，使整机热效率提高3.6%、节油7.8%。" },
        { "project": "合成气制高附加值含氧化合物", "college": "化工学院", "introduction": "发明了高效稳定的羰化Pd催化剂及加氢Cu催化剂及其规模化制备技术,建立了“羰化一再生一硝酸还原”封闭循环工艺，使聚酯级乙二醇产率提升至99%以上。" },
        { "project": "生物质固废气化技术", "college": "环境科学与工程学院", "introduction": "提出“生物质固废清洁高效燃气能源化关键技术及应用\"的创新思路，从气化炉设计理念、过程焦油脱除、燃气清洁高效利用三个层面突破原有技术缺陷,为我国大量生物质固废的处理利用提供新的技术模式。" },
        { "project": "高效低排放柴油机技术", "college": "机械工程学院", "introduction": "发明了基于两级增压和复合EGR的空气系统和新型复合热力循环的控制装置，结合多种新的催化剂配方及制备方法，以及重型柴油机气缸盖、气缸体等新结构，实现柴油机高效低排放。" },
        { "project": "数字化整体测量场技术", "college": "精密仪器与光电子工程学院", "introduction": "首次将地球GPS概念系统引入工业制造精密测量领域,系统发明了一种由多类型、分布式测量构建一体化整体测量场的空问测量定位方法,拥有统一的空间标基准和时间基准,具备多目标点并行同步测量能力。" },
        { "project": "关键基础设施网络安全技术", "college": "网络安全学院", "introduction": "建设关基网络实体装备管理系统、数字化仿真系统、场景模拟与科研系统以及运维管理与共享服务系统,高度还原智能电网、水利工程和海洋观测关键基础设施的真实网络场景，并支持超过100个关键场景的灵活定制。" },
        { "project": "高性能混联机器人", "college": "机械工程学院", "introduction": "由“1平动2转动并联机构+A/C摆角头”构成的高性能混联机器人兼具了5轴数控机床和关节型机器人的优点,是构建大型构件原位柔性制造单元与系统的核心装备。" },
        { "project": "国六汽车尾气净化催化剂", "college": "环境科学与工程学院", "introduction": "突破了高水热稳定的氧化铝、高性能蜂窝陶瓷载体等关键材料短板,汽车尾气后处理系统数字化仿真空白技术。通过铂族金属高效利用及废催化剂铂族金属资源循环的方式,摆脱了铂族金属战略资源短缺的难题。" },
        { "project": "醋酸乙烯成套生产技术", "college": "化工学院", "introduction": "分别开发了生物质、石油和煤三条原料路线的醋酸乙烯成套生产技术,通过产学研协同攻关,针对行业中存在的工程技术难题,开展了从基础研究到成套技术开发、进一步到大规模工程应用的多尺度研究工作。" },
        { "project": "水利工程智能建设", "college": "建筑工程学院", "introduction": "提出了水利工程复杂地质三维精细建模与基础处理智能分析方法,创建了大规模、谱系化智能无人施工装备及集群协同作业技术,研发了高坝与地下洞室群智能建设数字孪生平台。" },
        { "project": "“海燕”谱系化水下滑翔机", "college": "机械工程学院", "introduction": "借助轻量化结构与功能材料匹配、高密度能源与智能管理、防腐防污减阻仿生图层、庆幸陶瓷复合耐压壳体，超高压浮力精准驱动、多传感器协同控制等关键技术。" },
        { "project": "海上风电安全高效开发", "college": "建筑工程学院", "introduction": "发明巨型多分舱海上风电简型基础结构，提出简型基础顶盖-筒壁一土体联合承载模式，结合海上风电基础·塔简-凤机整体浮运新技术,、专用施工船舶，以及海上风电基础·塔简-凤机整体浮运新技术,研制了专用施工船舶。" },
        { "project": "软土工程多尺度变形控制", "college": "建筑工程学院", "introduction": "提出微变形精准控制、低碳支挡和岩土与地下工程整体安全体系等原创性技术,突破了基础设施服役安全中mm级微变形控制难、基坑大型化成本高和岩土与地下工程连续垮塌风险大的瓶颈。" },
        { "project": "微弱声学采集与分析技术", "college": "自动化学院", "introduction": "独创基于特定结构麦克风阵列的声学采集系统,实现信号能量的有效放大和环境噪声的准确估计;建立基于传统信号处理与深度学习融合的声学信息分析模型,实现微弱信号增强、关键特征提取以及精准决策。" },
        { "project": "混合式光纤传感技术", "college": "精密仪器与光电子工程学院", "introduction": "提出行波谐振型混合式光纤内腔气体传感器构型，并发明了光纤传感器光学干涉真空微腔的键合封装，以及高精度、高稳定混合式光纤传感器解调技术。" },
        { "project": "光束抖动测量与防抖技术", "college": "精密仪器与光电子工程学院", "introduction": "研制了型谱化磁流体微角振动传感器,解决了磁流体微角振动传感器宽频和低噪声的难题，攻克了微角振动毫角秒级测量、亚角秒级抑制、亚像元级稳定成像等技术难题,多项关键指标刷新行业纪录。" },
        { "project": "深海平台智能焊接装备", "college": "材料科学与工程学院", "introduction": "研发了超大TKY管节点免示教自适应智能焊接装备,可完成重达30吨大型TKY管节点的自动焊接,焊接效率提高>50%,一次合格率>98%,处于国际领先水平,引领海上平台制造模式由“人工”向“智能”的模式变革。" },
        { "project": "“异构射频”集成电路系统", "college": "微电子学院", "introduction": "提出了三维异构集成悬置线(ISL)技术,突破了传统射频电路高找耗和低集成度的技术瓶颈,具备低损耗、自封装和高集成度的显著优势。" },
        { "project": "智能图像传感芯片技术", "college": "微电子学院", "introduction": "针对CMOS图像传感芯片和视觉系统开展了像素、读出电路、图像处理的贯通式研究，借仿生机理研发背照式高速仿生脉冲传感器芯片、微光大动态范围芯片，研发出高分辨率、低误差的多维图像传感器芯片。" },
        { "project": "飞秒激光应用技术", "college": "精密仪器与光电子工程学院", "introduction": "成功研制出国内平均功率最高的绿光飞秒激光器，开发的飞秒激光致声膜厚测量装备精度达亚统米级,处于国际一流水平。还实现了硅基波导结构的激光无损分离,开发出晶圆划片、真空玻璃焊接及五轴曲面加工等装备。" },
        { "project": "非侵入式脑-机交互技术", "college": "医学院", "introduction": "时、频、空多源域探索交互过程中的脑电动态信息演进机制，同步振荡响应规律和空间激活映射模型，发展高分辨率脑-机编码解码和调节控制关键技术，开发集成化脑-机接口软硬件平台。" },
        { "project": "神经重症诊断系统", "college": "医学院", "introduction": "全球首台神经重症脑积水精确客观在线诊断系统建立“评估一诊断一干预”脑积水个性化诊疗系统,集脑机接口、组学与脑脊液动力学于一体,可客观、精准、在线诊断脑积水,将诊断时间从3天缩减为30分钟。" },
        { "project": "传承人口述史方法论研究", "college": "冯骥才文学艺术研究院", "introduction": "暂无详细介绍。" },
        { "project": "世界记忆遗产清代样式雷建筑图档", "college": null, "introduction": "暂无详细介绍。" },
        { "project": "科学家生物安全行为准则天津指南", "college": null, "introduction": "暂无详细介绍。" },
        { "project": "长城体系研究与数字化", "college": null, "introduction": "暂无详细介绍。" },
        { "project": "中国侵权责任法研究", "college": null, "introduction": "暂无详细介绍。" },
        { "project": "金融科技与金融工程", "college": null, "introduction": "暂无详细介绍。" },
        { "project": "复杂系统管理与决策", "college": null, "introduction": "暂无详细介绍。" }
    ]
    };

    const items = rawData.scientific_achievements;
    items.forEach(item => {
        if (!item.college) item.college = "人文社科与综合";
        if (!item.introduction) item.introduction = "暂无详细介绍。";
    });
    const totalCount = items.length;
    document.getElementById('total-count').innerText = totalCount;
    document.getElementById('current-count').innerText = totalCount;

    const groupedData = {};
    items.forEach(item => {
        if (!groupedData[item.college]) groupedData[item.college] = [];
        groupedData[item.college].push(item);
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
                college: college // 携带学院信息供点击使用
            }))
        };
    });

    const graphNodes = [];
    const graphLinks = [];
    const categories = [];
    graphNodes.push({ id: "TJU", name: "天津大学", symbolSize: 50, category: -1, itemStyle: { color: '#ffffff' }, fixed: true, x: 500, y: 300 }); 
    
    Object.keys(groupedData).forEach((college, index) => {
        categories.push({ name: college });
        graphNodes.push({
            id: college,
            name: college,
            symbolSize: 30,
            category: index,
            itemStyle: { color: collegeColorMap[college] },
            value: groupedData[college].length
        });
        graphLinks.push({ source: "TJU", target: college });

        groupedData[college].forEach(proj => {
            graphNodes.push({
                id: proj.project,
                name: proj.project,
                symbolSize: 10,
                category: index,
                itemStyle: { color: collegeColorMap[college] },
                introduction: proj.introduction,
                college: college
            });
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

        div.innerHTML = `
            <span class="card-college" style="background:${collegeColorMap[item.college]}44">${item.college}</span>
            <div class="card-title">${item.project}</div>
            <div class="card-desc">${item.introduction}</div>
        `;
        cardList.appendChild(div);
    });

    // --- ECharts 初始化 ---
    const sunburstChart = echarts.init(document.getElementById('sunburstChart'));
    const graphChart = echarts.init(document.getElementById('graphChart'));
    const treemapChart = echarts.init(document.getElementById('treemapChart'));

    const sunburstOption = {
        tooltip: { trigger: 'item', formatter: '{b}' },
        series: {
            type: 'sunburst',
            data: sunburstData,
            radius: [0, '90%'],
            label: { rotate: 'tangential', color: '#fff', fontSize: 10, minAngle: 5 },
            itemStyle: { borderRadius: 4, borderWidth: 1, borderColor: '#151a25' },
            emphasis: { focus: 'ancestor' },
            levels: [{}, { r0: '15%', r: '60%' }, { r0: '60%', r: '95%', label: { show: false } }]
        }
    };

    const graphOption = {
        tooltip: { formatter: '{b}' },
        series: [{
            type: 'graph',
            layout: 'force',
            data: graphNodes,
            links: graphLinks,
            categories: categories,
            roam: true,
            label: { show: false },
            emphasis: { focus: 'adjacency', lineStyle: { width: 4 } },
            force: { repulsion: 120, gravity: 0.1, edgeLength: [30, 90] }, // 调整力导向参数适应新容器
            lineStyle: { color: 'source', curveness: 0.3, opacity: 0.4 }
        }]
    };

    const treemapOption = {
        tooltip: { formatter: '{b}' },
        series: [{
            type: 'treemap',
            data: treemapData,
            breadcrumb: { show: false },
            label: { show: true, formatter: '{b}' },
            itemStyle: { borderColor: '#151a25', borderWidth: 2, gapWidth: 2 },
            levels: [
                { itemStyle: { borderColor: '#555', borderWidth: 4, gapWidth: 4 }, upperLabel: { show: false } },
                { itemStyle: { borderColor: '#151a25', borderWidth: 2, gapWidth: 1 }, emphasis: { itemStyle: { borderColor: '#aaa' } } }
            ]
        }]
    };

    sunburstChart.setOption(sunburstOption);
    graphChart.setOption(graphOption);
    treemapChart.setOption(treemapOption);

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
            sunburstChart.resize(); // 必须resize否则显示异常
        } else {
            sunburstDiv.classList.add('d-none');
            graphDiv.classList.remove('d-none');
            btnSunburst.classList.remove('active');
            btnGraph.classList.add('active');
            graphChart.resize(); // 必须resize
        }
    }

    // --- 详情页更新逻辑 ---
    function updateDetailPanel(projectData) {
        const panel = document.getElementById('detail-panel');
        if (!projectData) {
            // 恢复占位符
            panel.innerHTML = `
                <div class="detail-placeholder">
                    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
                    <p>请在图表或列表中点击具体的科研项目<br>以查看详细解析</p>
                </div>`;
            return;
        }

        const color = collegeColorMap[projectData.college] || '#fff';
        
        panel.innerHTML = `
            <div class="detail-item">
                <div class="detail-header">
                    <div class="detail-project-name">${projectData.project}</div>
                    <div class="detail-tags">
                        <span style="color:${color}; border-color:${color}44; background:${color}11">${projectData.college}</span>
                        <span>科研项目</span>
                    </div>
                </div>
                <div class="detail-section">
                    <div class="detail-label">核心摘要</div>
                    <div class="detail-text">${projectData.introduction}</div>
                </div>
                <div class="detail-section">
                    <div class="detail-label">项目分析</div>
                    <div class="detail-text">
                        该成果由${projectData.college}牵头研发，在相关学科领域具有显著影响力。项目展示了${projectData.project}在基础研究与应用场景上的深度结合，体现了天津大学在${projectData.college}方向的科研实力。
                    </div>
                </div>
            </div>
        `;
    }

    // --- 交互核心逻辑 ---

    function handleInteraction(params) {
        if (!params.name) return;
        const name = params.name;
        
        // 查找项目完整数据
        let projectData = null;
        for (let item of items) {
            if (item.project === name) {
                projectData = item;
                break;
            }
        }

        const isCollege = groupedData.hasOwnProperty(name);
        const isProject = !!projectData;

        if (name === "天津大学") {
            resetAll();
            return;
        }

        // 1. 更新详情页 (如果是项目)
        if (isProject) {
            updateDetailPanel(projectData);
        } else {
            // 如果点的是学院，详情页不显示具体项目，但可以做个学院简介占位
            // 这里为了简洁，点击学院暂不清空详情，或保留上一次状态
            // 或者选择不更新
        }

        // 2. 列表筛选与高亮
        const cards = document.querySelectorAll('.card');
        let visibleCount = 0;

        cards.forEach(card => {
            card.classList.remove('active');
            
            if (isCollege) {
                if (card.dataset.college === name) {
                    card.classList.remove('hidden');
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                }
            } else if (isProject) {
                card.classList.remove('hidden'); 
                if (card.dataset.project === name) {
                    card.classList.add('active');
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                visibleCount = totalCount;
            }
        });
        
        document.getElementById('current-count').innerText = isCollege ? visibleCount : totalCount;
        document.getElementById('resetBtn').style.display = 'block';

        // 3. 图表高亮联动
        graphChart.dispatchAction({ type: 'highlight', name: name });
        // 如果需要，也可以让旭日图高亮
        sunburstChart.dispatchAction({ type: 'highlight', targetNodeId: name }); 
    }

    // 绑定事件到所有图表
    const charts = [sunburstChart, graphChart, treemapChart];
    
    charts.forEach(chart => {
        chart.on('click', function (params) {
            handleInteraction(params);
        });
        // 空白点击重置
        chart.getZr().on('click', function (params) {
            if (!params.target) resetAll();
        });
    });

    function resetAll() {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('hidden');
            card.classList.remove('active');
        });
        document.getElementById('current-count').innerText = totalCount;
        document.getElementById('resetBtn').style.display = 'none';
        updateDetailPanel(null); // 重置详情页

        graphChart.dispatchAction({ type: 'downplay' });
        sunburstChart.dispatchAction({ type: 'downplay' });
        treemapChart.dispatchAction({ type: 'downplay' });
    }

    window.addEventListener('resize', function() {
        // resize时只调整当前可见的图表，或者全部调整
        sunburstChart.resize();
        graphChart.resize();
        treemapChart.resize();
    });

