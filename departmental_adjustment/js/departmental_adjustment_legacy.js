// --- 核心配色对象 ---
    const colors = { 
        bg: '#1C1A1B',
        tju: '#FFBA00',    // 天津大学 (琥珀金)
        source: '#655B50', // 来源 (岩石褐/灰)
        target: '#FFE2C7', // 去向 (浅杏/象牙)
        text: '#f1f5f9',
        dim: '#64748b'
    };
    
    // --- 数据源 (完整恢复) ---
    const rawData = {
        "inflows": [
            { "year": 1952, "source": "南开大学", "dept": "工学院", image: "./college/nankai.png", "desc": "1952年，南开大学工学院整体并入天津大学。", intro: "创立于1919年，1938年迁往昆明、与清华大学、北京大学合并为国立西南联合大学。1946年复校，1958年拆分出天津财经学院，1994年合并天津对外贸易学院，2010年合并中国旅游管理干部学院" },
            { "year": 1952, "source": "津沽大学", "dept": "工学院", image: "./college/jingu.png", "desc": "津沽大学工学院并入天津大学。", intro: "创立于1921年初名“天津农工商大学”上世纪上半期国内顶端的私立大学、中国第二所天主教教会学校，代表着教会学校在全国的高水平办学条件。1951年改为国立，1952年被拆分并划入天津大学、南开大学、天津师范学院" },
            { "year": 1952, "source": "清华大学", "dept": "化学工程系", image: "./college/qinghua.png", "desc": "清华大学化学工程系并入，奠定天大化工地位。", intro: "1911年成立清华学堂，后更名国立清华大学，1936年迁至昆明、与北京大学、南开大学合并为国立西南联合大学，1946年复校。1952年经院系调整后成为多科性工科大学" },
            { "year": 1952, "source": "北京大学", "dept": "化学工程系", image: "college/beijing.png", "desc": "北京大学化学工程系调整至天津大学。", intro: "1898年成立京师大学堂，后改名国立北京大学，1919年学生参与五四运动。1936年迁至昆明、与北京大学、南开大学合并为国立西南联合大学。1952年院系调整后成为文理科为主的综合性大学" },
            { "year": 1952, "source": "燕京大学", "dept": "化学工程系", image: "./college/yanjing.png", "desc": "燕京大学化学工程系并入天津大学。", intro: "1896年创建于山海关，始称“北洋铁路官学堂”，是中国第一所工程教育高等学府，后经历唐山路矿学堂、唐山交通大学、国立唐山工学院等时期。1952年，学校更名为唐山铁道学院。1964年学校迁至四川峨眉，1972年更名西南交通大学" },
            { "year": 1952, "source": "唐山铁道学院", "dept": "化学工程系", image: "college/tangtie.png", "desc": "唐山铁道学院化工系调整至天津大学。", intro: "创办于1919年，由美国及英国基督教教会在北京联合开办，是近代中国规模最大、质量最好的大学之一，到1930年代已经跻身于世界一流大学之列。在中国高校1952年院系调整中，燕京大学被撤销" },
            { "year": 1952, "source": "北京铁道学院", "dept": "建筑工程系", image: "college/beitie.png", "desc": "北京铁道学院建筑工程系并入。", intro: "前身为国立交通大学的北京和唐山校区。1949年由北平铁道管理学院、华北交通学院、唐山工学院合并组建为“中国交通大学”，历经北方交通大学、北京铁道学院等时期。2000年与北京电力高等专科学校合并为北京交通大学" }
        ],
        "outflows": [
            { "year": 1951, "target": "北京航空航天大学", "dept": "航空系", image: "college/beihang.png", "desc": "抽调航空系参与组建北京航空学院。", intro: "1951年清华大学、北洋大学、西北工学院、厦门大学的航空系划归清华大学；云南大学航空系划归四川大学；原中央工业专科学校航空科和华北大学航空系合并为北京工业学院航空系。1952年继续合并为北京航空学院，1988年改名北京航空航天大学" },
            { "year": 1952, "target": "中国矿业大学", "dept": "采矿系采煤组", image: "college/kuangye.png", "desc": "采矿系采煤组调至中国矿业学院。", intro: "前身是1909年创办的焦作路矿学堂，后改为焦作工学院。1952年合并华北多所高校的采矿科系、在天津成立中国矿业学院，随后迁往北京，1970年外迁至四川合川，1978年在徐州复校，1988年改名为中国矿业大学" },
            { "year": 1952, "target": "中国石油大学", "dept": "化工系石油炼制组", image: "college/shiyou.png", "desc": "化工系石油炼制组调至北京石油学院。", intro: "1953年以清华大学石油工程系为基础，汇聚北京大学、天津大学、大连工学院等著名高校的力量，组建北京石油学院。后搬迁至东营并更名为华东石油学院。1981年研究生部回到北京，并形成两地办学的局面" },
            { "year": 1952, "target": "中国石油大学", "dept": "机械系石油机械组", image: "college/shiyou.png", "desc": "机械系石油机械组调至北京石油学院。", intro: "1953年以清华大学石油工程系为基础，汇聚北京大学、天津大学、大连工学院等著名高校的力量，组建北京石油学院。后搬迁至东营并更名为华东石油学院。1981年研究生部回到北京，并形成两地办学的局面" },
            { "year": 1952, "target": "中国石油大学", "dept": "地质系石油地质组", image: "college/shiyou.png", "desc": "地质系石油地质组调至北京石油学院。", intro: "1953年以清华大学石油工程系为基础，汇聚北京大学、天津大学、大连工学院等著名高校的力量，组建北京石油学院。后搬迁至东营并更名为华东石油学院。1981年研究生部回到北京，并形成两地办学的局面" },
            { "year": 1952, "target": "中国石油大学", "dept": "采矿系采石油组", image: "college/shiyou.png", "desc": "采矿系采石油组调至北京石油学院。", intro: "1953年以清华大学石油工程系为基础，汇聚北京大学、天津大学、大连工学院等著名高校的力量，组建北京石油学院。后搬迁至东营并更名为华东石油学院。1981年研究生部回到北京，并形成两地办学的局面" },
            { "year": 1952, "target": "中国地质大学", "dept": "地质系", image: "college/dizhi.png", "desc": "地质系调至北京地质学院。", intro: "1952年合并北京大学、清华大学、天津大学、唐山铁道学院等校的地质、工程等系科，组建北京地质学院。1975年迁至武汉并更名武汉地质学院，1987年更名中国地质大学，在北京和武汉两地办学" },
            { "year": 1952, "target": "南开大学", "dept": "数学系", image: "college/nankai.png", "desc": "数学系调整至南开大学。", intro: "创立于1919年，1938年迁往昆明、与清华大学、北京大学合并为国立西南联合大学。1946年复校，1958年拆分出天津财经学院，1994年合并天津对外贸易学院，2010年合并中国旅游管理干部学院" },
            { "year": 1952, "target": "南开大学", "dept": "物理系", image: "college/nankai.png", "desc": "物理系调整至南开大学。", intro: "创立于1919年，1938年迁往昆明、与清华大学、北京大学合并为国立西南联合大学。1946年复校，1958年拆分出天津财经学院，1994年合并天津对外贸易学院，2010年合并中国旅游管理干部学院" },
            { "year": 1952, "target": "北京科技大学", "dept": "采矿系采金属组", image: "college/beike.png", "desc": "采矿系采金属组调至北京钢铁工业学院。", intro: "1952年合并北洋大学、唐山铁道学院、山西大学、北京工业学院、西北工学院、清华大学等校的采矿和冶金系，成立北京钢铁工业学院。1988年改名为北京科技大学" },
            { "year": 1952, "target": "北京科技大学", "dept": "冶金系", image: "college/beike.png", "desc": "冶金系调至北京钢铁工业学院。", intro: "1952年合并北洋大学、唐山铁道学院、山西大学、北京工业学院、西北工学院、清华大学等校的采矿和冶金系，成立北京钢铁工业学院。1988年改名为北京科技大学" },
            { "year": 1954, "target": "中央燃料工业部", "dept": "附属石油专业学校", image: "college/ranliao.png", "desc": "附属石油专业学校划归中央燃料工业部。", intro: "起源于1903年创办的北洋工艺学堂，后并入河北工学院，1952年从天津大学拆分为天津大学附设石油工业学校，后改名河北石油学院、承德石油高等专科学校。2020年与河北工业大学城市学院合并设立河北石油职业技术大学" },
            { "year": 1955, "target": "武汉大学", "dept": "水利系农田水利及土壤改良专业", image: "college/wuhan.png", "desc": "水利系农田水利及土壤改良专业调至武汉水利学院。", intro: "1913年，成立国立武昌高等师范学校，后改名国立武昌大学，后合并多所院校成立国立武昌中山大学。1949年改为国立武汉大学。2000年合并武汉水利电力大学、武汉测绘科技大学、湖北医科大学" },
            { "year": 1955, "target": "北京邮电大学", "dept": "电信系", image: "college/youdian.png", "desc": "电信系调出参与组建北京邮电学院。", intro: "1955年，以天津大学电讯系、电话电报通讯和无线电通信广播两个专业、重庆大学电机系电话电报通讯专业为基础组建北京邮电学院，后合并北京电信学院、邮电科技大学。1993年改名北京邮电大学" },
            { "year": 1955, "target": "天津工业大学", "dept": "纺织工程系", image: "college/tiangong.png", "desc": "纺织工程系调出成立河北纺织工学院。", intro: "1958年由天津大学纺织工程系、天津纺织工业学校、川乐山技艺专科学校棉纺织科合并组建河北纺织工学院，1968年改名为天津纺织工学院。后与天津工业经济管理干部学院、天津工业职业技术学院合并，更名为天津工业大学" },
            { "year": 1956, "target": "武汉大学", "dept": "土木工程系测量专业", image: "college/wuhan.png", "desc": "土木工程系测量专业调至武汉测绘学院。", intro: "1913年，成立国立武昌高等师范学校，后改名国立武昌大学，后合并多所院校成立国立武昌中山大学。1949年改为国立武汉大学。2000年合并武汉水利电力大学、武汉测绘科技大学、湖北医科大学" },
            { "year": 1960, "target": "华北理工大学", "dept": "矿冶工程系", image: "college/huabei.png", "desc": "矿冶工程系调往唐山成立河北矿冶学院。", intro: "1958~1959年抽调唐山铁道学院和天津大学矿冶系成立唐山矿冶学院，后改名河北矿冶学院、河北理工大学；1963年组建唐山煤矿医学院，后改名华北煤炭医学院。2010年两校合并成立河北联合大学，后改名华北理工大学" },
            { "year": 1970, "target": "天津科技大学", "dept": "化工系造纸专业", image: "college/tianke.png", "desc": "化工系造纸专业调往天津轻工业学院。", intro: "1958年成立河北轻工业学院，次年天津大学化学工程系造纸专业并入，1968年改名天津轻工业学院，后合并多所高校的造纸、盐化等专业。2002年改名天津科技大学" }
        ],
        "branches": [
            { "year": 1978, "target": "天津理工大学", "label": "分院独立", image: "college/tianli.png", "desc": "原天大一、二、三分院合并发展为天津理工。", intro: "1979年成立天津大学理工分校，后改名天津理工学院。1996年与天津大学机电、冶金分校合并，2004年改名天津理工大学" },
            { "year": 1978, "target": "天津城建大学", "label": "分院独立", image: "college/tiancheng.png", "desc": "原天大建筑分院独立发展为天津城建。", intro: "1979年成立天津大学第四分校，随即改名天津大学建筑分校。1985年改名天津城市建设学院，2013年改名天津城建大学" }
        ]
    };
    const geoCoordMap = {
        "天津大学": [117.17, 39.13], "南开大学": [117.19, 39.10], "津沽大学": [117.20, 39.12],
        "北洋大学": [117.15, 39.16], "河北工学院": [117.14, 39.14],
        "清华大学": [116.33, 40.00], "北京大学": [116.30, 39.99], "燕京大学": [116.30, 39.99],
        "唐山铁道学院": [118.18, 39.63], "北京铁道学院": [116.34, 39.95], "中国地质大学": [116.35, 39.99],
        "北京科技大学": [116.35, 39.98], "中国石油大学": [116.35, 40.01], "北京航空航天大学": [116.34, 39.98],
        "中国矿业大学": [117.18, 34.27], "武汉大学水利水电": [114.36, 30.54], "武汉大学测绘": [114.36, 30.52],
        "华北理工大学": [118.29, 39.26], "天津工业大学": [117.11, 39.06], "天津科技大学": [117.22, 39.08],
        "北京邮电大学": [116.35, 39.96], "河北工业大学": [117.17, 39.18], "天津理工大学": [117.13, 39.06],
        "天津城建大学": [117.09, 39.09], "中央燃料工业部": [116.38, 39.90]
    };

    let currentFilterYear = null;
    const sankeyChart = echarts.init(document.getElementById('sankey-chart'));
    const mapChart = echarts.init(document.getElementById('map-chart'));
    const forceChart = echarts.init(document.getElementById('force-chart'));
    const timelineChart = echarts.init(document.getElementById('timeline-chart'));

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

            const deptIcons = {
                chem: '<path d="M12,3 L12,5 L14,7 L14,15 C14,17.2 12.2,19 10,19 C7.8,19 6,17.2 6,15 L6,7 L8,5 L8,3 L12,3 Z" fill="currentColor"/>',
                mech: '<path d="M22,12 A10,10 0 1,1 2,12 A10,10 0 1,1 22,12 Z M12,4 A8,8 0 1,0 12,20 A8,8 0 1,0 12,4 Z M12,8 L13,12 L17,12 L14,15 L15,19 L12,17 L9,19 L10,15 L7,12 L11,12 Z" fill="currentColor"/>',
                civil: '<path d="M4,20 L20,20 L20,18 L16,18 L16,10 L20,10 L12,2 L4,10 L8,10 L8,18 L4,18 Z" fill="currentColor"/>',
                water: '<path d="M12,3 C12,3 6,10 6,14 C6,17.3 8.7,20 12,20 C15.3,20 18,17.3 18,14 C18,10 12,3 12,3 Z" fill="currentColor"/>',
                mine: '<path d="M17.4,11 L19.4,13 L10.8,21.6 L8.8,19.6 L17.4,11 Z M4.6,9.6 L13.2,1 L17.4,5.2 L14.9,7.7 L14,6.8 L10.5,10.3 L9.6,9.4 L4.6,9.6 Z " fill="currentColor"/>',
                geo: '<path d="M3,19 L21,19 L15,7 L11,13 L9,10 Z" fill="currentColor"/>',
                textile: '<path d="M12,2 L16,6 L12,10 L8,6 Z M4,6 L8,10 L8,20 L4,20 Z M16,6 L20,6 L20,20 L16,20 L16,10 Z" fill="currentColor"/>',
                elec: '<path d="M10,2 L10,11 L4,11 L14,24 L14,13 L20,13 Z" fill="currentColor"/>',
                arch: '<path d="M4,4 L20,4 L20,6 L4,6 Z M6,6 L8,6 L8,18 L6,18 Z M10,6 L12,6 L12,18 L10,18 Z M14,6 L16,6 L16,18 L14,18 Z M4,18 L20,18 L20,20 L4,20 Z" fill="currentColor"/>',
                math: '<path d="M6,4 L18,4 L18,7 L12,12 L18,17 L18,20 L6,20 L6,17 L12,12 L6,7 Z" fill="currentColor"/>',
                phys: '<path d="M12,2 A10,10 0 1,1 2,12 A10,10 0 1,1 22,12 M12,8 A4,4 0 1,1 8,12 A4,4 0 1,1 12,8" fill-rule="evenodd" fill="currentColor"/>'
            };

            const depts = [
                { name: "化学工程系", fate: "stay", icon: 'chem', note: "保留并加强" },
                { name: "机械工程系", fate: "stay", icon: 'mech', note: "保留" },
                { name: "土木工程系", fate: "stay", icon: 'civil', note: "保留，部分测量专业调出" },
                { name: "水利工程系", fate: "stay", icon: 'water', note: "保留，部分专业调出" },
                { name: "建筑工程系", fate: "stay", icon: 'arch', note: "保留，吸纳津沽大学建筑系" }, 
                { name: "数学系", fate: "out", icon: 'math', note: "1952年调入南开大学" },
                { name: "物理系", fate: "out", icon: 'phys', note: "1952年调入南开大学" },
                { name: "矿冶工程系", fate: "out", icon: 'mine', note: "1952年调出组建北科大、矿大" },
                { name: "地质系", fate: "out", icon: 'geo', note: "1952年调出组建北地" },  
                { name: "纺织工程系", fate: "out", icon: 'textile', note: "1958年调出建院(今天工大)" },
                { name: "电机工程系", fate: "mix", icon: 'elec', note: "后分电力/电信，电信组建北邮" },
            ];

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
            forceChart.setOption({ series: [{ data: fData.nodes, links: fData.links }] });

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
            forceChart.setOption({ series: [{ data: fData.nodes, links: fData.links }] });

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

            const fData = getForceData(year); forceChart.setOption({ series: [{ data: fData.nodes, links: fData.links }] });
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
    forceChart.setOption({
        tooltip: {},
        series: [{
            type: 'graph', layout: 'force',
            data: initForce.nodes, links: initForce.links, categories: forceCategories,
            roam: true, label: { show: true, position: 'right', color: colors.text, fontSize: 11 },
            force: { repulsion: 200, edgeLength: [50, 100] },
            itemStyle: { borderColor: '#fff', borderWidth: 1, shadowBlur: 5, shadowColor: 'rgba(0,0,0,0.3)' },
            lineStyle: { color: 'source', curveness: 0.2, opacity: 0.3, width: 1.5 }
        }]
    });

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
            fData.links.forEach(link => {
                if ((link.source === srcName && link.target === tgtName) || (link.source === tgtName && link.target === srcName)) {
                    link.lineStyle = { width: 4, color: activeColor, opacity: 1, curveness: 0, shadowBlur: 10, shadowColor: activeColor };
                } else { link.lineStyle = { opacity: 0.05, color: '#333' }; }
            });
            fData.nodes.forEach(node => {
                if (node.name === srcName || node.name === tgtName) {
                    node.symbolSize = 25; node.itemStyle = { borderColor: '#fff', borderWidth: 2, shadowBlur: 10, shadowColor: activeColor, color: activeColor };
                    node.label = { show: true, fontSize: 13, color: '#fff', fontWeight: 'bold' };
                } else { node.itemStyle = { opacity: 0.1, color: '#333' }; node.label = { show: false }; }
            });
            forceChart.setOption({ series: [{ data: fData.nodes, links: fData.links }] });

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

    window.onresize = function() { sankeyChart.resize(); mapChart.resize(); forceChart.resize(); timelineChart.resize(); };

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

