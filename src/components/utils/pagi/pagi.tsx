import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagi: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        className={`px-3 py-2 rounded-md ${isFirstPage ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isFirstPage}
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        const isCurrentPage = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            className={`px-3 py-2 rounded-md ${isCurrentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        className={`px-3 py-2 rounded-md ${isLastPage ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isLastPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagi;
