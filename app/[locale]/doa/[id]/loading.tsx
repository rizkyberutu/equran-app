// app/[locale]/doa/[id]/loading.tsx
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardBody, CardHeader } from "@/components/selia/card";
import { Skeleton } from "@/components/selia/skeleton";

export default function Loading() {
  return (
    <PageContainer className="py-8">
      <Skeleton className="w-20 h-10 mb-6" />
      <Card>
        <CardHeader align="center">
          <Skeleton className="w-16 h-8 mb-4" />
          <Skeleton className="w-64 h-8 mb-3" />
          <Skeleton className="w-32 h-6" />
        </CardHeader>
        <CardBody className="space-y-6">
          <Skeleton className="w-full h-32" />
          <Skeleton className="w-full h-20" />
          <Skeleton className="w-full h-24" />
        </CardBody>
      </Card>
    </PageContainer>
  );
}
