// src/pages/LoginPage.tsx
import { LoginForm } from "../components/LoginForm";

const LoginPage = () => {
  const handleLoginSuccess = () => {};

  return (
    <div>
      <h1>로그인</h1>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
