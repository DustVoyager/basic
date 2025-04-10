import React from "react";
import clsx from "clsx";
import styles from "./Select.module.scss";

type SelectSize = "sm" | "md" | "lg";
type LabelPosition = "inline" | "top";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size" | "id"> {
  id: string;
  label?: string;
  error?: string;
  helperText?: string;
  size?: SelectSize;
  required?: boolean;
  labelPosition?: LabelPosition;
  labelWidth?: string | number;
  options: SelectOption[];
  placeholder?: string;
}

function Select({
  id,
  label,
  error,
  helperText,
  size = "md",
  required,
  labelPosition = "inline",
  labelWidth,
  className,
  disabled,
  options,
  placeholder,
  ...props
}: SelectProps) {
  const labelStyle = labelWidth
    ? {
        width: typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth,
        flexShrink: 0,
      }
    : undefined;

  const selectClasses = clsx(
    styles.select,
    styles[size],
    error && styles.error,
    className
  );

  const containerClasses = clsx(
    styles.selectContainer,
    labelPosition === "top" && styles.selectContainerTop
  );

  const labelClasses = clsx(
    styles.label,
    labelPosition === "top" && styles.labelTop
  );

  const helperTextClasses = clsx(styles.helperText, error && styles.errorText);

  return (
    <div className={styles.selectWrapper}>
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
        <div className={styles.selectContent}>
          <select
            className={selectClasses}
            disabled={disabled}
            aria-invalid={error ? "true" : "false"}
            id={id}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {(error || helperText) && (
        <span className={helperTextClasses}>{error || helperText}</span>
      )}
    </div>
  );
}

export default Select;
