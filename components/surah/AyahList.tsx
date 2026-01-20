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

interface TafsirItem {
  ayat: number;
  teks: string;
}

interface AyahListProps {
  ayahs: Ayah[];
  surahNumber: number;
  surahName: string;
  locale: Locale;
  itemsPerPage?: number;
  tafsir?: TafsirItem[]; // Array tafsir dari API
}

export function AyahList({
  ayahs,
  surahNumber,
  surahName,
  locale,
  itemsPerPage = 10,
  tafsir = [],
}: AyahListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const safeAyahs = ayahs || [];
  const safeTafsir = tafsir || [];

  const availableQaris = ayahs.length > 0 ? Object.keys(ayahs[0].audio) : [];
  // Set default qari to Misyari Rasyid Al-Afasi (code: 05)
  const defaultQari = availableQaris.includes("05")
    ? "05"
    : availableQaris[0] || "";
  const [selectedQari, setSelectedQari] = useState<string>(defaultQari);

  // Filter by ayah state - empty string means show all ayahs
  const [selectedAyah, setSelectedAyah] = useState<string>("");

  // Filter ayahs based on selection
  const filteredAyahs = selectedAyah
    ? ayahs.filter((ayah) => ayah.nomorAyat.toString() === selectedAyah)
    : ayahs;

  const totalPages = Math.ceil(filteredAyahs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredAyahs.length);
  const currentAyahs = filteredAyahs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById("ayah-list");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handle ayah filter change
  const handleAyahFilterChange = (ayahNumber: string) => {
    setSelectedAyah(ayahNumber);
    setCurrentPage(1); // Reset to first page when filter changes

    // Scroll to top of ayah list
    setTimeout(() => {
      const element = document.getElementById("ayah-list");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedAyah]);

  // Helper function to get tafsir for specific ayah
  const getTafsirForAyah = (ayahNumber: number): string | undefined => {
    const tafsirItem = tafsir.find((t) => t.ayat === ayahNumber);
    return tafsirItem?.teks;
  };

  return (
    <div id="ayah-list" className="space-y-6">
      {/* Global Controls - Sticky */}
      <div className="">
        <Card>
          <CardBody className="py-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Filter by Ayah */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="size-4 text-primary" />
                  <p className="text-sm font-medium text-foreground">
                    {locale === "id" ? "Ayat:" : "Verse:"}
                  </p>
                </div>
                <Select
                  value={selectedAyah}
                  onValueChange={(value) =>
                    handleAyahFilterChange(value as string)
                  }
                >
                  <SelectTrigger>
                    <span className="flex-1 text-left text-muted cursor-pointer">
                      {selectedAyah
                        ? `${
                            locale === "id" ? "Ayat" : "Verse"
                          } ${selectedAyah}`
                        : locale === "id"
                          ? "Semua"
                          : "All"}
                    </span>
                  </SelectTrigger>
                  <SelectPopup>
                    <SelectList>
                      {/* Option to show all verses */}
                      <SelectItem value="" className="cursor-pointer">
                        {locale === "id" ? "Semua" : "All"}
                      </SelectItem>
                      {/* Individual verse options */}
                      {ayahs.map((ayah) => (
                        <SelectItem
                          key={ayah.nomorAyat}
                          value={ayah.nomorAyat.toString()}
                          className="cursor-pointer"
                        >
                          {locale === "id" ? "Ayat" : "Verse"} {ayah.nomorAyat}
                        </SelectItem>
                      ))}
                    </SelectList>
                  </SelectPopup>
                </Select>
              </div>

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
                            className="cursor-pointer"
                          >
                            {getQariName(qari)}
                          </SelectItem>
                        ))}
                      </SelectList>
                    </SelectPopup>
                  </Select>
                </div>
              )}
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
            surahName={surahName}
            locale={locale}
            selectedQari={selectedQari}
            tafsirText={getTafsirForAyah(ayah.nomorAyat)}
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
          totalItems={filteredAyahs.length}
          locale={locale}
        />
      )}
    </div>
  );
}
