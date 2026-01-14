// components/doa/DoaCard.tsx
"use client";

import Link from "next/link";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/selia/card";
import { Badge } from "@/components/selia/badge";
import { Button } from "@/components/selia/button";
import { BookOpen, Share2, Tag } from "lucide-react";
import type { Doa } from "@/lib/services/doa.service";
import type { Locale } from "@/types/common";

interface DoaCardProps {
  doa: Doa;
  locale: Locale;
}

export function DoaCard({ doa, locale }: DoaCardProps) {
  // Truncate description to 2-3 lines (approx 120 chars)
  const truncatedDescription =
    doa.tentang && doa.tentang.length > 120
      ? doa.tentang.substring(0, 120) + "..."
      : doa.tentang;

  return (
    <Link href={`/${locale}/doa/${doa.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-between h-full">
        <CardHeader className="flex flex-col text-left">
          <div className="flex gap-2 mb-3 w-full justify-between">
            <CardTitle className="text-xl">{doa.nama}</CardTitle>
            <Badge variant="primary-outline" size="md">
              #{doa.id}
            </Badge>
          </div>

          <div className="flex flex-col gap-2 mb-4 w-full">
            {/* Category Badge */}
            {doa.grup && (
              <Badge variant="primary-outline" size="sm" className="w-fit">
                {doa.grup}
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardBody className="space-y-4">
          {/* Description Preview */}
          {truncatedDescription && (
            <CardDescription className="text-sm leading-relaxed line-clamp-3 text-left">
              {truncatedDescription}
            </CardDescription>
          )}

          {/* tag */}
          {doa.tag && doa.tag.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {doa.tag.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="primary" size="sm">
                  {tag}
                </Badge>
              ))}
              {doa.tag.length > 3 && (
                <Badge variant="info-outline" size="sm">
                  +{doa.tag.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardBody>

        <CardFooter className="flex p-4 bg-transparent border-t items-center justify-center">
          {/* CTA Button */}
          <Button variant="primary" size="sm" className="w-full">
            <BookOpen className="size-4 mr-2" />
            {locale === "id" ? "Baca Doa" : "Read Dua"}
          </Button>

          {/* Share Button */}
          <Button variant="secondary" size="sm">
            <Share2 />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
