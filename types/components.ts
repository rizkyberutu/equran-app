// types/components.ts
import { SurahListItem, SurahDetail, Ayah } from "./surah";
import { DoaItem } from "./doa";
import { Locale } from "./common";

export interface SurahCardProps {
  surah: SurahListItem;
  locale: Locale;
}

export interface SurahListProps {
  surahs: SurahListItem[];
  locale: Locale;
}

export interface AyahCardProps {
  ayah: Ayah;
  surahNumber: number;
  locale: Locale;
  showTafsir?: boolean;
}

export interface DoaCardProps {
  doa: DoaItem;
  locale: Locale;
}

export interface AudioPlayerProps {
  src: string;
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  showPlaybackRate?: boolean;
}

export interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export interface FilterProps {
  onFilterChange: (filter: any) => void;
  currentFilter: any;
}
