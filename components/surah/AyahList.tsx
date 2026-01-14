// components/surah/AyahList.tsx
"use client";

import { useState } from "react";
import { AyahCard } from "./AyahCard";
import { Pagination } from "@/components/shared/Pagination";
import { Card, CardBody } from "@/components/selia/card";
import {
  Select,
  SelectTrigger,
  SelectPopup,
  SelectList,
  SelectItem,
} from "@/components/selia/select";
import { Volume2 } from "lucide-react";
import { getQariName } from "@/lib/utils/qari-mapping";
import type { Ayah } from "@/types/surah";
import type { Locale } from "@/types/common";

interface AyahListProps {
  ayahs: Ayah[];
  surahNumber: number;
  locale: Locale;
  itemsPerPage?: number;
}

export function AyahList({
  ayahs,
  surahNumber,
  locale,
  itemsPerPage = 10,
}: AyahListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Get available qaris from first ayah
  const availableQaris = ayahs.length > 0 ? Object.keys(ayahs[0].audio) : [];
  const defaultQari = availableQaris[0] || "";

  // Global qari state - shared by all ayahs
  const [selectedQari, setSelectedQari] = useState<string>(defaultQari);

  const totalPages = Math.ceil(ayahs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, ayahs.length);
  const currentAyahs = ayahs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById("ayah-list");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="ayah-list" className="space-y-6">
      {/* Global Qari Selector - Sticky */}
      {availableQaris.length > 1 && (
        <div className="sticky top-20 z-40">
          <Card>
            <CardBody className="py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 shrink-0">
                  <Volume2 className="size-5 text-primary" />
                  <p className="text-sm font-medium text-foreground">
                    {locale === "id"
                      ? "Pilih Qari untuk Semua Ayat:"
                      : "Select Qari for All Verses:"}
                  </p>
                </div>

                <div className="flex-1 max-w-sm">
                  <Select
                    value={selectedQari}
                    onValueChange={(value) => setSelectedQari(value as string)}
                  >
                    <SelectTrigger>
                      <span className="flex-1 text-left cursor-pointer">
                        {getQariName(selectedQari)}
                      </span>
                    </SelectTrigger>
                    <SelectPopup>
                      <SelectList>
                        {availableQaris.map((qari) => (
                          <SelectItem
                            key={qari}
                            value={qari}
                            className={"cursor-pointer"}
                          >
                            {getQariName(qari)}
                          </SelectItem>
                        ))}
                      </SelectList>
                    </SelectPopup>
                  </Select>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Ayahs */}
      <div className="space-y-6">
        {currentAyahs.map((ayah) => (
          <AyahCard
            key={ayah.nomorAyat}
            ayah={ayah}
            surahNumber={surahNumber}
            locale={locale}
            selectedQari={selectedQari}
            showTafsir={true}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          showInfo
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={ayahs.length}
          locale={locale}
        />
      )}
    </div>
  );
}
