import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import styles from "./AuthLayout.module.scss";

export default function AuthLayout() {
  const { isLoggedIn } = useAuthStore();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin</h2>
      <Outlet />
    </div>
  );
}
