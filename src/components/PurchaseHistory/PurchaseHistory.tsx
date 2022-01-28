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
import { UserDto } from "../../type/dto/user.dto";

export type srcPair = {
  id: number;
  src: string;
};

const PurchaseHistory = () => {
  const [mode, setMode] = useState(1);
  const [requestUser, setRequestUser] = useState<UserDto | null>(null);
  const [shadow, setShadow] = useState(false);

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
        {mode === 1 && <Requests shadow={shadow} setShadow={setShadow} />}
        {mode === 2 && <Purchased />}
        {mode === 3 && <Refused />}
      </section>
      <div
        className={`${styles.backShadow} ${shadow ? styles.show : ""}`}
        onClick={() => {
          setShadow(false);
        }}
      />
    </div>
  );
};

export default PurchaseHistory;
