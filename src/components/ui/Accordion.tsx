import { useState } from "react";
import styles from "./Accordion.module.scss";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
}

export const Accordion = ({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
}: AccordionProps) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpenIds);

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => {
      if (allowMultiple) {
        return prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId];
      } else {
        return prev.includes(itemId) ? [] : [itemId];
      }
    });
  };

  return (
    <div className={styles.accordion}>
      {items.map((item) => (
        <div key={item.id} className={styles.item}>
          <button
            className={`${styles.header} ${
              openItems.includes(item.id) ? styles.active : ""
            }`}
            onClick={() => toggleItem(item.id)}
            aria-expanded={openItems.includes(item.id)}
          >
            <span className={styles.title}>{item.title}</span>
            <span className={styles.icon}>
              {openItems.includes(item.id) ? "−" : "+"}
            </span>
          </button>
          <div
            className={`${styles.content} ${
              openItems.includes(item.id) ? styles.open : ""
            }`}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};
