// components/surah/BookmarkButton.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/selia/button";
import { Bookmark, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
  ayahText: string;
  variant?: "default" | "icon";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function BookmarkButton({
  surahNumber,
  ayahNumber,
  surahName,
  ayahText,
  variant = "icon",
  size = "sm",
  className,
}: BookmarkButtonProps) {
  const { user } = useAuth();
  const supabase = createClient();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (user) {
      checkIfBookmarked();
    } else {
      setChecking(false);
    }
  }, [user, surahNumber, ayahNumber]);

  const checkIfBookmarked = async () => {
    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("id")
        .eq("user_id", user?.id)
        .eq("surah_number", surahNumber)
        .eq("ayah_number", ayahNumber)
        .single();

      setIsBookmarked(!!data);
    } catch (err) {
      setIsBookmarked(false);
    } finally {
      setChecking(false);
    }
  };

  const toggleBookmark = async () => {
    if (!user) {
      alert("Please sign in to save bookmarks");
      return;
    }

    setLoading(true);

    try {
      if (isBookmarked) {
        // Remove bookmark
        const { error } = await supabase
          .from("bookmarks")
          .delete()
          .eq("user_id", user.id)
          .eq("surah_number", surahNumber)
          .eq("ayah_number", ayahNumber);

        if (error) throw error;
        setIsBookmarked(false);
      } else {
        // Add bookmark
        const { error } = await supabase.from("bookmarks").insert({
          user_id: user.id,
          surah_number: surahNumber,
          ayah_number: ayahNumber,
          surah_name: surahName,
          ayah_text: ayahText,
        });

        if (error) throw error;
        setIsBookmarked(true);
      }
    } catch (err: any) {
      console.error("Error toggling bookmark:", err);
      alert(err.message || "Failed to update bookmark");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  if (checking) {
    return (
      <Button
        variant="plain"
        size={variant === "icon" ? "sm-icon" : size}
        disabled
        className={className}
      >
        <Loader2 className="size-4 animate-spin" />
      </Button>
    );
  }

  return (
    <Button
      variant={isBookmarked ? "primary" : "plain"}
      size={variant === "icon" ? "sm-icon" : size}
      onClick={toggleBookmark}
      disabled={loading}
      className={cn(
        !isBookmarked && "hover:bg-primary/10 hover:text-primary",
        className
      )}
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Bookmark className={cn("size-4", isBookmarked && "fill-current")} />
      )}
      {variant === "default" && (
        <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
      )}
    </Button>
  );
}
