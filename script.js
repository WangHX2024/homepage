// 语言翻译数据
const translations = {
    zh: {
        name: "王浩雄",
        title: "浙江大学 竺可桢学院混合班",
        subtitle: "计算机科学与技术 2023级本科生",
        // phoneLabel: "电话",
        // phoneValue: "+86-***********",
        emailLabel: "邮箱",
        wechatLabel: "微信",
        locationLabel: "地址",
        locationValue: "中国浙江省杭州市西湖区浙大路38号 310000",
        homeLink: "个人主页",
        notesLink: "课程笔记",
        copyrightText: "Copyright © 2023 - 2025 WangHX.",
        licenseLink: "冀ICP备2024085995号",
        updateText: "最后更新：2026-02-22",
        paletteTitle: "选择配色",
        colorDefault: "默认蓝",
        colorEmerald: "翡翠绿",
        colorPurple: "魅力紫",
        colorRose: "玫瑰红",
        colorAmber: "琥珀金",
        languageTitle: "选择语言"
    },
    en: {
        name: "Wang Haoxiong",
        title: "Chu Kochen Honors College, Zhejiang University",
        subtitle: "Computer Science & Technology Undergraduate, Enrolled at 2023",
        // phoneLabel: "Phone",
        // phoneValue: "+86-***********,
        emailLabel: "Email",
        wechatLabel: "WeChat",
        locationLabel: "Address",
        locationValue: "38 Zheda Road, Xihu District, Hangzhou, Zhejiang, China 310000",
        homeLink: "Homepage",
        notesLink: "Course Notes",
        copyrightText: "Copyright © 2023 - 2025 WangHX.",
        licenseLink: "License: 冀ICP备2024085995号",
        updateText: "Last updated: 2026-02-22",
        paletteTitle: "Choose Color",
        colorDefault: "Default Blue",
        colorEmerald: "Emerald Green",
        colorPurple: "Purple Magic",
        colorRose: "Rose Pink",
        colorAmber: "Amber Gold",
        languageTitle: "Choose Language"
    }
};

// 状态变量
let currentLang = localStorage.getItem('language') || 'en';
let isDarkMode = localStorage.getItem('darkMode') === 'true';
let currentColorTheme = localStorage.getItem('colorTheme') || 'default';

// 初始化主题
function initTheme() {
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('themeToggle').textContent = '☀️';
    } else {
        document.documentElement.removeAttribute('data-theme');
        document.getElementById('themeToggle').textContent = '🌙';
    }
}

// 切换主题
function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    initTheme();
    initParticles();
}

// 更新语言
function updateLanguage() {
    const lang = translations[currentLang];
    
    document.getElementById('nameText').textContent = lang.name;
    document.getElementById('titleText').textContent = lang.title;
    document.getElementById('subtitleText').textContent = lang.subtitle;
    
    // 更新联系信息标签和值
    // document.getElementById('phoneLabel').textContent = lang.phoneLabel;
    // document.getElementById('phoneValue').textContent = lang.phoneValue;
    document.getElementById('emailLabel').textContent = lang.emailLabel;
    document.getElementById('wechatLabel').textContent = lang.wechatLabel;
    document.getElementById('locationLabel').textContent = lang.locationLabel;
    document.getElementById('locationValue').textContent = lang.locationValue;
    
    // 更新社交链接
    document.getElementById('homeLink').textContent = lang.homeLink;
    document.getElementById('notesLink').textContent = lang.notesLink;
    
    // 更新底部信息
    document.getElementById('copyrightText').textContent = lang.copyrightText;
    document.getElementById('licenseLink').textContent = lang.licenseLink;
    document.getElementById('updateText').textContent = lang.updateText;
    
    // 更新调色盘
    document.getElementById('paletteTitle').textContent = lang.paletteTitle;
    document.getElementById('colorDefault').textContent = lang.colorDefault;
    document.getElementById('colorEmerald').textContent = lang.colorEmerald;
    document.getElementById('colorPurple').textContent = lang.colorPurple;
    document.getElementById('colorRose').textContent = lang.colorRose;
    document.getElementById('colorAmber').textContent = lang.colorAmber;
    
    // 更新语言面板
    document.getElementById('languageTitle').textContent = lang.languageTitle;
    
    // 更新页面标题
    document.title = currentLang === 'zh' ? '王浩雄的个人名片' : "Wang Haoxiong's Portfolio";
}



// 初始化配色主题
function initColorTheme() {
    if (currentColorTheme !== 'default') {
        document.documentElement.setAttribute('data-color-theme', currentColorTheme);
    }
    
    // 更新调色盘选中状态
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.theme === currentColorTheme) {
            option.classList.add('active');
        }
    });
}

// 切换配色主题
function changeColorTheme(theme) {
    currentColorTheme = theme;
    localStorage.setItem('colorTheme', theme);
    
    if (theme === 'default') {
        document.documentElement.removeAttribute('data-color-theme');
    } else {
        document.documentElement.setAttribute('data-color-theme', theme);
    }
    
    // 更新调色盘选中状态
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.theme === theme) {
            option.classList.add('active');
        }
    });
    
    // 重新初始化粒子效果以适应新配色
    initParticles();
}

// 显示调色盘
function showColorPalette() {
    const palette = document.getElementById('colorPalette');
    palette.classList.add('show');
    // 清除任何待定的隐藏定时器
    if (window.hideColorPaletteTimer) {
        clearTimeout(window.hideColorPaletteTimer);
        window.hideColorPaletteTimer = null;
    }
}

