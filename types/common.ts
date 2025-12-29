// types/common.ts
export type Locale = "id" | "en";

export interface PageProps {
  params: Promise<{
    locale: Locale;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
}

// For dynamic routes
export interface SurahPageProps {
  params: Promise<{
    locale: Locale;
    number: string;
  }>;
}

export interface DoaPageProps {
  params: Promise<{
    locale: Locale;
    id: string;
  }>;
}

export interface TafsirPageProps {
  params: Promise<{
    locale: Locale;
    number: string;
  }>;
}
