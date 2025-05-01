import { ChangeEvent } from "react";
import { useRadioGroup } from "./useRadioGroup";
import styles from "./Radio.module.css";

type Props<T extends string | number> = {
  label: string | React.ReactNode;
  value: T;
  disabled?: boolean;
};

export const Radio = <T extends string | number>({
  label,
  value,
  disabled = false,
}: Props<T>) => {
  const { name, selectedValue, onChange } = useRadioGroup<T>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const parsedValue =
      typeof value === "number" ? Number(e.target.value) : e.target.value;
    onChange(parsedValue as T);
  };

  return (
    <label className={styles.label}>
      <input
        type="radio"
        name={name}
        value={String(value)}
        checked={selectedValue === value}
        onChange={handleChange}
        disabled={disabled}
        className={styles.input}
      />
      {label}
    </label>
  );
};
