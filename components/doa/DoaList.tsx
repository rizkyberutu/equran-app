// components/doa/DoaList.tsx
"use client";

import { DoaCard } from "./DoaCard";
import { EmptyState } from "@/components/shared/EmptyState";
import type { DoaItem } from "@/types/doa";
import type { Locale } from "@/types/common";
import { Heart } from "lucide-react";

interface DoaListProps {
  doas: DoaItem[];
  locale: Locale;
}

export function DoaList({ doas, locale }: DoaListProps) {
  if (doas.length === 0) {
    return (
      <EmptyState
        icon={<Heart className="size-16 text-muted" />}
        title={locale === "id" ? "Doa tidak ditemukan" : "No duas found"}
        description={
          locale === "id"
            ? "Coba ubah kata kunci pencarian Anda"
            : "Try changing your search keywords"
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {doas.map((doa) => (
        <DoaCard key={doa.id} doa={doa} locale={locale} />
      ))}
    </div>
  );
}
