// app/types/shalat.ts
export interface ShalatSchedule {
  tanggal: number;
  tanggal_lengkap: string;
  hari: string;
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

export interface ShalatData {
  provinsi: string;
  kabkota: string;
  bulan: number;
  tahun: number;
  bulan_nama: string;
  jadwal: ShalatSchedule[];
}

export interface ShalatResponse {
  code: number;
  message: string;
  data: ShalatData;
}

export interface ProvinsiResponse {
  code: number;
  message: string;
  data: string[];
}

export interface KabKotaResponse {
  code: number;
  message: string;
  data: string[];
}

// Imsakiyah Types
export interface ImsakiyahSchedule {
  tanggal: number;
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

export interface ImsakiyahData {
  provinsi: string;
  kabkota: string;
  hijriah: string;
  masehi: string;
  imsakiyah: ImsakiyahSchedule[];
}

export interface ImsakiyahResponse {
  code: number;
  message: string;
  data: ImsakiyahData;
}

// Request Body Types
export interface ProvinsiRequest {
  provinsi: string;
}

export interface ShalatRequest {
  provinsi: string;
  kabkota: string;
  bulan?: number;
  tahun?: number;
}

export interface ImsakiyahRequest {
  provinsi: string;
  kabkota: string;
}
