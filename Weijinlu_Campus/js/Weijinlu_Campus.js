import { CAMPUS_DATA as data } from './data/campus_data.js';

let carouselInterval;

function startCarousel() {
    const images = document.querySelectorAll('.carousel-img');
    let currentIndex = 0;

    images.forEach((img, index) => {
        if (index === 0) img.classList.add('active');
        else img.classList.remove('active');
    });

    if (carouselInterval) clearInterval(carouselInterval);

    carouselInterval = setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 2000);
}

function stopCarousel() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
}

function showInfoText(htmlContent) {
    const container = document.getElementById('layoutViewContainer');
    const img = document.getElementById('layoutImg');
    const textContainer = document.getElementById('layoutText');
    img.style.display = 'none';
    textContainer.style.display = 'block';
    textContainer.innerHTML = htmlContent;
    container.style.display = 'flex';
}

function showLayout(imageSrc) {
    const container = document.getElementById('layoutViewContainer');
    const img = document.getElementById('layoutImg');
    const textContainer = document.getElementById('layoutText');
    
    img.style.display = 'block';
    textContainer.style.display = 'block';

    img.src = imageSrc;
    
    if (imageSrc && imageSrc.includes('Earthquake_Simulation_inside')) {
        textContainer.innerHTML = data.Earthquake_Simulation_inside;
    } else {
        textContainer.innerHTML = '';
        textContainer.style.display = 'none';
    }
    
    container.style.display = 'flex';
}

// Building 9
function show9Design() { showInfoText(data.Building_9.design); }
function show9Time() { showInfoText(data.Building_9.time); }
function show9Function() { showInfoText(data.Building_9.function); }

// Architecture
function showArchitectureTime() { showInfoText(data.Building_Architecture.time); }
function showArchitectureLayout() { showInfoText(data.Building_Architecture.layout); }
function showArchitectureFunction() { showInfoText(data.Building_Architecture.function); }

// Fengjicai
function showFengjicaiDesign() { showInfoText(data.Building_Fengjicai.design); }
function showFengjicaiLayout() { showInfoText(data.Building_Fengjicai.layout); }
function showFengjicaiFunction() { showInfoText(data.Building_Fengjicai.function); }

// Memorial Pavilion
function showMemorialPavilionRelief() { showInfoText(data.Memorial_Pavilion.relief); }

// Tiannan
function showTiannanCooperate() { showInfoText(data.Tiannan.cooperate); }
function showTiannanChemistry() { showInfoText(data.Tiannan.chemistry); }
function showTiannanFunction() { showInfoText(data.Tiannan.function); }


function hideLayout() {
    const container = document.getElementById('layoutViewContainer');
    container.style.display = 'none';
}

