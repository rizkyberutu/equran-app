// app/[locale]/favorites/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardDescription,
} from "@/components/selia/card";
import { Button } from "@/components/selia/button";
import { Alert, AlertDescription } from "@/components/selia/alert";
import { IconBox } from "@/components/selia/icon-box";
import { Badge } from "@/components/selia/badge";
import {
  Heart,
  BookOpen,
  Loader2,
  AlertCircle,
  Trash2,
  BookMarked,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FavoriteSurah {
  id: string;
  surah_number: number;
  surah_name_arabic: string;
  surah_name_latin: string;
  surah_name_translation: string;
  revelation_type: string;
  total_verses: number;
  created_at: string;
}

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const [favorites, setFavorites] = useState<FavoriteSurah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    }

    if (user) {
      fetchFavorites();
    }
  }, [user, authLoading, router]);

  const fetchFavorites = async () => {
    setLoading(true);
    setError("");

    try {
      const { data, error: fetchError } = await supabase
        .from("favorite_surahs")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      setFavorites(data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (favoriteId: string) => {
    setRemovingId(favoriteId);

    try {
      const { error: deleteError } = await supabase
        .from("favorite_surahs")
        .delete()
        .eq("id", favoriteId);

      if (deleteError) throw deleteError;

      // Update local state
      setFavorites((prev) => prev.filter((fav) => fav.id !== favoriteId));
    } catch (err: any) {
      setError(err.message || "Failed to remove favorite");
    } finally {
      setRemovingId(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <IconBox variant="danger-subtle" size="lg">
              <Heart className="size-6" />
            </IconBox>
            <div>
              <h1 className="text-3xl font-bold">Favorite Surahs</h1>
              <p className="text-muted">
                Your collection of favorite Quranic chapters
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="danger" className="mb-6">
            <AlertCircle className="size-5" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Empty State */}
        {favorites.length === 0 && !loading && (
          <Card>
            <CardBody className="p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <IconBox variant="primary-subtle" size="xl" circle>
                  <Heart className="size-8" />
                </IconBox>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    No Favorites Yet
                  </h3>
                  <p className="text-muted mb-6 max-w-md mx-auto">
                    Start adding your favorite surahs to quickly access them
                    anytime. Browse surahs and click the heart icon to save them
                    here.
                  </p>
                  <Button
                    render={<Link href="/surah" />}
                    variant="primary"
                    size="lg"
                  >
                    <BookOpen className="size-4" />
                    Browse Surahs
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Favorites List */}
        {favorites.length > 0 && (
          <div className="space-y-3">
            {favorites.map((favorite) => (
              <Card
                key={favorite.id}
                className="group hover:shadow-lg transition-all"
              >
                <CardBody className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Surah Number */}
                    <div className="shrink-0">
                      <IconBox variant="primary-subtle" size="lg">
                        <span className="font-bold text-lg">
                          {favorite.surah_number}
                        </span>
                      </IconBox>
                    </div>

                    {/* Surah Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-1">
                            {favorite.surah_name_latin}
                          </h3>
                          <p className="text-sm text-muted mb-2">
                            {favorite.surah_name_translation}
                          </p>
                        </div>
                        <p
                          className="text-2xl font-arabic text-primary shrink-0"
                          dir="rtl"
                        >
                          {favorite.surah_name_arabic}
                        </p>
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge
                          variant={
                            favorite.revelation_type === "Makkiyyah"
                              ? "info"
                              : "success"
                          }
                          size="sm"
                        >
                          {favorite.revelation_type}
                        </Badge>
                        <span className="text-sm text-muted flex items-center gap-1">
                          <BookMarked className="size-3.5" />
                          {favorite.total_verses} verses
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        render={
                          <Link href={`/surah/${favorite.surah_number}`} />
                        }
                        variant="outline"
                        size="sm"
                      >
                        <BookOpen className="size-4" />
                        Read
                      </Button>

                      <Button
                        variant="plain"
                        size="sm-icon"
                        onClick={() => handleRemoveFavorite(favorite.id)}
                        disabled={removingId === favorite.id}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        {removingId === favorite.id ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <Heart className="size-4 fill-current" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {favorites.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-muted">
              You have{" "}
              <span className="font-semibold text-foreground">
                {favorites.length}
              </span>{" "}
              favorite {favorites.length === 1 ? "surah" : "surahs"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
