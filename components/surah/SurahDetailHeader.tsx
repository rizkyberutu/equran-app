"use client";

import { useState } from "react";
import { Card, CardBody } from "@/components/selia/card";
import { Badge } from "@/components/selia/badge";
import { IconBox } from "@/components/selia/icon-box";
import { Button } from "@/components/selia/button";
import { BookOpen, Dot, ChevronDown, ChevronUp } from "lucide-react";
import type { SurahDetail } from "@/types/surah";
import type { Locale } from "@/types/common";
import { cn } from "@/lib/utils/cn";

interface SurahDetailHeaderProps {
  surah: SurahDetail;
  locale: Locale;
  dictionary: {
    verses: string;
    revelation: string;
    description: string;
    totalVerses: string;
  };
}

export function SurahDetailHeader({
  surah,
  locale,
  dictionary,
}: SurahDetailHeaderProps) {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  return (
    <Card>
      <CardBody className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center lg:items-start gap-4 md:gap-6">
          {/* Number Badge */}
          <IconBox variant="primary-subtle" size="lg">
            <span className="text-2xl font-bold">{surah.nomor}</span>
          </IconBox>

          {/* Title & Info */}
          <div className="flex-1 space-y-1 lg:space-y-3">
            {/* Names */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center justify-between gap-1">
                <h1 className="text-lg md:text-3xl font-bold">
                  {surah.namaLatin}
                </h1>
                <Dot className="size-8 text-muted" />
                <p className="text-xs lg:text-lg text-muted">{surah.arti}</p>
              </div>

              <div className="flex gap-1 items-center">
                <span className="hidden md:block text-4xl font-arabic">
                  {surah.nama}
                </span>

                {/* Description Toggle - with Text */}
                {surah.deskripsi && (
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                    className="ml-2"
                  >
                    {/* Text - hidden on mobile */}
                    <span className="hidden sm:inline text-xs">
                      {dictionary.description}
                    </span>
                    {/* Icon */}
                    {isDescriptionOpen ? (
                      <ChevronUp className="size-3.5 sm:ml-1.5" />
                    ) : (
                      <ChevronDown className="size-3.5 sm:ml-1.5" />
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary" size="md">
                {surah.tempatTurun}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted">
                <BookOpen className="size-4" />
                <span>
                  {surah.jumlahAyat} {dictionary.verses}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description Content - Collapsible */}
        {surah.deskripsi && (
          <div
            className={cn(
              "grid transition-all duration-300 ease-in-out border-t border-border",
              isDescriptionOpen
                ? "grid-rows-[1fr] opacity-100 pt-6"
                : "grid-rows-[0fr] opacity-0 border-t-0"
            )}
          >
            <div className="overflow-hidden">
              <div
                className="prose prose-sm max-w-none text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: surah.deskripsi }}
              />
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
