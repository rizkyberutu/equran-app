// components/surah/AyahCard.tsx
"use client";

import { Card, CardBody } from "@/components/selia/card";
import { Button } from "@/components/selia/button";
import {
  Dialog,
  DialogTrigger,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "@/components/selia/dialog";
import { Play, Pause, Share2, BookOpen, X } from "lucide-react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { BookmarkButton } from "./BookmarkButton";
import type { Ayah } from "@/types/surah";
import type { Locale } from "@/types/common";
import { IconBox } from "@/components/selia/icon-box";
import { cn } from "@/lib/utils/cn";

interface AyahCardProps {
  ayah: Ayah;
  surahNumber: number;
  surahName: string;
  locale: Locale;
  selectedQari: string;
  tafsirText?: string;
}

export function AyahCard({
  ayah,
  surahNumber,
  surahName,
  locale,
  selectedQari,
  tafsirText,
}: AyahCardProps) {
  const audioUrl = ayah.audio[selectedQari] || "";
  const { isPlaying, togglePlayPause } = useAudioPlayer(audioUrl);

  const handleShare = async () => {
    const shareText = `${ayah.teksArab}\n\n${ayah.teksIndonesia}\n\n- QS. ${surahName} (${surahNumber}:${ayah.nomorAyat})`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `QS. ${surahName} ${surahNumber}:${ayah.nomorAyat}`,
          text: shareText,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Ayah copied to clipboard!");
    }
  };

  return (
    <Card id={`ayah-${ayah.nomorAyat}`} className="scroll-mt-32">
      <CardBody className="space-y-5">
        {/* Header - Number & Actions */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <IconBox variant="primary-subtle" size="lg">
            {ayah.nomorAyat}
          </IconBox>

          <div className="flex items-center gap-2">
            {/* Tafsir Button with Dialog */}
            {locale === "id" && (
              <Dialog>
                <DialogTrigger
                  className={cn(
                    // Base styles
                    "relative font-medium select-none inline-flex justify-center items-center",
                    "rounded-lg transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer",
                    // Outline variant styles
                    "border border-border bg-background text-foreground",
                    "hover:bg-primary/10 hover:border-primary/50",
                    "active:scale-95",
                    // Icon size
                    "size-9"
                  )}
                  aria-label="Tampilkan Tafsir"
                >
                  <BookOpen className="size-4" />
                </DialogTrigger>

                <DialogPopup className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
                  <DialogHeader className="shrink-0">
                    <div className="flex items-center gap-3 flex-1">
                      <BookOpen className="size-5 text-primary shrink-0" />
                      <div className="min-w-0 flex-1">
                        <DialogTitle className="text-lg">
                          Tafsir Ayat {ayah.nomorAyat}
                        </DialogTitle>
                        <p className="text-sm text-muted mt-1">
                          QS. {surahName} ({surahNumber}:{ayah.nomorAyat})
                        </p>
                      </div>
                    </div>
                    <DialogClose className="ml-auto shrink-0">
                      <X className="size-5" />
                    </DialogClose>
                  </DialogHeader>

                  <DialogBody className="flex-1 overflow-y-auto">
                    {tafsirText ? (
                      <div
                        className="prose prose-sm max-w-none text-foreground leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: tafsirText }}
                        style={{
                          whiteSpace: "pre-wrap",
                        }}
                      />
                    ) : (
                      <div className="text-center py-12">
                        <BookOpen className="size-12 mx-auto mb-3 text-muted opacity-50" />
                        <p className="text-muted">
                          Tafsir tidak tersedia untuk ayat ini.
                        </p>
                      </div>
                    )}
                  </DialogBody>

                  <DialogFooter className="shrink-0">
                    <DialogClose>
                      <Button variant="primary" className="w-full">
                        Tutup
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogPopup>
              </Dialog>
            )}

            <BookmarkButton
              surahNumber={surahNumber}
              ayahNumber={ayah.nomorAyat}
              surahName={surahName}
              ayahText={ayah.teksArab}
            />

            <Button
              variant="plain"
              size="sm-icon"
              onClick={handleShare}
              aria-label="Share"
            >
              <Share2 className="size-4" />
            </Button>

            {audioUrl && (
              <Button
                variant="primary"
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
        </div>

        {/* Arabic Text */}
        <div className="text-right bg-primary/5 p-6 rounded-lg border border-primary/10">
          <p className="text-3xl md:text-4xl font-semibold leading-loose font-arabic text-foreground">
            {ayah.teksArab}
          </p>
        </div>

        {/* Transliteration */}
        <div>
          <p className="text-xs font-medium text-muted mb-2 uppercase tracking-wide">
            {locale === "id" ? "Latin" : "Transliteration"}
          </p>
          <p className="text-base italic text-foreground leading-relaxed">
            {ayah.teksLatin}
          </p>
        </div>

        {/* Translation */}
        <div>
          <p className="text-xs font-medium text-muted mb-2 uppercase tracking-wide">
            {locale === "id" ? "Terjemahan" : "Translation"}
          </p>
          <p className="text-lg text-foreground leading-relaxed">
            {ayah.teksIndonesia}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
