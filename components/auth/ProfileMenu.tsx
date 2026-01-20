// components/auth/ProfileMenu.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/selia/avatar";
import { Button } from "@/components/selia/button";
import { LogOut, Heart, Bookmark, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import type { Locale } from "@/types/common";

interface ProfileMenuProps {
  locale: Locale;
}

export function ProfileMenu({ locale }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  // Get fallback text from email
  const getFallback = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  const translations = {
    id: {
      favorites: "Surah Favorit",
      bookmarks: "Bookmark",
      settings: "Pengaturan",
      signOut: "Keluar",
    },
    en: {
      favorites: "Favorite Surahs",
      bookmarks: "Bookmarks",
      settings: "Settings",
      signOut: "Sign Out",
    },
  };

  const t = translations[locale];

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all hover:opacity-80 cursor-pointer"
      >
        <Avatar size="sm">
          <AvatarImage
            src={user?.user_metadata?.avatar_url}
            alt={user?.user_metadata?.full_name || user?.email || "User"}
          />
          <AvatarFallback>{getFallback()}</AvatarFallback>
        </Avatar>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-popover border border-popover-border rounded-lg shadow-popover overflow-hidden z-50">
          {/* User Info */}
          <div className="p-4 border-b border-popover-border">
            <div className="flex items-center gap-3">
              <Avatar size="md">
                <AvatarImage
                  src={user?.user_metadata?.avatar_url}
                  alt={user?.user_metadata?.full_name || user?.email || "User"}
                />
                <AvatarFallback>{getFallback()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">
                  {user?.user_metadata?.full_name || "User"}
                </p>
                <p className="text-xs text-muted truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href={`/${locale}/favorites`}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-popover-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Heart className="size-4 text-muted" />
              <span className="text-sm">{t.favorites}</span>
            </Link>

            <Link
              href={`/${locale}/bookmarks`}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-popover-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Bookmark className="size-4 text-muted" />
              <span className="text-sm">{t.bookmarks}</span>
            </Link>

            <Link
              href={`/${locale}/profile`}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-popover-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="size-4 text-muted" />
              <span className="text-sm">{t.settings}</span>
            </Link>
          </div>

          {/* Sign Out */}
          <div className="border-t border-popover-border p-2">
            <Button
              variant="plain"
              size="sm"
              onClick={handleSignOut}
              className="w-full justify-start text-destructive hover:bg-destructive/10"
            >
              <LogOut className="size-4" />
              {t.signOut}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
