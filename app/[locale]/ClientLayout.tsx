// app/[locale]/ClientLayout.tsx
"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import type { Locale } from "@/types/common";

interface ClientLayoutProps {
  children: React.ReactNode;
  locale: Locale;
  dictionary: {
    nav: {
      home: string;
      surah: string;
      shalat: string;
      imsakiyah: string;
      doa: string;
    };
  };
}

export function ClientLayout({
  children,
  locale,
  dictionary,
}: ClientLayoutProps) {
  return (
    <AuthProvider>
      <Header locale={locale} dictionary={dictionary} />
      {children}
    </AuthProvider>
  );
}
