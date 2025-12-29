// hooks/useSurah.ts
"use client";

import { useState, useEffect } from "react";
import { getAllSurahsID, getAllSurahsEN } from "@/lib/api/surah";
import type { SurahListItem, SurahListItemEN } from "@/types/surah";
import type { Locale } from "@/types/common";

interface UseSurahsReturn {
  surahs: SurahListItem[] | SurahListItemEN[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useSurahs(locale: Locale = "id"): UseSurahsReturn {
  const [surahs, setSurahs] = useState<SurahListItem[] | SurahListItemEN[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSurahs = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data =
        locale === "en" ? await getAllSurahsEN() : await getAllSurahsID();

      setSurahs(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch surahs")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSurahs();
  }, [locale]);

  return {
    surahs,
    isLoading,
    error,
    refetch: fetchSurahs,
  };
}
