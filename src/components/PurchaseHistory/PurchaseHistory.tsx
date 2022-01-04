import styles from "./PurchaseHistory.module.scss";
import styles2 from "../Utilities/confirm.module.scss";
import { Link } from "react-router-dom";
import BackArrow from "../../icons/leftArrow.png";
import { useEffect, useState } from "react";
import Requests from "./Requests/Requests";
import Refused from "./Refused/Refused";
import Purchased from "./Purchased/Purchased";
import { requester } from "../../apis/requester";
import { myRequestData } from "../../type/product";

export type srcPair = {
  id: number;
  src: string;
};

const PurchaseHistory = () => {
  const [mode, setMode] = useState(1);
  const [requestList, setRequestList] = useState<myRequestData[]>([]);
  const [purchasedList, setPurchasedList] = useState<myRequestData[]>([]);
  const [refusedList, setRefusedList] = useState<myRequestData[]>([]);
  const [requestActions, setRequestActions] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    requester
      .get(`/users/me/purchase-requests/`)
      .then((res) => {
        setRequestList(
          res.data.filter(
            //api 수정 이후 변경
            (data: myRequestData) =>
              data.accepted === null && data.product.status !== "SOLD_OUT"
          )
        );
        setPurchasedList(
          res.data.filter(
            //api 수정 이후 변경
            (data: myRequestData) =>
              data.accepted && data.product.status === "SOLD_OUT"
          )
        );
        setRefusedList(
          res.data.filter(
            //api 수정 이후 변경
            (data: myRequestData) =>
              data.accepted === false ||
              (data.accepted === null && data.product.status === "SOLD_OUT")
          )
        );
      })
      .catch((e) => console.log(e.response));
  }, [update]);

  return (
    <div className={styles["sales-history-wrapper"]}>
      {mode === 1 && requestActions && (
        <>
          <div
            className={styles.background}
            onClick={() => setRequestActions(false)}
          />
        </>
      )}
      <header>
        <Link to="/main" state={{ page: "user" }} className={styles.back}>
          <img src={BackArrow} alt="뒤로" />
        </Link>
        <p>구매내역</p>
      </header>
      <button
        className={
          mode === 1 ? `${styles.onsale} ${styles.selected}` : styles.onsale
        }
        onClick={() => {
          setMode(1);
        }}
      >
        요청중
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
        거래반려
      </button>
      <section className={styles["body-wrapper"]}>
        {mode === 1 && (
          <Requests
            requestList={requestList}
            setRequestActions={setRequestActions}
          />
        )}
        {mode === 2 && <Purchased purchasedList={purchasedList} />}
        {mode === 3 && <Refused refusedList={refusedList} />}
      </section>
    </div>
  );
};

export default PurchaseHistory;
