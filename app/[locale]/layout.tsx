import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "../globals.css";
import { Toast } from "@/components/selia/toast";
import { Header } from "@/components/layout/Header";
import type { Locale } from "@/types/common";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Al-Quran & Doa - Digital Quran",
  description:
    "Read Al-Quran with translation, tafsir, and audio. Daily duas in Arabic with transliteration.",
  keywords: ["quran", "al-quran", "doa", "islamic", "prayer", "muslim"],
};

// Dictionary untuk Header
const getDictionary = (locale: Locale) => {
  if (locale === "id") {
    return {
      nav: {
        home: "Beranda",
        surah: "Surah",
        doa: "Doa",
      },
    };
  }
  return {
    nav: {
      home: "Home",
      surah: "Surah",
      doa: "Duas",
    },
  };
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={sora.className}>
        <Header locale={locale} dictionary={dict} />
        {children}
        <Toast />
      </body>
    </html>
  );
}
