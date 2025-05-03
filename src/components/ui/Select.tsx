import { useState, useRef, useCallback } from "react";
import styles from "./Select.module.scss";
import clsx from "clsx";
import { FaChevronDown } from "react-icons/fa";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = "선택하세요",
  disabled = false,
  className = "",
  error,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  const toggleDropdown = useCallback(() => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  }, [disabled]);

  const handleSelect = useCallback(
    (option: SelectOption) => {
      if (!option.disabled) {
        onChange(option.value);
        setIsOpen(false);
      }
    },
    [onChange]
  );

  return (
    <div className={styles.selectContainer}>
      <div
        ref={selectRef}
        className={clsx(styles.select, className, {
          [styles.disabled]: disabled,
          [styles.error]: !!error,
        })}
      >
        <div className={styles.selectTrigger} onClick={toggleDropdown}>
          <span
            className={clsx(styles.selectValue, {
              [styles.placeholder]: !value,
            })}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <FaChevronDown
            className={clsx(styles.selectIcon, {
              [styles.open]: isOpen,
            })}
          />
        </div>

        {isOpen && (
          <div className={styles.selectContent}>
            <ul className={styles.selectOptions} role="listbox">
              {options.map((option) => (
                <li
                  key={option.value}
                  className={clsx(styles.selectOption, {
                    [styles.selected]: option.value === value,
                    [styles.disabled]: option.disabled,
                  })}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {error && (
        <p id="select-error" className={styles.errorMessage}>
          {error}
        </p>
      )}
    </div>
  );
}
