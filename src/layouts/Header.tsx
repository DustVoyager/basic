import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import styles from "./Header.module.scss";
import { useAuthStore } from "../stores/authStore";
import { toast } from "react-hot-toast";

export default function Header() {
  const navigate = useNavigate();
  const { clearTokens } = useAuthStore();

  const handleLogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      clearTokens();
      toast.success("로그아웃 되었습니다.");
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>My App</h1>
      <nav className={styles.nav}>
        <Button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          로그아웃
        </Button>
      </nav>
    </header>
  );
}
