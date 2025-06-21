// Language data for internationalization
const languages = {
    en: {
        // Page title and headers
        pageTitle: "E-Ink Music Player Lockscreen Generator | Free Online Tool for E-Reader Displays",
        mainTitle: "E-Ink Music Player Lockscreen Generator",
        subtitle: "Create custom music player lockscreens optimized for e-ink displays. Free online tool supporting Onyx Boox, reMarkable, Supernote, and other e-readers.",
        
        // SEO Meta
        metaDescription: "Create custom music player lockscreens optimized for e-ink displays. Free online tool supporting Onyx Boox, reMarkable, Supernote, and other e-readers. Apple Music style with real-time preview.",
        metaKeywords: "e-ink lockscreen, e-reader lockscreen, music player lockscreen, Onyx Boox lockscreen, reMarkable lockscreen, Supernote lockscreen, e-ink display, grayscale lockscreen, Apple Music style",

        // Form labels and controls
        devicePreset: "Device Preset:",
        customSize: "Custom Size",
        width: "Width (px):",
        height: "Height (px):",
        customSizeHelp: "Select \"Custom Size\" from device preset to enter custom dimensions",

        // Music controls
        albumArt: "Album Art:",
        artist: "Artist:",
        title: "Title:",
        lyrics: "Lyrics (optional):",
        lyricsPlaceholder: "Enter lyrics...",

        // Settings
        colorMode: "Color Mode:",
        grayscale: "Grayscale (E-Ink)",
        color: "Color",

        // Buttons
        generateWallpaper: "Generate Lockscreen",
        downloadPng: "Download PNG",
        
        // Alert messages
        heicNotSupported: "HEIC/HEIF format is not supported in web browsers. Please convert your image to JPG, PNG, or WebP format and try again.",
        imageLoadError: "Failed to load the image. Please make sure it's a valid image file (JPG, PNG, WebP, GIF, or SVG).",

        // Device groups
        deviceGroups: {
            "Onyx Boox": "Onyx Boox",
            "reMarkable": "reMarkable",
            "Crema": "Crema",
            "Innospaceone": "Innospaceone",
            "Supernote": "Supernote",
            "Kyobo": "Kyobo",
            "Hisense": "Hisense"
        },

        // Default content
        defaultArtist: "The Digital Band",
        defaultTitle: "Morning Coffee",
        defaultLyrics: `Steam rises from my favorite cup
Another day is starting up
The world is quiet, streets are still
Coffee warming up my soul

Sunshine streaming through the glass
Morning moments never last
But in this pause before the day
I find my peace in simple ways

Coffee brewing, heart is new
Every morning starts with you
Simple pleasures, simple joys
In the silence, hear my voice`,
        
        // Footer content
        aboutTitle: "About E-Ink Lockscreen Generator",
        aboutDescription: "Create stunning music player lockscreens designed specifically for e-ink displays. Our free online tool supports popular e-reader brands including",
        supportedModelsTitle: "Supported E-Reader Models",
        featuresTitle: "Features",
        footerNote: "Perfect for personalizing your e-reader with custom music-themed lockscreens. All generated lockscreens are optimized for the unique characteristics of e-ink displays.",
        
        // Device descriptions
        deviceDescriptions: {
            boox: "Poke series, Palma, Page, Note Air, Tab series, Note Lumi, Note Max",
            remarkable: "reMarkable 1, reMarkable 2, reMarkable Paper Pro",
            supernote: "A5X, A6X, Nomad, Manta",
            kyobo: "Sam 7.8, Sam 10+",
            others: "Crema, Innospaceone, Hisense e-ink devices"
        },
        
        // Feature list
        features: [
            "✓ Apple Music inspired design",
            "✓ Real-time preview with instant updates",
            "✓ Custom album art upload support",
            "✓ Grayscale optimization for e-ink displays",
            "✓ Multi-language support (English & Korean)",
            "✓ Free PNG download",
            "✓ 25+ device presets with accurate resolutions"
        ],
        
        // Footer links
        changelogLink: "📝 Changelog"
    },

    ko: {
        // Page title and headers
        pageTitle: "전자잉크 음악 플레이어 잠금화면 생성기 | 무료 온라인 이북 리더기 도구",
        mainTitle: "전자잉크 음악 플레이어 잠금화면 생성기",
        subtitle: "전자잉크 디스플레이에 최적화된 맞춤형 음악 플레이어 잠금화면을 만들어보세요. 오닉스 북스, 리마커블, 슈퍼노트 등 다양한 이북 리더기를 지원하는 무료 온라인 도구입니다.",
        
        // SEO Meta
        metaDescription: "전자잉크 디스플레이에 최적화된 맞춤형 음악 플레이어 잠금화면을 만들어보세요. 오닉스 북스, 리마커블, 슈퍼노트 등 다양한 이북 리더기 지원. 애플 뮤직 스타일의 실시간 미리보기 제공.",
        metaKeywords: "전자잉크 잠금화면, 이북 리더기 잠금화면, 음악 플레이어 잠금화면, 오닉스 북스 잠금화면, 리마커블 잠금화면, 슈퍼노트 잠금화면, 전자잉크 디스플레이, 그레이스케일 잠금화면, 애플 뮤직 스타일",

        // Form labels and controls
        devicePreset: "기기 프리셋:",
        customSize: "사용자 정의 크기",
        width: "가로 (px):",
        height: "세로 (px):",
        customSizeHelp: "사용자 정의 크기를 입력하려면 기기 프리셋에서 \"사용자 정의 크기\"를 선택하세요",

        // Music controls
        albumArt: "앨범 아트:",
        artist: "아티스트:",
        title: "제목:",
        lyrics: "가사 (선택사항):",
        lyricsPlaceholder: "가사를 입력하세요...",

        // Settings
        colorMode: "색상 모드:",
        grayscale: "흑백 (전자잉크용)",
        color: "컬러",

        // Buttons
        generateWallpaper: "잠금화면 생성",
        downloadPng: "PNG 다운로드",
        
        // Alert messages
        heicNotSupported: "HEIC/HEIF 형식은 웹 브라우저에서 지원되지 않습니다. 이미지를 JPG, PNG 또는 WebP 형식으로 변환한 후 다시 시도해주세요.",
        imageLoadError: "이미지를 불러올 수 없습니다. JPG, PNG, WebP, GIF 또는 SVG 형식의 유효한 이미지 파일인지 확인해주세요.",

        // Device groups
        deviceGroups: {
            "Onyx Boox": "오닉스 북스",
            "reMarkable": "리마커블",
            "Crema": "크레마",
            "Innospaceone": "이노스페이스원",
            "Supernote": "슈퍼노트",
            "Kyobo": "교보",
            "Hisense": "하이센스"
        },

        // Default content
        defaultArtist: "디지털 밴드",
        defaultTitle: "모닝 커피",
        defaultLyrics: `내가 좋아하는 컵에서 김이 올라와
또 다른 하루가 시작되고 있어
세상은 조용하고, 거리는 고요해
커피가 내 영혼을 따뜻하게 해

유리창을 통해 들어오는 햇살
아침의 순간들은 오래 지속되지 않아
하지만 하루가 시작되기 전 이 잠깐의 시간에
나는 단순한 방법으로 평화를 찾아

커피가 우려지고, 마음이 새로워져
매일 아침이 너와 함께 시작돼
단순한 즐거움, 단순한 기쁨
고요함 속에서, 내 목소리를 들어`,
        
        // Footer content
        aboutTitle: "전자잉크 잠금화면 생성기 소개",
        aboutDescription: "전자잉크 디스플레이를 위해 특별히 설계된 멋진 음악 플레이어 잠금화면을 만들어보세요. 저희 무료 온라인 도구는 인기 있는 이북 리더기 브랜드를 지원합니다:",
        supportedModelsTitle: "지원되는 이북 리더기 모델",
        featuresTitle: "기능",
        footerNote: "맞춤형 음악 테마 잠금화면으로 이북 리더기를 개인화하기에 완벽합니다. 모든 생성된 잠금화면은 전자잉크 디스플레이의 고유한 특성에 최적화되어 있습니다.",
        
        // Device descriptions
        deviceDescriptions: {
            boox: "Poke 시리즈, Palma, Page, Note Air, Tab 시리즈, Note Lumi, Note Max",
            remarkable: "리마커블 1, 리마커블 2, 리마커블 Paper Pro",
            supernote: "A5X, A6X, Nomad, Manta",
            kyobo: "Sam 7.8, Sam 10+",
            others: "크레마, 이노스페이스원, 하이센스 전자잉크 기기"
        },
        
        // Feature list
        features: [
            "✓ 애플 뮤직 스타일 디자인",
            "✓ 즉시 업데이트되는 실시간 미리보기",
            "✓ 사용자 정의 앨범 아트 업로드 지원",
            "✓ 전자잉크 디스플레이용 그레이스케일 최적화",
            "✓ 다국어 지원 (영어 & 한국어)",
            "✓ 무료 PNG 다운로드",
            "✓ 25개 이상의 정확한 해상도의 기기 프리셋"
        ],
        
        // Footer links
        changelogLink: "📝 변경 로그"
    }
};

