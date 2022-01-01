import styles from "./SalesHistory.module.scss";
import { Link } from "react-router-dom";
import BackArrow from "../../icons/leftArrow.png";
import { useEffect, useState } from "react";
import Onsale from "./Onsale/Onsale";
import CompletedSales from "./ClosedSales/ClosedSales";
import HiddenSales from "./HiddenSales/HiddenSales";
import { requester } from "../../apis/requester";
import dummyData, { userData } from "../Article/DummyData";
import ClosedSales from "./ClosedSales/ClosedSales";

const SalesHistory = () => {
  const [mode, setMode] = useState(1);
  const [onsaleList, setOnsaleList] = useState<userData[]>([]);
  const [closedList, setClosedList] = useState<userData[]>([]);
  const [hiddenList, setHiddenList] = useState<userData[]>([]);
  const [onsaleActions, setOnsaleActions] = useState(false);
  const [closedActions, setClosedActions] = useState(false);
  const [hiddenActions, setHiddenActions] = useState(false);

  useEffect(() => {
    setOnsaleList(
      dummyData.filter(
        (article) =>
          article.sale_state === "판매중" || article.sale_state === "예약중"
      )
    );
    setClosedList(
      dummyData.filter((article) => article.sale_state === "거래완료")
    );
    setHiddenList(dummyData.filter((article) => article.hidden));
  }, []);

  /*
  useEffect(() => {
    requester.get(`/users/me/products`).then((res) => {
      setOnsaleList(
        res.data.filter((data: userData) => data.sale_state === "판매중" || data.sale_state === "예약중")
      );
      setCompletedList(
        res.data.filter((data: userData) => data.sale_state === "거래완료")
      );
      setHiddenList(
        res.data.filter((data: userData) => data.sale_state === "숨김")
      );
    });
  });
  */

  return (
    <div className={styles["sales-history-wrapper"]}>
      {onsaleActions && (
        <>
          <div className={styles.background} />
          <div className={styles.onsaleBox}>
            <div className={styles.upperBox}>
              <div className={styles.blueText}>게시글 수정</div>
              <div className={styles.line} />
              <div className={styles.blueText}>끌어올리기</div>
              <div className={styles.line} />
              <div className={styles.blueText}>숨기기</div>
              <div className={styles.line} />
              <div className={styles.redText}>삭제</div>
            </div>
            <div
              className={styles.lowerBox}
              onClick={() => setOnsaleActions(false)}
            >
              닫기
            </div>
          </div>
        </>
      )}
      {closedActions && <div></div>}
      {hiddenActions && <div></div>}
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
        {mode === 1 && (
          <Onsale onsaleList={onsaleList} setOnsaleActions={setOnsaleActions} />
        )}
        {mode === 2 && <ClosedSales closedList={closedList} />}
        {mode === 3 && <HiddenSales hiddenList={hiddenList} />}
      </section>
    </div>
  );
};

export default SalesHistory;
