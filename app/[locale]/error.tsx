// app/[locale]/error.tsx
"use client";

import { useEffect } from "react";
import { ErrorMessage } from "@/components/shared/ErrorMessage";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16">
      <ErrorMessage
        title="Something went wrong!"
        message={error.message || "An unexpected error occurred"}
        onRetry={reset}
        retryText="Try again"
      />
    </div>
  );
}