// Current language state
let currentLanguage = 'ko';

// Initialize language based on browser preference - Korean first, then English
function initializeLanguage() {
    const browserLang = navigator.language.substring(0, 2);
    currentLanguage = browserLang === 'ko' ? 'ko' : 'en';
    updateLanguage();
}

// Update all text content based on current language
function updateLanguage() {
    const lang = languages[currentLanguage];

    // Update page title
    document.title = lang.pageTitle;
    
    // Update HTML lang attribute
    document.getElementById('html-lang').setAttribute('lang', currentLanguage);
    
    // Update meta tags for SEO
    updateMetaTag('description', lang.metaDescription);
    updateMetaTag('keywords', lang.metaKeywords);
    updateMetaTag('og:title', lang.mainTitle);
    updateMetaTag('og:description', lang.metaDescription);
    updateMetaTag('twitter:title', lang.mainTitle);
    updateMetaTag('twitter:description', lang.metaDescription);

    // Update text content
    updateTextContent('h1', lang.mainTitle);
    updateTextContent('.subtitle', lang.subtitle);
    updateTextContent('label[for="deviceSelect"]', lang.devicePreset);
    updateTextContent('label[for="widthInput"]', lang.width);
    updateTextContent('label[for="heightInput"]', lang.height);
    updateTextContent('#customSizeGroup small', lang.customSizeHelp);
    updateTextContent('label[for="albumArtInput"]', lang.albumArt);
    updateTextContent('label[for="artistInput"]', lang.artist);
    updateTextContent('label[for="titleInput"]', lang.title);
    updateTextContent('label[for="lyricsInput"]', lang.lyrics);
    updateTextContent('label[for="colorModeSelect"]', lang.colorMode);
    updateTextContent('#downloadBtn', lang.downloadPng);

    // Update form values
    updateFormValue('#artistInput', lang.defaultArtist);
    updateFormValue('#titleInput', lang.defaultTitle);
    updateFormValue('#lyricsInput', lang.defaultLyrics);
    updatePlaceholder('#lyricsInput', lang.lyricsPlaceholder);

    // Update device preset dropdown
    updateDevicePresets();
    updateColorModeOptions();
    
    // Update footer content
    updateFooterContent();
}

