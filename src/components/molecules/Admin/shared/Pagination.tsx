import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalRecords,
  pageSize,
  onPageChange,
}) => {
  const [selectedPage, setSelectedPage] = useState(currentPage);

  useEffect(() => {
    setSelectedPage(currentPage);
  }, [currentPage]);

  // Calculate records range
  const calculateRecordsRange = () => {
    const start = (selectedPage - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, totalRecords);
    return { start, end };
  };

  // Generate page range
  const generatePageRange = (maxLength = 5) => {
    const halfLength = Math.floor(maxLength / 2);
    let start = Math.max(1, selectedPage - halfLength);
    let end = start + maxLength - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxLength + 1);
    }

    return Array.from(
      { length: Math.min(maxLength, totalPages) },
      (_, i) => start + i
    );
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setSelectedPage(page);
      onPageChange(page);
    }
  };

  const recordsRange = calculateRecordsRange();
  const pageRange = generatePageRange();

  // Don't render if no records
  if (totalRecords === 0) return null;

  return (
    <div className="flex justify-between border-t border-stroke px-8 pt-5 dark:border-strokedark">
      {/* Records Range */}
      <p className="font-medium text-gray-600">
        Showing {recordsRange.start}-{recordsRange.end} of {totalRecords}{" "}
        records
      </p>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        {/* First Page */}
        <button
          onClick={() => handlePageChange(1)}
          disabled={selectedPage === 1}
          className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-na_blue hover:text-white disabled:opacity-50"
        >
          <ChevronsLeft size={20} />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => handlePageChange(selectedPage - 1)}
          disabled={selectedPage === 1}
          className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-na_blue hover:text-white disabled:opacity-50"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Page Numbers */}
        {pageRange.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 hover:bg-na_blue hover:text-white ${
              selectedPage === page
                ? "bg-na_blue text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Page */}
        <button
          onClick={() => handlePageChange(selectedPage + 1)}
          disabled={selectedPage === totalPages}
          className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-na_blue hover:text-white disabled:opacity-50"
        >
          <ChevronRight size={20} />
        </button>

        {/* Last Page */}
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={selectedPage === totalPages}
          className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-na_blue hover:text-white disabled:opacity-50"
        >
          <ChevronsRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
