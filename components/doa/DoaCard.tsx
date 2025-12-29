// components/doa/DoaCard.tsx
"use client";

import { Card, CardBody, CardHeader, CardTitle } from "@/components/selia/card";
import { IconBox } from "@/components/selia/icon-box";
import { Divider } from "@/components/selia/divider";
import { Heart } from "lucide-react";
import type { DoaItem } from "@/types/doa";
import type { Locale } from "@/types/common";

interface DoaCardProps {
  doa: DoaItem;
  locale: Locale;
}

export function DoaCard({ doa, locale }: DoaCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <IconBox variant="success-subtle" size="md">
          <Heart className="size-4" />
        </IconBox>
        <CardTitle className="line-clamp-2">{doa.doa}</CardTitle>
      </CardHeader>

      <CardBody className="space-y-4">
        {/* Arabic Text */}
        <div>
          <p className="text-sm font-medium text-muted mb-2">
            {locale === "id" ? "Arab" : "Arabic"}
          </p>
          <p className="text-2xl leading-loose font-arabic text-foreground text-right">
            {doa.ayat}
          </p>
        </div>

        <Divider variant="default" />

        {/* Latin Text */}
        <div>
          <p className="text-sm font-medium text-muted mb-2">
            {locale === "id" ? "Latin" : "Transliteration"}
          </p>
          <p className="text-base italic text-foreground leading-relaxed">
            {doa.latin}
          </p>
        </div>

        {/* Translation */}
        <div>
          <p className="text-sm font-medium text-muted mb-2">
            {locale === "id" ? "Arti" : "Meaning"}
          </p>
          <p className="text-base text-foreground leading-relaxed">
            {doa.artinya}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
