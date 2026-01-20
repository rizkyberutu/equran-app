// lib/services/surah.service.ts
import type { SurahDetail, SurahListItem } from "@/types/surah";
import type { Locale } from "@/types/common";

const BASE_URL = "https://equran.id/api";

function toSentenceCase(text: string): string {
  if (!text) return "";

  return text
    .split(/([.!?]\s+)/)
    .map((sentence) => {
      if (sentence.match(/[.!?]\s+/)) return sentence;

      let result =
        sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();

      // Capitalize "God" specifically
      result = result.replace(/\bgod\b/gi, "God");

      return result;
    })
    .join("");
}

// Convert text to title case (capitalize first letter of each word)
function toTitleCase(text: string): string {
  if (!text) return "";

  return text
    .toLowerCase()
    .split(" ")
    .map((word) => {
      // Don't capitalize small words unless they're the first word
      const smallWords = ["the", "of", "and", "in", "a", "an", "to", "for"];
      if (smallWords.includes(word)) return word;

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

// Map English API response to Indonesian format
function mapEnglishSurahToID(enSurah: any): SurahListItem {
  return {
    nomor: enSurah.number,
    nama: enSurah.name || "",
    namaLatin: enSurah.englishName || "",
    jumlahAyat: enSurah.numberOfAyahs || 0,
    tempatTurun: enSurah.revelationType || "",
    arti: enSurah.englishNameTranslation || "",
    deskripsi: "",
    audioFull: enSurah.audioFull || {},
  };
}

// Map English surah detail to Indonesian format

function mapEnglishDetailToID(enDetail: any): SurahDetail {
  const ayahs = enDetail.ayahs || [];

  return {
    nomor: enDetail.number,
    nama: enDetail.name || "",
    namaLatin: enDetail.englishName || "",
    jumlahAyat: enDetail.numberOfAyahs || 0,
    tempatTurun: enDetail.revelationType || "",
    arti: enDetail.englishNameTranslation || "",
    deskripsi: "",
    audioFull: enDetail.audioFull || {},
    ayat: ayahs.map((ayah: any) => ({
      nomorAyat: ayah.numberInSurah || 0,
      teksArab: ayah.textArabic || "",
      teksLatin: ayah.textLatin || "",
      teksIndonesia: toSentenceCase(ayah.textEnglish || ""),
      audio: ayah.audio || {},
    })),
    suratSelanjutnya: enDetail.nextSurah
      ? {
          nomor: enDetail.nextSurah.number || 0,
          nama: enDetail.nextSurah.name || "",
          namaLatin: enDetail.nextSurah.englishName || "",
          jumlahAyat: enDetail.nextSurah.numberOfAyahs || 0,
        }
      : null,
    suratSebelumnya: enDetail.previousSurah
      ? {
          nomor: enDetail.previousSurah.number || 0,
          nama: enDetail.previousSurah.name || "",
          namaLatin: enDetail.previousSurah.englishName || "",
          jumlahAyat: enDetail.previousSurah.numberOfAyahs || 0,
        }
      : null,
  };
}

// Get all surahs list
export async function getAllSurahs(
  locale: Locale
): Promise<SurahListItem[] | null> {
  try {
    const endpoint =
      locale === "id" ? `${BASE_URL}/v2/surat` : `${BASE_URL}/en/surah`;

    const response = await fetch(endpoint, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch surahs: ${response.status}`);
    }

    const result = await response.json();
    const data = result.data || result;

    // Map English response to Indonesian format
    if (locale === "en" && Array.isArray(data)) {
      return data.map(mapEnglishSurahToID);
    }

    return data;
  } catch (error) {
    console.error("Error fetching all surahs:", error);
    return null;
  }
}

// Get surah detail by number
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
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch surah ${number}: ${response.status}`);
    }

    const result = await response.json();
    const data = result.data || result;

    // Map English response to Indonesian format
    if (locale === "en") {
      return mapEnglishDetailToID(data);
    }

    return data;
  } catch (error) {
    console.error(`Error fetching surah ${number}:`, error);
    return null;
  }
}

// Get tafsir for specific surah
export async function getSurahTafsir(
  number: string,
  locale: Locale
): Promise<any | null> {
  try {
    const apiLocale = locale === "id" ? "v2" : "en";
    const endpoint = `${BASE_URL}/${apiLocale}/tafsir/${number}`;

    const response = await fetch(endpoint, {
      next: { revalidate: 3600 },
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
