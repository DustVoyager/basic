import React from "react";
import clsx from "clsx";
import styles from "./Input.module.scss";

type InputSize = "sm" | "md" | "lg";
type LabelPosition = "inline" | "top";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "id"> {
  id: string;
  label?: string;
  error?: string;
  helperText?: string;
  size?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
  labelPosition?: LabelPosition;
  labelWidth?: string | number;
}

function Input({
  id,
  label,
  error,
  helperText,
  size = "md",
  leftIcon,
  rightIcon,
  required,
  labelPosition = "inline",
  labelWidth,
  className,
  disabled,
  ...props
}: InputProps) {
  const labelStyle = labelWidth
    ? {
        width: typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth,
        flexShrink: 0,
      }
    : undefined;

  const inputClasses = clsx(
    styles.input,
    styles[size],
    error && styles.error,
    leftIcon && styles.withLeftIcon,
    rightIcon && styles.withRightIcon,
    className
  );

  const containerClasses = clsx(
    styles.inputContainer,
    labelPosition === "top" && styles.inputContainerTop
  );

  const labelClasses = clsx(
    styles.label,
    labelPosition === "top" && styles.labelTop
  );

  const helperTextClasses = clsx(styles.helperText, error && styles.errorText);

  return (
    <div className={styles.inputWrapper}>
      <div className={containerClasses}>
        {label && (
          <label
            htmlFor={id}
            className={labelClasses}
            style={labelPosition === "inline" ? labelStyle : undefined}
          >
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.inputContent}>
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
          <input
            className={inputClasses}
            disabled={disabled}
            aria-invalid={error ? "true" : "false"}
            id={id}
            {...props}
          />
          {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </div>
      </div>
      {(error || helperText) && (
        <span className={helperTextClasses}>{error || helperText}</span>
      )}
    </div>
  );
}

export default Input;
