import styles from "./PurchaseHistory.module.scss";
import { Link } from "react-router-dom";
import BackArrow from "../../icons/leftArrow.png";
import { useEffect, useState } from "react";
import Requests from "./Requests/Requests";
import Refused from "./Refused/Refused";
import Purchased from "./Purchased/Purchased";
import requester from "../../apis/requester";
import { myRequestData } from "../../type/types";
import { TUserInfo } from "../../type/user";
import styles2 from "../Utilities/confirm.module.scss";

export type srcPair = {
  id: number;
  src: string;
};

const PurchaseHistory = () => {
  const [mode, setMode] = useState(1);
  const [requestList, setRequestList] = useState<myRequestData[]>([]);
  const [purchasedList, setPurchasedList] = useState<myRequestData[]>([]);
  const [refusedList, setRefusedList] = useState<myRequestData[]>([]);
  const [requestUser, setRequestUser] = useState<TUserInfo | null>(null);
  const [update, setUpdate] = useState(false);
  const [srcList, setSrcList] = useState<srcPair[]>([]);
  useEffect(() => {
    requester
      .get(`/users/me/purchase-requests/`)
      .then((res) => {
        console.log(res.data);
        setRequestList(
          res.data.filter(
            (data: myRequestData) =>
              data.accepted !== false && data.product.status !== "SOLD_OUT"
          )
        );
        setPurchasedList(
          res.data.filter(
            (data: myRequestData) =>
              data.accepted && data.product.status === "SOLD_OUT"
          )
        );
        setRefusedList(
          res.data.filter(
            (data: myRequestData) =>
              data.accepted === false ||
              (data.accepted === null && data.product.status === "SOLD_OUT")
          )
        );
        res.data.forEach((article: myRequestData) =>
          requester
            .get(`/images/${article.product.image_url}/`)
            .then((res) => {
              setSrcList((srcList) => [
                ...srcList,
                {
                  id: article.product.id,
                  src: res.data.url,
                },
              ]);
            })
            .catch((e) => console.log(e))
        );
      })
      .catch((e) => console.log(e.response));
  }, [update]);

  return (
    <div className={styles["sales-history-wrapper"]}>
      {mode === 1 && (
        <>
          <div
            className={`${styles["back-shadow"]} ${
              requestUser ? styles.show : ""
            }`}
            onClick={() => setRequestUser(null)}
          />
          {requestUser && (
            <div className={styles2.box}>
              <p className={styles2.title}>상대방이 요청을 수락했어요.</p>
              <p className={styles2.contents}>
                연락을 처음 할 때에는 본인의 신원을 먼저 밝혀주세요.
              </p>
              <p className={styles2.subTitle}>이메일</p>
              <div className={styles2.textBox}>{requestUser.email}</div>
            </div>
          )}
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
            setRequestUser={setRequestUser}
            srcList={srcList}
          />
        )}
        {mode === 2 && (
          <Purchased purchasedList={purchasedList} srcList={srcList} />
        )}
        {mode === 3 && <Refused refusedList={refusedList} srcList={srcList} />}
      </section>
    </div>
  );
};

export default PurchaseHistory;
