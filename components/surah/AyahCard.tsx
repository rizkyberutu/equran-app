// components/surah/AyahCard.tsx
"use client";

import { Card, CardBody } from "@/components/selia/card";
import { Button } from "@/components/selia/button";
import { Badge } from "@/components/selia/badge";
import { Play, Pause } from "lucide-react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import type { Ayah } from "@/types/surah";
import type { Locale } from "@/types/common";
import { IconBox } from "../selia/icon-box";

interface AyahCardProps {
  ayah: Ayah;
  surahNumber: number;
  locale: Locale;
  selectedQari: string;
  showTafsir?: boolean;
}

export function AyahCard({
  ayah,
  surahNumber,
  locale,
  selectedQari,
  showTafsir = false,
}: AyahCardProps) {
  const audioUrl = ayah.audio[selectedQari] || "";
  const { isPlaying, togglePlayPause } = useAudioPlayer(audioUrl);

  return (
    <Card id={`ayah-${ayah.nomorAyat}`} className="scroll-mt-32">
      <CardBody className="space-y-5">
        {/* Header - Number & Audio */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <IconBox variant="primary-subtle" size="lg">
            {ayah.nomorAyat}
          </IconBox>

          {audioUrl && (
            <Button
              variant="primary"
              size="sm-icon"
              onClick={togglePlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="size-5" />
              ) : (
                <Play className="size-5" />
              )}
            </Button>
          )}
        </div>

        {/* Arabic Text */}
        <div className="text-right bg-primary/10 p-6 rounded-lg">
          <p className="text-3xl leading-loose font-arabic text-foreground">
            {ayah.teksArab}
          </p>
        </div>

        {/* Transliteration */}
        <div>
          <p className="text-sm font-medium text-muted mb-2">
            {locale === "id" ? "Latin" : "Transliteration"}
          </p>
          <p className="text-base italic text-foreground leading-relaxed">
            {ayah.teksLatin}
          </p>
        </div>

        {/* Translation */}
        <div>
          <p className="text-sm font-medium text-muted mb-2">
            {locale === "id" ? "Terjemahan" : "Translation"}
          </p>
          <p className="text-base text-foreground leading-relaxed">
            {ayah.teksIndonesia}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
