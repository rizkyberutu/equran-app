// components/surah/SurahFilter.tsx
"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectList,
  SelectItem,
} from "@/components/selia/select";
import type { Locale } from "@/types/common";

interface SurahFilterProps {
  locale: Locale;
  revelation: string;
  onRevelationChange: (value: string) => void;
}

export function SurahFilter({
  locale,
  revelation,
  onRevelationChange,
}: SurahFilterProps) {
  const revelationOptions = [
    { value: "all", label: locale === "id" ? "Semua" : "All" },
    { value: "mekah", label: locale === "id" ? "Mekah" : "Makkah" },
    { value: "medinah", label: locale === "id" ? "Medinah" : "Madinah" },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1">
        <label className="text-sm font-medium text-foreground mb-2 block">
          {locale === "id" ? "Tempat Turun" : "Revelation Place"}
        </label>
        <Select
          value={revelation}
          onValueChange={(value) => onRevelationChange(value as string)}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={
                locale === "id"
                  ? "Pilih tempat turun"
                  : "Select revelation place"
              }
            />
          </SelectTrigger>
          <SelectPopup>
            <SelectList>
              {revelationOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectList>
          </SelectPopup>
        </Select>
      </div>
    </div>
  );
}
