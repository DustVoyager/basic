import {
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  maxPage?: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  maxPage,
  onPageChange,
}: PaginationProps) {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const visiblePages = maxPage || 10;
  const halfVisiblePages = Math.floor(visiblePages / 2);

  let startPage = currentPage - halfVisiblePages;
  let endPage = currentPage + halfVisiblePages;

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(visiblePages, totalPages);
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - visiblePages + 1);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <div className={styles.pagination}>
      <button disabled={currentPage === 1} onClick={() => handlePageClick(1)}>
        <FiChevronsLeft />
      </button>
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        <FiChevronLeft />
      </button>

      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          className={currentPage === pageNum ? styles.currentPage : ""}
          onClick={() => handlePageClick(pageNum)}
        >
          {pageNum}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        <FiChevronRight />
      </button>
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(totalPages)}
      >
        <FiChevronsRight />
      </button>
    </div>
  );
}
