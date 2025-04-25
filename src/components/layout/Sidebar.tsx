import React from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.sidebarContent}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navItem} onClick={onClose}>
            홈
          </Link>
          <Link to="/posts" className={styles.navItem} onClick={onClose}>
            게시글
          </Link>
          <Link to="/categories" className={styles.navItem} onClick={onClose}>
            카테고리
          </Link>
          <Link to="/tags" className={styles.navItem} onClick={onClose}>
            태그
          </Link>
        </nav>
      </div>

      {isOpen && <div className={styles.overlay} onClick={onClose} />}
    </aside>
  );
};

export default Sidebar;
