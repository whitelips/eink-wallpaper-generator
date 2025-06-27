const canvas = document.getElementById('previewCanvas');
const ctx = canvas.getContext('2d');

const deviceSelect = document.getElementById('deviceSelect');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const downloadBtn = document.getElementById('downloadBtn');

const devicePresets = {
    // Onyx Boox
    'boox-poke6': { width: 1072, height: 1448 },
    'boox-palma': { width: 824, height: 1648 },
    'boox-page': { width: 1264, height: 1680 },
    'boox-note-air': { width: 1404, height: 1872 },
    'boox-note-tab': { width: 1404, height: 1872 },
    'boox-note-lumi-tabx': { width: 1650, height: 2200 },
    'boox-note-air4c': { width: 1860, height: 2480 },
    'boox-note-max-tabxc': { width: 2400, height: 3200 },
    // reMarkable
    'remarkable2': { width: 1404, height: 1872 },
    'remarkable-paper-pro': { width: 1620, height: 2160 },
    // Crema devices
    'crema-a': { width: 1072, height: 1448 },
    'crema-c': { width: 1264, height: 1680 },
    // Innospaceone devices
    'luna-x2': { width: 1072, height: 1448 },
    'mars7-jigo': { width: 1264, height: 1680 },
    'mars10': { width: 1200, height: 1600 },
    // Supernote devices
    'supernote-a5x-a6x-nomad': { width: 1404, height: 1872 },
    'supernote-manta': { width: 1920, height: 2560 },
    // Kyobo devices
    'kyobo-sam-7-8': { width: 1404, height: 1872 },
    'kyobo-sam-10-plus': { width: 1200, height: 1600 },
    // Hisense devices
    'hisense-a5': { width: 720, height: 1440 },
    'hisense-a7': { width: 900, height: 1800 },
    'hisense-a9': { width: 824, height: 1648 }
};

const customSizeGroup = document.getElementById('customSizeGroup');

deviceSelect.addEventListener('change', (e) => {
    const preset = devicePresets[e.target.value];
    if (preset) {
        widthInput.value = preset.width;
        heightInput.value = preset.height;
        customSizeGroup.style.opacity = '0.6';
        widthInput.disabled = true;
        heightInput.disabled = true;
    } else {
        customSizeGroup.style.opacity = '1';
        widthInput.disabled = false;
        heightInput.disabled = false;
    }
    generatePattern();
});

const musicControls = document.getElementById('musicControls');
const albumArtInput = document.getElementById('albumArtInput');
const artistInput = document.getElementById('artistInput');
const titleInput = document.getElementById('titleInput');
const lyricsInput = document.getElementById('lyricsInput');
const rightTimeInput = document.getElementById('rightTimeInput');
const colorModeSelect = document.getElementById('colorModeSelect');

let uploadedAlbumArt = null;

albumArtInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        // Check for HEIC format
        const fileName = file.name.toLowerCase();
        const fileType = file.type.toLowerCase();
        const isHEIC = fileName.endsWith('.heic') || fileName.endsWith('.heif') ||
            fileType.includes('heic') || fileType.includes('heif');

        if (isHEIC) {
            const lang = languages[currentLanguage];
            alert(lang.heicNotSupported);
            albumArtInput.value = ''; // Clear the input
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                uploadedAlbumArt = img;
                generatePattern();
            };
            img.onerror = () => {
                const lang = languages[currentLanguage];
                alert(lang.imageLoadError);
                albumArtInput.value = ''; // Clear the input
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});


// Format time input to ensure it's always in MM:SS format
function formatTimeInput(input) {
    // Store cursor position and previous value
    const cursorPos = input.selectionStart;
    const prevValue = input.value;
    
    // Remove all non-numeric characters and the colon
    let value = input.value.replace(/[^\d:]/g, '');
    
    // Remove existing colons to reformat
    value = value.replace(/:/g, '');
    
    // Limit to 4 digits
    if (value.length > 4) {
        value = value.slice(0, 4);
    }
    
    // Format as MM:SS only when we have enough digits
    let newCursorPos = cursorPos;
    
    if (value.length === 4) {
        const minutes = value.slice(0, 2);
        const seconds = value.slice(2, 4);
        // Ensure seconds don't exceed 59
        const validSeconds = Math.min(parseInt(seconds), 59).toString().padStart(2, '0');
        input.value = `${minutes}:${validSeconds}`;
        
        // Adjust cursor position if we're typing and a colon was inserted
        if (prevValue.length < input.value.length && cursorPos >= 2) {
            newCursorPos = cursorPos + 1;
        }
    } else if (value.length === 3) {
        // For 3 digits, format as M:SS
        const minutes = value.slice(0, 1);
        const seconds = value.slice(1, 3);
        const validSeconds = Math.min(parseInt(seconds), 59).toString().padStart(2, '0');
        input.value = `${minutes}:${validSeconds}`;
        
        // Adjust cursor position if we're typing and a colon was inserted
        if (prevValue.length < input.value.length && cursorPos >= 1) {
            newCursorPos = cursorPos + 1;
        }
    } else {
        // For 1-2 digits, just show the raw value
        input.value = value;
    }
    
    // Set cursor position to the end if we're adding characters
    if (prevValue.length < input.value.length) {
        newCursorPos = input.value.length;
    }
    
    // Restore cursor position
    input.setSelectionRange(newCursorPos, newCursorPos);
}

