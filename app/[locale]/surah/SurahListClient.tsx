// app/[locale]/surah/SurahListClient.tsx
"use client";

import { useState, useMemo } from "react";
import { SearchBar } from "@/components/shared/SearchBar";
import type { SurahListItem } from "@/types/surah";
import type { Locale } from "@/types/common";
import { SurahFilter } from "@/components/surah/SurahFilter";
import { SurahList } from "@/components/surah/SurahList";

interface SurahListClientProps {
  surahs: SurahListItem[];
  locale: Locale;
  dict: {
    search: string;
  };
}

export function SurahListClient({
  surahs,
  locale,
  dict,
}: SurahListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [revelation, setRevelation] = useState("all");

  const filteredSurahs = useMemo(() => {
    let filtered = surahs;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (surah) =>
          surah.namaLatin.toLowerCase().includes(query) ||
          surah.nama.toLowerCase().includes(query) ||
          surah.arti.toLowerCase().includes(query) ||
          surah.nomor.toString().includes(query)
      );
    }

    if (revelation !== "all") {
      filtered = filtered.filter(
        (surah) => surah.tempatTurun.toLowerCase() === revelation.toLowerCase()
      );
    }

    return filtered;
  }, [surahs, searchQuery, revelation]);

  return (
    <>
      <div className="flex sm:flex-row flex-col gap-4 items-end mb-8 mx-auto max-w-xl">
        <div className="flex-1">
          <SearchBar
            placeholder={dict.search}
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>
        <SurahFilter
          locale={locale}
          revelation={revelation}
          onRevelationChange={setRevelation}
        />
      </div>

      <SurahList surahs={filteredSurahs} locale={locale} />
    </>
  );
}
