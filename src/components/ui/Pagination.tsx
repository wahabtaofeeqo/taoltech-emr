import React from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import CustomDropdown from "./Select";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
  showItemsPerPage?: boolean;
  itemsPerPageOptions?: number[];
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  showItemsPerPage = false,
  itemsPerPageOptions = [10, 20, 50],
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
      {/* Items per page dropdown */}
      {showItemsPerPage && onItemsPerPageChange && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Show:</span>
          <CustomDropdown
            name="itemsPerPage"
            options={itemsPerPageOptions.map((option) => ({
              value: option.toString(),
              label: option.toString(),
            }))}
            onSelect={(name, value) => onItemsPerPageChange(Number(value))}
            defaultOption={itemsPerPage.toString()}
            size="xs"
            className="w-24"
          />
          <span>per page</span>
        </div>
      )}

      {/* Page number controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className={`rounded-full transition-colors text-black h-10 w-10 flex items-center justify-center group ${
            currentPage === 1
              ? "bg-gray-200 cursor-not-allowed opacity-50"
              : "bg-gray-100 hover:bg-black hover:text-white"
          }`}
        >
          <GoChevronLeft />
        </button>

        <div className="flex items-center gap-2">
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            if (totalPages > 7) {
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={index}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`rounded-md h-10 w-10 flex items-center justify-center ${
                      currentPage === pageNumber
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              }

              if (pageNumber === 2 && currentPage > 3)
                return <span key={index}>...</span>;

              if (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                return <span key={index}>...</span>;

              return null;
            }

            return (
              <button
                key={index}
                onClick={() => handlePageChange(pageNumber)}
                className={`rounded-md h-10 w-10 flex items-center justify-center ${
                  currentPage === pageNumber
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className={`rounded-full transition-colors text-black h-10 w-10 flex items-center justify-center group ${
            currentPage === totalPages
              ? "bg-gray-200 cursor-not-allowed opacity-50"
              : "bg-gray-100 hover:bg-black hover:text-white"
          }`}
        >
          <GoChevronRight />
        </button>
      </div>

      {/* Item count display */}
      <div className="text-sm text-gray-600">
        Showing {startItem}-{endItem} of {totalItems} items
      </div>
    </div>
  );
};

export default Pagination;
