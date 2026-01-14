// app/[locale]/surah/[number]/page.tsx
import { SurahDetailHeader } from "@/components/surah/SurahDetailHeader";
import { SurahNavigation } from "@/components/surah/SurahNavigation";
import { AyahCard } from "@/components/surah/AyahCard";
import { AudioPlayer } from "@/components/surah/AudioPlayer";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { Divider } from "@/components/selia/divider";
import { PageContainer } from "@/components/layout/PageContainer";
import type { SurahDetail } from "@/types/surah";
import type { Locale } from "@/types/common";
import { notFound } from "next/navigation";
import { getSurahDetail } from "@/lib/services";

interface SurahDetailPageProps {
  params: Promise<{
    locale: Locale;
    number: string;
  }>;
}

const getDictionary = (locale: Locale) => {
  if (locale === "id") {
    return {
      back: "Kembali",
      verses: "Ayat",
      revelation: "Tempat Turun",
      description: "Deskripsi",
      error: "Gagal memuat surah",
      fullAudio: "Audio Lengkap Surah",
    };
  }

  return {
    back: "Back",
    verses: "Verses",
    revelation: "Revelation",
    description: "Description",
    error: "Failed to load surah",
    fullAudio: "Full Surah Audio",
  };
};

export default async function SurahDetailPage({
  params,
}: SurahDetailPageProps) {
  const { locale, number } = await params;
  const dict = getDictionary(locale);

  const surah = await getSurahDetail(number, locale);

  if (!surah) {
    notFound();
  }

  return (
    <PageContainer className="py-8">
      <div className="space-y-8">
        <SurahDetailHeader surah={surah} locale={locale} dictionary={dict} />

        {surah.audioFull && Object.keys(surah.audioFull).length > 0 && (
          <AudioPlayer
            src={Object.values(surah.audioFull)[0]}
            title={dict.fullAudio}
            subtitle={`${surah.namaLatin} - ${surah.arti}`}
            qariOptions={Object.entries(surah.audioFull).map(([id, url]) => ({
              id,
              name: id,
              url,
            }))}
          />
        )}

        <Divider />

        <div className="space-y-6">
          {surah.ayat.map((ayah) => (
            <AyahCard
              key={ayah.nomorAyat}
              ayah={ayah}
              surahNumber={surah.nomor}
              locale={locale}
              showTafsir={true}
            />
          ))}
        </div>

        <div className="mt-12">
          <Divider className="mb-6" />
          <SurahNavigation
            previous={surah.suratSebelumnya}
            next={surah.suratSelanjutnya}
            locale={locale}
          />
        </div>
      </div>
    </PageContainer>
  );
}
