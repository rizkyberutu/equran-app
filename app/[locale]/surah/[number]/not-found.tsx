// app/[locale]/surah/[number]/not-found.tsx
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/selia/button";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <PageContainer className="py-16">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <BookOpen className="size-16 text-muted" />
        <h2 className="text-2xl font-bold">Surah Not Found</h2>
        <p className="text-muted-foreground">
          The surah you're looking for doesn't exist.
        </p>
        <Button render={<Link href="/en/surah" />} variant="primary" size="md">
          Back to Surah List
        </Button>
      </div>
    </PageContainer>
  );
}
