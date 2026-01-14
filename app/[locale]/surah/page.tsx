// app/[locale]/surah/page.tsx
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { PageContainer } from "@/components/layout/PageContainer";
import { getAllSurahs } from "@/lib/services";
import type { Locale } from "@/types/common";
import { SurahListClient } from "./SurahListClient";

interface SurahPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

const getDictionary = (locale: Locale) => {
  if (locale === "id") {
    return {
      title: "Daftar Surah",
      subtitle: "114 Surah dalam Al-Quran",
      search: "Cari surah...",
      error: "Gagal memuat surah",
      retry: "Coba Lagi",
    };
  }

  return {
    title: "List of Surahs",
    subtitle: "114 Surahs in the Quran",
    search: "Search surah...",
    error: "Failed to load surahs",
    retry: "Try Again",
  };
};

export default async function SurahPage({ params }: SurahPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const surahs = await getAllSurahs(locale);

  if (!surahs) {
    return (
      <PageContainer className="py-8">
        <ErrorMessage title={dict.error} message="Unable to fetch surahs" />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">{dict.title}</h1>
        <p className="text-muted-foreground">{dict.subtitle}</p>
      </div>

      <SurahListClient surahs={surahs} locale={locale} dict={dict} />
    </PageContainer>
  );
}
