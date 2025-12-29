// hooks/useLocale.ts
"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/types/common";

interface UseLocaleReturn {
  locale: Locale;
  switchLocale: (newLocale: Locale) => void;
}

export function useLocale(): UseLocaleReturn {
  const pathname = usePathname();
  const router = useRouter();

  const getCurrentLocale = (): Locale => {
    const segments = pathname.split("/");
    const localeSegment = segments[1];
    return (localeSegment === "en" ? "en" : "id") as Locale;
  };

  const locale = getCurrentLocale();

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return {
    locale,
    switchLocale,
  };
}
