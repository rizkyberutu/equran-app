// app/[locale]/shalat/page.tsx
import { PageContainer } from "@/components/layout/PageContainer";
import { ShalatClient } from "@/components/shalat/ShalatClient";
import { getAllProvinsi } from "@/lib/services";
import type { Locale } from "@/types/common";

interface SholatPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

const getDictionary = (locale: Locale) => {
  if (locale === "id") {
    return {
      title: "Jadwal Shalat Hari Ini",
      subtitle:
        "Lihat jadwal shalat harian untuk wilayah Anda. Pilih provinsi, kabupaten/kota, dan bulan untuk melihat jadwal lengkap.",
      selectProvince: "Pilih Provinsi",
      selectCity: "Pilih Kabupaten/Kota",
      selectMonth: "Pilih Bulan",
      provincePlaceholder: "-- Pilih Provinsi --",
      cityPlaceholder: "-- Pilih Kabupaten/Kota --",
      selectLocation: "Pilih Lokasi Anda",
      selectLocationDesc:
        "Pilih provinsi dan kabupaten/kota untuk melihat jadwal shalat bulanan",
      today: "Hari ini",
      daysLabel: "hari",
      nextPrayer: "Shalat Berikutnya",
      nextPrayerAt: "Shalat berikutnya pukul",
      scheduleTitle: "Jadwal Shalat",
      stats: {
        cities: "Kab/Kota",
        provinces: "Provinsi",
      },
      table: {
        date: "Tgl",
        day: "Hari",
        imsak: "Imsak",
        subuh: "Subuh",
        terbit: "Terbit",
        dhuha: "Dhuha",
        dzuhur: "Dzuhur",
        ashar: "Ashar",
        maghrib: "Maghrib",
        isya: "Isya",
      },
      months: {
        1: "Januari",
        2: "Februari",
        3: "Maret",
        4: "April",
        5: "Mei",
        6: "Juni",
        7: "Juli",
        8: "Agustus",
        9: "September",
        10: "Oktober",
        11: "November",
        12: "Desember",
      },
      days: {
        Senin: "Senin",
        Selasa: "Selasa",
        Rabu: "Rabu",
        Kamis: "Kamis",
        Jumat: "Jumat",
        Sabtu: "Sabtu",
        Minggu: "Minggu",
      },
      footerInfo: "Jadwal shalat berdasarkan perhitungan Kementerian Agama RI.",
    };
  }

  return {
    title: "Prayer Times Today",
    subtitle:
      "View daily prayer schedule for your area. Select province, city, and month to see the complete schedule.",
    selectProvince: "Select Province",
    selectCity: "Select City/Regency",
    selectMonth: "Select Month",
    provincePlaceholder: "-- Select Province --",
    cityPlaceholder: "-- Select City/Regency --",
    selectLocation: "Select Your Location",
    selectLocationDesc:
      "Choose province and city to view monthly prayer schedule",
    today: "Today",
    daysLabel: "days",
    nextPrayer: "Next Prayer",
    nextPrayerAt: "Next prayer at",
    scheduleTitle: "Prayer Schedule",
    stats: {
      cities: "Cities",
      provinces: "Provinces",
    },
    table: {
      date: "Date",
      day: "Day",
      imsak: "Imsak",
      subuh: "Fajr",
      terbit: "Sunrise",
      dhuha: "Dhuha",
      dzuhur: "Dhuhr",
      ashar: "Asr",
      maghrib: "Maghrib",
      isya: "Isha",
    },
    months: {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    },
    days: {
      Senin: "Monday",
      Selasa: "Tuesday",
      Rabu: "Wednesday",
      Kamis: "Thursday",
      Jumat: "Friday",
      Sabtu: "Saturday",
      Minggu: "Sunday",
    },
    footerInfo:
      "Prayer times based on Indonesian Ministry of Religious Affairs calculations.",
  };
};

export default async function SholatPage({ params }: SholatPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  // Fetch provinces for dropdown
  const provinces = await getAllProvinsi();

  return (
    <PageContainer className="py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">{dict.title}</h1>
          <p className="text-muted max-w-2xl mx-auto">{dict.subtitle}</p>
        </div>

        {/* Client Component */}
        <ShalatClient provinces={provinces} locale={locale} dict={dict} />
      </div>
    </PageContainer>
  );
}
