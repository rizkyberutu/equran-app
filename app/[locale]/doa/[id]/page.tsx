// app/[locale]/doa/[id]/page.tsx
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { getDoaById } from "@/lib/services";
import type { Locale } from "@/types/common";
import { DoaDetailContent } from "../DoaDetailContent";

interface DoaDetailPageProps {
  params: Promise<{
    locale: Locale;
    id: string;
  }>;
}

const getDictionary = (locale: Locale) => {
  if (locale === "id") {
    return {
      back: "Kembali",
      arabic: "Teks Arab",
      transliteration: "Transliterasi",
      meaning: "Artinya",
      about: "Keterangan & Dalil",
      category: "Kategori",
      tags: "Tag",
    };
  }

  return {
    back: "Back",
    arabic: "Arabic Text",
    transliteration: "Transliteration",
    meaning: "Meaning",
    about: "Description & Source",
    category: "Category",
    tags: "Tags",
  };
};

export default async function DoaDetailPage({ params }: DoaDetailPageProps) {
  const { locale, id } = await params;
  const dict = getDictionary(locale);
  const doa = await getDoaById(id);

  if (!doa) {
    notFound();
  }

  return (
    <PageContainer className="py-8">
      <DoaDetailContent doa={doa} locale={locale} dictionary={dict} />
    </PageContainer>
  );
}
