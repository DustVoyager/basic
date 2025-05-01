import { createContext, useContext } from "react";

export type RadioGroupContextType<T extends string | number> = {
  name: string;
  selectedValue: T;
  onChange: (value: T) => void;
};

export const RadioGroupContext = createContext<unknown>(null);

export const useRadioGroup = <T extends string | number>() => {
  const context = useContext(RadioGroupContext);
  if (!context) throw new Error("Radio must be used within a RadioGroup");
  return context as RadioGroupContextType<T>;
};
