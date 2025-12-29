// lib/api/index.ts
// Export all API functions
export * from "./client";
export * from "./surah";
export * from "./doa";
export * from "./helpers";

// Re-export commonly used functions
export {
  getAllSurahsID,
  getAllSurahsEN,
  getSurahDetailID,
  getSurahDetailEN,
  getSurahTafsir,
  searchSurahs,
} from "./surah";

export { getAllDoas, getDoaById, searchDoas } from "./doa";
