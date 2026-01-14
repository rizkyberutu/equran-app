// lib/utils/qari-mapping.ts
export const qariNames: Record<string, string> = {
  "01": "Abdullah Al-Juhany",
  "02": "Abdul Muhsin Al-Qasim",
  "03": "Abdurrahman as-Sudais",
  "04": "Ibrahim Al-Dossari",
  "05": "Misyari Rasyid Al-Afasi",
  "06": "Yasser Al-Dosari",

  "abdullah-al-juhany": "Abdullah Al-Juhany",
  "abdul-muhsin-al-qasim": "Abdul Muhsin Al-Qasim",
  "abdurrahman-as-sudais": "Abdurrahman as-Sudais",
  "ibrahim-al-dossari": "Ibrahim Al-Dossari",
  "misyari-rasyid-al-afasi": "Misyari Rasyid Al-Afasi",
  "yasser-al-dosari": "Yasser Al-Dosari",
};

/**
 * Convert qari ID/code to readable name
 */
export function getQariName(qariId: string): string {
  return qariNames[qariId] || qariId;
}

/**
 * Get all qari options with readable names
 */
export function formatQariOptions(audioObject: Record<string, string>) {
  return Object.entries(audioObject).map(([id, url]) => ({
    id,
    name: getQariName(id),
    url,
  }));
}
