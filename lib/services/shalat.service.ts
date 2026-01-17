// lib/services/shalat.service.ts
const BASE_URL = "https://equran.id/api/v2";

import type {
  ProvinsiResponse,
  KabKotaResponse,
  ShalatResponse,
  ShalatRequest,
  ProvinsiRequest,
} from "@/types/shalat";

/**
 * Get list of all provinces
 */
export async function getAllProvinsi(): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/shalat/provinsi`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 86400 }, // Cache 24 hours
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch provinces: ${response.status}`);
    }

    const result: ProvinsiResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    throw error;
  }
}

/**
 * Get list of cities/regencies in a province
 */
export async function getKabKotaByProvinsi(
  provinsi: string
): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/shalat/kabkota`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ provinsi }),
      next: { revalidate: 86400 }, // Cache 24 hours
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch cities: ${response.status}`);
    }

    const result: KabKotaResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error fetching cities for ${provinsi}:`, error);
    throw error;
  }
}

/**
 * Get prayer schedule for specific location and month
 */
export async function getShalatSchedule(
  params: ShalatRequest
): Promise<ShalatResponse["data"]> {
  try {
    const body: ShalatRequest = {
      provinsi: params.provinsi,
      kabkota: params.kabkota,
      bulan: params.bulan || new Date().getMonth() + 1,
      tahun: params.tahun || new Date().getFullYear(),
    };

    const response = await fetch(`${BASE_URL}/shalat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      next: { revalidate: 3600 }, // Cache 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch prayer schedule: ${response.status}`);
    }

    const result: ShalatResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching prayer schedule:", error);
    throw error;
  }
}

/**
 * Get today's prayer times
 */
export async function getTodayShalat(provinsi: string, kabkota: string) {
  const today = new Date();
  const schedule = await getShalatSchedule({
    provinsi,
    kabkota,
    bulan: today.getMonth() + 1,
    tahun: today.getFullYear(),
  });

  const todayDate = today.getDate();
  const todaySchedule = schedule.jadwal.find(
    (item) => item.tanggal === todayDate
  );

  return {
    ...schedule,
    today: todaySchedule,
  };
}
