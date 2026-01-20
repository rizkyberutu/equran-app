// app/[locale]/layout.tsx
import { Sora, Noto_Sans_Arabic } from "next/font/google";
import { Toast } from "@/components/selia/toast";
import { Header } from "@/components/layout";
import type { Locale } from "@/types/common";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-arabic",
});

const getDictionary = (locale: Locale) => {
  if (locale === "id") {
    return {
      nav: {
        home: "Beranda",
        surah: "Surah",
        shalat: "Jadwal Shalat",
        imsakiyah: "Jadwal Imsak",
        doa: "Doa",
      },
    };
  }
  return {
    nav: {
      home: "Home",
      surah: "Surah",
      shalat: "Prayers",
      imsakiyah: "Imsakiyah",
      doa: "Duas",
    },
  };
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = locale as Locale;
  const dict = getDictionary(currentLocale);

  return (
    <div className={`${sora.variable} ${notoSansArabic.variable} font-sans`}>
      <Header locale={currentLocale} dictionary={dict} />
      {children}
      <Toast />
    </div>
  );
}
