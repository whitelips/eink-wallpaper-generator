# E-Ink Music Player Lockscreen Generator

A web application to create Apple Music-style lockscreens optimized for e-ink displays.

## Features

### 🎵 Music Player Design
- Album art upload with rounded corners and shadow effects
- Vinyl record effect sliding behind album cover
- Artist and song title display
- Progress bar with time indicators
- Playback controls (previous, pause, next)
- Lyrics display with highlighted current line

### 📱 E-Ink Optimization
- **Grayscale Mode**: Perfect for e-ink displays
- **Floyd-Steinberg Dithering**: Improves image quality on e-ink screens
- **Contrast Adjustment**: Fine-tune for optimal readability
- **Device Presets**: Pre-configured sizes for popular e-ink devices

### 🖥️ Supported Devices
- **Onyx Boox**: Poke3/4/5/6, Palma/P6/Palma2, Leaf3/Page/Leaf5/Go7, Note Air3, Note Max, Max Lumi2
- **reMarkable**: 1/2, Paper Pro
- **Amazon Kindle**: Paperwhite, Oasis, Scribe, Basic
- **Kobo**: Clara HD/2E, Libra 2, Sage, Elipsa
- **Crema**: A, C, Palette
- **Innospaceone**: Luna X/X2, MARS, MARS10, JIGU
- **Supernote**: A5X, A6X, Nomad, Manta
- **Hisense**: A5, A7, A9
- **Other**: PocketBook Era, PocketBook InkPad

### 🌐 Multi-Language Support
- **English** and **Korean** interface
- Automatic browser language detection
- Persistent language preference
- Localized device group names and content

### ⚡ Real-Time Preview
- Live updates as you type or make changes
- No need to click generate button
- Instant visual feedback for all adjustments

## Usage

1. **Visit the Website**: [GitHub Pages URL]
2. **Select Device**: Choose your e-ink device from the preset list
3. **Upload Album Art**: Add your album cover image
4. **Enter Details**: Fill in artist name, song title, and lyrics
5. **Customize**: Adjust color mode, contrast, and dithering
6. **Download**: Save your generated lockscreen as PNG

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Canvas API**: For lockscreen generation and image processing
- **Internationalization**: Multi-language support system
- **GitHub Pages**: Static site hosting

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/eink-wallpaper-generator.git
   ```

2. Open `index.html` in your browser

3. Start making changes - the site is entirely client-side!

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Styling and responsive design
├── script.js           # Canvas generation and interaction logic
├── lang.js             # Internationalization system
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages deployment
```

## Features in Detail

### E-Ink Optimizations
- **Dithering Algorithm**: Implements Floyd-Steinberg dithering for better grayscale representation
- **Contrast Enhancement**: Adjustable contrast for different e-ink display characteristics
- **Portrait Orientation**: All device presets use portrait mode for optimal e-reader display

### Apple Music Style Elements
- **Typography**: System fonts with proper weight hierarchy
- **Layout**: Centered design with consistent spacing
- **Controls**: Fat playback buttons with proper icon design
- **Progress Bar**: Rounded progress indicator with time display
- **Lyrics Box**: Rounded container with highlighted current line

## Browser Compatibility

- Modern browsers with Canvas API support
- Chrome, Firefox, Safari, Edge
- Mobile browsers supported

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with different devices and languages
5. Submit a pull request

## License

MIT License - feel free to use and modify for your projects.

---

Perfect for creating custom lockscreens for your e-ink e-reader or tablet!