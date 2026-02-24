        const timelineData = [
			{year:1894, title: "甲午中日战争爆发", era: "peiyang", desc: "中国在甲午中日战争中惨败，洋务运动实业派代表盛宣怀认为“自强首在储才、储才必先兴学”，决定在天津开办新式学堂", image: "./timeline/jiawu.png", location:"天津"},
			{year:1895, title: "北洋肇始", era: "peiyang", desc: "光绪帝御笔朱批，中国第一所现代大学诞生。盛宣怀任首任督办，校址在天津北运河畔大营门博文书院", image: "./timeline/start.png", location:"天津"},
			{year:1896, title: "第一次更名", era: "peiyang", desc: "更名为北洋大学堂", image: "./timeline/rename1.png", location:"天津"},
			{year:1899, title: "首批学员毕业", era: "peiyang", desc: "北洋大学堂首批学生毕业，王宠惠作为成绩最优者获钦字第壹号考凭，为中国第一个获得国内大学文凭者", image: "./timeline/first.png", location:"天津"},
			{year:1900, title: "被迫停办", era: "peiyang", desc: "因八国联军入侵天津地区，北洋大学堂校舍被侵占，被迫停办，部分师生进入南洋公学铁路班", image: "./timeline/8guo.png", location:"天津"},
			{year:1901, title: "首批赴美留学生", era: "peiyang", desc: "经多年筹备，盛宣怀委托傅兰雅带领王宠惠、陈锦涛等八名学生赴美留学，是北洋大学首次派遣学生赴海外留学", location:"天津"},
			{year:1903, title: "西沽复校", era: "peiyang", desc: "袁世凯将西沽武库全部房屋拨给北洋大学堂作为校舍，北洋大学堂在西沽正式复课", image: "./timeline/xigu.png", location:"天津"},
			{year:1907, title: "设立师范科", era: "peiyang", desc: "北洋大学堂附设师范科，专门培养中等学堂英文师资，但不久后因直隶省已有两所高等师范科院校而停办", location:"天津"},
			{year:1913, title: "更名国立北洋大学", era: "peiyang", desc: "中华民国成立后改名北洋大学校，隶属于中华民国教育部，后再次改名为国立北洋大学，督办一职改称校长", image: "./timeline/rename3.png", location:"天津"},
			{year:1915, title: "赵天麟颁布校训", era: "peiyang", desc: "爱国教育家赵天麟担任北洋大学校长时提出“实事求是”的校训，并沿用至今", image: "./timeline/slogan.png", location:"天津"},
			{year:1917, title: "进入专办工科时期", era: "peiyang", desc: "奉教育部令，北洋大学与北京大学进行科系调整，法科停止招生并划归北京大学，北京大学的工科划归北洋大学。国立北洋大学转变为专办工科的高校", location:"天津"},
			{year:1919, title: "五四运动学生罢课", era: "peiyang", desc: "五四运动爆发，北洋大学学生积极参与罢课游行等活动持续三个月。张太雷等因为参加罢课而遭北洋大学开除学籍", image: "./timeline/may4.png", location:"天津"},
			{year:1928, title: "改为北平大学第二工学院", era: "peiyang", desc: "民国教育部推行大学区制改革，国立北洋大学改为国立北平大学第二工学院", image: "./timeline/bp2gxy.png", location:"天津"},
			{year:1929, title: "更名国立北洋工学院", era: "peiyang", desc: "大学院及相关制度遭撤销，北洋大学从北平大学体系脱离并独立建校。由于专办工科，暂定校名为国立北洋工学院", image: "./timeline/bygxy.png", location:"天津"},
			{year:1935, title: "开办研究生教育", era: "peiyang", desc: "合并矿冶工程和工程材料研究所为北洋工学院工科研究所，并开始招收研究生", image: "./timeline/bachelor1.png", location:"天津"},
			{year:1937, title: "被迫西迁", era: "peiyang", desc: "日本侵略者占领天津，被迫西迁，与北平大学、北平师范大学、北平研究院等合并设立西安临时大学", image: "./timeline/west.png", location:"西安"},
			{year:1938, title: "改组为西北工学院", era: "peiyang", desc: "迁至城固县，改称国立西北联合大学，随后再次改组。北洋工学院与北平大学工学院、焦作工学院、东北大学工学院合并为西北工学院", image: "./timeline/xbgxy.png", location:"城固"},
			{year:1941, title: "校友筹建北洋工学院", era: "peiyang", desc: "北洋大学校友在贵阳举行的中国工程师学会年会上呼吁恢复国立北洋大学、筹资设立“私立北洋工学院”", image: "./timeline/guiyang.png", location:"贵阳"},
			{year:1942, title: "泰顺北洋工学院成立", era: "peiyang", desc: "浙江省立英士大学升格为国立大学时，将其工学院独立划出，更名为北洋工学院并自主招生，史称“泰顺北洋工学院”", image: "./timeline/taishun.png", location:["城固", "泰顺"]},
			{year:1944, title: "筹建西京分院", era: "peiyang", desc: "在李书田的领导下，北洋校友在西安组建了北洋工学院西京分院，含土木工程、水利工程两系", image: "./timeline/xijing.png", location:["西安", "泰顺"]},
			{year:1945, title: "恢复北洋大学", era: "peiyang", desc: "抗战胜利后，时任国防最高委员会秘书长王宠惠亲自向教育部发出函电，要求早日恢复具有悠久历史的北洋大学", image: "./timeline/call.png", location:"天津"},
			{year:1946, title: "北洋大学正式复校", era: "peiyang", desc: "西北工学院、泰顺北洋工学院、北洋工学院西京分院师生返津，合并了北京大学工学院，在原西沽校址复校，改名为国立北洋大学", image: "./timeline/restart.png", location:"天津"},
			{year:1949, title: "归属新中国领导", era: "peiyang", desc: "天津解放，北洋大学先后转隶属于天津军管委、华北人民政府高等教育委员会，最终划归中央人民政府教育部领导", image: "./timeline/prc.png", location:"天津"},
			{year:1951, title: "合并设立天津大学", era: "tju", desc: "北洋大学与河北工学院合并，自1951年8月1日起正式成立新校，定名为天津大学", location:"天津"},
			{year:1952, title: "高等院校院系调整", era: "tju", desc: "全国高校大规模院系调整，天津大学大量院系迁出迁入，成为多科系工科大学", location:"天津"},
			{year:1952, title: "迁至七里台新校区", era: "tju", desc: "天津大学整体搬迁至新建的南开区七里台新校区，即今卫津路校区", location:"天津"},
			{year:1958, title: "重建河北工学院", era: "tju", desc: "河北工学院部分院系从天津大学分离，并在北洋大学原西沽校址复校", image: "./timeline/hbgxy.png", location:"天津"},
			{year:1959, title: "成为首批16所重点大学", era: "tju", desc: "天津大学被中共中央、国务院指定为首批16所国家重点大学之一", location:"天津"},
			{year:1978, title: "建设第一批独立分校", era: "tju", desc: "在天津大学的指导下，天津市成立了天津大学一至五分校，发展为今天的天津理工大学、天津城建大学", location:"天津"},
			{year:1979, title: "建设第二批独立分校", era: "tju", desc: "继续组建天津大学机电、纺织、冶金、石油分校，发展为今天的天津理工大学、天津工程职业技术学院", location:"天津"},
			{year:1981, title: "开始招收博士生", era: "tju", desc: "天津大学经国务院批准，获得中国大陆高校首批博士学位授予权", location:"天津"},
			{year:1984, title: "研究生院成立", era: "tju", desc: "天津大学成立研究生院，是中国大学中最早成立的研究生院之一", image: "./timeline/bachelor2.png", location:"天津"},
			{year:1995, title: "获评211重点高校", era: "tju", desc: "通过“211工程”部门预审，成为中国首批建设的重点大学之一", location:"天津"},
			{year:1997, title: "学院制改革", era: "tju", desc: "天津大学进行学院制改革，天津大学建筑学院等11个学院相继成立", location:"天津"},
			{year:2000, title: "入选985工程建设高校", era: "tju", desc: "南开大学与天津大学根据“共建、调整、合作、合并”方针开始了合作办学体制的探索，同时两校入围“985工程”", location:"天津"},
			{year:2009, title: "深圳研究院成立", era: "tju", desc: "天津大学深圳研究院落地深圳虚拟大学园", image: "./timeline/binhai.png", location: ["天津", "深圳"]},
			{year:2010, title: "山东研究院成立", era: "tju", desc: "天津大学与淄博高新区共建的天津大学山东研究院落地淄博", image: "./timeline/binhai.png", location: ["天津", "深圳", "淄博"]},
			{year:2011, title: "成立天津化学化工协同创新中心 ", era: "tju", desc: "天津大学与南开大学立足自身在化工与化学领域的学科优势，联合成立天津化学化工协同创新中心", image: "./timeline/tjunku.png", location:["天津", "深圳", "青岛"]},
    		{year:2014, title: "多领域多地域布局", era: "tju", desc: "成立国际工程师学院，聚焦“智能+”交叉学科，旨在培养新工科交叉学科人才；天津大学秦皇岛环保研究院、与青岛市政府共建的天津大学青岛海洋工程研究院落地", image: "./timeline/inter.png", location:["天津", "深圳", "淄博", "秦皇岛", "青岛"]},
			{year:2015, title: "北洋园校区启用", era: "tju", desc: "北洋园校区投入使用，天津大学迎来新的布局；宣怀学院成立，标志着天津大学在学生创新创业领域的发展布局", location:["天津", "深圳", "淄博", "秦皇岛", "青岛"]},
			{year:2017, title: "入选双一流高校", era: "tju", desc: "入选双一流建设高校，同时成为新工科建设工作组组长单位", location:["天津", "深圳", "淄博", "青岛", "秦皇岛"]},
			{year:2018, title: "多维度布局", era: "tju", desc: "成立新工科教育中心；成立合肥创新发展研究院；成立位于开封的天津大学中原先进技术研究院落地；设立与新加坡国立大学合办的福州国际校区", image: "./timeline/fuzhou.png", location:["天津", "深圳", "淄博", "秦皇岛", "青岛", "福州", "开封", "合肥"]},
			{year:2019, title: "大规模开设异地研究机构", era: "tju", desc: "天津大学浙江研究院落地宁波、上虞；天津大学集成电路与人工智能研究院落地泉州；天津大学区域创新发展研究院落地雄安", image: "./timeline/fuzhou.png", location:["天津", "深圳", "淄博", "秦皇岛", "青岛", "福州", "开封", "合肥", "泉州", "宁波", "上虞", "雄安"]},
			{year:2020, title: "深圳研究院成立", era: "tju", desc: "与佐治亚理工学院合办的天津大学佐治亚理工深圳学院正式成立并启动招生", image: "./timeline/shenzhen.png", location:["天津", "深圳", "淄博", "秦皇岛", "青岛", "福州", "开封", "合肥", "泉州", "宁波", "上虞", "雄安"]},
			{year:2021, title: "未来技术学院、四川创新研究院成立", era: "tju", desc: "获批成立全国首批未来技术学院，主攻储能技术、脑机接口、智能系统等领域；天津大学四川创新研究院落地成都", image: "./timeline/future.png", location:["天津", "深圳", "淄博", "秦皇岛", "青岛", "福州", "开封", "合肥", "泉州", "宁波", "上虞", "雄安", "成都"]},
			{year:2023, title: "卓越工程师学院成立", era: "tju", desc: "获批成立国家卓越工程师学院，聚焦电子信息、储能、机械、材料、化工等关键领域", image: "./timeline/engineer.png", location:["天津", "深圳", "秦皇岛", "青岛", "福州", "开封", "合肥", "泉州", "宁波", "上虞", "雄安", "成都"]},
			{year:2024, title: "“地震大装置”投用", era: "tju", desc: "国家大型地震工程模拟研究设施通过验收正式投用，与水利、海洋、交通、土木工程等多领域开展合作研究", image: "./timeline/earthquake.png", location:["天津", "深圳", "秦皇岛", "青岛", "福州", "开封", "合肥", "泉州", "宁波", "上虞", "雄安", "成都"]},
			{year:2035, title: "未来发展目标", era: "future", desc: "计划建成世界一流大学，持续优化学科布局，强化人才培养的核心使命", location:["天津", "深圳", "秦皇岛", "青岛", "福州", "开封", "合肥", "泉州", "宁波", "上虞", "雄安", "成都"]},
];

        const CFG = {
            particleCount: 8000, riverWidth: 600, pixelsPerYear: 250,
            camSpeed: 0.08, starSpeed: 8, viewDepth: 6000
        };

        const THEMES = {
            peiyang: { h: 35, s: 90, l: 60, hex: '#ffaa33', rgb: '255, 170, 51' },
            chaos:   { h: 350, s: 80, l: 50, hex: '#ff0055', rgb: '255, 0, 85' },
            tju:     { h: 190, s: 90, l: 60, hex: '#00f3ff', rgb: '0, 243, 255' },
            future:  { h: 220, s: 10, l: 90, hex: '#ffffff', rgb: '255, 255, 255' }
        };

        // 真实经纬度坐标（用于D3投影）
        const CITY_GEO_COORDS = {
            "天津": [117.200983, 39.084158],
            "西安": [108.93977, 34.341574],
            "城固": [107.333673, 33.156606], // 汉中城固
            "贵阳": [106.630154, 26.647661],
            "泰顺": [119.717757, 27.567823], // 温州泰顺
            "福州": [119.29653, 26.074508],
            "深圳": [114.057868, 22.543099],
            "青岛": [120.382641, 36.067082],
            "合肥": [117.227239, 31.820587],
            "上虞": [120.869, 30.0306],
            "泉州": [118.5898, 24.9089],
            "雄安": [115.99, 38.91],
            "淄博": [118.047, 36.814],
            "开封": [114.307581, 34.797049],
            "宁波": [121.543948, 29.867806],
            "秦皇岛": [119.599021, 39.935386],
            "成都": [104.066801, 30.572816]
        };

        // 城市名到省份名/区域名的映射，用于高亮区块
        const CITY_TO_PROV = {
            "天津": "天津市",
            "西安": "陕西省",
            "城固": "陕西省",
            "贵阳": "贵州省",
            "泰顺": "浙江省",
            "福州": "福建省",
            "深圳": "广东省",
            "上虞": "浙江省",
            "青岛": "山东省",
            "泉州": "福建省",
            "雄安": "河北省",
            "淄博": "山东省",
            "合肥": "安徽省",
            "开封": "河南省",
            "宁波": "浙江省",
            "秦皇岛": "河北省",
            "成都": "四川省"
        };

        const cvs = {
            bg: document.getElementById('bg-layer').getContext('2d'),
            fx: document.getElementById('fx-layer').getContext('2d'),
            main: document.getElementById('main-layer').getContext('2d')
        };
        let W, H;
        
        let cameraZ = 0;
        let targetCameraZ = 0;
        const startYear = timelineData[0].year;
        const totalZ = (timelineData[timelineData.length - 1].year - startYear) * CFG.pixelsPerYear;
        let globalTime = 0;
        
        const river = [];
        const stars = [];
        const nodes = [];
        const mouse = { x: 0, y: 0, rx: 0, ry: 0 };
        let isHoveringCard = false;
        let hideTimer = null;
        let mapActive = false;
        
        // D3 Map Globals
        let svgMap, gMap, projection, pathGenerator;

        function init() {
            resize();
            initDraggableMenu();
            initDraggableMap(); // 初始化地图拖拽功能
            initDynamicMap(); // 初始化 D3 地图
            
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

            for(let i=0; i<300; i++) {
                stars.push({
                    x: (Math.random()-0.5) * W * 3,
                    y: (Math.random()-0.5) * H * 3,
                    z: Math.random() * 3000,
                    sz: Math.random() * 2
                });
            }
        }

        // --- D3 Map Logic ---
        function initDynamicMap() {
            const width = 500;
            const height = 400;

            const container = d3.select("#d3-map-container");
            
            svgMap = container.append("svg")
                .attr("width", "100%")
                .attr("height", "100%")
                .attr("viewBox", `0 0 ${width} ${height}`);

            gMap = svgMap.append("g");

            // 设置投影，聚焦中国
            projection = d3.geoMercator()
                .center([105, 38]) // 中国中心大致经纬度
                .scale(450) // 放大地图 (原350 -> 450)
                .translate([width / 2, height / 2]);

            pathGenerator = d3.geoPath().projection(projection);

            // 加载 GeoJSON 数据
            d3.json('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
                .then(data => {
                    // 绘制地图路径
                    gMap.selectAll("path")
                        .data(data.features)
                        .enter()
                        .append("path")
                        .attr("d", pathGenerator)
                        .attr("class", "province-path")
                        .attr("id", d => `prov-${d.properties.name}`); // 使用省份名作为ID

                    // 绘制城市节点
                    const cities = Object.keys(CITY_GEO_COORDS);
                    const cityGroup = gMap.append("g").attr("class", "cities-group");

                    cities.forEach(city => {
                        const coords = projection(CITY_GEO_COORDS[city]);
                        if(coords) {
                            const nodeG = cityGroup.append("g")
                                .attr("transform", `translate(${coords[0]}, ${coords[1]})`)
                                .attr("id", `city-node-${city}`);

                                    // Main dot (先创建主点，便于使用 ".city-dot.active + .city-dot-pulse" 的 CSS 选择器)
                                    nodeG.append("circle")
                                        .attr("r", 3)
                                        .attr("class", "city-dot");

                                    // Pulse effect circle
                                    nodeG.append("circle")
                                        .attr("r", 3)
                                        .attr("class", "city-dot-pulse");
                            
                            // Label
                            nodeG.append("text")
                                .attr("class", "city-label-text")
                                .text(city);
                        }
                    });
                })
                .catch(err => {
                    console.error("Map loading failed:", err);
                    d3.select("#d3-map-container").append("div")
                      .style("color", "red").style("padding","20px")
                      .text("MAP DATA LOAD FAILED (Network/CORS error)");
                });
        }

        function updateMapHighlight(locationName) {
            // 1. 重置所有高亮
            d3.selectAll(".province-path").classed("active", false);
            d3.selectAll(".city-dot").classed("active", false);

            if (!locationName) return;

            // 支持多种 location 表示：数组，逗号/顿号分隔字符串，或单一字符串
            let locations = [];
            if (Array.isArray(locationName)) {
                locations = locationName;
            } else if (typeof locationName === 'string') {
                // 支持中文顿号（，）或英文逗号分隔
                locations = locationName.split(/[，,]\s*/).filter(Boolean);
            }

            locations.forEach(loc => {
                console.debug('[MAP-HIGHLIGHT] attempting highlight for:', loc);
                // 2. 高亮省份 (Area)
                const provName = CITY_TO_PROV[loc];
                if (provName) {
                    // 模糊匹配，因为GeoJSON里的名字可能是 "陕西省" 或 "陕西"
                    const provMatches = d3.selectAll(".province-path").filter(function() {
                        const id = d3.select(this).attr("id");
                        return id && id.includes(provName);
                    });
                    const provCount = provMatches.size ? provMatches.size() : (provMatches.nodes ? provMatches.nodes().length : 0);
                    console.debug('[MAP-HIGHLIGHT] province lookup for', provName, 'matches:', provCount);
                    provMatches.classed("active", true);
                }

                // 3. 高亮城市节点 (Point) — 使用 getElementById 获取元素以避免 CSS 选择器在包含非 ASCII 字符时失败
                const cityNodeId = `city-node-${loc}`;
                const cityNodeEl = document.getElementById(cityNodeId);
                if (cityNodeEl) {
                    console.debug('[MAP-HIGHLIGHT] found city node element for', loc, cityNodeEl);
                    const dotSel = d3.select(cityNodeEl).select('.city-dot');
                    if (!dotSel.empty && !dotSel.empty()) {
                        dotSel.classed('active', true);
                    } else if (dotSel.empty && dotSel.empty()) {
                        // older d3 versions may use empty() differently; fallback
                        d3.select(cityNodeEl).selectAll('.city-dot').classed('active', true);
                    }
                    // 也通过相邻的脉冲圈触发动画类，并确保可见
                    const pulse = d3.select(cityNodeEl).select('.city-dot-pulse');
                    if (!pulse.empty && !pulse.empty()) pulse.style('opacity', 1);
                    else d3.select(cityNodeEl).selectAll('.city-dot-pulse').style('opacity', 1);
                } else {
                    console.debug('[MAP-HIGHLIGHT] city node NOT found for', loc, ' — expected id:', cityNodeId);
                }
            });
        }
        // --- End D3 Map Logic ---

        function resize() {
            W = window.innerWidth; H = window.innerHeight;
            [cvs.bg.canvas, cvs.fx.canvas, cvs.main.canvas].forEach(c => { c.width = W; c.height = H; });
        }
        window.addEventListener('resize', resize);

        function getRiverSpine(z) {
            const k = z * 0.0008;
            return {
                x: Math.sin(k) * 400 + Math.cos(k*2.1) * 200,
                y: Math.sin(k*1.5) * 150 + 100
            };
        }

        function project(x, y, z) {
            const depth = z - cameraZ;
            const px = -mouse.rx * 50;
            const py = -mouse.ry * 50;
            if (depth < 10) return null;
            const scale = 800 / depth;
            return { x: W/2 + (x + px) * scale, y: H/2 + (y + py) * scale, s: scale, d: depth };
        }

        function render() {
            globalTime += 0.05;
            cameraZ += (targetCameraZ - cameraZ) * CFG.camSpeed;

            const currentYear = Math.round(startYear + cameraZ / CFG.pixelsPerYear);
            const yearDisplay = document.getElementById('year-display');
            if(yearDisplay) yearDisplay.innerText = `CURRENT YEAR: ${currentYear}`;

            const progress = Math.max(0, Math.min(1, cameraZ / totalZ));
            const percent = progress * 100;
            const progressBar = document.getElementById('timeline-progress-bar');
            const indicator = document.getElementById('timeline-indicator');
            if (progressBar) progressBar.style.height = percent + '%';
            if (indicator) indicator.style.bottom = percent + '%';

            let nearestNode = null;
            let minDiff = Infinity;
            nodes.forEach(n => {
                const diff = Math.abs(n.z - cameraZ);
                if(diff < minDiff) { minDiff = diff; nearestNode = n; }
            });
            
            const label = document.getElementById('timeline-event-label');
            if(label && nearestNode) {
                label.innerText = `${nearestNode.year} ${nearestNode.title}`;
                label.style.opacity = Math.max(0.3, 1 - minDiff / 1000);
            }
            
            // Sync Map Highlighting based on nearest timeline node
            if (nearestNode && mapActive) {
                updateMapHighlight(nearestNode.location);
            }

            cvs.bg.fillStyle = 'rgba(0,0,0,0.6)'; cvs.bg.fillRect(0,0,W,H);
            cvs.fx.clearRect(0,0,W,H); cvs.main.clearRect(0,0,W,H);

            cvs.bg.fillStyle = '#fff';
            stars.forEach(s => {
                s.z -= CFG.starSpeed;
                if (s.z < 1) s.z += 3000; if (s.z > 3000) s.z -= 3000;
                const p = project(s.x, s.y, s.z + cameraZ);
                if (p) {
                    cvs.bg.beginPath(); cvs.bg.moveTo(p.x, p.y);
                    cvs.bg.lineTo(p.x - (p.x-W/2)*0.05, p.y - (p.y-H/2)*0.05);
                    cvs.bg.strokeStyle = `rgba(255,255,255,${Math.min(1, p.s)})`;
                    cvs.bg.lineWidth = s.sz * p.s; cvs.bg.stroke();
                }
            });

            cvs.main.globalCompositeOperation = 'lighter';
            river.forEach(p => {
                if (p.z < cameraZ - 500) p.z += CFG.viewDepth;
                if (p.z > cameraZ + CFG.viewDepth - 500) p.z -= CFG.viewDepth;
                const spine = getRiverSpine(p.z);
                const wave = Math.sin(globalTime * p.speed * 0.1 + p.phase) * 20;
                const x = spine.x + p.xOff + wave;
                const y = spine.y + p.yOff;
                const proj = project(x, y, p.z);

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

            const renderNodes = nodes.map(n => {
                const spine = getRiverSpine(n.z);
                const nY = spine.y - 180; 
                return { ...n, p: project(spine.x, nY, n.z), spineP: project(spine.x, spine.y, n.z), rawY: nY, rawX: spine.x };
            }).filter(n => n.p).sort((a,b) => b.p.d - a.p.d);

            let activeNode = null;
            renderNodes.forEach(n => {
                const p = n.p; const theme = THEMES[n.era]; const size = 35 * p.s;
                const dx = mouse.x - p.x; const dy = mouse.y - p.y;
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
                if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
                updateUI(activeNode);
            } else if (isHoveringCard) {
                if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
            } else {
                const card = document.getElementById('holo-card');
                if (card.classList.contains('active') && !hideTimer) {
                    hideTimer = setTimeout(() => { updateUI(null); hideTimer = null; }, 300);
                }
            }
            requestAnimationFrame(render);
        }

        function drawNode(ctx, p, r, theme, rings, isHover, year) {
            ctx.save(); ctx.translate(p.x, p.y);
            const glowR = isHover ? r * 4 : r * 2;
            const grad = ctx.createRadialGradient(0,0,r*0.2, 0,0,glowR);
            grad.addColorStop(0, theme.hex); grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad; ctx.globalAlpha = isHover ? 0.6 : 0.3;
            ctx.beginPath(); ctx.arc(0,0,glowR,0,Math.PI*2); ctx.fill();
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0,0,r*0.3,0,Math.PI*2); ctx.fill();
            ctx.strokeStyle = theme.hex;
            rings.forEach((ring, i) => {
                ctx.save();
                ctx.rotate(ring.angle + globalTime * ring.speed * (isHover?5:1));
                ctx.beginPath();
                ctx.ellipse(0, 0, r*ring.r, r*ring.r*0.4, 0, 0, Math.PI*2);
                ctx.lineWidth = (isHover?2:1)*p.s; ctx.stroke();
                if(isHover) {
                    const lx = Math.cos(globalTime*5)*r*ring.r;
                    const ly = Math.sin(globalTime*5)*r*ring.r*0.4;
                    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(lx,ly,2*p.s,0,Math.PI*2); ctx.fill();
                }
                ctx.restore();
            });
            if (p.d < 4000) {
                ctx.fillStyle = '#fff'; ctx.font = `700 ${14*p.s}px 'Orbitron'`;
                ctx.textAlign = 'center'; ctx.shadowColor = theme.hex; ctx.shadowBlur = 10;
                ctx.fillText(year, 0, -r*1.5); ctx.shadowBlur = 0;
            }
            ctx.restore();
        }

        window.addEventListener('mousemove', e => {
            mouse.x = e.clientX; mouse.y = e.clientY;
            mouse.rx = (e.clientX/W)*2-1; mouse.ry = (e.clientY/H)*2-1;
            const cursor = document.getElementById('cursor');
            cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px';
        });

        window.addEventListener('mousedown', (e) => {
            if(document.getElementById('menu-trigger').contains(e.target)) return;
            if(document.querySelector('.sub-btn:hover')) return;
            if(document.getElementById('geo-overlay').contains(e.target)) return; 
            document.getElementById('cursor').classList.add('active');
            targetCameraZ += 300;
        });
        window.addEventListener('mouseup', () => {
            document.getElementById('cursor').classList.remove('active');
        });

        window.addEventListener('wheel', e => { targetCameraZ += e.deltaY * 5; });

        const cardEl = document.getElementById('holo-card');
        cardEl.addEventListener('mouseenter', () => isHoveringCard = true);
        cardEl.addEventListener('mouseleave', () => isHoveringCard = false);

        let activeTitle = null;
        function updateUI(node) {
            const card = document.getElementById('holo-card');
            const cursor = document.getElementById('cursor');
            const btn = document.getElementById('c-detail-btn');
            const mapContainer = document.getElementById('c-map-container');
            
            if (node) {
                if (activeTitle !== node.title) {
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
                    activeTitle = node.title;
                }
            } else {
                card.classList.remove('active');
                const uiLayer = document.getElementById('ui-layer');
                if (uiLayer) uiLayer.style.pointerEvents = 'none';
                activeTitle = null;
            }
        }

        function initDraggableMenu() {
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

        function initDraggableMap() {
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

        function toggleTechMenu() { document.getElementById('tech-menu-container').classList.toggle('active'); }

        function menuAction(action) {
            if (action === 'GEO_LOC') {
                const mapOverlay = document.getElementById('geo-overlay');
                mapActive = !mapActive;
                if (mapActive) {
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

        function warpJump() {
            const nextNode = nodes.find(n => n.z > cameraZ + 100);
            if (nextNode) {
                targetCameraZ = nextNode.z;
                document.body.style.filter = 'brightness(1.5) blur(2px)';
                setTimeout(() => { document.body.style.filter = 'none'; }, 200);
            } else {
                targetCameraZ = 0;
                document.body.style.filter = 'invert(1)';
                setTimeout(() => { document.body.style.filter = 'none'; }, 600);
            }
        }

        init();
        render();
