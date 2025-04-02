// src/components/LoginForm.tsx
import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { login } from "../api/auth";
import Button from "./ui/Button";

interface Props {
  onLoginSuccess: () => void;
}

export const LoginForm = ({ onLoginSuccess }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const setTokens = useAuthStore((state) => state.setTokens);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      setTokens(data.accessToken, data.refreshToken); // 상태 저장
      onLoginSuccess();
    } catch (err) {
      setError("로그인 실패: 이메일 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit">로그인</Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};
