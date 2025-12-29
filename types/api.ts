// types/api.ts
import {
  SurahListItem,
  SurahDetail,
  SurahTafsir,
  SurahListItemEN,
  SurahDetailEN,
} from "./surah";
import { DoaItem } from "./doa";

// Indonesian API responses
export type SurahListResponse = SurahListItem[];
export type SurahDetailResponse = SurahDetail;
export type TafsirResponse = SurahTafsir;
export type DoaResponse = DoaItem[];

// English API responses
export type SurahListResponseEN = {
  code: number;
  message: string;
  data: SurahListItemEN[];
};

export type SurahDetailResponseEN = {
  code: number;
  message: string;
  data: SurahDetailEN;
};

// Error response
export interface ApiError {
  code: number;
  message: string;
  error?: string;
}

// Loading states
export type LoadingState = "idle" | "loading" | "success" | "error";

// Filter types for Surah
export interface SurahFilter {
  search?: string;
  revelation?: "all" | "Mekah" | "Medinah" | "mekah" | "medinah";
  sortBy?: "nomor" | "namaLatin" | "jumlahAyat";
  sortOrder?: "asc" | "desc";
}

// Audio player types
export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
}

export interface QariOption {
  id: string;
  name: string;
  url: string;
}
