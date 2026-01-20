// components/surah/SurahDetailClient.tsx
"use client";

import { useState } from "react";
import { SurahDetailHeader } from "./SurahDetailHeader";
import { SurahNavigation } from "./SurahNavigation";
import { AyahList } from "./AyahList";
import { SurahSidebar } from "./SurahSidebar";
import { BackButton } from "@/components/shared/BackButton";
import { Button } from "@/components/selia/button";
import { Menu } from "lucide-react";
import type { SurahDetail, SurahListItem } from "@/types/surah";
import type { Locale } from "@/types/common";

interface SurahDetailClientProps {
  surah: SurahDetail;
  allSurahs: SurahListItem[];
  locale: Locale;
  dict: {
    back: string;
    verses: string;
    revelation: string;
    description: string;
    totalVerses: string;
  };
}

export function SurahDetailClient({
  surah,
  allSurahs,
  locale,
  dict,
}: SurahDetailClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Main Content - Adjust for sidebar on desktop */}
      <div className="lg:pl-80">
        {/* Use padding instead of PageContainer for desktop */}
        <div className="px-8 md:px-16 lg:px-24 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header with Menu Button (Mobile Only) */}
            <div className="flex items-center justify-between gap-4">
              <BackButton text={dict.back} fallbackHref={`/${locale}/surah`} />

              {/* Menu Button - Mobile Only */}
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden shrink-0"
              >
                <Menu className="size-4 sm:mr-2" />
                <span className="hidden sm:inline">
                  {locale === "id" ? "Daftar Surah" : "Surah List"}
                </span>
              </Button>
            </div>

            <SurahDetailHeader
              surah={surah}
              locale={locale}
              dictionary={dict}
            />

            <AyahList
              ayahs={surah.ayat}
              surahNumber={surah.nomor}
              surahName={surah.namaLatin}
              locale={locale}
              tafsir={(surah as any).tafsir}
            />

            <SurahNavigation
              previous={surah.suratSebelumnya}
              next={surah.suratSelanjutnya}
              locale={locale}
            />
          </div>
        </div>
      </div>

      {/* Surah Sidebar - Always visible on desktop */}
      <SurahSidebar
        surahs={allSurahs}
        locale={locale}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
}
