import { Card, CardBody, CardHeader } from "@/components/selia/card";
import { PageContainer } from "@/components/layout/PageContainer";
import { Skeleton } from "@/components/selia/skeleton";

export default function Loading() {
  return (
    <PageContainer className="py-8">
      <div className="space-y-6">
        {/* Header Skeleton */}
        <Card>
          <CardHeader align="center">
            <Skeleton className="w-16 h-16 rounded-full mb-4" />
            <Skeleton className="w-48 h-8 mb-2" />
            <Skeleton className="w-64 h-6 mb-3" />
            <div className="flex gap-2 justify-center">
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-20 h-6" />
            </div>
          </CardHeader>
          <CardBody>
            <Skeleton className="w-full h-24" />
          </CardBody>
        </Card>

        {/* Ayah Skeletons */}
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardBody className="space-y-4">
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-full h-16" />
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
            </CardBody>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
