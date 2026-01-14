// app/[locale]/doa/page.tsx
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { PageContainer } from "@/components/layout/PageContainer";
import { getAllDoas } from "@/lib/services";
import type { Locale } from "@/types/common";
import { DoaListClient } from "./DoaListClient";

interface DoaPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

const getDictionary = (locale: Locale) => {
  if (locale === "id") {
    return {
      title: "Doa Sehari-hari",
      subtitle: "Kumpulan doa dalam kehidupan sehari-hari",
      search: "Cari doa...",
      error: "Gagal memuat doa",
    };
  }

  return {
    title: "Daily Duas",
    subtitle: "Collection of daily life supplications",
    search: "Search dua...",
    error: "Failed to load duas",
  };
};

export default async function DoaPage({ params }: DoaPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const doas = await getAllDoas();

  if (!doas) {
    return (
      <PageContainer className="py-8">
        <ErrorMessage title={dict.error} message="Unable to fetch duas" />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="py-8 text-center">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{dict.title}</h1>
        <p className="text-muted-foreground">{dict.subtitle}</p>
      </div>

      <DoaListClient doas={doas} locale={locale} dict={dict} />
    </PageContainer>
  );
}
