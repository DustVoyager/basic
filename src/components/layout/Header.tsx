import React from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <button className={styles.menuButton} onClick={onMenuClick}>
          <span className={styles.menuIcon}>☰</span>
        </button>

        <h1 className={styles.title}>블로그</h1>

        <div className={styles.actions}>
          <button className={styles.actionButton}>로그인</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
