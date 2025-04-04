import React from "react";
import styles from "./Checkbox.module.scss";

type CheckboxSize = "sm" | "md" | "lg";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  size?: CheckboxSize;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, size = "md", className, disabled, ...props }, ref) => {
    const wrapperClasses = [
      styles.checkboxWrapper,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const checkboxClasses = [styles.checkbox, styles[size]]
      .filter(Boolean)
      .join(" ");

    return (
      <div>
        <label className={wrapperClasses}>
          <input
            type="checkbox"
            ref={ref}
            className={checkboxClasses}
            disabled={disabled}
            {...props}
          />
          {label && <span className={styles.label}>{label}</span>}
        </label>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
