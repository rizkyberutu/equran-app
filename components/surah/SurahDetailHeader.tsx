// components/surah/SurahDetailHeader.tsx
"use client";

import { Card, CardBody } from "@/components/selia/card";
import { Badge } from "@/components/selia/badge";
import { IconBox } from "@/components/selia/icon-box";
import { BookOpen, Dot } from "lucide-react";
import type { SurahDetail } from "@/types/surah";
import type { Locale } from "@/types/common";

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
  return (
    <Card>
      <CardBody className="space-y-6">
        {/* Header Section */}
        <div className="flex items-start gap-6">
          {/* Number Badge */}
          <IconBox variant="primary-subtle" size="lg">
            <span className="text-2xl font-bold">{surah.nomor}</span>
          </IconBox>

          {/* Title & Info */}
          <div className="flex-1 space-y-3">
            {/* Names */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold mb-1">{surah.namaLatin}</h1>
                <Dot className="size-8 text-muted" />
                <p className="text-lg text-muted">{surah.arti}</p>
              </div>
              <span className="text-4xl font-arabic">{surah.nama}</span>
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

        {/* Description */}
        {surah.deskripsi && (
          <div className="pt-6 border-t border-border">
            <h2 className="text-sm font-medium text-muted mb-3">
              {dictionary.description}
            </h2>
            <div
              className="prose prose-sm max-w-none text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: surah.deskripsi }}
            />
          </div>
        )}
      </CardBody>
    </Card>
  );
}
