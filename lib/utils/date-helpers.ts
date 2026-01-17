// lib/utils/date-helpers.ts

// Nama bulan Indonesia
export function getMonthNameID(month: number): string {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return months[month - 1];
}

// English month names
export function getMonthNameEN(month: number): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month - 1];
}

//  Get current Hijri year
export function getHijriYear(): number {
  const gregorianYear = new Date().getFullYear();
  return Math.floor(((gregorianYear - 622) * 33) / 32);
}

// Check if current date is in Ramadan
export function isRamadan(): boolean {
  // This is approximate - you may want to use a proper Islamic calendar library
  const now = new Date();
  const hijriYear = getHijriYear();
  // This needs proper Hijri calendar calculation
  // For now, return false - implement proper check later
  return false;
}
