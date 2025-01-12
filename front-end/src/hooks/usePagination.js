import { useState } from 'react';

const usePagination = (initialPage, totalPages) => {
    const [currentPage, setCurrentPage] = useState(initialPage);

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return { currentPage, goToPreviousPage, goToNextPage, goToPage };
};

export default usePagination;
