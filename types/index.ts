// types/index.ts
// API Types
export * from "./api";
export * from "./surah";
export * from "./doa";

// Common Types
export * from "./common";

// Hook Types
export * from "./hooks";

// Component Types
export * from "./components";

// Re-export commonly used types
export type { Locale } from "./common";
export type { SurahListItem, SurahDetail, Ayah } from "./surah";
export type { DoaItem } from "./doa";