// Helper function to update meta tags
function updateMetaTag(name, content) {
    let meta = document.querySelector(`meta[name="${name}"]`) || 
               document.querySelector(`meta[property="${name}"]`);
    if (meta) {
        meta.setAttribute('content', content);
    }
}

// Helper function to update text content
function updateTextContent(selector, text) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = text;
    }
}

// Helper function to update form values
function updateFormValue(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
        element.value = value;
    }
}

// Helper function to update placeholder
function updatePlaceholder(selector, placeholder) {
    const element = document.querySelector(selector);
    if (element) {
        element.placeholder = placeholder;
    }
}

// Update device preset dropdown with localized group names
function updateDevicePresets() {
    const deviceSelect = document.getElementById('deviceSelect');
    const optgroups = deviceSelect.querySelectorAll('optgroup');
    const lang = languages[currentLanguage];

    // Update "Custom Size" option
    const customOption = deviceSelect.querySelector('option[value="custom"]');
    if (customOption) {
        customOption.textContent = lang.customSize;
    }

    optgroups.forEach(optgroup => {
        const originalLabel = optgroup.getAttribute('data-original-label') || optgroup.label;
        if (!optgroup.getAttribute('data-original-label')) {
            optgroup.setAttribute('data-original-label', originalLabel);
        }

        if (lang.deviceGroups[originalLabel]) {
            optgroup.label = lang.deviceGroups[originalLabel];
        }
    });
}

