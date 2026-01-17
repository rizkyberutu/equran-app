// app/[locale]/layout.tsx
"use client";

import { Sora, Noto_Sans_Arabic } from "next/font/google";
import "../globals.css";
import { Toast } from "@/components/selia/toast";
import { Header } from "@/components/layout/Header";
import type { Locale } from "@/types/common";

const sora = Sora({
  subsets: ["latin"],
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const Metadata = {
  title: "Al-Quran & Doa - Digital Quran",
  description: "Read Al-Quran with translation, tafsir, and audio.",
  keywords: ["quran", "al-quran", "doa", "islamic", "prayer", "muslim"],
};

const getDictionary = (locale: Locale) => {
  if (locale === "id") {
    return {
      nav: {
        home: "Beranda",
        surah: "Surah",
        shalat: "Jadwal Shalat",
        imsakiyah: "Jadwal Imsak",
        doa: "Doa",
      },
    };
  }
  return {
    nav: {
      home: "Home",
      surah: "Surah",
      shalat: "Prayers",
      imsakiyah: "Imsakiyah",
      doa: "Duas",
    },
  };
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = locale as Locale;
  const dict = getDictionary(currentLocale);

  return (
    <html lang={currentLocale} suppressHydrationWarning>
      <body className={sora.className}>
        <style jsx global>{`
          .font-arabic {
            font-family: ${notoSansArabic.style.fontFamily}, serif !important;
          }
        `}</style>
        <Header locale={currentLocale} dictionary={dict} />
        {children}
        <Toast />
      </body>
    </html>
  );
}
