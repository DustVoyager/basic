// src/components/LoginForm.tsx
import { useForm } from "react-hook-form";
import { useAuthStore } from "../stores/authStore";
import { login } from "../api/auth";
import styles from "./LoginForm.module.scss";

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
      <div className={styles.inputGroup}>
        <label className={styles.label}>아이디</label>
        <input
          type="text"
          className={styles.input}
          placeholder="아이디를 입력하세요"
          {...register("userId", {
            required: "아이디를 입력해주세요",
            minLength: {
              value: 4,
              message: "아이디는 최소 4자 이상이어야 합니다",
            },
          })}
        />
        {errors.userId && (
          <span className={styles.error}>{errors.userId.message}</span>
        )}
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>비밀번호</label>
        <input
          type="password"
          className={styles.input}
          placeholder="비밀번호를 입력하세요"
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            minLength: {
              value: 6,
              message: "비밀번호는 최소 6자 이상이어야 합니다",
            },
          })}
        />
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
      </div>
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "로그인 중..." : "로그인"}
      </button>
      {errors.root && <p className={styles.rootError}>{errors.root.message}</p>}
    </form>
  );
};
