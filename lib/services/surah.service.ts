import type { SurahDetail, SurahListItem } from "@/types/surah";
import type { Locale } from "@/types/common";

const BASE_URL = "https://equran.id/api";

/**
 * Get all surahs list
 */
export async function getAllSurahs(
  locale: Locale
): Promise<SurahListItem[] | null> {
  try {
    const apiLocale = locale === "id" ? "v2" : "en";
    const endpoint =
      locale === "id" ? `${BASE_URL}/v2/surat` : `${BASE_URL}/en/surah`;

    const response = await fetch(endpoint, {
      next: { revalidate: 3600 }, // Cache 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch surahs: ${response.status}`);
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error("Error fetching all surahs:", error);
    return null;
  }
}

/**
 * Get surah detail by number
 */
export async function getSurahDetail(
  number: string,
  locale: Locale
): Promise<SurahDetail | null> {
  try {
    const endpoint =
      locale === "id"
        ? `${BASE_URL}/v2/surat/${number}`
        : `${BASE_URL}/en/surah/${number}`;

    const response = await fetch(endpoint, {
      next: { revalidate: 3600 }, // Cache 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch surah ${number}: ${response.status}`);
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error(`Error fetching surah ${number}:`, error);
    return null;
  }
}

/**
 * Get tafsir for specific surah
 */
export async function getSurahTafsir(
  number: string,
  locale: Locale
): Promise<any | null> {
  try {
    const apiLocale = locale === "id" ? "v2" : "en";
    const endpoint = `${BASE_URL}/${apiLocale}/tafsir/${number}`;

    const response = await fetch(endpoint, {
      next: { revalidate: 3600 }, // Cache 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch tafsir ${number}: ${response.status}`);
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error(`Error fetching tafsir ${number}:`, error);
    return null;
  }
}
