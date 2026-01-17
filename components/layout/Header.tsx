// components/layout/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/selia/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Locale } from "@/types/common";
import { BookOpen, Clock, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
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

export function Header({ locale, dictionary }: HeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname.includes(path);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-16 items-center justify-between px-8 md:px-16 lg:px-24">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <BookOpen className="size-6 text-primary" />
          <span className="font-bold text-xl">Al-Quran</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <Button
            render={<Link href={`/${locale}`} />}
            variant={pathname === `/${locale}` ? "primary" : "plain"}
            size="sm"
          >
            {dictionary.nav.home}
          </Button>

          <Button
            render={<Link href={`/${locale}/surah`} />}
            variant={isActive("/surah") ? "primary" : "plain"}
            size="sm"
          >
            {dictionary.nav.surah}
          </Button>

          <Button
            render={<Link href={`/${locale}/shalat`} />}
            variant={isActive("/shalat") ? "primary" : "plain"}
            size="sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {dictionary.nav.shalat}
          </Button>

          <Button
            render={<Link href={`/${locale}/imsakiyah`} />}
            variant={isActive("/imsakiyah") ? "primary" : "plain"}
            size="sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {dictionary.nav.imsakiyah}
          </Button>

          <Button
            render={<Link href={`/${locale}/doa`} />}
            variant={isActive("/doa") ? "primary" : "plain"}
            size="sm"
          >
            {dictionary.nav.doa}
          </Button>

          <LanguageSwitcher currentLocale={locale} />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher currentLocale={locale} />
          <Button
            variant="outline"
            size="sm-icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background">
          <nav className="container px-4 py-4 flex flex-col gap-2">
            <Button
              render={<Link href={`/${locale}`} />}
              variant={pathname === `/${locale}` ? "primary" : "plain"}
              size="sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dictionary.nav.home}
            </Button>

            <Button
              render={<Link href={`/${locale}/surah`} />}
              variant={isActive("/surah") ? "primary" : "plain"}
              size="sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dictionary.nav.surah}
            </Button>

            <Button
              render={<Link href={`/${locale}/shalat`} />}
              variant={isActive("/shalat") ? "primary" : "plain"}
              size="sm"
            >
              {dictionary.nav.shalat}
            </Button>

            <Button
              render={<Link href={`/${locale}/imsakiyah`} />}
              variant={isActive("/imsakiyah") ? "primary" : "plain"}
              size="sm"
            >
              {dictionary.nav.imsakiyah}
            </Button>

            <Button
              render={<Link href={`/${locale}/doa`} />}
              variant={isActive("/doa") ? "primary" : "plain"}
              size="sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dictionary.nav.doa}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