// Add special handling for duration input
rightTimeInput.addEventListener('input', (e) => {
    formatTimeInput(e.target);
    generatePattern();
});

// Handle blur event to ensure proper formatting when user leaves the field
rightTimeInput.addEventListener('blur', (e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    if (value.length === 0) {
        e.target.value = '00:00';
    } else if (value.length === 1) {
        e.target.value = `00:0${value}`;
    } else if (value.length === 2) {
        e.target.value = `00:${value}`;
    }
    generatePattern();
});

// Real-time updates for all form inputs
artistInput.addEventListener('input', generatePattern);
titleInput.addEventListener('input', generatePattern);
lyricsInput.addEventListener('input', generatePattern);
colorModeSelect.addEventListener('change', generatePattern);
widthInput.addEventListener('input', generatePattern);
heightInput.addEventListener('input', generatePattern);




// Proportional scaling system for components
function calculateScaleFactor(value, minValue, maxValue, minScale, maxScale) {
    // Linear interpolation between min and max scales based on value
    const ratio = (value - minValue) / (maxValue - minValue);
    const clampedRatio = Math.max(0, Math.min(1, ratio)); // Clamp between 0 and 1
    return minScale + (maxScale - minScale) * clampedRatio;
}

// Get component sizes based on device resolution
function getComponentSizes(width, height) {
    // Define resolution ranges
    const minHeight = 1440; // Smallest device (Hisense A5)
    const maxHeight = 3200; // Largest device (Boox Note Max)
    
    // Calculate scale factor based on height (more important for readability)
    const heightScale = calculateScaleFactor(height, minHeight, maxHeight, 1.0, 2.0);
    
    // Base sizes (designed for minimum resolution)
    const baseSizes = {
        // Text sizes
        titleBase: Math.min(width, height) / 40,
        artistBase: Math.min(width, height) / 40,
        lyricsBase: 24,
        timeBase: 18,
        
        // UI elements
        progressBarHeight: 8,
        controlSize: 24,
        controlSpacing: 120,
        
        // Spacing
        titleSpacing: 50,
        artistSpacing: 15,
        progressSpacing: 60,
        controlsSpacing: 60,
        lyricsSpacing: 80
    };
    
    // Apply proportional scaling
    return {
        // Font sizes with proportional scaling and maximum limits
        titleFontSize: Math.min(baseSizes.titleBase * 1.8 * heightScale, 180),  // Cap at 180px
        artistFontSize: Math.min(baseSizes.artistBase * 1.3 * heightScale, 130), // Cap at 130px
        lyricsFontSize: baseSizes.lyricsBase * heightScale,
        timeFontSize: baseSizes.timeBase * heightScale,
        
        // UI elements
        progressBarHeight: baseSizes.progressBarHeight * heightScale,
        skipSize: baseSizes.controlSize * heightScale,
        pauseSize: baseSizes.controlSize * 1.17 * heightScale, // Maintain proportion
        pauseBarWidth: baseSizes.controlSize * 0.58 * heightScale,
        pauseGap: baseSizes.controlSize * 0.67 * heightScale,
        controlSpacing: baseSizes.controlSpacing * heightScale,
        
        // Spacing with proportional scaling
        titleY: 80 * heightScale,
        artistSpacing: 25 * heightScale,
        progressSpacing: 80 * heightScale,
        controlsSpacing: 90 * heightScale,
        lyricsSpacing: 110 * heightScale,
        
        // Line heights
        lyricsLineHeight: 38 * heightScale
    };
}

