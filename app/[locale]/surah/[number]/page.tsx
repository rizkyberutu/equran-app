// app/[locale]/surah/[number]/page.tsx
import type { Locale } from "@/types/common";
import { notFound } from "next/navigation";
import { getSurahDetail, getAllSurahs } from "@/lib/services";
import { SurahDetailClient } from "@/components/surah/SurahDetailClient";

interface SurahDetailPageProps {
  params: Promise<{
    locale: Locale;
    number: string;
  }>;
}

const getDictionary = (locale: Locale) => {
  if (locale === "id") {
    return {
      back: "Kembali",
      verses: "Ayat",
      revelation: "Tempat Turun",
      description: "Deskripsi",
      totalVerses: "Total Ayat",
    };
  }

  return {
    back: "Back",
    verses: "Verses",
    revelation: "Revelation",
    description: "Description",
    totalVerses: "Total Verses",
  };
};

export default async function SurahDetailPage({
  params,
}: SurahDetailPageProps) {
  const { locale, number } = await params;
  const dict = getDictionary(locale);

  // Fetch both surah detail and all surahs for sidebar
  const [surah, allSurahs] = await Promise.all([
    getSurahDetail(number, locale),
    getAllSurahs(locale),
  ]);

  if (!surah) {
    notFound();
  }

  return (
    <SurahDetailClient
      surah={surah}
      allSurahs={allSurahs || []}
      locale={locale}
      dict={dict}
    />
  );
}
