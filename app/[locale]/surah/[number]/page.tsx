// app/[locale]/surah/[number]/page.tsx
import type { Locale } from "@/types/common";
import { notFound } from "next/navigation";
import { getSurahDetail, getAllSurahs } from "@/lib/services";
import { getSurahTafsir } from "@/lib/api/surah";
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

  // Fetch surah detail, all surahs, dan tafsir (hanya untuk Indonesian)
  const [surah, allSurahs, tafsirArray] = await Promise.all([
    getSurahDetail(number, locale),
    getAllSurahs(locale),
    locale === "id" ? getSurahTafsir(parseInt(number)) : Promise.resolve([]),
  ]);

  if (!surah) {
    notFound();
  }

  // Merge tafsir ke surah object
  const surahWithTafsir = {
    ...surah,
    tafsir: tafsirArray,
  };

  return (
    <SurahDetailClient
      surah={surahWithTafsir as any}
      allSurahs={allSurahs || []}
      locale={locale}
      dict={dict}
    />
  );
}