// 延迟隐藏调色盘
function hideColorPaletteDelayed() {
    // 清除之前的定时器
    if (window.hideColorPaletteTimer) {
        clearTimeout(window.hideColorPaletteTimer);
    }
    
    // 延迟200ms隐藏，给用户时间移动鼠标
    window.hideColorPaletteTimer = setTimeout(() => {
        const palette = document.getElementById('colorPalette');
        palette.classList.remove('show');
    }, 200);
}

// 切换调色盘显示（保留兼容性）
function toggleColorPalette() {
    const palette = document.getElementById('colorPalette');
    palette.classList.toggle('show');
}

// 显示语言面板
function showLanguagePalette() {
    const palette = document.getElementById('languagePalette');
    palette.classList.add('show');
    // 清除任何待定的隐藏定时器
    if (window.hideLanguagePaletteTimer) {
        clearTimeout(window.hideLanguagePaletteTimer);
        window.hideLanguagePaletteTimer = null;
    }
}

// 延迟隐藏语言面板
function hideLanguagePaletteDelayed() {
    // 清除之前的定时器
    if (window.hideLanguagePaletteTimer) {
        clearTimeout(window.hideLanguagePaletteTimer);
    }
    
    // 延迟200ms隐藏，给用户时间移动鼠标
    window.hideLanguagePaletteTimer = setTimeout(() => {
        const palette = document.getElementById('languagePalette');
        palette.classList.remove('show');
    }, 200);
}

// 初始化语言状态
function initLanguage() {
    // 更新语言面板选中状态
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.lang === currentLang) {
            option.classList.add('active');
        }
    });
}

// 切换语言
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    updateLanguage();
    
    // 更新语言面板选中状态
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.lang === lang) {
            option.classList.add('active');
        }
    });
}

// 初始化粒子效果
function initParticles() {
    // 根据当前配色主题获取粒子颜色
    let particleColor = "#0288d1"; // 默认蓝色
    
    if (currentColorTheme === 'emerald') {
        particleColor = "#10b981";
    } else if (currentColorTheme === 'purple') {
        particleColor = "#a855f7";
    } else if (currentColorTheme === 'rose') {
        particleColor = "#f43f5e";
    } else if (currentColorTheme === 'amber') {
        particleColor = "#f59e0b";
    }
    
    // 黑夜模式下使用白色粒子
    if (isDarkMode) {
        particleColor = "#ffffff";
    }
    
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 60,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": { "value": particleColor },
            "shape": {
                "type": "circle",
                "stroke": { "width": 0, "color": "#000000" }
            },
            "opacity": {
                "value": 0.5,
                "random": true
            },
            "size": {
                "value": 4,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": particleColor,
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "out_mode": "out"
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "repulse"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 180,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "repulse": {
                    "distance": 150,
                    "duration": 1,
                    "speed": 4
                }
            }
        },
        "retina_detect": true
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initColorTheme();
    initLanguage();
    updateLanguage();
    initParticles();

    // 绑定调色盘事件监听器
    const colorToggle = document.getElementById('colorToggle');
    const colorPalette = document.getElementById('colorPalette');
    
    // 鼠标悬停显示调色盘
    colorToggle.addEventListener('mouseenter', showColorPalette);
    colorPalette.addEventListener('mouseenter', showColorPalette);
    
    // 鼠标离开隐藏调色盘（延迟隐藏）
    colorToggle.addEventListener('mouseleave', hideColorPaletteDelayed);
    colorPalette.addEventListener('mouseleave', hideColorPaletteDelayed);
    
    // 绑定语言面板事件监听器
    const langToggle = document.getElementById('langToggle');
    const languagePalette = document.getElementById('languagePalette');
    
    // 鼠标悬停显示语言面板
    langToggle.addEventListener('mouseenter', showLanguagePalette);
    languagePalette.addEventListener('mouseenter', showLanguagePalette);
    
    // 鼠标离开隐藏语言面板（延迟隐藏）
    langToggle.addEventListener('mouseleave', hideLanguagePaletteDelayed);
    languagePalette.addEventListener('mouseleave', hideLanguagePaletteDelayed);
    
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // 绑定调色盘选项事件
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', () => {
            changeColorTheme(option.dataset.theme);
        });
    });
    
    // 绑定语言选项事件
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', () => {
            changeLanguage(option.dataset.lang);
        });
    });

    // 添加卡片3D倾斜效果、动态阴影和金属反光
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const card = document.querySelector('.card');
        const moveX = (mouseX - 0.5) * 15;
        const moveY = (mouseY - 0.5) * 15;
        
        // 计算阴影偏移（减少偏移量让阴影更柔和）
        const shadowX = (mouseX - 0.5) * 20;
        const shadowY = (mouseY - 0.5) * 20;
        
        // 计算阴影模糊度（减少强度）
        const shadowBlur = 12 + Math.abs(shadowX) * 0.3 + Math.abs(shadowY) * 0.3;
        
        // 计算反光位置
        const reflectionX = mouseX * 100;
        const reflectionY = mouseY * 100;
        
        // 应用3D变换和动态阴影
        card.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
        card.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.15)`;
        
        // 控制金属反光效果
        const reflection = card.querySelector('::before') || card;
        card.style.setProperty('--reflection-x', `${reflectionX}%`);
        card.style.setProperty('--reflection-y', `${reflectionY}%`);
        
        // 显示反光效果
        const cardBefore = card.style;
        cardBefore.setProperty('--reflection-opacity', '1');
    });

    // 鼠标离开时重置卡片位置、阴影和反光
    document.addEventListener('mouseleave', () => {
        const card = document.querySelector('.card');
        card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)';
        card.style.setProperty('--reflection-opacity', '0');
    });
});
