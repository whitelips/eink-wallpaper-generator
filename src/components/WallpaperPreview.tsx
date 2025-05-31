import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  SkipPrevious as SkipPreviousIcon,
  SkipNext as SkipNextIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import type { WallpaperFormData } from '../types';

interface WallpaperPreviewProps {
  formData?: WallpaperFormData;
  generatedImageUrl?: string | null;
  isGenerating?: boolean;
  onDownload?: (imageData: string) => void;
  className?: string;
}

const WallpaperPreview: React.FC<WallpaperPreviewProps> = ({
  formData: propFormData,
  generatedImageUrl,
  isGenerating = false,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const previewRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState<number>(0);
  const animationRef = useRef<number | null>(null);

  // Add default empty form data if not provided
  const defaultFormData: WallpaperFormData = {
    title: '',
    artist: '',
    albumArt: '',
    lyrics: [],
    colorMode: 'color',
    width: 300,
    height: 400,
    customWidth: 300,
    customHeight: 400,
    songTitle: ''
  };
  
  const formData: WallpaperFormData = { ...defaultFormData, ...propFormData };
  
  // Ensure lyrics is always an array
  const lyricsArray = Array.isArray(formData.lyrics) 
    ? formData.lyrics 
    : formData.lyrics ? [formData.lyrics] : [];

  const lastFrameTimeRef = useRef<number>(0);
  const animationStartTimeRef = useRef<number>(0);

  // Lyrics animation effect
  useEffect(() => {
    if (!isPlaying || !lyricsArray.length) return;
    
    const animate = (timestamp: number) => {
      if (!animationStartTimeRef.current) {
        animationStartTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - animationStartTimeRef.current;
      const lyricDuration = 3000; // 3 seconds per lyric
      // Calculate current lyric index based on elapsed time
      const lyricIndex = Math.floor(elapsed / lyricDuration);
      if (lyricIndex !== currentLyricIndex && lyricIndex < lyricsArray.length) {
        setCurrentLyricIndex(lyricIndex);
      }
      
      if (elapsed < lyricsArray.length * lyricDuration) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete
        setIsPlaying(false);
        setCurrentLyricIndex(0);
        animationStartTimeRef.current = 0;
      }
      
      lastFrameTimeRef.current = timestamp;
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, lyricsArray, currentLyricIndex]);
  
  const togglePlayPause = () => {
    if (lyricsArray.length) {
      if (isPlaying) {
        setIsPlaying(false);
      } else {
        // If we're at the end, restart from the beginning
        if (currentLyricIndex >= (lyricsArray.length - 1)) {
          setCurrentLyricIndex(0);
          animationStartTimeRef.current = 0;
        }
        setIsPlaying(true);
      }
    }
  };
  
  const handlePrevious = () => {
    if (lyricsArray.length) {
      setCurrentLyricIndex(prev => Math.max(0, prev - 1));
      if (isPlaying) {
        animationStartTimeRef.current = performance.now() - (currentLyricIndex * 3000);
      }
    }
  };
  
  const handleNext = () => {
    if (lyricsArray.length) {
      setCurrentLyricIndex(prev => Math.min(lyricsArray.length - 1, prev + 1));
      if (isPlaying) {
        animationStartTimeRef.current = performance.now() - (currentLyricIndex * 3000);
      }
    }
  };
  
  const handleDownload = async (format: 'png' | 'pdf' = 'png') => {
    if (!previewRef.current) return;
    
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: formData.colorMode === 'grayscale' ? '#F5F5F5' : '#121212',
      });
      
      if (format === 'png') {
        const link = document.createElement('a');
        link.download = `wallpaper-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } else {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: formData.width > formData.height ? 'l' : 'p',
          unit: 'px',
          format: [formData.width, formData.height],
        });
        
        pdf.addImage(imgData, 'PNG', 0, 0, formData.width, formData.height);
        pdf.save(`wallpaper-${Date.now()}.pdf`);
      }
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  // Calculate dimensions for the preview
  const getPreviewDimensions = () => {
    if (!formData) return { width: 300, height: 400 };
    
    const maxWidth = isMobile ? 350 : 500;
    const maxHeight = isMobile ? 600 : 800;
    
    const aspectRatio = formData.customWidth / formData.customHeight;
    let width = formData.customWidth;
    let height = formData.customHeight;
    
    // Scale down if needed to fit the container
    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspectRatio;
    }
    
    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }
    
    return { width, height };
  };
  
  const { width: previewWidth, height: previewHeight } = getPreviewDimensions();
  
  return (
    <Box>
      <Box mb={3} textAlign="center">
        <Typography variant="h5" gutterBottom>
          {t('preview.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {t('preview.subtitle')}
        </Typography>
      </Box>
      
      <Box
        ref={previewRef}
        sx={{
          position: 'relative',
          width: previewWidth,
          height: previewHeight,
          margin: '0 auto',
          overflow: 'hidden',
          borderRadius: '12px',
          boxShadow: theme.shadows[8],
          backgroundColor: formData?.colorMode === 'grayscale' ? '#000' : '#121212',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Album Art */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: generatedImageUrl 
              ? `url(${generatedImageUrl})` 
              : 'linear-gradient(45deg, #333, #666)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            filter: formData?.colorMode === 'grayscale' ? 'grayscale(100%)' : 'none',
            transition: 'filter 0.3s ease',
          }}
        >
          {/* Overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              p: 3,
            }}
          >
            {/* Song Info */}
            <Box mb={3} textAlign="center">
              <Typography variant="h5" component="div" noWrap>
                {formData?.songTitle || t('preview.songTitle')}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {formData?.artist || t('preview.artist')}
              </Typography>
            </Box>
            
            {/* Lyrics */}
            <Box 
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100px',
                mb: 3,
              }}
            >
              <Typography 
                variant="h6" 
                align="center"
                sx={{
                  opacity: lyricsArray.length ? 1 : 0.5,
                  transition: 'opacity 0.3s ease',
                }}
              >
                {lyricsArray[currentLyricIndex] || t('preview.lyricsPlaceholder')}
              </Typography>
            </Box>
            
            {/* Progress Bar */}
            <Box sx={{ mb: 2 }}>
              <Box 
                sx={{
                  height: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  mb: 1,
                }}
              >
                <Box 
                  sx={{
                    height: '100%',
                    width: lyricsArray.length 
                      ? `${((currentLyricIndex + 0.5) / lyricsArray.length) * 100}%` 
                      : '0%',
                    backgroundColor: theme.palette.primary.main,
                    transition: 'width 0.3s ease',
                  }}
                />
              </Box>
              <Box 
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.75rem',
                }}
              >
                <span>{formatTime(currentLyricIndex * 3)}</span>
                <span>{formatTime(lyricsArray.length * 3)}</span>
              </Box>
            </Box>
            
            {/* Player Controls */}
            <Box 
              className="player-controls"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                mt: 2,
                transition: 'opacity 0.3s ease',
              }}
            >
              <IconButton 
                onClick={handlePrevious}
                disabled={!lyricsArray.length}
                sx={{ color: '#fff' }}
              >
                <SkipPreviousIcon />
              </IconButton>
              <IconButton 
                onClick={togglePlayPause}
                disabled={!lyricsArray.length}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </IconButton>
              <IconButton 
                onClick={handleNext}
                disabled={!lyricsArray.length}
                sx={{ color: '#fff' }}
              >
                <SkipNextIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        
        {/* Loading Overlay */}
        {isGenerating && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <CircularProgress color="primary" />
            <Typography variant="body1" sx={{ mt: 2 }}>
              {t('preview.generating')}
            </Typography>
          </Box>
        )}
      </Box>
      
      {/* Download Button */}
      <Box mt={3} textAlign="center">
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<DownloadIcon />}
            onClick={() => handleDownload('png')}
            disabled={isGenerating}
          >
            {t('downloadPng')}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<DownloadIcon />}
            onClick={() => handleDownload('pdf')}
            disabled={isGenerating}
          >
            {t('downloadPdf')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

// Helper function to format time in MM:SS format
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default WallpaperPreview;
