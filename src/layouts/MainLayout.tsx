import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import styles from "./MainLayout.module.scss";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout() {
  const { isLoggedIn } = useAuthStore();

  // 잠시 주석 (로그인 후 레이아웃 작업 중)
  // if (!isLoggedIn) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
