// app/[locale]/not-found.tsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/selia/button";
import { EmptyState } from "@/components/shared/EmptyState";
import { Home, BookOpen } from "lucide-react";
import type { Locale } from "@/types/common";

export default function NotFound() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "id";

  return (
    <div className="container mx-auto px-4 py-16">
      <EmptyState
        icon={<BookOpen className="size-16 text-muted-foreground" />}
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        action={
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={`/${locale}`}>
              <Button>
                <Home className="size-4" /> Go to Home
              </Button>
            </Link>
            <Link href={`/${locale}/surah`}>
              <Button variant="secondary">
                <BookOpen className="size-4" />
                Browse Surahs
              </Button>
            </Link>
          </div>
        }
      />
    </div>
  );
}
