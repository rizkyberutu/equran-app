// lib/api/surah.ts
import { apiClient } from "./client";
import { apiConfig } from "@/config/api";
import type {
  SurahListResponse,
  SurahDetailResponse,
  TafsirResponse,
  SurahListResponseEN,
  SurahDetailResponseEN,
} from "@/types/api";
import type {
  SurahListItem,
  SurahDetail,
  SurahListItemEN,
  SurahDetailEN,
} from "@/types/surah";

/**
 * Get all surahs (Indonesian)
 */
export async function getAllSurahsID(): Promise<SurahListItem[]> {
  try {
    const data = await apiClient.get<SurahListResponse>(
      apiConfig.equran.endpoints.allSurah,
      "id"
    );
    return data;
  } catch (error) {
    console.error("Error fetching all surahs (ID):", error);
    throw error;
  }
}

/**
 * Get all surahs (English)
 */
export async function getAllSurahsEN(): Promise<SurahListItemEN[]> {
  try {
    const response = await apiClient.get<SurahListResponseEN>("/surah", "en");
    return response.data;
  } catch (error) {
    console.error("Error fetching all surahs (EN):", error);
    throw error;
  }
}

/**
 * Get surah detail by number (Indonesian)
 */
export async function getSurahDetailID(number: number): Promise<SurahDetail> {
  try {
    const data = await apiClient.get<SurahDetailResponse>(
      apiConfig.equran.endpoints.surahDetail(number),
      "id"
    );
    return data;
  } catch (error) {
    console.error(`Error fetching surah ${number} (ID):`, error);
    throw error;
  }
}

/**
 * Get surah detail by number (English)
 */
export async function getSurahDetailEN(number: number): Promise<SurahDetailEN> {
  try {
    const response = await apiClient.get<SurahDetailResponseEN>(
      `/surah/${number}`,
      "en"
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching surah ${number} (EN):`, error);
    throw error;
  }
}

/**
 * Get tafsir for a surah (Indonesian only)
 */
export async function getSurahTafsir(number: number) {
  try {
    const response = await apiClient.get<TafsirResponse>(
      apiConfig.equran.endpoints.tafsir(number),
      "id"
    );
    // Return data.tafsir langsung, bukan full response
    return response.data?.tafsir || [];
  } catch (error) {
    console.error(`Error fetching tafsir for surah ${number}:`, error);
    return []; // Return empty array kalo error
  }
}

/**
 * Search surahs by name or number
 */
export function searchSurahs(
  surahs: SurahListItem[],
  query: string
): SurahListItem[] {
  if (!query.trim()) return surahs;

  const lowerQuery = query.toLowerCase();

  return surahs.filter((surah) => {
    const matchesNumber = surah.nomor.toString().includes(query);
    const matchesName = surah.nama.toLowerCase().includes(lowerQuery);
    const matchesNameLatin = surah.namaLatin.toLowerCase().includes(lowerQuery);
    const matchesArti = surah.arti.toLowerCase().includes(lowerQuery);

    return matchesNumber || matchesName || matchesNameLatin || matchesArti;
  });
}

/**
 * Search surahs (English version)
 */
export function searchSurahsEN(
  surahs: SurahListItemEN[],
  query: string
): SurahListItemEN[] {
  if (!query.trim()) return surahs;

  const lowerQuery = query.toLowerCase();

  return surahs.filter((surah) => {
    const matchesNumber = surah.number.toString().includes(query);
    const matchesName = surah.name.transliteration.en
      .toLowerCase()
      .includes(lowerQuery);
    const matchesTranslation = surah.name.translation.en
      .toLowerCase()
      .includes(lowerQuery);

    return matchesNumber || matchesName || matchesTranslation;
  });
}

/**
 * Filter surahs by revelation place
 */
export function filterSurahsByRevelation(
  surahs: SurahListItem[],
  revelation: "all" | "Mekah" | "Medinah" | "mekah" | "medinah"
): SurahListItem[] {
  if (revelation === "all") return surahs;

  return surahs.filter((surah) => {
    const surahRevelation = surah.tempatTurun.toLowerCase();
    const filterRevelation = revelation.toLowerCase();
    return surahRevelation === filterRevelation;
  });
}

/**
 * Sort surahs
 */
export function sortSurahs(
  surahs: SurahListItem[],
  sortBy: "nomor" | "namaLatin" | "jumlahAyat",
  order: "asc" | "desc" = "asc"
): SurahListItem[] {
  const sorted = [...surahs].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "nomor":
        comparison = a.nomor - b.nomor;
        break;
      case "namaLatin":
        comparison = a.namaLatin.localeCompare(b.namaLatin);
        break;
      case "jumlahAyat":
        comparison = a.jumlahAyat - b.jumlahAyat;
        break;
    }

    return order === "asc" ? comparison : -comparison;
  });

  return sorted;
}

/**
 * Get available qari options from surah audio
 */
export function getQariOptions(audioFull: { [key: string]: string }) {
  return Object.entries(audioFull).map(([name, url]) => ({
    id: name,
    name: name,
    url: url,
  }));
}

/**
 * Get specific ayah from surah
 */
export function getAyahFromSurah(surah: SurahDetail, ayahNumber: number) {
  return surah.ayat.find((ayah) => ayah.nomorAyat === ayahNumber);
}

/**
 * Get ayah range from surah
 */
export function getAyahRange(
  surah: SurahDetail,
  startAyah: number,
  endAyah: number
) {
  return surah.ayat.filter(
    (ayah) => ayah.nomorAyat >= startAyah && ayah.nomorAyat <= endAyah
  );
}
