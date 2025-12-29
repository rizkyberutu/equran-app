// types/hooks.ts
import { SurahListItem, SurahDetail, Ayah } from "./surah";
import { DoaItem } from "./doa";

export interface UseSurahListReturn {
  surahs: SurahListItem[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export interface UseSurahDetailReturn {
  surah: SurahDetail | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export interface UseDoaListReturn {
  doas: DoaItem[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export interface UseSearchReturn<T> {
  filteredData: T[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearching: boolean;
}

export interface UseAudioPlayerReturn {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  togglePlayPause: () => void;
}
