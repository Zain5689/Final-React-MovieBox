import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MoviePagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="flex items-center justify-center gap-4 mt-10">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="border-surface-elevated text-text-main"
      >
        <ChevronLeft className="w-4 h-4 mr-2" /> Previous
      </Button>

      <span className="text-text-main font-medium">
        Page {currentPage} of {totalPages > 500 ? 500 : totalPages}
      </span>

      <Button
        variant="outline"
        disabled={currentPage === totalPages || currentPage === 500}
        onClick={() => onPageChange(currentPage + 1)}
        className="border-surface-elevated text-text-main"
      >
        Next <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}
