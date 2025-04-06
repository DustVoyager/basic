import React from "react";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>홈페이지</h1>
      <p className={styles.description}>
        로그인이 완료되었습니다. 이제 메인 컨텐츠를 볼 수 있습니다.
      </p>
    </div>
  );
}
