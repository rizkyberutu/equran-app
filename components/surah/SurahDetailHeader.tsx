// components/surah/SurahDetailHeader.tsx
"use client";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/selia/card";
import { Badge } from "@/components/selia/badge";
import { IconBox } from "@/components/selia/icon-box";
import { Divider } from "@/components/selia/divider";
import { BackButton } from "@/components/shared/BackButton";
import type { SurahDetail } from "@/types/surah";
import type { Locale } from "@/types/common";

interface SurahDetailHeaderProps {
  surah: SurahDetail;
  locale: Locale;
  dictionary: {
    back: string;
    verses: string;
    revelation: string;
    description: string;
  };
}

export function SurahDetailHeader({
  surah,
  locale,
  dictionary,
}: SurahDetailHeaderProps) {
  return (
    <div className="space-y-4">
      <BackButton text={dictionary.back} fallbackHref={`/${locale}/surah`} />

      <Card>
        <CardHeader align="center">
          <IconBox variant="primary" size="lg" circle>
            <span className="text-xl font-bold">{surah.nomor}</span>
          </IconBox>

          <div className="text-center w-full">
            <CardTitle className="text-3xl mb-2">{surah.namaLatin}</CardTitle>
            <div className="text-4xl font-arabic mb-3">{surah.nama}</div>
            <CardDescription className="flex items-center justify-center gap-3 flex-wrap">
              <Badge variant="secondary">{surah.tempatTurun}</Badge>
              <span>•</span>
              <span>
                {surah.jumlahAyat} {dictionary.verses}
              </span>
            </CardDescription>
          </div>
        </CardHeader>

        <Divider variant="default" />

        <CardBody>
          <div>
            <p className="text-sm font-medium text-muted mb-2">
              {dictionary.description}
            </p>
            <div
              className="text-foreground leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: surah.deskripsi }}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
