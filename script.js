const SUN_SIGNS = [
    { id: 'aries', name: '牡羊座', flavor: '烈焰辣椒生薑餅' },
    { id: 'taurus', name: '金牛座', flavor: '頂級焦糖海鹽餅' },
    { id: 'gemini', name: '雙子座', flavor: '香草橙花雙色餅' },
    { id: 'cancer', name: '巨蟹座', flavor: '奶油香草棉花糖餅' },
    { id: 'leo', name: '獅子座', flavor: '陽光芒果黃油酥' },
    { id: 'virgo', name: '處女座', flavor: '抹茶花草纖維餅' },
    { id: 'libra', name: '天秤座', flavor: '伯爵茶薰衣草酥' },
    { id: 'scorpio', name: '天蠍座', flavor: '黑可可黑櫻桃餅' },
    { id: 'sagittarius', name: '射手座', flavor: '肉桂威士計胡桃酥' },
    { id: 'capricorn', name: '摩羯座', flavor: '濃縮咖啡黑麥餅' },
    { id: 'aquarius', name: '水瓶座', flavor: '檸檬羅勒氣泡糖' },
    { id: 'pisces', name: '雙魚座', flavor: '玫瑰荔枝慕斯餅' },
];

const MBTI_FILLINGS = [
    { id: 'istj', description: '濃郁黑巧克力塊 (厚實、可靠、有結構感)' },
    { id: 'isfj', description: '絲滑馬斯卡彭奶酪餡 (溫暖、經典、安撫人心)' },
    { id: 'infj', description: '玫瑰花瓣與紫羅蘭糖霜 (夢幻、溫柔、理想主義)' },
    { id: 'intj', description: '濃縮咖啡黑麥碎 (深沉、苦甜、複雜思維)' },
    { id: 'istp', description: '碎焦糖辣椒粒 (即時、衝動、具爆發性)' },
    { id: 'isfp', description: '兩種果醬混搭流心 (自由、變化、不規則)' },
    { id: 'infp', description: '經典香草流心醬 (純粹、療癒、尋求意義)' },
    { id: 'intp', description: '薄荷巧克力碎夾心 (清晰、理性、注重細節)' },
    { id: 'estp', description: '朗姆酒葡萄乾內餡 (外放、享樂、追求體驗)' },
    { id: 'esfp', description: '焦糖鏡面流心 (華麗、社交、吸引目光)' },
    { id: 'enfp', description: '跳跳糖氣泡夾心 (外向、新穎、充滿驚喜)' },
    { id: 'entp', description: '檸檬羅勒氣泡水糖 (辯論、獨特、聰明)' },
    { id: 'estj', description: '焦糖核桃太妃糖塊 (強硬、實用、注重成果)' },
    { id: 'esfj', description: '檸檬卡士達慕斯 (社交、平衡、追求和諧)' },
    { id: 'enfj', description: '黑櫻桃覆盆子醬 (熱情、滋養、強烈情感)' },
    { id: 'entj', description: '黑可可榛果醬 (控制、決斷、權威)' },
];

const state = {
    sunId: 'aries',
    mbtiId: 'intj',
    isAnalyzing: false
};

const dom = {
    sunSelect: document.getElementById('sun-select'),
    mbtiSelect: document.getElementById('mbti-select'),
    analyzeBtn: document.getElementById('analyze-btn'),
    loadingOverlay: document.getElementById('loading-overlay'),
    cookieImg: document.getElementById('cookie-img'),
    fillingImg: document.getElementById('filling-img'),
    pTitleSun: document.getElementById('product-title-sun'),
    pTitleFilling: document.getElementById('product-title-filling'),
    pFlavorSun: document.getElementById('product-flavor-sun'),
    pFlavorFilling: document.getElementById('product-flavor-filling')
};

function init() {
    if (dom.sunSelect && dom.mbtiSelect) {
        populateSelects();
        updateUI();
    }
    setupEventListeners();
}

function populateSelects() {
    dom.sunSelect.innerHTML = SUN_SIGNS.map(s => 
        `<option value="${s.id}">${s.name} - ${s.flavor}</option>`
    ).join('');
    dom.mbtiSelect.innerHTML = MBTI_FILLINGS.map(f => 
        `<option value="${f.id}">${f.id.toUpperCase()}</option>`
    ).join('');
}

function setupEventListeners() {
    if (dom.sunSelect) {
        dom.sunSelect.addEventListener('change', (e) => {
            state.sunId = e.target.value;
        });
    }

    if (dom.mbtiSelect) {
        dom.mbtiSelect.addEventListener('change', (e) => {
            state.mbtiId = e.target.value;
        });
    }
    
    if (dom.analyzeBtn) {
        dom.analyzeBtn.addEventListener('click', () => {
            if (state.isAnalyzing) return;
            startAnalysis();
        });
    }
}

async function startAnalysis() {
    state.isAnalyzing = true;
    dom.loadingOverlay.classList.remove('d-none');
    dom.loadingOverlay.classList.add('d-flex');
    dom.analyzeBtn.disabled = true;
    dom.analyzeBtn.textContent = "運算核心解析中...";
    
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    updateUI();
    
    state.isAnalyzing = false;
    dom.loadingOverlay.classList.add('d-none');
    dom.loadingOverlay.classList.remove('d-flex');
    dom.analyzeBtn.disabled = false;
    dom.analyzeBtn.textContent = "啟動靈魂共鳴分析";
}

function updateUI() {
    if (!dom.cookieImg) return;

    const sun = SUN_SIGNS.find(s => s.id === state.sunId);
    const filling = MBTI_FILLINGS.find(f => f.id === state.mbtiId);
    const sunName2 = sun.name.substring(0, 2);
    dom.cookieImg.src = `assets/cookies/${sunName2}.png`;
    dom.fillingImg.src = `assets/fillings/${filling.id.toUpperCase()}.jpg`;
    
    dom.pTitleSun.textContent = sun.name;
    dom.pTitleFilling.textContent = filling.id.toUpperCase();
    dom.pFlavorSun.textContent = sun.flavor;
    dom.pFlavorFilling.textContent = filling.description;
    
    const viewer = dom.cookieImg.parentElement;
    viewer.classList.remove('animate-fadeIn');
    void viewer.offsetWidth; 
    viewer.classList.add('animate-fadeIn');
}

init();