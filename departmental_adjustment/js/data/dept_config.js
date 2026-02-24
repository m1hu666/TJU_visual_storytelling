export const COLORS = { 
    bg: '#1C1A1B',
    tju: '#FFBA00',    // 天津大学 (琥珀金)
    source: '#655B50', // 来源 (岩石褐/灰)
    target: '#FFE2C7', // 去向 (浅杏/象牙)
    text: '#f1f5f9',
    dim: '#64748b'
};

export const GEO_COORD_MAP = {
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

export const DEPT_ICONS = {
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

export const DEPTS = [
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
