import styles from "./SalesHistory.module.scss";
import { Link } from "react-router-dom";
import BackArrow from "../../icons/leftArrow.png";
import { useEffect, useState } from "react";
import Onsales from "./Onsales/Onsales";
import Hiddens from "./Hiddens/Hiddens";
import Soldouts from "./Soldouts/Soldouts";
import requester from "../../apis/requester";
import { myProductsData } from "../../type/product";
import { toast } from "react-hot-toast";

export type srcPair = {
  id: number;
  src: string;
};

const SalesHistory = () => {
  const [mode, setMode] = useState(1);
  const [onsaleList, setOnsaleList] = useState<myProductsData[]>([]);
  const [soldoutList, setSoldoutList] = useState<myProductsData[]>([]);
  const [hiddenList, setHiddenList] = useState<myProductsData[]>([]);
  const [onsaleActions, setOnsaleActions] = useState(false);
  const [soldoutActions, setSoldoutActions] = useState(false);
  const [hiddenActions, setHiddenActions] = useState(false);
  const [update, setUpdate] = useState(false);
  const [actionTarget, setActionTarget] = useState(0);

  useEffect(() => {
    requester
      .get(`/users/me/products/?pageNumber=0&pageSize=30`)
      .then((res) => {
        setOnsaleList(
          res.data.content.filter(
            (data: myProductsData) =>
              data.status === "FOR_SALE" || data.status === "RESERVED"
          )
        );
        setSoldoutList(
          res.data.content.filter(
            (data: myProductsData) => data.status === "SOLD_OUT"
          )
        );
        setHiddenList(
          res.data.content.filter(
            (data: myProductsData) => data.status === "HIDDEN"
          )
        );
      })
      .catch((e) => console.log(e.response));
  }, [update]);

  const changeToModification = () => {};

  const handleHiding = () => {
    requester
      .put(`/products/${actionTarget}/status/`, { action: "hide" })
      .then((res) => {
        setUpdate((update) => !update);
      })
      .catch((e) => console.log(e));
    setOnsaleActions(false);
    setSoldoutActions(false);
    setHiddenActions(false);
  };

  const handleDeletion = () => {
    requester
      .delete(`/products/${actionTarget}/`)
      .then((res) => {
        setUpdate((update) => !update);
      })
      .catch((e) => console.log(e));
    setOnsaleActions(false);
    setSoldoutActions(false);
    setHiddenActions(false);
  };

  const handleBump = () => {
    requester
      .put(`/products/${actionTarget}/status/`, { action: "bump" })
      .then((res) => {
        setUpdate((update) => !update);
        setOnsaleActions(false);
        setSoldoutActions(false);
        setHiddenActions(false);
      })
      .catch((e) => {
        if (e.response.data.error_code === 203) {
          toast.error("너무 자주 끌어올릴 수 없습니다.");
        } else if (e.response.data.error_code === 201) {
          toast.error("판매 완료된 게시글입니다.");
        }
      });
  };
  const changeToOnsale = () => {
    //api 없음
    /*
    requester
      .put(`/products/${actionTarget}/status/`, { action: "hide" })
      .then((res) => {
        setUpdate((update) => !update);
      })
      .catch((e) => console.log(e));
    setOnsaleActions(false);
    setSoldoutActions(false);
    setHiddenActions(false);
    */
  };

  return (
    <div className={styles["sales-history-wrapper"]}>
      {mode === 1 && (
        <>
          <div
            className={`${styles["back-shadow"]} ${
              onsaleActions ? styles.show : ""
            }`}
            onClick={() => setOnsaleActions(false)}
          />
          <div
            className={`${styles["fourBox"]} ${
              onsaleActions ? styles.show : ""
            }`}
          >
            <div className={styles.upperBox}>
              <div className={styles.blueText} onClick={changeToModification}>
                게시글 수정
              </div>
              <div className={styles.line} />
              <div className={styles.blueText} onClick={handleBump}>
                끌어올리기
              </div>
              <div className={styles.line} />
              <div className={styles.blueText} onClick={handleHiding}>
                숨기기
              </div>
              <div className={styles.line} />
              <div className={styles.redText} onClick={handleDeletion}>
                삭제
              </div>
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
      {mode === 2 && (
        <>
          <div
            className={`${styles["back-shadow"]} ${
              soldoutActions ? styles.show : ""
            }`}
            onClick={() => setSoldoutActions(false)}
          />
          <div
            className={`${styles["fourBox"]} ${
              soldoutActions ? styles.show : ""
            }`}
          >
            <div className={styles.upperBox}>
              <div className={styles.blueText} onClick={changeToOnsale}>
                판매중으로 변경
              </div>
              <div className={styles.line} />
              <div className={styles.blueText}>게시글 수정</div>
              <div className={styles.line} />
              <div className={styles.blueText} onClick={handleHiding}>
                숨기기
              </div>
              <div className={styles.line} />
              <div className={styles.redText} onClick={handleDeletion}>
                삭제
              </div>
            </div>
            <div
              className={styles.lowerBox}
              onClick={() => setSoldoutActions(false)}
            >
              닫기
            </div>
          </div>
        </>
      )}
      {mode === 3 && (
        <>
          <div
            className={`${styles["back-shadow"]} ${
              hiddenActions ? styles.show : ""
            }`}
            onClick={() => setHiddenActions(false)}
          />
          <div
            className={`${styles["twoBox"]} ${
              hiddenActions ? styles.show : ""
            }`}
          >
            <div className={styles.upperBox}>
              <div className={styles.blueText}>게시글 수정</div>
              <div className={styles.line} />
              <div className={styles.redText} onClick={handleDeletion}>
                삭제
              </div>
            </div>
            <div
              className={styles.lowerBox}
              onClick={() => setHiddenActions(false)}
            >
              닫기
            </div>
          </div>
        </>
      )}
      <header>
        <Link to="/main" state={{ page: "user" }} className={styles.back}>
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
          <Onsales
            onsaleList={onsaleList}
            setUpdate={setUpdate}
            setOnsaleActions={setOnsaleActions}
            setActionTarget={setActionTarget}
          />
        )}
        {mode === 2 && (
          <Soldouts
            soldoutList={soldoutList}
            setSoldoutActions={setSoldoutActions}
            setActionTarget={setActionTarget}
          />
        )}
        {mode === 3 && (
          <Hiddens
            hiddenList={hiddenList}
            setUpdate={setUpdate}
            setHiddenActions={setHiddenActions}
            setActionTarget={setActionTarget}
          />
        )}
      </section>
    </div>
  );
};

export default SalesHistory;
