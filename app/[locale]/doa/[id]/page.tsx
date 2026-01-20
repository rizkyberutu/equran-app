// app/[locale]/doa/[id]/page.tsx
import { getAllDoas, getDoaById } from "@/lib/services/doa.service";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { notFound } from "next/navigation";
import { DoaDetailContent } from "../DoaDetailContent";
import { PageContainer } from "@/components/layout";

export default async function DoaDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: "id" | "en" }>;
}) {
  // Await params first
  const { id, locale } = await params;

  const [doa, allDoas, dict] = await Promise.all([
    getDoaById(id),
    getAllDoas(),
    getDictionary(locale),
  ]);

  if (!doa || !allDoas) {
    notFound();
  }

  return (
    <PageContainer className="py-8">
      <DoaDetailContent
        doa={doa}
        allDoas={allDoas}
        locale={locale}
        dictionary={dict}
      />
    </PageContainer>
  );
}

// Generate static params for better performance (optional)
export async function generateStaticParams() {
  const allDoas = await getAllDoas();

  if (!allDoas) return [];

  const locales = ["id", "en"];

  return allDoas.flatMap((doa) =>
    locales.map((locale) => ({
      locale,
      id: doa.id.toString(),
    }))
  );
}
