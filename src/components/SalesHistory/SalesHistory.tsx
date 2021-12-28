import styles from "./SalesHistory.module.scss";
import { Link } from "react-router-dom";
import BackArrow from "../../icons/leftArrow.png";
import { useState } from "react";
import Onsale from "./Onsale/Onsale";
import CompletedSales from "./CompletedSales/CompletedSales";
import HiddenSales from "./HiddenSales/HiddenSales";

const SalesHistory = () => {
  const [mode, setMode] = useState(1);

  return (
    <div className={styles["sales-history-wrapper"]}>
      <header>
        <Link to="/main" className={styles.back}>
          <img src={BackArrow} alt="뒤로" />
        </Link>
        <p>판매내역</p>
      </header>
      <button
        className={
          mode === 1 ? `${styles.onsale} ${styles.selected}` : styles.onsale
        }
        onClick={() => {
          setMode(1);
        }}
      >
        판매중
      </button>
      <button
        className={
          mode === 2
            ? `${styles.completed} ${styles.selected}`
            : styles.completed
        }
        onClick={() => {
          setMode(2);
        }}
      >
        거래완료
      </button>
      <button
        className={
          mode === 3 ? `${styles.hidden} ${styles.selected}` : styles.hidden
        }
        onClick={() => {
          setMode(3);
        }}
      >
        숨김
      </button>
      <section className={styles["body-wrapper"]}>
        {mode === 1 && <Onsale />}
        {mode === 2 && <CompletedSales />}
        {mode === 3 && <HiddenSales />}
      </section>
    </div>
  );
};

export default SalesHistory;
