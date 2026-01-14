// app/[locale]/page.tsx
import Link from "next/link";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/selia/card";
import { Button } from "@/components/selia/button";
import { IconBox } from "@/components/selia/icon-box";
import { BookOpen, Heart, Star } from "lucide-react";
import type { Locale } from "@/types/common";
import { PageContainer } from "@/components/layout";

interface HomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

// Dictionary untuk i18n
const getDictionary = (locale: Locale) => {
  if (locale === "id") {
    return {
      title: "Al-Quran Digital",
      subtitle: "Baca, Dengarkan, dan Pahami Al-Quran",
      description:
        "Aplikasi Al-Quran digital dengan terjemahan Bahasa Indonesia dan Inggris, audio dari berbagai qari, serta tafsir untuk setiap ayat.",
      features: {
        surah: {
          title: "114 Surah",
          description: "Lengkap dengan terjemahan dan tafsir",
        },
        audio: {
          title: "Audio Berkualitas",
          description: "Dengarkan dari berbagai qari pilihan",
        },
        doa: {
          title: "Doa Harian",
          description: "Kumpulan doa sehari-hari",
        },
      },
      cta: {
        surah: "Baca Surah",
        doa: "Lihat Doa",
      },
      stats: {
        surahs: "Surah",
        verses: "Ayat",
        duas: "Doa",
      },
    };
  }

  return {
    title: "Digital Quran",
    subtitle: "Read, Listen, and Understand the Quran",
    description:
      "Digital Quran application with Indonesian and English translations, audio from various reciters, and tafsir for every verse.",
    features: {
      surah: {
        title: "114 Surahs",
        description: "Complete with translations and tafsir",
      },
      audio: {
        title: "High Quality Audio",
        description: "Listen from various selected reciters",
      },
      doa: {
        title: "Daily Duas",
        description: "Collection of daily supplications",
      },
    },
    cta: {
      surah: "Read Surahs",
      doa: "View Duas",
    },
    stats: {
      surahs: "Surahs",
      verses: "Verses",
      duas: "Duas",
    },
  };
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <PageContainer className="py-12">
      <div className="mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <IconBox size="lg" variant="primary">
              <BookOpen className="size-12" />
            </IconBox>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{dict.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{dict.subtitle}</p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            {dict.description}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <IconBox variant="primary" className="mb-4">
                <BookOpen />
              </IconBox>
              <CardTitle>{dict.features.surah.title}</CardTitle>
              <CardDescription>
                {dict.features.surah.description}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <IconBox variant="success" className="mb-4">
                <Star />
              </IconBox>
              <CardTitle>{dict.features.audio.title}</CardTitle>
              <CardDescription>
                {dict.features.audio.description}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <IconBox variant="warning" className="mb-4">
                <Heart />
              </IconBox>
              <CardTitle>{dict.features.doa.title}</CardTitle>
              <CardDescription>{dict.features.doa.description}</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${locale}/surah`}>
            <Button size="lg">
              <BookOpen className="mr-2" />
              {dict.cta.surah}
            </Button>
          </Link>
          <Link href={`/${locale}/doa`}>
            <Button size="lg" variant="secondary">
              <Heart className="mr-2" />
              {dict.cta.doa}
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
