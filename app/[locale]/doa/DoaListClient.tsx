// app/[locale]/doa/DoaListClient.tsx
"use client";

import { useState, useMemo } from "react";
import { SearchBar } from "@/components/shared/SearchBar";
import type { Doa } from "@/lib/services/doa.service";
import type { Locale } from "@/types/common";
import { DoaList } from "@/components/doa/DoaList";

interface DoaListClientProps {
  doas: Doa[];
  locale: Locale;
  dict: {
    search: string;
  };
}

export function DoaListClient({ doas, locale, dict }: DoaListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDoas = useMemo(() => {
    if (!searchQuery) return doas;

    const query = searchQuery.toLowerCase();
    return doas.filter(
      (doa) =>
        doa.nama.toLowerCase().includes(query) ||
        doa.grup.toLowerCase().includes(query) ||
        doa.ar.toLowerCase().includes(query) ||
        doa.tr.toLowerCase().includes(query) ||
        doa.idn.toLowerCase().includes(query) ||
        doa.tag.some((tag) => tag.toLowerCase().includes(query)) ||
        doa.id.toString().includes(query)
    );
  }, [doas, searchQuery]);

  return (
    <>
      <div className="flex sm:flex-row gap-4 items-end mb-8 mx-auto max-w-xl">
        <div className="flex-1">
          <SearchBar
            placeholder={dict.search}
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>
      </div>

      <DoaList doas={filteredDoas} locale={locale} />
    </>
  );
}
