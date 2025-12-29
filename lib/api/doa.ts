// lib/api/doa.ts
import { apiClient } from "./client";
import { apiConfig } from "@/config/api";
import type { DoaResponse } from "@/types/api";
import type { DoaItem } from "@/types/doa";

/**
 * Get all doas
 */
export async function getAllDoas(): Promise<DoaItem[]> {
  try {
    const data = await apiClient.get<DoaResponse>(
      apiConfig.equran.endpoints.allDoa,
      "id"
    );
    return data;
  } catch (error) {
    console.error("Error fetching all doas:", error);
    throw error;
  }
}

/**
 * Get doa by ID
 */
export async function getDoaById(id: number): Promise<DoaItem | undefined> {
  try {
    const doas = await getAllDoas();
    return doas.find((doa) => doa.id === id);
  } catch (error) {
    console.error(`Error fetching doa ${id}:`, error);
    throw error;
  }
}

/**
 * Search doas by name or content
 */
export function searchDoas(doas: DoaItem[], query: string): DoaItem[] {
  if (!query.trim()) return doas;

  const lowerQuery = query.toLowerCase();

  return doas.filter((doa) => {
    const matchesDoa = doa.doa.toLowerCase().includes(lowerQuery);
    const matchesLatin = doa.latin.toLowerCase().includes(lowerQuery);
    const matchesArtinya = doa.artinya.toLowerCase().includes(lowerQuery);

    return matchesDoa || matchesLatin || matchesArtinya;
  });
}

/**
 * Get random doa
 */
export function getRandomDoa(doas: DoaItem[]): DoaItem | undefined {
  if (doas.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * doas.length);
  return doas[randomIndex];
}

/**
 * Get doas by category (if you want to categorize later)
 * This is a helper for future implementation
 */
export function categorizeDoas(doas: DoaItem[]) {
  // You can implement categorization logic here
  // For now, just return all doas
  return {
    all: doas,
    // Add more categories as needed
  };
}

/**
 * Format doa for display
 */
export function formatDoaForDisplay(doa: DoaItem) {
  return {
    ...doa,
    // Add any formatting logic here
    formattedLatin: doa.latin.trim(),
    formattedArtinya: doa.artinya.trim(),
  };
}
