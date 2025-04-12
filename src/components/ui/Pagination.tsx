import React from "react";
import clsx from "clsx";
import styles from "./Pagination.module.scss";

type PaginationSize = "sm" | "md" | "lg";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  size?: PaginationSize;
  className?: string;
}

const VISIBLE_PAGES = 10;

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  size = "md",
  className,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(VISIBLE_PAGES / 2));
    let endPage = Math.min(totalPages, startPage + VISIBLE_PAGES - 1);

    if (endPage - startPage + 1 < VISIBLE_PAGES) {
      startPage = Math.max(1, endPage - VISIBLE_PAGES + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className={clsx(styles.pagination, styles[size], className)}>
      <ul className={styles.paginationList}>
        <li>
          <button
            className={clsx(styles.pageItem, styles.arrow)}
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            aria-label="첫 페이지로 이동"
          >
            «
          </button>
        </li>
        <li>
          <button
            className={clsx(styles.pageItem, styles.arrow)}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="이전 페이지로 이동"
          >
            ‹
          </button>
        </li>

        {pageNumbers[0] > 1 && (
          <>
            <li>
              <button
                className={styles.pageItem}
                onClick={() => handlePageChange(1)}
              >
                1
              </button>
            </li>
            {pageNumbers[0] > 2 && <li className={styles.ellipsis}>...</li>}
          </>
        )}

        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              className={clsx(
                styles.pageItem,
                currentPage === page && styles.active
              )}
              onClick={() => handlePageChange(page)}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          </li>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <li className={styles.ellipsis}>...</li>
            )}
            <li>
              <button
                className={styles.pageItem}
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}

        <li>
          <button
            className={clsx(styles.pageItem, styles.arrow)}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="다음 페이지로 이동"
          >
            ›
          </button>
        </li>
        <li>
          <button
            className={clsx(styles.pageItem, styles.arrow)}
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="마지막 페이지로 이동"
          >
            »
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
