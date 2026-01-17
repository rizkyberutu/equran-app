// app/[locale]/imsakiyah/page.tsx
import { ImsakiyahClient } from "@/components/Imsakiyah/ImsakiyahClient";
import { PageContainer } from "@/components/layout/PageContainer";
import { getImsakiyahProvinsi } from "@/lib/services";
import type { Locale } from "@/types/common";

interface ImsakiyahPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

const getDictionary = (locale: Locale) => {
  if (locale === "id") {
    return {
      title: "Jadwal Imsakiyah Ramadan",
      subtitle:
        "Lihat jadwal imsakiyah untuk bulan Ramadan di wilayah Anda. Pilih provinsi dan kabupaten/kota untuk melihat jadwal lengkap.",
      selectProvince: "Pilih Provinsi",
      selectCity: "Pilih Kabupaten/Kota",
      provincePlaceholder: "-- Pilih Provinsi --",
      cityPlaceholder: "-- Pilih Kabupaten/Kota --",
      selectLocation: "Pilih Lokasi Anda",
      selectLocationDesc:
        "Pilih provinsi dan kabupaten/kota untuk melihat jadwal imsakiyah Ramadan",
      loadingSchedule: "Memuat jadwal...",
      today: "Hari ini",
      scheduleTitle: "Jadwal Imsakiyah Ramadan",
      table: {
        date: "Tanggal",
        imsak: "Imsak",
        subuh: "Subuh",
        terbit: "Terbit",
        dhuha: "Dhuha",
        dzuhur: "Dzuhur",
        ashar: "Ashar",
        maghrib: "Maghrib",
        isya: "Isya",
      },
      footerInfo:
        "Jadwal imsakiyah Ramadan berdasarkan perhitungan Kementerian Agama RI.",
    };
  }

  return {
    title: "Ramadan Imsakiyah Schedule",
    subtitle:
      "View Ramadan imsakiyah schedule for your area. Select province and city to see the complete schedule.",
    selectProvince: "Select Province",
    selectCity: "Select City/Regency",
    provincePlaceholder: "-- Select Province --",
    cityPlaceholder: "-- Select City/Regency --",
    selectLocation: "Select Your Location",
    selectLocationDesc:
      "Choose province and city to view Ramadan imsakiyah schedule",
    loadingSchedule: "Loading schedule...",
    today: "Today",
    scheduleTitle: "Ramadan Imsakiyah Schedule",
    table: {
      date: "Date",
      imsak: "Imsak",
      subuh: "Fajr",
      terbit: "Sunrise",
      dhuha: "Dhuha",
      dzuhur: "Dhuhr",
      ashar: "Asr",
      maghrib: "Maghrib",
      isya: "Isha",
    },
    footerInfo:
      "Ramadan imsakiyah schedule based on Indonesian Ministry of Religious Affairs calculations.",
  };
};

export default async function ImsakiyahPage({ params }: ImsakiyahPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const provinces = await getImsakiyahProvinsi();

  return (
    <PageContainer className="py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">{dict.title}</h1>
          <p className="text-muted max-w-2xl mx-auto">{dict.subtitle}</p>
        </div>

        <ImsakiyahClient provinces={provinces} locale={locale} dict={dict} />
      </div>
    </PageContainer>
  );
}
