import { CITY_GEO_COORDS, CITY_TO_PROV } from '../data/time_config.js';

let svgMap, gMap, projection, pathGenerator;

export function initDynamicMap() {
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

export function updateMapHighlight(locationName) {
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
        // 2. 高亮省份 (Area)
        const provName = CITY_TO_PROV[loc];
        if (provName) {
            // 模糊匹配，因为GeoJSON里的名字可能是 "陕西省" 或 "陕西"
            const provMatches = d3.selectAll(".province-path").filter(function() {
                const id = d3.select(this).attr("id");
                return id && id.includes(provName);
            });
            provMatches.classed("active", true);
        }

        // 3. 高亮城市节点 (Point) — 使用 getElementById 获取元素以避免 CSS 选择器在包含非 ASCII 字符时失败
        const cityNodeId = `city-node-${loc}`;
        const cityNodeEl = document.getElementById(cityNodeId);
        if (cityNodeEl) {
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
        }
    });
}
