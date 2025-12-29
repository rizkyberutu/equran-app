export const siteConfig = {
  name: "Al-Quran & Doa",
  description:
    "Aplikasi Al-Quran dan Doa-doa harian dengan terjemahan, tafsir, dan audio",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locales: ["id", "en"],
  defaultLocale: "id",
} as const;

export type Locale = (typeof siteConfig.locales)[number];
