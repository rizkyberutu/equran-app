// components/surah/SurahNavigation.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/selia/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { SurahNavigation as SurahNav } from "@/types/surah";
import type { Locale } from "@/types/common";

interface SurahNavigationProps {
  previous: SurahNav | null;
  next: SurahNav | null;
  locale: Locale;
}

export function SurahNavigation({
  previous,
  next,
  locale,
}: SurahNavigationProps) {
  return (
    <div className="flex items-center justify-between gap-4 mt-8">
      {previous ? (
        <Button
          render={<Link href={`/${locale}/surah/${previous.nomor}`} />}
          variant="outline"
          size="sm"
        >
          <ArrowLeft className="size-4" />
          <span className="hidden sm:inline">{previous.namaLatin}</span>
          <span className="sm:hidden">
            {locale === "id" ? "Sebelumnya" : "Previous"}
          </span>
        </Button>
      ) : (
        <div />
      )}

      {next ? (
        <Button
          render={<Link href={`/${locale}/surah/${next.nomor}`} />}
          variant="outline"
          size="sm"
        >
          <span className="hidden sm:inline">{next.namaLatin}</span>
          <span className="sm:hidden">
            {locale === "id" ? "Selanjutnya" : "Next"}
          </span>
          <ArrowRight className="size-4" />
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
}
