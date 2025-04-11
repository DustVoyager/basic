import React from "react";
import clsx from "clsx";
import styles from "./Radio.module.scss";

type RadioSize = "sm" | "md" | "lg";
type LabelPosition = "left" | "right";

interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  id: string;
  label?: string;
  error?: string;
  helperText?: string;
  size?: RadioSize;
  required?: boolean;
  labelPosition?: LabelPosition;
}

function Radio({
  id,
  label,
  error,
  helperText,
  size = "md",
  required,
  labelPosition = "right",
  className,
  disabled,
  ...props
}: RadioProps) {
  const radioClasses = clsx(
    styles.radio,
    styles[size],
    error && styles.error,
    className
  );

  const containerClasses = clsx(
    styles.radioContainer,
    labelPosition === "left" && styles.radioContainerLeft
  );

  const labelClasses = clsx(styles.label, error && styles.errorLabel);

  const helperTextClasses = clsx(styles.helperText, error && styles.errorText);

  return (
    <div className={styles.radioWrapper}>
      <div className={containerClasses}>
        {label && labelPosition === "left" && (
          <label htmlFor={id} className={labelClasses}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <input
          type="radio"
          className={radioClasses}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          id={id}
          {...props}
        />
        {label && labelPosition === "right" && (
          <label htmlFor={id} className={labelClasses}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
      </div>
      {(error || helperText) && (
        <span className={helperTextClasses}>{error || helperText}</span>
      )}
    </div>
  );
}

export default Radio;
