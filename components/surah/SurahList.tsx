// components/surah/SurahList.tsx
"use client";

import { SurahCard } from "./SurahCard";
import { EmptyState } from "@/components/shared/EmptyState";
import type { SurahListItem } from "@/types/surah";
import type { Locale } from "@/types/common";
import { BookOpen } from "lucide-react";

interface SurahListProps {
  surahs: SurahListItem[];
  locale: Locale;
}

export function SurahList({ surahs, locale }: SurahListProps) {
  if (surahs.length === 0) {
    return (
      <EmptyState
        icon={<BookOpen className="size-16 text-muted" />}
        title={locale === "id" ? "Surah tidak ditemukan" : "No surahs found"}
        description={
          locale === "id"
            ? "Coba ubah kata kunci pencarian Anda"
            : "Try changing your search keywords"
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {surahs.map((surah) => (
        <SurahCard key={surah.nomor} surah={surah} locale={locale} />
      ))}
    </div>
  );
}
