// components/surah/AyahCard.tsx
"use client";

import { useState } from "react";
import { Card, CardBody } from "@/components/selia/card";
import { Button } from "@/components/selia/button";
import { Badge } from "@/components/selia/badge";
import { Divider } from "@/components/selia/divider";
import { Play, Pause, BookOpen } from "lucide-react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import type { Ayah } from "@/types/surah";
import type { Locale } from "@/types/common";
import { cn } from "@/lib/utils";

interface AyahCardProps {
  ayah: Ayah;
  surahNumber: number;
  locale: Locale;
  showTafsir?: boolean;
}

export function AyahCard({
  ayah,
  surahNumber,
  locale,
  showTafsir = false,
}: AyahCardProps) {
  const [selectedQari, setSelectedQari] = useState<string>("");
  const audioUrl =
    selectedQari && ayah.audio[selectedQari] ? ayah.audio[selectedQari] : "";

  const { isPlaying, play, pause, togglePlayPause } = useAudioPlayer(audioUrl);

  // Get first qari as default
  const defaultQari = Object.keys(ayah.audio)[0] || "";

  if (!selectedQari && defaultQari) {
    setSelectedQari(defaultQari);
  }

  return (
    <Card className="scroll-mt-20" id={`ayah-${ayah.nomorAyat}`}>
      <CardBody className="space-y-4">
        {/* Ayah Number Badge */}
        <div className="flex items-center justify-between">
          <Badge variant="primary" size="md">
            {locale === "id" ? "Ayat" : "Verse"} {ayah.nomorAyat}
          </Badge>

          {audioUrl && (
            <Button
              variant="plain"
              size="sm-icon"
              onClick={togglePlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="size-4" />
              ) : (
                <Play className="size-4" />
              )}
            </Button>
          )}
        </div>

        {/* Arabic Text */}
        <div className="text-right">
          <p className="text-3xl leading-loose font-arabic text-foreground">
            {ayah.teksArab}
          </p>
        </div>

        <Divider variant="default" />

        {/* Latin Text */}
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

        {/* Audio Controls */}
        {Object.keys(ayah.audio).length > 1 && (
          <div className="pt-2">
            <p className="text-sm font-medium text-muted mb-2">
              {locale === "id" ? "Pilih Qari" : "Select Qari"}
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(ayah.audio).map((qari) => (
                <Button
                  key={qari}
                  variant={selectedQari === qari ? "primary" : "outline"}
                  size="xs"
                  onClick={() => setSelectedQari(qari)}
                >
                  {qari}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
