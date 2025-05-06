import { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";
import clsx from "clsx";

export type InputSize = "sm" | "md" | "lg";
export type LabelPosition = "top" | "left" | "none";

type InputBaseProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

export interface InputProps extends InputBaseProps {
  id?: string;
  label?: string;
  labelPosition?: LabelPosition;
  size?: InputSize;
  error?: string;
  isFullWidth?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export function Input({
  id,
  label,
  labelPosition = "top",
  size = "md",
  error,
  isFullWidth = false,
  className,
  labelClassName,
  inputClassName,
  disabled,
  required,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

  const containerClasses = clsx(
    styles.container,
    labelPosition === "left" && styles.containerHorizontal,
    isFullWidth && styles.fullWidth,
    className
  );

  const wrapperClasses = clsx(
    styles.inputWrapper,
    styles[`size-${size}`],
    error && styles.hasError,
    disabled && styles.disabled
  );

  const labelClasses = clsx(
    styles.label,
    labelPosition === "left" && styles.labelLeft,
    required && styles.required,
    labelClassName
  );

  const inputClasses = clsx(styles.input, inputClassName);

  return (
    <div className={containerClasses}>
      {label && labelPosition !== "none" && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
        </label>
      )}
      <div className={wrapperClasses}>
        <input
          id={inputId}
          className={inputClasses}
          disabled={disabled}
          required={required}
          {...props}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
