import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import styles from "./Header.module.scss";
import { useAuthStore } from "../stores/authStore";

export default function Header() {
  const navigate = useNavigate();
  const { clearTokens } = useAuthStore();

  const handleLogout = () => {
    clearTokens();
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>My App</h1>
      <nav className={styles.nav}>
        <Button onClick={handleLogout}>로그아웃</Button>
      </nav>
    </header>
  );
}
