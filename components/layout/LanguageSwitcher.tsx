// components/layout/LanguageSwitcher.tsx
"use client";

import { useLocale } from "@/hooks/useLocale";
import { Button } from "@/components/selia/button";
import { Globe } from "lucide-react";
import type { Locale } from "@/types/common";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const { switchLocale } = useLocale();

  const handleSwitch = () => {
    const newLocale: Locale = currentLocale === "id" ? "en" : "id";
    switchLocale(newLocale);
  };

  return (
    <Button variant="outline" size="sm-icon" onClick={handleSwitch}>
      <Globe className="size-4" />
      <span className="sr-only">
        {currentLocale === "id"
          ? "Switch to English"
          : "Ganti ke Bahasa Indonesia"}
      </span>
    </Button>
  );
}
