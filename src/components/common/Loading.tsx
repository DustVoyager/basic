import { FaSpinner } from "react-icons/fa";
import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <FaSpinner className={styles.spinner} />
      <span className={styles.text}>데이터를 불러오는 중입니다.</span>
    </div>
  );
}
