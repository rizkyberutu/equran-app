// hooks/useSurahDetail.ts
"use client";

import { useState, useEffect } from "react";
import { getSurahDetailID, getSurahDetailEN } from "@/lib/api/surah";
import type { SurahDetail, SurahDetailEN } from "@/types/surah";
import type { Locale } from "@/types/common";

interface UseSurahDetailReturn {
  surah: SurahDetail | SurahDetailEN | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useSurahDetail(
  number: number,
  locale: Locale = "id"
): UseSurahDetailReturn {
  const [surah, setSurah] = useState<SurahDetail | SurahDetailEN | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSurah = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data =
        locale === "en"
          ? await getSurahDetailEN(number)
          : await getSurahDetailID(number);

      setSurah(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch surah detail")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (number) {
      fetchSurah();
    }
  }, [number, locale]);

  return {
    surah,
    isLoading,
    error,
    refetch: fetchSurah,
  };
}