function generatePattern() {
    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Get proportionally scaled sizes
    const sizes = getComponentSizes(width, height);

    // Music Player Pattern - Apple Music Style
    const artist = artistInput.value || 'Artist Name';
    const title = titleInput.value || 'Song Title';
    const lyrics = lyricsInput.value || '';

    // Album art with rounded corners and shadow effect
    const albumSize = Math.min(width, height) * 0.35;
    const vinylSize = albumSize * 0.95;  // Slightly smaller than album
    const vinylOffsetX = albumSize * 0.6;  // How far vinyl slides out

    // Calculate total width of album + visible vinyl portion
    const totalWidth = albumSize + vinylOffsetX;
    const setX = (width - totalWidth) / 2;  // Center the entire set
    const albumX = setX;
    const albumY = height * 0.08;
    const cornerRadius = 12;

    // Draw vinyl record first (behind the album cover)
    const vinylX = albumX + vinylOffsetX;
    const vinylY = albumY + (albumSize - vinylSize) / 2;  // Center vertically
    const vinylCenterX = vinylX + vinylSize / 2;
    const vinylCenterY = vinylY + vinylSize / 2;

    // Vinyl record shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;

    // Main vinyl disc - dark gray/black
    ctx.beginPath();
    ctx.arc(vinylCenterX, vinylCenterY, vinylSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = '#1a1a1a';
    ctx.fill();
    ctx.restore();

    // Vinyl grooves (concentric circles)
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 8; i++) {
        ctx.beginPath();
        ctx.arc(vinylCenterX, vinylCenterY, (vinylSize / 2) * (i / 10), 0, Math.PI * 2);
        ctx.stroke();
    }

    // Center label
    const labelRadius = vinylSize * 0.15;
    ctx.beginPath();
    ctx.arc(vinylCenterX, vinylCenterY, labelRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#8B0000';  // Dark red label
    ctx.fill();

    // Center hole
    ctx.beginPath();
    ctx.arc(vinylCenterX, vinylCenterY, vinylSize * 0.025, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();


    // Now draw album art on top (this will cover part of the vinyl)
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 10;

    // Rounded rectangle for album art
    ctx.beginPath();
    ctx.moveTo(albumX + cornerRadius, albumY);
    ctx.lineTo(albumX + albumSize - cornerRadius, albumY);
    ctx.quadraticCurveTo(albumX + albumSize, albumY, albumX + albumSize, albumY + cornerRadius);
    ctx.lineTo(albumX + albumSize, albumY + albumSize - cornerRadius);
    ctx.quadraticCurveTo(albumX + albumSize, albumY + albumSize, albumX + albumSize - cornerRadius, albumY + albumSize);
    ctx.lineTo(albumX + cornerRadius, albumY + albumSize);
    ctx.quadraticCurveTo(albumX, albumY + albumSize, albumX, albumY + albumSize - cornerRadius);
    ctx.lineTo(albumX, albumY + cornerRadius);
    ctx.quadraticCurveTo(albumX, albumY, albumX + cornerRadius, albumY);
    ctx.closePath();

    if (uploadedAlbumArt) {
        ctx.clip();

        // Calculate scale to fill the square (cover behavior)
        const imgAspectRatio = uploadedAlbumArt.width / uploadedAlbumArt.height;
        const boxAspectRatio = 1; // Square box

        let drawWidth, drawHeight, drawX, drawY;

        if (imgAspectRatio > boxAspectRatio) {
            // Image is wider - scale by height and crop width
            drawHeight = albumSize;
            drawWidth = albumSize * imgAspectRatio;
            drawX = albumX - (drawWidth - albumSize) / 2; // Center horizontally
            drawY = albumY;
        } else {
            // Image is taller - scale by width and crop height
            drawWidth = albumSize;
            drawHeight = albumSize / imgAspectRatio;
            drawX = albumX;
            drawY = albumY - (drawHeight - albumSize) / 2; // Center vertically
        }

        ctx.drawImage(uploadedAlbumArt, drawX, drawY, drawWidth, drawHeight);
    } else {
        // Gradient placeholder
        const gradient = ctx.createLinearGradient(albumX, albumY, albumX + albumSize, albumY + albumSize);
        gradient.addColorStop(0, '#f5f5f5');
        gradient.addColorStop(1, '#e0e0e0');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Music note icon
        ctx.fillStyle = '#999';
        ctx.font = '48px -apple-system, Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('♫', albumX + albumSize / 2, albumY + albumSize / 2);
    }
    ctx.restore();

    // Title and Artist with Apple Music typography - proportional spacing
    const titleY = albumY + albumSize + sizes.titleY;

    // Title - larger, bold
    ctx.fillStyle = '#000';
    ctx.font = `600 ${sizes.titleFontSize}px -apple-system, Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // Truncate title if too long
    const maxTitleWidth = width * 0.85;
    let displayTitle = title;
    if (ctx.measureText(title).width > maxTitleWidth) {
        while (ctx.measureText(displayTitle + '...').width > maxTitleWidth && displayTitle.length > 0) {
            displayTitle = displayTitle.slice(0, -1);
        }
        displayTitle += '...';
    }
    ctx.fillText(displayTitle, width / 2, titleY);

    // Artist - smaller, regular weight, gray - proportional spacing
    ctx.fillStyle = '#666';
    ctx.font = `400 ${sizes.artistFontSize}px -apple-system, Arial`;
    ctx.fillText(artist, width / 2, titleY + sizes.titleFontSize + sizes.artistSpacing);

    // Progress bar - Apple Music style - proportional spacing
    const progressY = titleY + sizes.titleFontSize + sizes.artistFontSize + sizes.progressSpacing;
    const barWidth = width * 0.5;
    const barX = (width - barWidth) / 2;

    // Time labels - proportional font size
    const duration = rightTimeInput.value || '02:07';
    
    // Calculate current time as half of duration (showing playback at 50%)
    function calculateCurrentTime(duration) {
        const parts = duration.split(':');
        if (parts.length !== 2) return '00:00';
        
        const minutes = parseInt(parts[0]) || 0;
        const seconds = parseInt(parts[1]) || 0;
        const totalSeconds = minutes * 60 + seconds;
        const halfSeconds = Math.floor(totalSeconds / 2);
        const currentMinutes = Math.floor(halfSeconds / 60);
        const currentSeconds = halfSeconds % 60;
        return `${currentMinutes.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')}`;
    }
    
    const currentTime = calculateCurrentTime(duration);
    
    ctx.fillStyle = '#999';
    ctx.font = `400 ${sizes.timeFontSize}px -apple-system, Arial`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'right';
    ctx.fillText(currentTime, barX - 20, progressY + sizes.progressBarHeight / 2);
    ctx.textAlign = 'left';
    ctx.fillText(duration, barX + barWidth + 20, progressY + sizes.progressBarHeight / 2);

    // Progress bar background - rounded corners
    ctx.fillStyle = '#e5e5e5';
    ctx.beginPath();
    ctx.roundRect(barX, progressY, barWidth, sizes.progressBarHeight, sizes.progressBarHeight / 2);
    ctx.fill();

    // Progress bar foreground - filled portion with rounded corners
    const progress = 0.5; // 50% progress
    const filledWidth = barWidth * progress;
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.roundRect(barX, progressY, filledWidth, sizes.progressBarHeight, sizes.progressBarHeight / 2);
    ctx.fill();

    // Playback controls - Apple Music style - proportional spacing
    const controlsY = progressY + sizes.controlsSpacing;
    const controlsX = width / 2;

    // Previous track (skip backward)
    ctx.fillStyle = '#000';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 6;

    // Skip backward icon - proportional sizing
    const skipGap = sizes.skipSize * 0.5;

    // First triangle (left)
    ctx.beginPath();
    ctx.moveTo(controlsX - sizes.controlSpacing + sizes.skipSize / 2 - skipGap / 2, controlsY - sizes.skipSize);
    ctx.lineTo(controlsX - sizes.controlSpacing - sizes.skipSize / 2 - skipGap / 2, controlsY);
    ctx.lineTo(controlsX - sizes.controlSpacing + sizes.skipSize / 2 - skipGap / 2, controlsY + sizes.skipSize);
    ctx.closePath();
    ctx.fill();

    // Second triangle (right)
    ctx.beginPath();
    ctx.moveTo(controlsX - sizes.controlSpacing + sizes.skipSize + skipGap / 2, controlsY - sizes.skipSize);
    ctx.lineTo(controlsX - sizes.controlSpacing + skipGap / 2, controlsY);
    ctx.lineTo(controlsX - sizes.controlSpacing + sizes.skipSize + skipGap / 2, controlsY + sizes.skipSize);
    ctx.closePath();
    ctx.fill();

    // Pause button - proportional sizing
    ctx.fillRect(controlsX - sizes.pauseGap / 2 - sizes.pauseBarWidth, controlsY - sizes.pauseSize, sizes.pauseBarWidth, sizes.pauseSize * 2);
    ctx.fillRect(controlsX + sizes.pauseGap / 2, controlsY - sizes.pauseSize, sizes.pauseBarWidth, sizes.pauseSize * 2);

    // Skip forward icon - proportional sizing
    // First triangle (left)
    ctx.beginPath();
    ctx.moveTo(controlsX + sizes.controlSpacing - sizes.skipSize - skipGap / 2, controlsY - sizes.skipSize);
    ctx.lineTo(controlsX + sizes.controlSpacing - skipGap / 2, controlsY);
    ctx.lineTo(controlsX + sizes.controlSpacing - sizes.skipSize - skipGap / 2, controlsY + sizes.skipSize);
    ctx.closePath();
    ctx.fill();

    // Second triangle (right)
    ctx.beginPath();
    ctx.moveTo(controlsX + sizes.controlSpacing - sizes.skipSize / 2 + skipGap / 2, controlsY - sizes.skipSize);
    ctx.lineTo(controlsX + sizes.controlSpacing + sizes.skipSize / 2 + skipGap / 2, controlsY);
    ctx.lineTo(controlsX + sizes.controlSpacing - sizes.skipSize / 2 + skipGap / 2, controlsY + sizes.skipSize);
    ctx.closePath();
    ctx.fill();

    // Lyrics section - Apple Music style - proportional spacing
    if (lyrics) {
        const lyricsY = controlsY + sizes.lyricsSpacing;

        // Lyrics container with subtle background and rounded corners
        const lyricsContainerY = lyricsY - 40;
        const lyricsContainerHeight = height - lyricsContainerY - 60;
        const lyricsContainerX = width * 0.08;
        const lyricsContainerWidth = width * 0.84;
        const cornerRadius = 16;

        // Subtle background for lyrics area with rounded corners
        ctx.fillStyle = '#fafafa';
        ctx.beginPath();
        ctx.roundRect(lyricsContainerX, lyricsContainerY, lyricsContainerWidth, lyricsContainerHeight, cornerRadius);
        ctx.fill();

        // Lyrics text - proportional font size
        ctx.font = `400 ${sizes.lyricsFontSize}px -apple-system, Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#333';

        const lyricsLines = lyrics.split('\n');

        // Calculate how many lines can fit with padding
        const maxLines = Math.floor((lyricsContainerHeight - 80) / sizes.lyricsLineHeight);
        const linesToShow = Math.min(lyricsLines.length, maxLines);

        lyricsLines.slice(0, linesToShow).forEach((line, index) => {
            if (line.trim()) {
                // Highlight current line (middle line)
                if (index === Math.floor(linesToShow / 2)) {
                    ctx.fillStyle = '#000';
                    ctx.font = `600 ${sizes.lyricsFontSize}px -apple-system, Arial`;
                } else {
                    ctx.fillStyle = '#666';
                    ctx.font = `400 ${sizes.lyricsFontSize}px -apple-system, Arial`;
                }
                ctx.fillText(line.trim(), width / 2, lyricsY + index * sizes.lyricsLineHeight);
            }
        });
    }

    let imageData = ctx.getImageData(0, 0, width, height);

    // Apply grayscale if selected
    if (colorModeSelect.value === 'grayscale') {
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
            data[i] = data[i + 1] = data[i + 2] = gray;
        }
        ctx.putImageData(imageData, 0, 0);
    }

}

function downloadLockscreen() {
    const link = document.createElement('a');
    link.download = `eink-lockscreen-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
}

downloadBtn.addEventListener('click', downloadLockscreen);

// Language functionality
function updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(`lang-${currentLanguage}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Override the switchLanguage function to update buttons
const originalSwitchLanguage = window.switchLanguage;
window.switchLanguage = function (newLang) {
    originalSwitchLanguage(newLang);
    updateLanguageButtons();
};

// Initialize language and UI
document.addEventListener('DOMContentLoaded', function () {
    loadPreferredLanguage();
    updateLanguageButtons();

    // Initialize with Boox Poke6 preset
    deviceSelect.value = 'boox-poke6';
    deviceSelect.dispatchEvent(new Event('change'));

    generatePattern();
});

// For immediate execution if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        loadPreferredLanguage();
        updateLanguageButtons();
    });
} else {
    loadPreferredLanguage();
    updateLanguageButtons();

    // Initialize with Boox Poke6 preset
    deviceSelect.value = 'boox-poke6';
    deviceSelect.dispatchEvent(new Event('change'));

    generatePattern();
}