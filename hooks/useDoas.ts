// hooks/useDoas.ts
"use client";

import { useState, useEffect } from "react";
import { getAllDoas } from "@/lib/api/doa";
import type { DoaItem } from "@/types/doa";

interface UseDoasReturn {
  doas: DoaItem[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useDoas(): UseDoasReturn {
  const [doas, setDoas] = useState<DoaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDoas = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getAllDoas();
      setDoas(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch doas"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoas();
  }, []);

  return {
    doas,
    isLoading,
    error,
    refetch: fetchDoas,
  };
}
