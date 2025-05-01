import { ReactNode } from "react";
import { Radio } from "./Radio";
import { RadioGroupContext, RadioGroupContextType } from "./useRadioGroup";
import styles from "./RadioGroup.module.css";

type Direction = "horizontal" | "vertical";

type Option<T extends string | number> = {
  label: string | ReactNode;
  value: T;
  disabled?: boolean;
};

type Props<T extends string | number> = {
  name: string;
  value: T;
  onChange: (value: T) => void;
  direction?: Direction;
  options?: Option<T>[];
  children?: ReactNode;
};

export const RadioGroup = <T extends string | number>({
  name,
  value,
  onChange,
  direction = "vertical",
  options,
  children,
}: Props<T>) => {
  const contextValue: RadioGroupContextType<T> = {
    name,
    selectedValue: value,
    onChange,
  };

  return (
    <RadioGroupContext.Provider value={contextValue as unknown}>
      <div role="radiogroup" className={`${styles.group} ${styles[direction]}`}>
        {options?.map((opt) => (
          <Radio
            key={String(opt.value)}
            value={opt.value}
            label={opt.label}
            disabled={opt.disabled}
          />
        )) ?? children}
      </div>
    </RadioGroupContext.Provider>
  );
};
