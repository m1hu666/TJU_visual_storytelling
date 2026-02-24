import { CONTENT } from './data/content.js';

let carouselInterval; // 用于存储轮播定时器 ID

function startCarousel() {
    const images = document.querySelectorAll('.carousel-img');
    let currentIndex = 0;

    // 确保初始状态正确
    images.forEach((img, index) => {
        if (index === 0) img.classList.add('active');
        else img.classList.remove('active');
    });

    // 清除可能存在的旧定时器
    if (carouselInterval) clearInterval(carouselInterval);

    carouselInterval = setInterval(() => {
        // 当前图片移除 active
        images[currentIndex].classList.remove('active');
        
        // 计算下一张索引
        currentIndex = (currentIndex + 1) % images.length;
        
        // 下一张图片添加 active
        images[currentIndex].classList.add('active');
    }, 2000); // 每 3 秒切换一次
}

function stopCarousel() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
}

// 显示布局图片
function showLayout(imageSrc) {
    const container = document.getElementById('layoutViewContainer');
    const img = document.getElementById('layoutImg');
    const textContainer = document.getElementById('layoutText');
    const chartContainer = document.getElementById('d3-chart-container');
    
    // Reset chart
    chartContainer.style.display = 'none';
    chartContainer.innerHTML = '';

    // 恢复图片显示
    img.style.display = 'block';
    textContainer.style.display = 'block';

    img.src = imageSrc;
    
    // 根据不同的布局图片，设置不同的文本内容
    if (imageSrc.includes('Earthquake_Simulation_inside')) {
        textContainer.innerHTML = CONTENT.earthquake_inside;
        // Example: Draw chart for Earthquake simulation
        drawFundingPieChart(chartContainer);
    } else if (imageSrc.includes('Library_layout')) {
        textContainer.style.display = 'none'; // Optional: hide text if chart is enough
        drawLibraryDonutChart(chartContainer);
    } else {
        textContainer.innerHTML = '';
        textContainer.style.display = 'none';
    }
    
    container.style.display = 'flex';
}

function showStadiumInformation() {
    const container = document.getElementById('layoutViewContainer');
    const img = document.getElementById('layoutImg');
    const textContainer = document.getElementById('layoutText');
    const chartContainer = document.getElementById('d3-chart-container');
    
    chartContainer.style.display = 'none';
    chartContainer.innerHTML = '';

    // 隐藏图片，只显示文本
    img.style.display = 'none';
    textContainer.style.display = 'block';

    textContainer.innerHTML = CONTENT.stadium;
    
    // Add Chart for Stadium
    drawStadiumBarChart(chartContainer);

    container.style.display = 'flex';
}

// --- D3 Chart Functions ---

