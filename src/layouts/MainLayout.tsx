import React from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import styles from "./MainLayout.module.scss";

export default function MainLayout() {
  const navigate = useNavigate();
  const { isLoggedIn, clearTokens } = useAuthStore();

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    clearTokens();
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.navbarContent}>
          <div>
            <h1 className={styles.logo}>My App</h1>
          </div>
          <div>
            <button onClick={handleLogout} className={styles.logoutButton}>
              로그아웃
            </button>
          </div>
        </div>
      </nav>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
