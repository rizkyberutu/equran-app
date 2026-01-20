// app/layout.tsx
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Al-Quran & Doa",
  description: "Digital Quran App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
