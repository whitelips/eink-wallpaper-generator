// Language data for internationalization
const languages = {
    en: {
        // Page title and headers
        pageTitle: "E-Ink Music Player Wallpaper",
        mainTitle: "E-Ink Music Player Wallpaper",
        subtitle: "Create music player wallpapers optimized for e-ink displays",

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
        contrast: "Contrast:",
        dithering: "Apply Dithering (Recommended for E-Ink)",

        // Buttons
        generateWallpaper: "Generate Wallpaper",
        downloadPng: "Download PNG",
        
        // Alert messages
        heicNotSupported: "HEIC/HEIF format is not supported in web browsers. Please convert your image to JPG, PNG, or WebP format and try again.",
        imageLoadError: "Failed to load the image. Please make sure it's a valid image file (JPG, PNG, WebP, GIF, or SVG).",

        // Device groups
        deviceGroups: {
            "Onyx Boox": "Onyx Boox",
            "reMarkable": "reMarkable",
            "Amazon Kindle": "Amazon Kindle",
            "Kobo": "Kobo",
            "Crema": "Crema",
            "Innospaceone": "Innospaceone",
            "Supernote": "Supernote",
            "Hisense": "Hisense",
            "Other Devices": "Other Devices"
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
In the silence, hear my voice`
    },

    ko: {
        // Page title and headers
        pageTitle: "전자잉크 음악 플레이어 배경화면",
        mainTitle: "전자잉크 음악 플레이어 배경화면",
        subtitle: "전자잉크 디스플레이에 최적화된 음악 플레이어 배경화면을 만들어보세요",

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
        contrast: "대비:",
        dithering: "디더링 적용 (전자잉크 권장)",

        // Buttons
        generateWallpaper: "배경화면 생성",
        downloadPng: "PNG 다운로드",
        
        // Alert messages
        heicNotSupported: "HEIC/HEIF 형식은 웹 브라우저에서 지원되지 않습니다. 이미지를 JPG, PNG 또는 WebP 형식으로 변환한 후 다시 시도해주세요.",
        imageLoadError: "이미지를 불러올 수 없습니다. JPG, PNG, WebP, GIF 또는 SVG 형식의 유효한 이미지 파일인지 확인해주세요.",

        // Device groups
        deviceGroups: {
            "Onyx Boox": "오닉스 북스",
            "reMarkable": "리마커블",
            "Amazon Kindle": "아마존 킨들",
            "Kobo": "코보",
            "Crema": "크레마",
            "Innospaceone": "이노스페이스원",
            "Supernote": "슈퍼노트",
            "Hisense": "하이센스",
            "Other Devices": "기타 기기"
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
고요함 속에서, 내 목소리를 들어`
    }
};

// Current language state
let currentLanguage = 'en';

// Initialize language based on browser preference or default to English
function initializeLanguage() {
    const browserLang = navigator.language.substring(0, 2);
    currentLanguage = languages[browserLang] ? browserLang : 'en';
    updateLanguage();
}

// Update all text content based on current language
function updateLanguage() {
    const lang = languages[currentLanguage];

    // Update page title
    document.title = lang.pageTitle;

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
    updateTextContent('label[for="contrastSlider"]', lang.contrast);
    // Update dithering label text while preserving checkbox
    const ditheringLabel = document.querySelector('label[for="ditheringCheck"]');
    if (ditheringLabel) {
        const checkbox = ditheringLabel.querySelector('input[type="checkbox"]');
        ditheringLabel.innerHTML = '';
        ditheringLabel.appendChild(checkbox);
        ditheringLabel.appendChild(document.createTextNode(' ' + lang.dithering));
    }
    updateTextContent('#generateBtn', lang.generateWallpaper);
    updateTextContent('#downloadBtn', lang.downloadPng);

    // Update form values
    updateFormValue('#artistInput', lang.defaultArtist);
    updateFormValue('#titleInput', lang.defaultTitle);
    updateFormValue('#lyricsInput', lang.defaultLyrics);
    updatePlaceholder('#lyricsInput', lang.lyricsPlaceholder);

    // Update device preset dropdown
    updateDevicePresets();
    updateColorModeOptions();
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
        // Use browser locale preference
        const locale = new Intl.DateTimeFormat().resolvedOptions().locale;
        const langCode = locale.toLowerCase().substring(0, 2);
        currentLanguage = languages[langCode] ? langCode : 'en';
    }
    updateLanguage();
}

// Export functions for use in other scripts
window.switchLanguage = switchLanguage;
window.loadPreferredLanguage = loadPreferredLanguage;