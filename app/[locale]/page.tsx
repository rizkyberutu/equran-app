import Link from "next/link";
import { Card, CardBody } from "@/components/selia/card";
import { Button } from "@/components/selia/button";
import { IconBox } from "@/components/selia/icon-box";
import { BookOpen, Heart, Volume2, ArrowRight } from "lucide-react";
import type { Locale } from "@/types/common";
import { PageContainer } from "@/components/layout";
import { Badge } from "@/components/selia/badge";

interface HomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

const getDictionary = (locale: Locale) => {
  if (locale === "id") {
    return {
      title: "Al-Quran Digital",
      subtitle: "Baca, Dengarkan, dan Pahami Al-Quran",
      description:
        "Aplikasi Al-Quran digital dengan terjemahan Bahasa Indonesia dan Inggris, audio dari berbagai qari, serta tafsir untuk setiap ayat.",
      features: {
        surah: {
          title: "114 Surah Lengkap",
          description: "Dengan terjemahan, transliterasi, dan tafsir",
          badge: "Lengkap",
        },
        audio: {
          title: "6 Pilihan Qari",
          description: "Audio berkualitas tinggi dari qari terbaik",
          badge: "HD Audio",
        },
        doa: {
          title: "Doa Sehari-hari",
          description: "Kumpulan doa dalam kehidupan muslim",
          badge: "Praktis",
        },
      },
      cta: {
        surah: "Mulai Membaca",
        doa: "Lihat Doa",
        explore: "Jelajahi",
      },
      stats: {
        surahs: "114",
        surahsLabel: "Surah",
        verses: "6,236",
        versesLabel: "Ayat",
        qaris: "6",
        qarisLabel: "Qari",
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
        title: "114 Complete Surahs",
        description: "With translations, transliterations, and tafsir",
        badge: "Complete",
      },
      audio: {
        title: "6 Reciters Available",
        description: "High quality audio from best reciters",
        badge: "HD Audio",
      },
      doa: {
        title: "Daily Supplications",
        description: "Collection of daily Muslim prayers",
        badge: "Practical",
      },
    },
    cta: {
      surah: "Start Reading",
      doa: "View Duas",
      explore: "Explore",
    },
    stats: {
      surahs: "114",
      surahsLabel: "Surahs",
      verses: "6,236",
      versesLabel: "Verses",
      qaris: "6",
      qarisLabel: "Reciters",
    },
  };
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <PageContainer className="py-8 sm:py-12">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
              <IconBox size="lg" variant="primary" circle className="relative">
                <BookOpen className="size-12 sm:size-16" />
              </IconBox>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-linear-to-br from-primary to-primary/60 bg-clip-text text-transparent">
              {dict.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground font-medium">
              {dict.subtitle}
            </p>
            <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed px-4">
              {dict.description}
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Button
              render={<Link href={`/${locale}/surah`} />}
              size="lg"
              block
              className="group"
            >
              <BookOpen className="size-5" />
              {dict.cta.surah}
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              render={<Link href={`/${locale}/doa`} />}
              size="lg"
              variant="secondary"
              block
              className="group"
            >
              <Heart className="size-5" />
              {dict.cta.doa}
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Surah Feature */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardBody className="p-6 sm:p-8 space-y-4">
              <div className="flex items-start justify-between">
                <IconBox
                  variant="primary"
                  size="lg"
                  className="group-hover:scale-110 transition-transform"
                >
                  <BookOpen className="size-6" />
                </IconBox>
                <Badge variant="primary-outline" size="sm">
                  {dict.features.surah.badge}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-primary">
                  {dict.features.surah.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {dict.features.surah.description}
                </p>
              </div>

              {/* Surah Feature */}
              <Button
                render={<Link href={`/${locale}/surah`} />}
                variant="primary"
                size="sm"
                block
                className="group-hover:shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary"
              >
                {dict.cta.explore}
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardBody>
          </Card>

          {/* Audio Feature */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardBody className="p-6 sm:p-8 space-y-4">
              <div className="flex items-start justify-between">
                <IconBox
                  variant="success"
                  size="lg"
                  className="group-hover:scale-110 transition-transform"
                >
                  <Volume2 className="size-6" />
                </IconBox>
                <Badge variant="success-outline" size="sm">
                  {dict.features.audio.badge}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-success">
                  {dict.features.audio.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {dict.features.audio.description}
                </p>
              </div>

              {/* Audio Feature */}
              <Button
                render={<Link href={`/${locale}/surah`} />}
                variant="outline"
                size="sm"
                block
                className="group-hover:shadow-lg bg-success hover:bg-success/80 text-white hover:text-white/90 hover:border-success/80"
              >
                {dict.cta.explore}
                <ArrowRight className="size-4 stroke-white hover:stroke-white/90 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardBody>
          </Card>

          {/* Doa Feature */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardBody className="p-6 sm:p-8 space-y-4">
              <div className="flex items-start justify-between">
                <IconBox
                  variant="warning"
                  size="lg"
                  className="group-hover:scale-110 transition-transform"
                >
                  <Heart className="size-6" />
                </IconBox>
                <Badge variant="warning-outline" size="sm">
                  {dict.features.doa.badge}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-warning">
                  {dict.features.doa.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {dict.features.doa.description}
                </p>
              </div>

              {/* Doa Feature */}
              <Button
                render={<Link href={`/${locale}/doa`} />}
                variant="outline"
                size="sm"
                block
                className="group-hover:shadow-lg bg-warning hover:bg-warning/80 text-white hover:text-white/90 hover:border-warning/80"
              >
                {dict.cta.explore}
                <ArrowRight className="size-4 stroke-white hover:stroke-white/90 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
