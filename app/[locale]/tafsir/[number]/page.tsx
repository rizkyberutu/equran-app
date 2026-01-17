// app/[locale]/tafsir/[number]/page.tsx
import { PageContainer } from "@/components/layout/PageContainer";
import { UnderDevelopment } from "@/components/common/UnderDevelopment";
import type { Locale } from "@/types/common";

interface TafsirPageProps {
  params: Promise<{
    locale: Locale;
    number: string;
  }>;
}

export default async function TafsirPage({ params }: TafsirPageProps) {
  const { locale, number } = await params;

  const dict = {
    id: {
      title: "Tafsir Al-Qur'an",
      description:
        "Fitur tafsir Al-Qur'an sedang dalam pengembangan. Kami akan segera menghadirkan tafsir lengkap untuk setiap surah.",
      estimatedDate: "Q2 2026",
    },
    en: {
      title: "Qur'an Tafsir",
      description:
        "Qur'an tafsir feature is under development. We will soon bring you complete tafsir for every surah.",
      estimatedDate: "Q2 2026",
    },
  };

  const content = dict[locale] || dict.en;

  return (
    <PageContainer>
      <UnderDevelopment
        title={content.title}
        description={content.description}
        estimatedDate={content.estimatedDate}
      />
    </PageContainer>
  );
}
