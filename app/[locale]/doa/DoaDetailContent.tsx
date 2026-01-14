// app/[locale]/doa/DoaDetailContent.tsx
"use client";

import { Card, CardBody, CardHeader, CardTitle } from "@/components/selia/card";
import { Badge } from "@/components/selia/badge";
import { Divider } from "@/components/selia/divider";
import { BackButton } from "@/components/shared/BackButton";
import { Tag as TagIcon } from "lucide-react";
import type { Doa } from "@/lib/services/doa.service";
import type { Locale } from "@/types/common";

interface DoaDetailContentProps {
  doa: Doa;
  locale: Locale;
  dictionary: {
    back: string;
    arabic: string;
    transliteration: string;
    meaning: string;
    about: string;
    category: string;
    tags: string;
  };
}

export function DoaDetailContent({
  doa,
  locale,
  dictionary,
}: DoaDetailContentProps) {
  return (
    <div className="space-y-6">
      <BackButton text={dictionary.back} fallbackHref={`/${locale}/doa`} />

      <Card>
        <CardHeader className="w-full flex flex-col items-start justify-between gap-4">
          <div className="w-full flex items-center gap-4 mb-4">
            <Badge variant="primary" size="lg">
              #{doa.id}
            </Badge>

            <CardTitle className="text-3xl text-left">{doa.nama}</CardTitle>
          </div>

          <div className="w-full gap-2 flex flex-wrap">
            {/* Category */}
            <Badge variant="primary" size="md">
              {doa.grup}
            </Badge>

            {/* Tags */}
            {doa.tag.map((tag, index) => (
              <Badge key={index} variant="primary-outline" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardBody className="space-y-6">
          {/* Arabic Text */}
          <div>
            <p className="text-sm font-medium text-muted mb-3">
              {dictionary.arabic}
            </p>
            <div className="text-right bg-muted/30 p-6 rounded-lg">
              <p className="text-3xl leading-loose font-arabic text-foreground">
                {doa.ar}
              </p>
            </div>
          </div>

          {/* Transliteration */}
          <div>
            <p className="text-sm font-medium text-muted mb-3">
              {dictionary.transliteration}
            </p>
            <p className="text-lg italic text-foreground leading-relaxed">
              {doa.tr}
            </p>
          </div>

          {/* Translation */}
          <div>
            <p className="text-sm font-medium text-muted mb-3">
              {dictionary.meaning}
            </p>
            <p className="text-base text-foreground leading-relaxed">
              {doa.idn}
            </p>
          </div>

          <Divider />

          {/* Keterangan & Dalil */}
          <div>
            <p className="text-sm font-medium text-muted mb-3">
              {dictionary.about}
            </p>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                {doa.tentang}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
