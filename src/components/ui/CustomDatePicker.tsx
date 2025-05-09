import DatePicker from "react-datepicker";
import clsx from "clsx";
import { FaRegCalendarAlt } from "react-icons/fa";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./CustomDatePicker.module.scss";

interface CustomDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  minDate?: Date;
}

export default function CustomDatePicker({
  selected,
  onChange,
  placeholder = "날짜를 선택하세요.",
  disabled = false,
  className = "",
  minDate = undefined,
}: CustomDatePickerProps) {
  return (
    <div className={styles.datePickerContainer}>
      <div className={styles.inputWrapper}>
        <DatePicker
          selected={selected ?? undefined}
          onChange={onChange}
          placeholderText={placeholder}
          disabled={disabled}
          className={clsx(styles.dateInput, className, {
            [styles.disabled]: disabled,
          })}
          calendarClassName={styles.calendar}
          dayClassName={() => styles.day}
          dateFormat="yyyy-MM-dd"
          locale={ko}
          minDate={minDate ?? undefined}
        />
        <FaRegCalendarAlt className={styles.calendarIcon} />
      </div>
    </div>
  );
}
