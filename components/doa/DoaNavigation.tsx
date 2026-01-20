// components/doa/DoaNavigation.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/selia/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Doa } from "@/lib/services/doa.service";
import type { Locale } from "@/types/common";

interface DoaNavigationProps {
  previous: Doa | null;
  next: Doa | null;
  locale: Locale;
}

export function DoaNavigation({ previous, next, locale }: DoaNavigationProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      {previous ? (
        <Button
          render={<Link href={`/${locale}/doa/${previous.id}`} />}
          variant="outline"
          size="sm"
        >
          <ChevronLeft className="size-4" />
          <span className="hidden sm:inline">{previous.nama}</span>
          <span className="sm:hidden">
            {locale === "id" ? "Sebelumnya" : "Previous"}
          </span>
        </Button>
      ) : (
        <div />
      )}

      {next ? (
        <Button
          render={<Link href={`/${locale}/doa/${next.id}`} />}
          variant="outline"
          size="sm"
        >
          <span className="hidden sm:inline">{next.nama}</span>
          <span className="sm:hidden">
            {locale === "id" ? "Selanjutnya" : "Next"}
          </span>
          <ChevronRight className="size-4" />
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
}
