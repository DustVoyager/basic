// src/components/LoginForm.tsx
import { useForm } from "react-hook-form";
import { useAuthStore } from "../stores/authStore";
import { login } from "../api/auth";
import Button from "./ui/Button";
import Input from "./ui/Input";

interface Props {
  onLoginSuccess: () => void;
}

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = ({ onLoginSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>();

  const setTokens = useAuthStore((state) => state.setTokens);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data);
      setTokens(response.accessToken, response.refreshToken);
      onLoginSuccess();
    } catch (err) {
      setError("root", {
        message: "로그인 실패: 이메일 또는 비밀번호를 확인하세요.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="이메일"
        type="email"
        placeholder="이메일을 입력하세요"
        error={errors.email?.message}
        {...register("email", {
          required: "이메일을 입력해주세요",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "유효한 이메일 주소를 입력해주세요",
          },
        })}
      />
      <Input
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력하세요"
        error={errors.password?.message}
        {...register("password", {
          required: "비밀번호를 입력해주세요",
          minLength: {
            value: 6,
            message: "비밀번호는 최소 6자 이상이어야 합니다",
          },
        })}
      />
      <Button type="submit" isLoading={isSubmitting}>
        로그인
      </Button>
      {errors.root && (
        <p style={{ color: "red", marginTop: "1rem" }}>{errors.root.message}</p>
      )}
    </form>
  );
};
