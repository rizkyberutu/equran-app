// components/shared/Pagination.tsx
"use client";

import { Button } from "@/components/selia/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
  startIndex?: number;
  endIndex?: number;
  totalItems?: number;
  locale?: "id" | "en";
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = false,
  startIndex = 0,
  endIndex = 0,
  totalItems = 0,
  locale = "en",
}: PaginationProps) {
  const goToPrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Page Info */}
      {showInfo && (
        <p className="text-sm text-muted">
          {locale === "id" ? "Menampilkan" : "Showing"} {startIndex + 1}-
          {endIndex} {locale === "id" ? "dari" : "of"} {totalItems}
        </p>
      )}

      {/* Pagination Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm-icon"
          onClick={goToPrevious}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="size-4" />
        </Button>

        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-muted">
                ...
              </span>
            );
          }

          return (
            <Button
              key={page}
              variant={currentPage === page ? "primary" : "outline"}
              size="sm"
              onClick={() => onPageChange(page as number)}
              className="min-w-10"
            >
              {page}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size="sm-icon"
          onClick={goToNext}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