function drawLibraryDonutChart(container) {
    container.style.display = 'block';
    const width = 600, height = 400;
    const radius = Math.min(width, height) / 2 - 40;

    const svg = d3.select(container).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const data = {
        "工科文献": 45,
        "理科文献": 25,
        "社科文献": 20,
        "其他": 10
    };

    const color = d3.scaleOrdinal()
        .domain(Object.keys(data))
        .range(["#005792", "#133b5c", "#1e99d3", "#4facfe"]);

    const pie = d3.pie().value(d => d[1]);
    const data_ready = pie(Object.entries(data));

    const arc = d3.arc().innerRadius(radius * 0.5).outerRadius(radius * 0.8);
    const outerArc = d3.arc().innerRadius(radius * 0.9).outerRadius(radius * 0.9);

    svg.selectAll('allSlices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data[0]))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);

    // Add labels (polylines)
    svg.selectAll('allPolylines')
        .data(data_ready)
        .enter()
        .append('polyline')
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr('points', function(d) {
            const posA = arc.centroid(d);
            const posB = outerArc.centroid(d);
            const posC = outerArc.centroid(d);
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
            return [posA, posB, posC];
        });

    svg.selectAll('allLabels')
        .data(data_ready)
        .enter()
        .append('text')
        .text(d => d.data[0] + " " + d.data[1] + "%")
        .attr('transform', function(d) {
            const pos = outerArc.centroid(d);
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            return 'translate(' + pos + ')';
        })
        .style('text-anchor', d => {
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return (midangle < Math.PI ? 'start' : 'end');
        })
        .style('font-size', '14px');

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("y", -5)
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("馆藏分布");
}

function drawStadiumBarChart(container) {
    container.style.display = 'block';
    const margin = {top: 40, right: 30, bottom: 40, left: 90},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    const svg = d3.select(container).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = [
        {facility: "综合体育馆", area: 15000},
        {facility: "游泳馆", area: 8000},
        {facility: "田径场", area: 20000},
        {facility: "其他场馆", area: 5000}
    ];

    const x = d3.scaleLinear()
        .domain([0, 22000])
        .range([0, width]);
    
    const y = d3.scaleBand()
        .range([0, height])
        .domain(data.map(d => d.facility))
        .padding(0.2);

    svg.append("g")
        .call(d3.axisLeft(y).tickSize(0))
        .style("font-size", "14px");

    svg.selectAll("myRect")
        .data(data)
        .join("rect")
        .attr("x", x(0))
        .attr("y", d => y(d.facility))
        .attr("width", 0)
        .attr("height", y.bandwidth())
        .attr("fill", "#69b3a2")
        .transition()
        .duration(1000)
        .attr("width", d => x(d.area));

    svg.selectAll("myLabels")
        .data(data)
        .join("text")
        .attr("x", d => x(d.area) + 5)
        .attr("y", d => y(d.facility) + y.bandwidth() / 2 + 5)
        .text(d => d.area + " m²");
    
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .text("体育场馆面积统计");
}

function drawFundingPieChart(container) {
    container.style.display = 'block';
    const width = 600, height = 400;
    const radius = Math.min(width, height) / 2 - 40;

    const svg = d3.select(container).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const data = {
        "设备购置": 60,
        "基建工程": 30,
        "技术研发": 10
    };

    const color = d3.scaleOrdinal()
        .domain(Object.keys(data))
        .range(["#ff6b6b", "#feca57", "#48dbfb"]);

    const pie = d3.pie().value(d => d[1]);
    const data_ready = pie(Object.entries(data));
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    svg.selectAll('slices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data[0]))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);

    // Labels
    svg.selectAll('slices')
        .data(data_ready)
        .enter()
        .append('text')
        .text(d => d.data[0])
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", 12);
    
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("y", -height/2 + 20)
        .style("font-size", "16px")
        .text("15亿总投资构成(估算)");
}

function showStudentCenterDesign() {
    const container = document.getElementById('layoutViewContainer');
    const img = document.getElementById('layoutImg');
    const textContainer = document.getElementById('layoutText');

    // 隐藏图片，只显示文本
    img.style.display = 'none';
    textContainer.style.display = 'block';

    textContainer.innerHTML = CONTENT.student_center_design;
    
    container.style.display = 'flex';
}

function showStudentCenterUsage() {
    const container = document.getElementById('layoutViewContainer');
    const img = document.getElementById('layoutImg');
    const textContainer = document.getElementById('layoutText');

    // 隐藏图片，只显示文本
    img.style.display = 'none';
    textContainer.style.display = 'block';

    textContainer.innerHTML = CONTENT.student_center_usage;
    
    container.style.display = 'flex';
}

function show32BuildingInformation() {
    const container = document.getElementById('layoutViewContainer');
    const img = document.getElementById('layoutImg');
    const textContainer = document.getElementById('layoutText');

    // 隐藏图片，只显示文本
    img.style.display = 'none';
    textContainer.style.display = 'block';

    textContainer.innerHTML = CONTENT.building_32;
    
    container.style.display = 'flex';
}

function showEarthquakeHistory() {
    const container = document.getElementById('layoutViewContainer');
    const img = document.getElementById('layoutImg');
    const textContainer = document.getElementById('layoutText');

    // 隐藏图片，只显示文本
    img.style.display = 'none';
    textContainer.style.display = 'block';

    textContainer.innerHTML = CONTENT.earthquake_history;
    
    container.style.display = 'flex';
}

function showEarthquakeSignificance() {
    const container = document.getElementById('layoutViewContainer');
    const img = document.getElementById('layoutImg');
    const textContainer = document.getElementById('layoutText');

    // 隐藏图片，只显示文本
    img.style.display = 'none';
    textContainer.style.display = 'block';
    textContainer.innerHTML = CONTENT.earthquake_significance;
    
    container.style.display = 'flex';
}

// 隐藏布局图片
function hideLayout() {
    const container = document.getElementById('layoutViewContainer');
    container.style.display = 'none';
}

function triggerMoveUp(type) {
    // 背景上移
    const mapBg = document.querySelector('.map-bg');
    mapBg.style.transform = 'translateY(-40%)';
    mapBg.style.clipPath = 'inset(40% 0 25% 0)'; 
    
    // 1. 显示恢复按钮
    document.getElementById('overlay').style.display = 'flex';

    // 2. 处理左下角详情展示 (轮播图 vs 单张图)
    const carousel = document.getElementById('libraryCarousel');
    const building32Img = document.getElementById('building32Detail');
    const stadiumImg = document.getElementById('stadiumDetail');
    const earthquakeImg = document.getElementById('earthquakeDetail');
    const studentCenterImg = document.getElementById('studentCenterDetail');
    
    // Info Cards
    const libraryInfoCard = document.getElementById('libraryInfoCard');
    const building32InfoCard = document.getElementById('building32InfoCard');
    const stadiumInfoCard = document.getElementById('stadiumInfoCard');
    const earthquakeInfoCard = document.getElementById('earthquakeInfoCard');
    const studentCenterInfoCard = document.getElementById('studentCenterInfoCard');

    // 先隐藏所有详情元素
    carousel.style.display = 'none';
    building32Img.style.display = 'none';
    stadiumImg.style.display = 'none';
    earthquakeImg.style.display = 'none';
    studentCenterImg.style.display = 'none';
    
    // 隐藏所有 Info Cards
    libraryInfoCard.style.display = 'none';
    building32InfoCard.style.display = 'none';
    stadiumInfoCard.style.display = 'none';
    earthquakeInfoCard.style.display = 'none';
    studentCenterInfoCard.style.display = 'none';
    
    stopCarousel();

    if (type === 'library') {
        // 显示图书馆轮播
        carousel.style.display = 'grid';
        startCarousel();
        // 显示图书馆介绍卡片
        libraryInfoCard.style.display = 'block';
    } else if (type === 'building32') {
        // 显示 Building 32 单张图
        building32Img.style.display = 'block';
        building32InfoCard.style.display = 'block';
    } else if (type === 'stadium') {
        // 显示 Stadium 单张图
        stadiumImg.style.display = 'block';
        stadiumInfoCard.style.display = 'block';
    } else if (type === 'earthquake') {
        // 显示 Earthquake Simulation 单张图
        earthquakeImg.style.display = 'block';
        earthquakeInfoCard.style.display = 'block';
    } else if (type === 'student_center') {
        // 显示 Student Center 单张图
        studentCenterImg.style.display = 'block';
        studentCenterInfoCard.style.display = 'block';
    }

    // 4. 显示底部 Moto 图片 (通用)
    document.getElementById('motoContainer').style.display = 'block';
    
    // 5. 隐藏所有地图图标
    const buildings = document.querySelectorAll('.building-btn');
    buildings.forEach(btn => {
        btn.style.display = 'none';
    });
}

function resetView() {
    // 背景恢复
    const mapBg = document.querySelector('.map-bg');
    mapBg.style.transform = 'translateY(0)';
    mapBg.style.clipPath = 'none'; 

    // 1. 隐藏恢复按钮
    document.getElementById('overlay').style.display = 'none';

    // 2. 隐藏左下角详情 (轮播图 和 单张图)
    document.getElementById('libraryCarousel').style.display = 'none';
    document.getElementById('building32Detail').style.display = 'none';
    document.getElementById('stadiumDetail').style.display = 'none';
    document.getElementById('earthquakeDetail').style.display = 'none';
    document.getElementById('studentCenterDetail').style.display = 'none';
    stopCarousel();

    // 3. 隐藏右侧文字介绍卡片
    document.getElementById('libraryInfoCard').style.display = 'none';
    document.getElementById('building32InfoCard').style.display = 'none';
    document.getElementById('stadiumInfoCard').style.display = 'none';
    document.getElementById('earthquakeInfoCard').style.display = 'none';
    document.getElementById('studentCenterInfoCard').style.display = 'none';
    
    // 隐藏布局图 (如果打开了)
    hideLayout();

    // 4. 隐藏底部 Moto 图片
    document.getElementById('motoContainer').style.display = 'none';
    
    // 5. 延迟恢复所有地图图标
    setTimeout(() => {
        const buildings = document.querySelectorAll('.building-btn');
        buildings.forEach(btn => {
            btn.style.display = '';
        });
    }, 500);
}

function handleClick(name) {
    console.log("Clicked:", name);
    alert('你点击了：' + name);
}

// 你的手动校准参数
const DESIGN_WIDTH = 10180; 

window.onload = function() {
    const buildings = document.querySelectorAll('.building-btn');
    buildings.forEach(btn => {
        let pxWidth = btn.getAttribute('data-px-width');
        if (!pxWidth) {
            pxWidth = parseFloat(btn.style.width);
        }
        if (pxWidth) {
            const percentWidth = (pxWidth / DESIGN_WIDTH) * 100;
            btn.style.width = percentWidth + '%';
        }
    });
};

// Expose to window for inline HTML handlers
window.startCarousel = startCarousel;
window.stopCarousel = stopCarousel;
window.showLayout = showLayout;
window.showStadiumInformation = showStadiumInformation;
window.showStudentCenterDesign = showStudentCenterDesign;
window.showStudentCenterUsage = showStudentCenterUsage;
window.show32BuildingInformation = show32BuildingInformation;
window.showEarthquakeHistory = showEarthquakeHistory;
window.showEarthquakeSignificance = showEarthquakeSignificance;
window.hideLayout = hideLayout;
window.triggerMoveUp = triggerMoveUp;
window.resetView = resetView;
window.handleClick = handleClick;

