import { useState } from "react";
import styles from "./Tabs.module.scss";

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultActiveId?: string;
  variant?: "default" | "underline" | "pill";
  fullWidth?: boolean;
  onChange?: (activeId: string) => void;
}

export const Tabs = ({
  items,
  defaultActiveId,
  variant = "default",
  fullWidth = false,
  onChange,
}: TabsProps) => {
  const [activeId, setActiveId] = useState<string>(
    defaultActiveId || items[0]?.id || ""
  );

  const handleTabClick = (id: string) => {
    setActiveId(id);
    onChange?.(id);
  };

  return (
    <div className={styles.tabsContainer}>
      <div
        className={`${styles.tabs} ${styles[variant]} ${
          fullWidth ? styles.fullWidth : ""
        }`}
      >
        {items.map((item) => (
          <button
            key={item.id}
            className={`${styles.tab} ${
              activeId === item.id ? styles.active : ""
            }`}
            onClick={() => handleTabClick(item.id)}
            role="tab"
            aria-selected={activeId === item.id}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className={styles.content}>
        {items.find((item) => item.id === activeId)?.content}
      </div>
    </div>
  );
};