// Update color mode options
function updateColorModeOptions() {
    const colorModeSelect = document.getElementById('colorModeSelect');
    const lang = languages[currentLanguage];

    const grayscaleOption = colorModeSelect.querySelector('option[value="grayscale"]');
    const colorOption = colorModeSelect.querySelector('option[value="color"]');

    if (grayscaleOption) grayscaleOption.textContent = lang.grayscale;
    if (colorOption) colorOption.textContent = lang.color;
}

// Language switcher function
function switchLanguage(newLang) {
    if (languages[newLang]) {
        currentLanguage = newLang;
        updateLanguage();
        localStorage.setItem('preferred-language', newLang);

        // Regenerate wallpaper with new language content
        if (typeof generatePattern === 'function') {
            generatePattern();
        }
    }
}

// Load preferred language from localStorage or browser preference
function loadPreferredLanguage() {
    const saved = localStorage.getItem('preferred-language');
    if (saved && languages[saved]) {
        currentLanguage = saved;
    } else {
        // Use browser locale preference - Korean first, then English
        const locale = new Intl.DateTimeFormat().resolvedOptions().locale;
        const langCode = locale.toLowerCase().substring(0, 2);
        currentLanguage = langCode === 'ko' ? 'ko' : 'en';
    }
    updateLanguage();
}

// Update footer content
function updateFooterContent() {
    const lang = languages[currentLanguage];
    const footer = document.querySelector('.footer');
    
    if (!footer) return;
    
    // Update footer titles and descriptions
    updateTextContent('.footer h2', lang.aboutTitle);
    updateTextContent('.footer h3:nth-of-type(1)', lang.supportedModelsTitle);
    updateTextContent('.footer h3:nth-of-type(2)', lang.featuresTitle);
    updateTextContent('.footer-note', lang.footerNote);
    
    // Update about description
    const aboutDesc = document.querySelector('.footer p:first-of-type');
    if (aboutDesc) {
        aboutDesc.innerHTML = `${lang.aboutDescription} <strong>Onyx Boox</strong>, <strong>reMarkable</strong>, <strong>Supernote</strong>, <strong>Kyobo</strong>, <strong>Crema</strong>, <strong>Innospaceone</strong>, <strong>Hisense</strong> devices.`;
    }
    
    // Update device list
    const deviceList = document.querySelector('.device-list');
    if (deviceList) {
        deviceList.innerHTML = `
            <li><strong>Onyx Boox:</strong> ${lang.deviceDescriptions.boox}</li>
            <li><strong>reMarkable:</strong> ${lang.deviceDescriptions.remarkable}</li>
            <li><strong>Supernote:</strong> ${lang.deviceDescriptions.supernote}</li>
            <li><strong>Kyobo:</strong> ${lang.deviceDescriptions.kyobo}</li>
            <li><strong>${lang.deviceGroups["Other Devices"] || "Other brands"}:</strong> ${lang.deviceDescriptions.others}</li>
        `;
    }
    
    // Update features list
    const featuresList = document.querySelector('.features-list');
    if (featuresList) {
        featuresList.innerHTML = lang.features.map(feature => `<li>${feature}</li>`).join('');
    }
    
    // Update footer links
    updateTextContent('#changelog-link', lang.changelogLink);
}

// Export functions for use in other scripts
window.switchLanguage = switchLanguage;
window.loadPreferredLanguage = loadPreferredLanguage;