export const apiConfig = {
  equran: {
    baseUrl:
      process.env.NEXT_PUBLIC_EQURAN_API_URL || "https://equran.id/api/v2",
    baseUrlEn:
      process.env.NEXT_PUBLIC_EQURAN_API_EN_URL || "https://equran.id/api/en",
    endpoints: {
      allSurah: "/surat",
      surahDetail: (number: number) => `/surat/${number}`,
      allDoa: "/doa",
      tafsir: (number: number) => `/tafsir/${number}`,
    },
  },
} as const;
