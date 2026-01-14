const BASE_URL = "https://equran.id/api/doa";

export interface Doa {
  id: number;
  grup: string;
  nama: string;
  ar: string;
  tr: string;
  idn: string;
  tentang: string;
  tag: string[];
}

export async function getAllDoas(): Promise<Doa[] | null> {
  try {
    const response = await fetch(BASE_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch duas: ${response.status}`);
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error("Error fetching all duas:", error);
    return null;
  }
}

export async function getDoaById(id: string): Promise<Doa | null> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch doa ${id}: ${response.status}`);
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error(`Error fetching doa ${id}:`, error);
    return null;
  }
}
