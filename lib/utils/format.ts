export function formatSurahNumber(num: number): string {
  return num.toString().padStart(3, "0");
}

export function formatAyahNumber(num: number): string {
  return num.toString();
}

export function getArabicNumber(num: number): string {
  const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return num
    .toString()
    .split("")
    .map((digit) => arabicNumbers[parseInt(digit)])
    .join("");
}
