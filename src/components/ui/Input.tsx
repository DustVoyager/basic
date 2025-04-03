import React from "react";
import styles from "./Input.module.css";

type InputSize = "sm" | "md" | "lg";
type LabelPosition = "inline" | "top";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
  labelPosition?: LabelPosition;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      size = "md",
      leftIcon,
      rightIcon,
      required,
      labelPosition = "inline",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputClasses = [
      styles.input,
      styles[size],
      error && styles.error,
      leftIcon && styles.withLeftIcon,
      rightIcon && styles.withRightIcon,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const containerClasses = [
      styles.inputContainer,
      labelPosition === "top" && styles.inputContainerTop,
    ]
      .filter(Boolean)
      .join(" ");

    const labelClasses = [
      styles.label,
      labelPosition === "top" && styles.labelTop,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={styles.inputWrapper}>
        <div className={containerClasses}>
          {label && (
            <label className={labelClasses}>
              {label}
              {required && <span className={styles.required}>*</span>}
            </label>
          )}
          <div className={styles.inputWrapper}>
            {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
            <input
              ref={ref}
              className={inputClasses}
              disabled={disabled}
              aria-invalid={error ? "true" : "false"}
              {...props}
            />
            {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
          </div>
        </div>
        {(error || helperText) && (
          <span
            className={`${styles.helperText} ${error ? styles.errorText : ""}`}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
