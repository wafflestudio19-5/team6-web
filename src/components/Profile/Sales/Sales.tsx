import styles from "./Sales.module.scss";
import { Link } from "react-router-dom";
import BackArrowIcon from "../../../icons/leftArrow.png";
import Button from "@mui/material/Button";
import { useState } from "react";

const Sales = () => {
  const [mode, setMode] = useState<string>("one");

  return (
    <div className={styles.wrapper}>
      <header>
        <Link to="/main" state={{ page: "user" }} className={styles.back}>
          <img src={BackArrowIcon} alt="뒤로" />
        </Link>
        <p>판매 상품 보기</p>
      </header>
      <div className={styles["upper-tabs"]}>
        <Button
          className={
            mode === "one"
              ? `${styles.entire} ${styles.selected} ${styles.tab}`
              : `${styles.entire} ${styles.tab}`
          }
          onClick={() => {
            setMode("one");
          }}
        >
          전체
        </Button>
        <Button
          className={
            mode === "two"
              ? `${styles["on-sale"]} ${styles.selected} ${styles.tab}`
              : `${styles["on-sale"]} ${styles.tab}`
          }
          onClick={() => {
            setMode("two");
          }}
        >
          판매중
        </Button>
        <Button
          className={
            mode === "three"
              ? `${styles.sold} ${styles.selected} ${styles.tab}`
              : `${styles.sold} ${styles.tab}`
          }
          onClick={() => {
            setMode("three");
          }}
        >
          판매완료
        </Button>
        <div className={`${styles.underline} ${styles[mode]}`} />
      </div>
      <div className={styles["body-wrapper"]} />
    </div>
  );
};

export default Sales;
