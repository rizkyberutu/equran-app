// types/surah.ts
export interface SurahListItem {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: "Mekah" | "Medinah" | "mekah" | "medinah";
  arti: string;
  deskripsi: string;
  audioFull: {
    [key: string]: string;
  };
}

// English version
export interface SurahListItemEN {
  number: number;
  sequence: number;
  numberOfVerses: number;
  name: {
    short: string;
    long: string;
    transliteration: {
      en: string;
      id: string;
    };
    translation: {
      en: string;
      id: string;
    };
  };
  revelation: {
    arab: string;
    en: string;
    id: string;
  };
  tafsir: {
    id: string;
  };
}

// Ayah (Ayat) detail
export interface Ayah {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: {
    [key: string]: string; // Key adalah nama qari
  };
}

// English version Ayah
export interface AyahEN {
  number: {
    inQuran: number;
    inSurah: number;
  };
  meta: {
    juz: number;
    page: number;
    manzil: number;
    ruku: number;
    hizbQuarter: number;
    sajda: {
      recommended: boolean;
      obligatory: boolean;
    };
  };
  text: {
    arab: string;
    transliteration: {
      en: string;
    };
  };
  translation: {
    en: string;
    id: string;
  };
  audio: {
    primary: string;
    secondary: string[];
  };
  tafsir: {
    id: {
      short: string;
      long: string;
    };
  };
}

// Surah detail (dari /surat/{nomor} endpoint)
export interface SurahDetail {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: { [key: string]: string };
  ayat: Ayah[];
  suratSelanjutnya: SurahNavigation;
  suratSebelumnya: SurahNavigation;
  tafsir?: Array<{
    ayat: number;
    teks: string;
  }>;
}

// English version Surah detail
export interface SurahDetailEN {
  number: number;
  sequence: number;
  numberOfVerses: number;
  name: {
    short: string;
    long: string;
    transliteration: {
      en: string;
      id: string;
    };
    translation: {
      en: string;
      id: string;
    };
  };
  revelation: {
    arab: string;
    en: string;
    id: string;
  };
  tafsir: {
    id: string;
  };
  preBismillah: {
    text: {
      arab: string;
      transliteration: {
        en: string;
      };
    };
    translation: {
      en: string;
      id: string;
    };
    audio: {
      primary: string;
      secondary: string[];
    };
  } | null;
  verses: AyahEN[];
}

// Navigation between surahs
export interface SurahNavigation {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
}

// Tafsir types
export interface TafsirAyah {
  ayat: number;
  tafsir: string;
}

export interface SurahTafsir {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: "Mekah" | "Medinah" | "mekah" | "medinah";
  arti: string;
  deskripsi: string;
  audioFull: {
    [key: string]: string;
  };
  tafsir: TafsirAyah[];
}
