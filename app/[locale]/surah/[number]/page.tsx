// app/[locale]/surah/[number]/page.tsx
import { SurahDetailHeader } from "@/components/surah/SurahDetailHeader";
import { SurahNavigation } from "@/components/surah/SurahNavigation";
import { AyahList } from "@/components/surah/AyahList";
import { PageContainer } from "@/components/layout/PageContainer";
import { BackButton } from "@/components/shared/BackButton";
import type { Locale } from "@/types/common";
import { notFound } from "next/navigation";
import { getSurahDetail } from "@/lib/services";

interface SurahDetailPageProps {
  params: Promise<{
    locale: Locale;
    number: string;
  }>;
}

const getDictionary = (locale: Locale) => {
  if (locale === "id") {
    return {
      back: "Kembali ke Daftar Surah",
      verses: "Ayat",
      revelation: "Tempat Turun",
      description: "Deskripsi",
      totalVerses: "Total Ayat",
    };
  }

  return {
    back: "Back to Surah List",
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
  const surah = await getSurahDetail(number, locale);

  if (!surah) {
    notFound();
  }

  return (
    <PageContainer className="py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <BackButton text={dict.back} fallbackHref={`/${locale}/surah`} />

        {/* Surah Header */}
        <SurahDetailHeader surah={surah} locale={locale} dictionary={dict} />

        {/* Ayah List with Global Qari Selector */}
        <AyahList
          ayahs={surah.ayat}
          surahNumber={surah.nomor}
          locale={locale}
        />

        {/* Navigation */}
        <SurahNavigation
          previous={surah.suratSebelumnya}
          next={surah.suratSelanjutnya}
          locale={locale}
        />
      </div>
    </PageContainer>
  );
}
