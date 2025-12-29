// types/doa.ts
export interface DoaItem {
  id: number;
  doa: string;
  ayat: string;
  latin: string;
  artinya: string;
}

// Response type untuk list doa
export type DoaListResponse = DoaItem[];
