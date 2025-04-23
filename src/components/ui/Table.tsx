import React from "react";
import styles from "./Table.module.scss";

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
  mobileHidden?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
}

const Table = <T extends Record<string, any>>({
  columns,
  data,
  className,
}: TableProps<T>) => {
  // 모바일에서 보여줄 컬럼들 (mobileHidden이 false인 컬럼들)
  const mobileColumns = columns.filter((col) => !col.mobileHidden);

  return (
    <div className={styles.tableContainer}>
      {/* 데스크톱 테이블 */}
      <table className={`${styles.table} ${className || ""}`}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={styles.th}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.tr}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={styles.td}>
                  {column.render
                    ? column.render(row[column.accessor], row)
                    : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 모바일 카드 뷰 */}
      <div className={styles.mobileView}>
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.mobileCard}>
            {mobileColumns.map((column, colIndex) => (
              <div key={colIndex} className={styles.mobileRow}>
                <div className={styles.mobileLabel}>{column.header}</div>
                <div className={styles.mobileValue}>
                  {column.render
                    ? column.render(row[column.accessor], row)
                    : row[column.accessor]}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
