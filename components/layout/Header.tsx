// components/layout/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/selia/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Locale } from "@/types/common";
import { BookOpen, Menu, X, LogIn } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { ProfileMenu } from "@/components/auth/ProfileMenu";

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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, loading } = useAuth();

  const isActive = (path: string) => pathname.includes(path);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="flex h-16 items-center justify-between px-8 md:px-16 lg:px-24">
          {/* Logo - Left */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 shrink-0"
          >
            <BookOpen className="size-6 text-primary stroke-[2.5]" />
            <span className="font-bold text-xl hidden sm:inline">
              {locale === "id" ? "Aplikasi Al-Quran" : "Quran App"}
            </span>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center justify-center gap-1 flex-1 px-8">
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
            >
              {dictionary.nav.doa}
            </Button>
          </nav>

          {/* Right Side - Language & Auth */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-2">
              <LanguageSwitcher currentLocale={locale} />

              {!loading && (
                <>
                  {user ? (
                    <ProfileMenu locale={locale} />
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setIsAuthModalOpen(true)}
                    >
                      <LogIn className="size-4 mr-2" />
                      {locale === "id" ? "Masuk" : "Sign In"}
                    </Button>
                  )}
                </>
              )}
            </div>

            {/* Mobile - Language, Auth Icon, Menu */}
            <div className="flex md:hidden items-center gap-2">
              <LanguageSwitcher currentLocale={locale} />

              {!loading && !user && (
                <Button
                  variant="primary"
                  size="sm-icon"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  <LogIn className="size-4" />
                  <span className="sr-only">Sign In</span>
                </Button>
              )}

              {!loading && user && <ProfileMenu locale={locale} />}

              <Button
                variant="outline"
                size="sm-icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden"
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
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-border bg-background">
            <nav className="px-4 py-4 flex flex-col gap-2">
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
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {dictionary.nav.doa}
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
