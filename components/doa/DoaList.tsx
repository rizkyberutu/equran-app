// components/doa/DoaList.tsx
"use client";

import { useState } from "react";
import { DoaCard } from "./DoaCard";
import { Pagination } from "@/components/shared/Pagination";
import type { Doa } from "@/lib/services/doa.service";
import type { Locale } from "@/types/common";

interface DoaListProps {
  doas: Doa[];
  locale: Locale;
  itemsPerPage?: number;
}

export function DoaList({ doas, locale, itemsPerPage = 12 }: DoaListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(doas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, doas.length);
  const currentDoas = doas.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (doas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-4 py-12">
        <div className="text-6xl">🤲</div>
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
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentDoas.map((doa) => (
          <DoaCard key={doa.id} doa={doa} locale={locale} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        showInfo
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={doas.length}
        locale={locale}
      />
    </div>
  );
}
