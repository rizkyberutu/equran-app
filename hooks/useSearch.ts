// hooks/useSearch.ts
"use client";

import { useState, useMemo } from "react";

interface UseSearchReturn<T> {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredData: T[];
  isSearching: boolean;
}

export function useSearch<T>(
  data: T[],
  searchFn: (item: T, query: string) => boolean
): UseSearchReturn<T> {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    return data.filter((item) => searchFn(item, searchQuery));
  }, [data, searchQuery, searchFn]);

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
    isSearching: searchQuery.trim().length > 0,
  };
}
