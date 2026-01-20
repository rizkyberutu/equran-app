// components/shared/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/selia/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  text?: string;
  fallbackHref?: string;
}

export function BackButton({ text = "Back", fallbackHref }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else if (fallbackHref) {
      router.push(fallbackHref);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleBack}>
      <ArrowLeft className="size-4" />
      {text}
    </Button>
  );
}
