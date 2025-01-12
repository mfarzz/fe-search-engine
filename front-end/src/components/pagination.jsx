import React from "react";
import usePagination from "../hooks/usePagination";

const Pagination = ({ totalPages, onPageChange }) => {
    const { currentPage, goToPreviousPage, goToNextPage, goToPage } = usePagination(1, totalPages);

    return (
        <nav className="flex items-center gap-x-1" aria-label="Pagination">
            <button
                type="button"
                className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-blue-premier focus:text-white disabled:opacity-50 disabled:pointer-events-none"
                aria-label="Previous"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
            >
                <span>Previous</span>
            </button>
            <div className="flex items-center gap-x-1">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-blue-premier focus:text-white ${
                            currentPage === index + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                        }`}
                        onClick={() => goToPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <button
                type="button"
                className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-blue-premier focus:text-white disabled:opacity-50 disabled:pointer-events-none"
                aria-label="Next"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
            >
                <span>Next</span>
            </button>
        </nav>
    );
};

export default Pagination;
