// components/surah/SurahCard.tsx
"use client";

import Link from "next/link";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/selia/card";
import { Badge } from "@/components/selia/badge";
import { IconBox } from "@/components/selia/icon-box";
import { BookOpen } from "lucide-react";
import type { SurahListItem } from "@/types/surah";
import type { Locale } from "@/types/common";
import { cn } from "@/lib/utils";

interface SurahCardProps {
  surah: SurahListItem;
  locale: Locale;
}

export function SurahCard({ surah, locale }: SurahCardProps) {
  return (
    <Link href={`/${locale}/surah/${surah.nomor}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardHeader>
          <IconBox variant="primary-subtle" size="md">
            <span className="text-sm font-bold">{surah.nomor}</span>
          </IconBox>

          <div className="flex flex-col gap-1">
            <CardTitle className="flex items-center justify-between">
              <span>{surah.namaLatin}</span>
              <span className="text-xl font-arabic">{surah.nama}</span>
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Badge variant="secondary" size="sm">
                {surah.tempatTurun}
              </Badge>
              <span className="text-xs">
                {surah.jumlahAyat} {locale === "id" ? "Ayat" : "Verses"}
              </span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardBody>
          <p className="text-sm text-muted line-clamp-2">{surah.arti}</p>
        </CardBody>
      </Card>
    </Link>
  );
}
