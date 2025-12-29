// components/layout/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/selia/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Locale } from "@/types/common";
import { BookOpen, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  locale: Locale;
  dictionary: {
    nav: {
      home: string;
      surah: string;
      doa: string;
    };
  };
}

export function Header({ locale, dictionary }: HeaderProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.includes(path);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <BookOpen className="size-6 text-primary" />
          <span className="font-bold text-xl">Al-Quran</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Button
            render={<Link href={`/${locale}`} />}
            variant={pathname === `/${locale}` ? "secondary" : "plain"}
            size="sm"
          >
            {dictionary.nav.home}
          </Button>

          <Button
            render={<Link href={`/${locale}/surah`} />}
            variant={isActive("/surah") ? "secondary" : "plain"}
            size="sm"
          >
            {dictionary.nav.surah}
          </Button>

          <Button
            render={<Link href={`/${locale}/doa`} />}
            variant={isActive("/doa") ? "secondary" : "plain"}
            size="sm"
          >
            {dictionary.nav.doa}
          </Button>

          <LanguageSwitcher currentLocale={locale} />
        </nav>
      </div>
    </header>
  );
}
