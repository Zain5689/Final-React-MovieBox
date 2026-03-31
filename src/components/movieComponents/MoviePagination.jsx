import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default function MoviePagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const maxPages = totalPages > 500 ? 500 : totalPages;

  const getPageNumbers = () => {
    const pages = [];
    const step = 2;

    if (maxPages <= 7) {
      for (let i = 1; i <= maxPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > step + 2) pages.push("...");

      const start = Math.max(2, currentPage - step);
      const end = Math.min(maxPages - 1, currentPage + step);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < maxPages - (step + 1)) pages.push("...");
      pages.push(maxPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-16 py-8 border-t border-white/5">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* First Page Button */}
        <Button
          variant="ghost"
          size="icon"
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
          className="hidden sm:flex text-text-main/50 hover:text-primary transition-colors"
        >
          <ChevronsLeft className="w-5 h-5" />
        </Button>

        {/* Previous Button */}
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="border-surface-elevated bg-surface-card text-text-main hover:bg-primary hover:text-white transition-all shadow-sm"
        >
          <ChevronLeft className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        {/* Dynamic Page Numbers */}
        <div className="flex items-center gap-1 mx-2">
          {getPageNumbers().map((pageNum, idx) => (
            <button
              key={idx}
              onClick={() =>
                typeof pageNum === "number" && onPageChange(pageNum)
              }
              disabled={pageNum === "..."}
              className={`min-w-10 h-10 rounded-lg text-sm font-bold transition-all
                ${
                  pageNum === currentPage
                    ? "bg-primary text-white shadow-lg shadow-primary/30 scale-110"
                    : "text-text-main/60 hover:bg-surface-elevated hover:text-text-main"
                }
                ${pageNum === "..." ? "cursor-default" : "cursor-pointer"}
                ${typeof pageNum !== "number" ? "border-none" : "border border-white/5"}
              `}
            >
              {pageNum}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          disabled={currentPage === maxPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="border-surface-elevated bg-surface-card text-text-main hover:bg-primary hover:text-white transition-all shadow-sm"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4 sm:ml-2" />
        </Button>

        {/* Last Page Button */}
        <Button
          variant="ghost"
          size="icon"
          disabled={currentPage === maxPages}
          onClick={() => onPageChange(maxPages)}
          className="hidden sm:flex text-text-main/50 hover:text-primary transition-colors"
        >
          <ChevronsRight className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="text-xs text-text-main/40 font-medium uppercase tracking-widest">
          Viewing Page {currentPage} of {maxPages}
        </p>
        <div className="w-24 h-1 bg-surface-elevated rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${(currentPage / maxPages) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
