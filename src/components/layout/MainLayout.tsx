import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./MainLayout.module.scss";

const MainLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.layout}>
      <Header onMenuClick={toggleSidebar} />

      <div className={styles.mainContent}>
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

        <div
          className={`${styles.content} ${
            isSidebarOpen ? styles.sidebarOpen : ""
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
