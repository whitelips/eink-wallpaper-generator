// Device preset types
export interface DevicePreset {
  id: string;
  name: string;
  width: number;
  height: number;
}

export type ColorMode = 'color' | 'grayscale';

export interface WallpaperFormData {
  image?: File | null;
  title: string;
  songTitle: string;
  artist: string;
  albumArt: string;
  lyrics: string | string[];
  devicePresetId?: string;
  width: number;
  height: number;
  customWidth: number;
  customHeight: number;
  colorMode: ColorMode;
}

export interface PlayerState {
  isPlaying: boolean;
  currentLyricIndex: number;
}

export interface RootState {
  form: WallpaperFormData;
  player: PlayerState;
  isGenerating: boolean;
  generatedImageUrl: string | null;
}
