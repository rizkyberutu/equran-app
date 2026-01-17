"use client";

import Link from "next/link";
import { Card, CardBody, CardHeader } from "@/components/selia/card";
import { Badge } from "@/components/selia/badge";
import { IconBox } from "@/components/selia/icon-box";
import type { SurahListItem } from "@/types/surah";
import type { Locale } from "@/types/common";

interface SurahCardProps {
  surah: SurahListItem;
  locale: Locale;
}

export function SurahCard({ surah, locale }: SurahCardProps) {
  return (
    <Link href={`/${locale}/surah/${surah.nomor}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        {/* Override CardHeader grid dengan flex */}
        <CardHeader className="flex! flex-col! gap-4">
          <IconBox variant="primary-subtle" size="lg">
            <span className="text-lg font-bold">{surah.nomor}</span>
          </IconBox>

          <div className="flex items-center justify-between gap-4 w-full">
            <span className="text-2xl font-semibold text-foreground">
              {surah.namaLatin}
            </span>
            <span
              className="text-4xl font-arabic font-semibold text-primary"
              style={{ fontFamily: "var(--font-arabic)" }}
            >
              {surah.nama}
            </span>
          </div>

          {/* Surah Info */}
          <div className="flex items-center gap-2">
            <Badge
              variant={
                surah.tempatTurun?.toLowerCase() === "madinah"
                  ? "secondary-outline"
                  : "primary-outline"
              }
              className={
                surah.tempatTurun?.toLowerCase() === "madinah"
                  ? "border-secondary-border"
                  : undefined
              }
            >
              {surah.tempatTurun}
            </Badge>

            <span className="text-base text-muted">
              <span className="font-semibold text-primary">
                {surah.jumlahAyat}
              </span>{" "}
              {locale === "id" ? "Ayat" : "Verses"}
            </span>
          </div>
        </CardHeader>

        <CardBody>
          <p className="text-sm font-medium text-muted/80 line-clamp-2">
            {locale === "id" ? "Arti Surah" : "Surah Translation"}:{" "}
            <span className="font-semibold text-primary">{surah.arti}</span>
          </p>
        </CardBody>
      </Card>
    </Link>
  );
}
