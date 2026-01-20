// app/[locale]/doa/[id]/DoaDetailContent.tsx
"use client";

import { Card, CardBody, CardHeader, CardTitle } from "@/components/selia/card";
import { Badge } from "@/components/selia/badge";
import { Divider } from "@/components/selia/divider";
import { BackButton } from "@/components/shared/BackButton";
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
import { Button } from "@/components/selia/button";
import { BookOpen, Info, X } from "lucide-react";
import type { Doa } from "@/lib/services/doa.service";
import type { Locale } from "@/types/common";
import { cn } from "@/lib/utils/cn";
import { DoaNavigation } from "@/components/doa/DoaNavigation";

interface DoaDetailContentProps {
  doa: Doa;
  allDoas: Doa[];
  locale: Locale;
  dictionary: {
    common: {
      notFound: string;
    };
    doa: {
      arabic: string;
      latin: string;
      translation: string;
      viewDetails: string;
      close: string;
      about?: string;
      category?: string;
      previousDoa?: string;
      nextDoa?: string;
    };
  };
}

export function DoaDetailContent({
  doa,
  allDoas,
  locale,
  dictionary,
}: DoaDetailContentProps) {
  // Find current doa index
  const currentIndex = allDoas.findIndex((d) => d.id === doa.id);
  const prevDoa = currentIndex > 0 ? allDoas[currentIndex - 1] : null;
  const nextDoa =
    currentIndex < allDoas.length - 1 ? allDoas[currentIndex + 1] : null;

  return (
    <div className="space-y-6">
      <BackButton
        text={locale === "id" ? "Kembali" : "Back"}
        fallbackHref={`/${locale}/doa`}
      />

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
              {dictionary.doa.arabic}
            </p>
            <div className="text-right bg-primary/10 p-6 rounded-lg border border-primary/10">
              <p className="text-3xl md:text-4xl leading-loose font-semibold font-arabic text-foreground">
                {doa.ar}
              </p>
            </div>
          </div>

          {/* Transliteration */}
          <div>
            <p className="text-sm font-medium text-muted mb-3">
              {dictionary.doa.latin}
            </p>
            <p className="text-lg italic text-foreground leading-relaxed">
              {doa.tr}
            </p>
          </div>

          {/* Translation */}
          <div>
            <p className="text-sm font-medium text-muted mb-3">
              {dictionary.doa.translation}
            </p>
            <p className="text-base text-foreground leading-relaxed">
              {doa.idn}
            </p>
          </div>

          <Divider />

          {/* Keterangan & Dalil - With Dialog Button */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted">
              {dictionary.doa.about ||
                (locale === "id" ? "Keterangan & Dalil" : "About & Reference")}
            </p>

            <Dialog>
              <DialogTrigger
                className={cn(
                  // Base styles
                  "relative font-medium select-none inline-flex justify-center items-center gap-2",
                  "rounded transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer",
                  // Outline variant styles
                  "border border-border bg-background text-foreground",
                  "hover:bg-primary/10 hover:border-primary/50",
                  "active:scale-95",
                  // Size
                  "px-3 py-2 text-sm"
                )}
                aria-label={dictionary.doa.viewDetails}
              >
                <Info className="size-4" />
                <span>{dictionary.doa.viewDetails}</span>
              </DialogTrigger>

              <DialogPopup className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader className="shrink-0">
                  <div className="flex items-center gap-3 flex-1">
                    <BookOpen className="size-5 text-primary shrink-0" />
                    <div className="min-w-0 flex-1">
                      <DialogTitle className="text-lg">
                        {dictionary.doa.about ||
                          (locale === "id"
                            ? "Keterangan & Dalil"
                            : "About & Reference")}{" "}
                        - {doa.nama}
                      </DialogTitle>
                      <p className="text-sm text-muted mt-1">
                        {locale === "id"
                          ? "Penjelasan lengkap tentang doa ini"
                          : "Complete explanation about this dua"}
                      </p>
                    </div>
                  </div>
                  <DialogClose className="ml-auto shrink-0">
                    <X className="size-5" />
                  </DialogClose>
                </DialogHeader>

                <DialogBody className="flex-1 overflow-y-auto">
                  <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
                    <p className="whitespace-pre-line">{doa.tentang}</p>
                  </div>
                </DialogBody>

                <DialogFooter className="shrink-0">
                  <DialogClose>
                    <Button variant="primary" className="w-full">
                      {dictionary.doa.close}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogPopup>
            </Dialog>
          </div>
        </CardBody>
      </Card>

      {/* Bottom Navigation */}
      <DoaNavigation previous={prevDoa} next={nextDoa} locale={locale} />
    </div>
  );
}
