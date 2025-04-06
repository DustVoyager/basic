import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import styles from "./AuthLayout.module.scss";

export default function AuthLayout() {
  const { isLoggedIn } = useAuthStore();

  // 이미 로그인한 사용자는 메인 페이지로 리다이렉트
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>환영합니다</h2>
          <p className={styles.subtitle}>계정에 로그인하여 시작하세요</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
