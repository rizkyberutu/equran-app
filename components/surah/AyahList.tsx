// components/surah/AyahList.tsx
"use client";

import { useState, useEffect } from "react";
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
import { Volume2, BookOpen } from "lucide-react";
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

  const availableQaris = ayahs.length > 0 ? Object.keys(ayahs[0].audio) : [];
  const defaultQari = availableQaris[0] || "";
  const [selectedQari, setSelectedQari] = useState<string>(defaultQari);

  // Jump to ayah state
  const [jumpToAyah, setJumpToAyah] = useState<string>("");

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

  // Handle jump to specific ayah
  const handleJumpToAyah = (ayahNumber: string) => {
    if (!ayahNumber) return;

    setJumpToAyah(ayahNumber);
    const ayahNum = parseInt(ayahNumber);

    // Calculate which page the ayah is on
    const pageNum = Math.ceil(ayahNum / itemsPerPage);
    setCurrentPage(pageNum);

    // Scroll to the ayah after a short delay to ensure page has changed
    setTimeout(() => {
      const element = document.getElementById(`ayah-${ayahNum}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        // Add highlight effect
        element.classList.add("ring-2", "ring-primary", "ring-offset-2");
        setTimeout(() => {
          element.classList.remove("ring-2", "ring-primary", "ring-offset-2");
        }, 2000);
      }
    }, 100);
  };

  return (
    <div id="ayah-list" className="space-y-6">
      {/* Global Controls - Sticky */}
      <div className="">
        <Card>
          <CardBody className="py-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Qari Selector */}
              {availableQaris.length > 1 && (
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Volume2 className="size-4 text-primary" />
                    <p className="text-sm font-medium text-foreground">
                      {locale === "id" ? "Pilih Qari:" : "Select Qari:"}
                    </p>
                  </div>
                  <Select
                    value={selectedQari}
                    onValueChange={(value) => setSelectedQari(value as string)}
                  >
                    <SelectTrigger>
                      <span className="flex-1 text-left">
                        {getQariName(selectedQari)}
                      </span>
                    </SelectTrigger>
                    <SelectPopup>
                      <SelectList>
                        {availableQaris.map((qari) => (
                          <SelectItem key={qari} value={qari}>
                            {getQariName(qari)}
                          </SelectItem>
                        ))}
                      </SelectList>
                    </SelectPopup>
                  </Select>
                </div>
              )}

              {/* Jump to Ayah */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="size-4 text-primary" />
                  <p className="text-sm font-medium text-foreground">
                    {locale === "id" ? "Lompat ke Ayat:" : "Jump to Verse:"}
                  </p>
                </div>
                <Select
                  value={jumpToAyah}
                  onValueChange={(value) => handleJumpToAyah(value as string)}
                >
                  <SelectTrigger>
                    <span className="flex-1 text-left text-muted">
                      {jumpToAyah
                        ? `${locale === "id" ? "Ayat" : "Verse"} ${jumpToAyah}`
                        : locale === "id"
                        ? "Pilih ayat..."
                        : "Select verse..."}
                    </span>
                  </SelectTrigger>
                  <SelectPopup>
                    <SelectList>
                      {ayahs.map((ayah) => (
                        <SelectItem
                          key={ayah.nomorAyat}
                          value={ayah.nomorAyat.toString()}
                        >
                          {locale === "id" ? "Ayat" : "Verse"} {ayah.nomorAyat}
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
