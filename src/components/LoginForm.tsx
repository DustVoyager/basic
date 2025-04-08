// src/components/LoginForm.tsx
import { useForm } from "react-hook-form";
import { useAuthStore } from "../stores/authStore";
import { login } from "../api/auth";
import styles from "./LoginForm.module.scss";
import Input from "./ui/Input";

interface Props {
  onLoginSuccess: () => void;
}

interface LoginFormData {
  userId: string;
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
        message: "로그인 실패: 아이디 또는 비밀번호를 확인하세요.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        id="userId"
        placeholder="아이디를 입력하세요"
        error={errors.userId?.message}
        required
        {...register("userId", {
          required: "아이디를 입력해주세요",
          minLength: {
            value: 4,
            message: "아이디는 최소 4자 이상이어야 합니다",
          },
        })}
      />
      <Input
        id="password"
        type="password"
        placeholder="비밀번호를 입력하세요"
        error={errors.password?.message}
        required
        {...register("password", {
          required: "비밀번호를 입력해주세요",
          minLength: {
            value: 6,
            message: "비밀번호는 최소 6자 이상이어야 합니다",
          },
        })}
      />
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        로그인
      </button>
      {errors.root && <p className={styles.rootError}>{errors.root.message}</p>}
    </form>
  );
};
