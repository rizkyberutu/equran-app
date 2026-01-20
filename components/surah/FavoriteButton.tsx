// components/surah/FavoriteButton.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/selia/button";
import { Heart, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  surahNumber: number;
  surahNameArabic: string;
  surahNameLatin: string;
  surahNameTranslation: string;
  revelationType: string;
  totalVerses: number;
  variant?: "default" | "icon";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function FavoriteButton({
  surahNumber,
  surahNameArabic,
  surahNameLatin,
  surahNameTranslation,
  revelationType,
  totalVerses,
  variant = "default",
  size = "sm",
  className,
}: FavoriteButtonProps) {
  const { user } = useAuth();
  const supabase = createClient();

  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (user) {
      checkIfFavorite();
    } else {
      setChecking(false);
    }
  }, [user, surahNumber]);

  const checkIfFavorite = async () => {
    try {
      const { data, error } = await supabase
        .from("favorite_surahs")
        .select("id")
        .eq("user_id", user?.id)
        .eq("surah_number", surahNumber)
        .single();

      setIsFavorite(!!data);
    } catch (err) {
      setIsFavorite(false);
    } finally {
      setChecking(false);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      alert("Please sign in to save favorites");
      return;
    }

    setLoading(true);

    try {
      if (isFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from("favorite_surahs")
          .delete()
          .eq("user_id", user.id)
          .eq("surah_number", surahNumber);

        if (error) throw error;
        setIsFavorite(false);
      } else {
        // Add to favorites
        const { error } = await supabase.from("favorite_surahs").insert({
          user_id: user.id,
          surah_number: surahNumber,
          surah_name_arabic: surahNameArabic,
          surah_name_latin: surahNameLatin,
          surah_name_translation: surahNameTranslation,
          revelation_type: revelationType,
          total_verses: totalVerses,
        });

        if (error) throw error;
        setIsFavorite(true);
      }
    } catch (err: any) {
      console.error("Error toggling favorite:", err);
      alert(err.message || "Failed to update favorite");
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
      variant={isFavorite ? "danger" : "plain"}
      size={variant === "icon" ? "sm-icon" : size}
      onClick={toggleFavorite}
      disabled={loading}
      className={cn(isFavorite && "text-danger hover:bg-danger/10", className)}
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Heart className={cn("size-4", isFavorite && "fill-current")} />
      )}
      {variant === "default" && <span>{isFavorite ? "Saved" : "Save"}</span>}
    </Button>
  );
}
