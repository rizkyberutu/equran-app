// types/auth.ts
export interface AuthUser {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

export interface FavoriteSurah {
  id: string;
  user_id: string;
  surah_number: number;
  surah_name: string;
  created_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  surah_number: number;
  ayah_number: number;
  note?: string;
  created_at: string;
}
