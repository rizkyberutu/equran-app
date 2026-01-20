// components/surah/SurahSidebar.tsx
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/selia/button";
import { Badge } from "@/components/selia/badge";
import { SearchBar } from "@/components/shared/SearchBar";
import { X, BookOpen } from "lucide-react";
import type { SurahListItem } from "@/types/surah";
import type { Locale } from "@/types/common";
import { cn } from "@/lib/utils/cn";

interface SurahSidebarProps {
  surahs: SurahListItem[];
  locale: Locale;
  isOpen: boolean;
  onClose: () => void;
}

export function SurahSidebar({
  surahs,
  locale,
  isOpen,
  onClose,
}: SurahSidebarProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const activeItemRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredSurahs = useMemo(() => {
    if (!searchQuery) return surahs;

    const query = searchQuery.toLowerCase();
    return surahs.filter(
      (surah) =>
        surah.namaLatin.toLowerCase().includes(query) ||
        surah.nama.toLowerCase().includes(query) ||
        surah.nomor.toString().includes(query)
    );
  }, [surahs, searchQuery]);

  // Auto scroll to active surah
  useEffect(() => {
    if (activeItemRef.current && scrollContainerRef.current && !searchQuery) {
      // Delay untuk memastikan DOM sudah ter-render
      const timeoutId = setTimeout(() => {
        activeItemRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [pathname, isOpen, searchQuery]);

  return (
    <>
      {/* Backdrop - Mobile Only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Always visible on desktop, slide on mobile */}
      <aside
        className={cn(
          // Base styles
          "fixed top-0 left-0 h-full bg-background z-50 flex flex-col shadow-2xl",
          // Mobile: slide behavior
          "w-full sm:w-96 transform transition-transform duration-300 ease-in-out lg:transform-none",
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop: always visible, no slide
          "lg:translate-x-0 lg:w-80 lg:border-r lg:border-border lg:shadow-none"
        )}
      >
        {/* Header - Fixed */}
        <div className="shrink-0 p-4 border-b border-border bg-background sticky top-0 z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="size-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold">
                  {locale === "id" ? "Daftar Surah" : "Surah List"}
                </h2>
                <p className="text-xs text-muted">
                  {surahs.length} {locale === "id" ? "Surah" : "Surahs"}
                </p>
              </div>
            </div>
            {/* Close button - Mobile only */}
            <Button
              variant="plain"
              size="sm-icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="size-5" />
            </Button>
          </div>

          {/* Search */}
          <SearchBar
            placeholder={locale === "id" ? "Cari surah..." : "Search surah..."}
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* Surah List - Scrollable */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto overscroll-contain"
        >
          {filteredSurahs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center px-4">
              <BookOpen className="size-16 text-muted mb-4" />
              <p className="text-muted font-medium">
                {locale === "id" ? "Surah tidak ditemukan" : "No surah found"}
              </p>
              <p className="text-sm text-muted mt-2">
                {locale === "id"
                  ? "Coba kata kunci lain"
                  : "Try different keywords"}
              </p>
            </div>
          ) : (
            <div className="p-3 space-y-2">
              {filteredSurahs.map((surah) => {
                const isActive = pathname.endsWith(`/surah/${surah.nomor}`);
                return (
                  <Link
                    key={surah.nomor}
                    href={`/${locale}/surah/${surah.nomor}`}
                    onClick={onClose}
                    className="block"
                  >
                    <div
                      ref={isActive ? activeItemRef : null}
                      className={cn(
                        "p-4 rounded-xl transition-all duration-200",
                        "border",
                        isActive
                          ? "bg-primary/10 border-primary shadow-md"
                          : "border-transparent hover:bg-primary/10 hover:border-border active:scale-[0.98]"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        {/* Number Badge */}
                        <Badge
                          variant={isActive ? "primary" : "secondary"}
                          size="md"
                          className="shrink-0 justify-center"
                        >
                          {surah.nomor}
                        </Badge>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3
                              className={cn(
                                "font-semibold text-base truncate",
                                isActive ? "text-primary" : "text-foreground"
                              )}
                            >
                              {surah.namaLatin}
                            </h3>
                            <span
                              className={cn(
                                "text-xl font-arabic text-foreground shrink-0",
                                isActive && "text-primary font-semibold"
                              )}
                            >
                              {surah.nama}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-muted">
                            <span>{surah.tempatTurun}</span>
                            <span>•</span>
                            <span>
                              {surah.jumlahAyat}{" "}
                              {locale === "id" ? "Ayat" : "Verses"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="shrink-0 p-4 border-t border-border bg-primary/20">
          <p className="text-xs text-center text-black">
            {locale === "id"
              ? `Menampilkan ${filteredSurahs.length} dari ${surahs.length} surah`
              : `Showing ${filteredSurahs.length} of ${surahs.length} surahs`}
          </p>
        </div>
      </aside>
    </>
  );
}
