// app/[locale]/surah/loading.tsx
import { PageContainer } from "@/components/layout/PageContainer";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export default function Loading() {
  return (
    <PageContainer className="py-8">
      <LoadingSpinner size="lg" text="Loading duas..." />
    </PageContainer>
  );
}
