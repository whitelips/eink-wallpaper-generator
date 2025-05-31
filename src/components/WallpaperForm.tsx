import { useState, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import { CloudUpload as UploadIcon } from '@mui/icons-material';
import type { WallpaperFormData, DevicePreset, ColorMode } from '../types';

// Device presets
const DEVICE_PRESETS: Record<string, DevicePreset> = {
  '6inch': { id: '6inch', name: '6" E-Reader', width: 1072, height: 1448 },
  '7inch': { id: '7inch', name: '7" E-Reader', width: 1264, height: 1680 },
  '7.8inch': { id: '7.8inch', name: '7.8" E-Reader', width: 1404, height: 1872 },
  '10.3inch': { id: '10.3inch', name: '10.3" E-Reader', width: 1404, height: 1872 },
  '13inch': { id: '13inch', name: '13" E-Reader', width: 1650, height: 2200 },
};

interface WallpaperFormProps {
  onSubmit: (data: WallpaperFormData) => void;
  isGenerating?: boolean;
}

const WallpaperForm: React.FC<WallpaperFormProps> = ({ onSubmit, isGenerating = false }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Omit<WallpaperFormData, 'image'>>({
    songTitle: '',
    artist: '',
    lyrics: [],
    devicePresetId: '6inch',
    customWidth: 1072,
    customHeight: 1448,
    colorMode: 'grayscale',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLyricsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lyrics = e.target.value.split('\n').filter(line => line.trim() !== '');
    setFormData(prev => ({
      ...prev,
      lyrics,
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert(t('errors.imageRequired'));
      return;
    }
    if (!formData.songTitle.trim()) {
      alert(t('errors.songTitleRequired'));
      return;
    }
    if (!formData.artist.trim()) {
      alert(t('errors.artistRequired'));
      return;
    }
    
    onSubmit({
      ...formData,
      image: imageFile,
    });
  };

  const handlePresetChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const presetId = e.target.value as string;
    const preset = DEVICE_PRESETS[presetId];
    
    setFormData(prev => ({
      ...prev,
      devicePresetId: presetId,
      customWidth: preset.width,
      customHeight: preset.height,
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {/* Album Cover Upload */}
        <Grid xs={12}>
          <Box mb={2}>
            <Typography variant="h6" gutterBottom>
              {t('form.albumCover')}
            </Typography>
            <Button
              component="label"
              variant="outlined"
              fullWidth
              startIcon={<UploadIcon />}
              sx={{ mb: 2 }}
            >
              {t('form.uploadImage')}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
            {imagePreview && (
              <Box mt={2} textAlign="center">
                <img
                  src={imagePreview}
                  alt="Album cover preview"
                  style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
                />
              </Box>
            )}
          </Box>
        </Grid>

        {/* Song Info */}
        <Grid xs={12}>
          <Typography variant="h6" gutterBottom>
            {t('form.songInfo')}
          </Typography>
          <TextField
            fullWidth
            label={t('form.songTitle')}
            name="songTitle"
            value={formData.songTitle}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label={t('form.artist')}
            name="artist"
            value={formData.artist}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label={t('form.lyrics')}
            name="lyrics"
            value={formData.lyrics.join('\n')}
            onChange={handleLyricsChange}
            margin="normal"
            multiline
            rows={4}
            placeholder={t('form.lyricsPlaceholder')}
          />
        </Grid>

        {/* Device Settings */}
        <Grid xs={12}>
          <Typography variant="h6" gutterBottom>
            {t('form.deviceSettings')}
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="device-preset-label">{t('form.devicePreset')}</InputLabel>
            <Select
              labelId="device-preset-label"
              id="device-preset"
              value={formData.devicePresetId}
              label={t('form.devicePreset')}
              onChange={handlePresetChange}
            >
              {Object.values(DEVICE_PRESETS).map((preset) => (
                <MenuItem key={preset.id} value={preset.id}>
                  {t(`devicePresets.${preset.id}`)}
                </MenuItem>
              ))}
              <MenuItem value="custom">{t('form.custom')}</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={2} mt={1}>
            <Grid xs={6}>
              <TextField
                fullWidth
                label={t('form.width')}
                type="number"
                value={formData.customWidth}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    customWidth: parseInt(e.target.value) || 0,
                    devicePresetId: 'custom',
                  }))
                }
                InputProps={{
                  endAdornment: <InputAdornment position="end">px</InputAdornment>,
                }}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                fullWidth
                label={t('form.height')}
                type="number"
                value={formData.customHeight}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    customHeight: parseInt(e.target.value) || 0,
                    devicePresetId: 'custom',
                  }))
                }
                InputProps={{
                  endAdornment: <InputAdornment position="end">px</InputAdornment>,
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Color Mode */}
        <Grid xs={12}>
          <Typography variant="h6" gutterBottom>
            {t('form.colorMode')}
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="color-mode"
              name="colorMode"
              value={formData.colorMode}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  colorMode: e.target.value as ColorMode,
                }))
              }
            >
              <FormControlLabel
                value="color"
                control={<Radio />}
                label={t('form.color')}
              />
              <FormControlLabel
                value="grayscale"
                control={<Radio />}
                label={t('form.grayscale')}
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* Submit Button */}
        <Grid xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={isGenerating}
          >
            {isGenerating ? t('form.generating') : t('form.generateWallpaper')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WallpaperForm;
