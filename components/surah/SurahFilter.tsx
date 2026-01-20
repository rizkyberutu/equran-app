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
import { Label } from "../selia/label";

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
    {
      value: locale === "id" ? "all" : "all",
      label: locale === "id" ? "Semua" : "All",
    },
    {
      value: locale === "id" ? "Mekah" : "Meccan",
      label: locale === "id" ? "Mekah" : "Meccan",
    },
    {
      value: locale === "id" ? "Madinah" : "Medinan",
      label: locale === "id" ? "Madinah" : "Medinan",
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1">
        <Label className="text-sm font-medium text-foreground mb-2 block">
          {locale === "id" ? "Tempat Turun" : "Revelation Place"}
        </Label>
        <Select
          value={revelation}
          onValueChange={(value) => onRevelationChange(value as string)}
        >
          <SelectTrigger className={"cursor-pointer"}>
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
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className={"cursor-pointer"}
                >
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