function triggerMoveUp(type) {
    const mapBg = document.querySelector('.map-bg');
    
    mapBg.style.width = '100%';
    mapBg.style.height = '100vh';
    mapBg.style.objectFit = 'cover';
    mapBg.style.margin = '0';

    mapBg.style.transform = 'translateY(-40%)';
    mapBg.style.clipPath = 'inset(40% 0 25% 0)'; 
    
    document.getElementById('overlay').style.display = 'flex';

    const Building_9DetailImg = document.getElementById('Building_9Detail');
    const Building_ArchitectureDetailImg = document.getElementById('Building_ArchitectureDetail');
    const Building_FengjicaiDetailImg = document.getElementById('Building_FengjicaiDetail');
    const Building_TiannanDetailImg = document.getElementById('Building_TiannanDetail');
    const Memorial_pavilionDetailImg = document.getElementById('Memorial_pavilionDetail');
    const GateDetailImg = document.getElementById('GateDetail');
    
    const Building9InfoCard = document.getElementById('Building9InfoCard');
    const BuildingArchitectureInfoCard = document.getElementById('BuildingArchitectureInfoCard');
    const BuildingFengjicaiInfoCard = document.getElementById('BuildingFengjicaiInfoCard');
    const BuildingTiannanInfoCard = document.getElementById('BuildingTiannanInfoCard');
    const MemorialPavilionInfoCard = document.getElementById('MemorialPavilionInfoCard');
    const GateInfoCard = document.getElementById('GateInfoCard');

    Building_9DetailImg.style.display = 'none';
    Building_ArchitectureDetailImg.style.display = 'none';
    Building_FengjicaiDetailImg.style.display = 'none';
    Building_TiannanDetailImg.style.display = 'none';
    Memorial_pavilionDetailImg.style.display = 'none';
    GateDetailImg.style.display = 'none';
    
    Building9InfoCard.style.display = 'none';
    BuildingArchitectureInfoCard.style.display = 'none';
    BuildingFengjicaiInfoCard.style.display = 'none';
    BuildingTiannanInfoCard.style.display = 'none';
    MemorialPavilionInfoCard.style.display = 'none';
    GateInfoCard.style.display = 'none';
    
    if (type === 'Building_9') {
        Building_9DetailImg.style.display = 'block';
        Building9InfoCard.style.display = 'block';
    }
    else if (type === 'Building_Architecture') {
        Building_ArchitectureDetailImg.style.display = 'block';
        BuildingArchitectureInfoCard.style.display = 'block';
    } 
    else if (type === 'Building_Fengjicai') {
        Building_FengjicaiDetailImg.style.display = 'block';
        BuildingFengjicaiInfoCard.style.display = 'block';
    } 
    else if (type === 'Building_Tiannan') {
        Building_TiannanDetailImg.style.display = 'block';
        BuildingTiannanInfoCard.style.display = 'block';
    } 
    else if (type === 'Memorial_pavilion') {
        Memorial_pavilionDetailImg.style.display = 'block';
        MemorialPavilionInfoCard.style.display = 'block';
    } 
    else if (type === 'Gate') {
        GateDetailImg.style.display = 'block';
        GateInfoCard.style.display = 'block';
    }

    document.getElementById('motoContainer').style.display = 'block';
    
    const buildings = document.querySelectorAll('.building-btn');
    buildings.forEach(btn => {
        btn.style.display = 'none';
    });
}

function resetView() {
    const mapBg = document.querySelector('.map-bg');
    
    mapBg.style.width = '100%';
    mapBg.style.height = 'auto';
    mapBg.style.objectFit = ''; 
    mapBg.style.margin = '0'; 

    mapBg.style.transform = 'translateY(0)';
    mapBg.style.clipPath = 'none'; 

    document.getElementById('overlay').style.display = 'none';

    document.getElementById('libraryCarousel').style.display = 'none';
    document.getElementById('Building_9Detail').style.display = 'none';
    document.getElementById('Building_ArchitectureDetail').style.display = 'none';
    document.getElementById('Building_FengjicaiDetail').style.display = 'none';
    document.getElementById('Building_TiannanDetail').style.display = 'none';
    document.getElementById('Memorial_pavilionDetail').style.display = 'none';
    document.getElementById('GateDetail').style.display = 'none';
    stopCarousel();

    document.getElementById('Building9InfoCard').style.display = 'none';
    document.getElementById('BuildingArchitectureInfoCard').style.display = 'none';
    document.getElementById('BuildingFengjicaiInfoCard').style.display = 'none';
    document.getElementById('BuildingTiannanInfoCard').style.display = 'none';
    document.getElementById('MemorialPavilionInfoCard').style.display = 'none';
    document.getElementById('GateInfoCard').style.display = 'none';
    
    hideLayout();

    document.getElementById('motoContainer').style.display = 'none';
    
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

// Expose functions to global scope
window.show9Design = show9Design;
window.show9Time = show9Time;
window.show9Function = show9Function;
window.showArchitectureTime = showArchitectureTime;
window.showArchitectureLayout = showArchitectureLayout;
window.showArchitectureFunction = showArchitectureFunction;
window.showFengjicaiDesign = showFengjicaiDesign;
window.showFengjicaiLayout = showFengjicaiLayout;
window.showFengjicaiFunction = showFengjicaiFunction;
window.showMemorialPavilionRelief = showMemorialPavilionRelief;
window.showTiannanCooperate = showTiannanCooperate;
window.showTiannanChemistry = showTiannanChemistry;
window.showTiannanFunction = showTiannanFunction;
window.showLayout = showLayout;
window.hideLayout = hideLayout;
window.triggerMoveUp = triggerMoveUp;
window.resetView = resetView;
window.handleClick = handleClick;

