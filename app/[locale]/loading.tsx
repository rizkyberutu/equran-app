// app/[locale]/loading.tsx
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <LoadingSpinner size="lg" text="Loading..." />
    </div>
  );
}
