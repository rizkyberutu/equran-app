// components/doa/DoaList.tsx
"use client";

import { DoaCard } from "./DoaCard";
import { EmptyState } from "@/components/shared/EmptyState";
import type { Doa } from "@/lib/services/doa.service";
import type { Locale } from "@/types/common";
import { Heart } from "lucide-react";

interface DoaListProps {
  doas: Doa[];
  locale: Locale;
}

export function DoaList({ doas, locale }: DoaListProps) {
  if (doas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-4 py-12">
        <Heart className="size-12 text-muted" />
        <h3 className="text-xl font-semibold">
          {locale === "id" ? "Doa tidak ditemukan" : "No duas found"}
        </h3>
        <p className="text-muted-foreground">
          {locale === "id"
            ? "Coba ubah kata kunci pencarian Anda"
            : "Try changing your search keywords"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {doas.map((doa) => (
        <DoaCard key={doa.id} doa={doa} locale={locale} />
      ))}
    </div>
  );
}
