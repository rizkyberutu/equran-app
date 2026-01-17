// lib/services/imsakiyah.service.ts
const BASE_URL = "https://equran.id/api/v2";

import type {
  ProvinsiResponse,
  KabKotaResponse,
  ImsakiyahResponse,
  ImsakiyahRequest,
  ProvinsiRequest,
} from "@/types/shalat";

/**
 * Get list of all provinces for Imsakiyah
 */
export async function getImsakiyahProvinsi(): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/imsakiyah/provinsi`, {
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
 * Get list of cities/regencies for Imsakiyah
 */
export async function getImsakiyahKabKota(provinsi: string): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/imsakiyah/kabkota`, {
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
 * Get Ramadan Imsakiyah schedule
 */
export async function getImsakiyahSchedule(
  params: ImsakiyahRequest
): Promise<ImsakiyahResponse["data"]> {
  try {
    const response = await fetch(`${BASE_URL}/imsakiyah`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
      next: { revalidate: 3600 }, // Cache 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Imsakiyah schedule: ${response.status}`);
    }

    const result: ImsakiyahResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching Imsakiyah schedule:", error);
    throw error;
  }
}

/**
 * Get today's Imsakiyah time (if in Ramadan month)
 */
export async function getTodayImsakiyah(provinsi: string, kabkota: string) {
  const schedule = await getImsakiyahSchedule({ provinsi, kabkota });

  const today = new Date();
  const todayDate = today.getDate();
  const todaySchedule = schedule.imsakiyah.find(
    (item) => item.tanggal === todayDate
  );

  return {
    ...schedule,
    today: todaySchedule,
  };
}
