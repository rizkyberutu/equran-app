// components/doa/DoaDetail.tsx
"use client";

import { Card, CardBody, CardHeader, CardTitle } from "@/components/selia/card";
import { IconBox } from "@/components/selia/icon-box";
import { Divider } from "@/components/selia/divider";
import { BackButton } from "@/components/shared/BackButton";
import { Heart } from "lucide-react";
import type { DoaItem } from "@/types/doa";
import type { Locale } from "@/types/common";

interface DoaDetailProps {
  doa: DoaItem;
  locale: Locale;
  dictionary: {
    back: string;
    arabic: string;
    latin: string;
    meaning: string;
  };
}

export function DoaDetail({ doa, locale, dictionary }: DoaDetailProps) {
  return (
    <div className="space-y-4">
      <BackButton text={dictionary.back} fallbackHref={`/${locale}/doa`} />

      <Card>
        <CardHeader align="center">
          <IconBox variant="success" size="lg" circle>
            <Heart className="size-6" />
          </IconBox>
          <CardTitle className="text-center text-2xl">{doa.doa}</CardTitle>
        </CardHeader>

        <Divider variant="default" />

        <CardBody className="space-y-6">
          {/* Arabic Text */}
          <div>
            <p className="text-sm font-medium text-muted mb-3">
              {dictionary.arabic}
            </p>
            <p className="text-3xl leading-loose font-arabic text-foreground text-right">
              {doa.ayat}
            </p>
          </div>

          <Divider variant="default" />

          {/* Latin Text */}
          <div>
            <p className="text-sm font-medium text-muted mb-3">
              {dictionary.latin}
            </p>
            <p className="text-lg italic text-foreground leading-relaxed">
              {doa.latin}
            </p>
          </div>

          <Divider variant="default" />

          {/* Translation */}
          <div>
            <p className="text-sm font-medium text-muted mb-3">
              {dictionary.meaning}
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              {doa.artinya}
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
