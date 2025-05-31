import { useState, useEffect, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Snackbar, Alert } from '@mui/material';

import theme from './theme';
import WallpaperForm from './components/WallpaperForm';
import WallpaperPreview from './components/WallpaperPreview';
import type { WallpaperFormData } from './types';
import './i18n';

// Google AdSense component
const AdSenseAd = () => {
  useEffect(() => {
    // Load Google AdSense script
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Box mt={4} textAlign="center">
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
        data-ad-slot="YOUR_AD_SLOT"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </Box>
  );
};

const App: FC = () => {
  const { t, i18n } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<WallpaperFormData | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  }>({ open: false, message: '', severity: 'info' });

  // Set document title and language
  useEffect(() => {
    document.title = t('app.title');
    document.documentElement.lang = i18n.language;
    
    return () => {
      document.title = '';
    };
  }, [t, i18n.language]);

  // Handle form submission
  const handleSubmit = async (data: WallpaperFormData) => {
    setIsGenerating(true);
    setFormData(data);
    
    try {
      // Create a canvas to generate the wallpaper
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Could not create canvas context');
      }
      
      // Set canvas dimensions
      canvas.width = data.customWidth;
      canvas.height = data.customHeight;
      
      // Fill background
      ctx.fillStyle = data.colorMode === 'grayscale' ? '#000000' : '#121212';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Load and draw the uploaded image
      if (data.image) {
        const image = await loadImage(data.image);
        
        // Calculate dimensions to maintain aspect ratio and cover the canvas
        const imgAspect = image.width / image.height;
        const canvasAspect = canvas.width / canvas.height;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (imgAspect > canvasAspect) {
          // Image is wider than canvas (relative to height)
          drawHeight = canvas.height;
          drawWidth = drawHeight * imgAspect;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        } else {
          // Image is taller than canvas (relative to width)
          drawWidth = canvas.width;
          drawHeight = drawWidth / imgAspect;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        }
        
        // Apply grayscale filter if needed
        if (data.colorMode === 'grayscale') {
          ctx.filter = 'grayscale(100%)';
        }
        
        // Draw the image
        ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
        
        // Reset filter for other drawings
        ctx.filter = 'none';
      }
      
      // Add a dark overlay for better text visibility
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add song info
      const textX = canvas.width * 0.1;
      let textY = canvas.height * 0.7;
      const lineHeight = canvas.height * 0.05;
      
      // Song title
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${canvas.height * 0.06}px Arial, sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText(data.songTitle, textX, textY);
      
      // Artist
      textY += lineHeight * 1.5;
      ctx.font = `${canvas.height * 0.04}px Arial, sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillText(data.artist, textX, textY);
      
      // Current lyric (centered)
      if (data.lyrics.length > 0) {
        textY = canvas.height * 0.6;
        ctx.font = `italic ${canvas.height * 0.045}px Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        
        // Split long lyrics into multiple lines
        const maxWidth = canvas.width * 0.8;
        const words = data.lyrics[0].split(' ');
        let line = '';
        const lines = [];
        
        for (const word of words) {
          const testLine = line + word + ' ';
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;
          
          if (testWidth > maxWidth && line.length > 0) {
            lines.push(line.trim());
            line = word + ' ';
          } else {
            line = testLine;
          }
        }
        lines.push(line.trim());
        
        // Draw each line
        lines.forEach((lineText, index) => {
          ctx.fillText(lineText, canvas.width / 2, textY + (index * lineHeight * 1.2));
        });
      }
      
      // Progress bar
      const progressBarY = canvas.height * 0.9;
      const progressBarHeight = canvas.height * 0.005;
      const progressBarWidth = canvas.width * 0.8;
      const progressBarX = (canvas.width - progressBarWidth) / 2;
      
      // Background of progress bar
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight);
      
      // Progress indicator
      const progress = data.lyrics.length > 0 ? 0.3 : 0; // Example progress
      ctx.fillStyle = '#1DB954'; // Spotify green
      ctx.fillRect(progressBarX, progressBarY, progressBarWidth * progress, progressBarHeight);
      
      // Player controls (simplified)
      const controlSize = canvas.width * 0.1;
      const controlY = canvas.height * 0.93;
      
      // Previous button
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.4 - controlSize/2, controlY);
      ctx.lineTo(canvas.width * 0.4 - controlSize/2, controlY + controlSize);
      ctx.lineTo(canvas.width * 0.4 - controlSize, controlY + controlSize/2);
      ctx.closePath();
      ctx.fill();
      
      // Play/Pause button
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(canvas.width * 0.5 - controlSize/2, controlY, controlSize, controlSize);
      
      // Next button
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.6 + controlSize/2, controlY);
      ctx.lineTo(canvas.width * 0.6 + controlSize/2, controlY + controlSize);
      ctx.lineTo(canvas.width * 0.6 + controlSize, controlY + controlSize/2);
      ctx.closePath();
      ctx.fill();
      
      // Convert canvas to data URL
      const imageUrl = canvas.toDataURL('image/png');
      setGeneratedImageUrl(imageUrl);
      
      // Show success message
      setSnackbar({
        open: true,
        message: t('messages.wallpaperGenerated'),
        severity: 'success',
      });
      
    } catch (error) {
      console.error('Error generating wallpaper:', error);
      setSnackbar({
        open: true,
        message: t('errors.generationFailed'),
        severity: 'error',
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Helper function to load an image file
  const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  
  // Handle download
  const handleDownload = (imageData: string) => {
    try {
      const link = document.createElement('a');
      link.download = `eink-wallpaper-${Date.now()}.png`;
      link.href = imageData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setSnackbar({
        open: true,
        message: t('messages.downloadStarted'),
        severity: 'success',
      });
    } catch (error) {
      console.error('Error downloading image:', error);
      setSnackbar({
        open: true,
        message: t('errors.downloadFailed'),
        severity: 'error',
      });
    }
  };
  
  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box mb={4} textAlign="center">
          <Typography variant="h3" component="h1" gutterBottom>
            {t('app.title')}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {t('app.description')}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 20 }}>
              <WallpaperForm 
                onSubmit={handleSubmit} 
                isGenerating={isGenerating} 
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={7}>
            <WallpaperPreview 
              formData={formData}
              generatedImageUrl={generatedImageUrl}
              isGenerating={isGenerating}
              onDownload={handleDownload}
            />
          </Grid>
        </Grid>
        
        {/* AdSense Ad */}
        <AdSenseAd />
        
        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default App;
