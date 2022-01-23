import styles from "./RequestPage.module.scss";
import styles2 from "../Utilities/confirm.module.scss";
import { useEffect, useState } from "react";
import { otherRequestType } from "../../type/types";
import { Link, useNavigate, useParams } from "react-router-dom";
import requester from "../../apis/requester";
import BackArrow from "../../icons/leftArrow.png";
import FixedPrice from "./FixedPrice/FixedPrice";
import Suggestion from "./Suggestion/Suggestion";
import { TUserInfo } from "../../type/user";

const RequestPage = () => {
  const { id } = useParams() as { id: string };
  const [mode, setMode] = useState(1);
  const [fixedList, setFixedList] = useState<otherRequestType[]>([]);
  const [suggestedList, setSuggestedList] = useState<otherRequestType[]>([]);
  const [contactUser, setContactUser] = useState<TUserInfo | null>(null);
  const [messageInfo, setMessageInfo] = useState<{
    user: TUserInfo;
    message: string;
  } | null>(null);
  const [update, setUpdate] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    requester
      .get(`/products/${id}/purchases/?pageNumber=0&pageSize=10`)
      .then((res) => {
        console.log(res.data.content);
        setFixedList(
          res.data.content.filter(
            (data: otherRequestType) =>
              data.suggested_price === data.product.price
          )
        );
        setSuggestedList(
          res.data.content.filter(
            (data: otherRequestType) =>
              data.suggested_price !== data.product.price
          )
        );
      })
      .catch((e) => {
        navigate("/main");
        console.log(e.response);
      });
  }, [update]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles["request-wrapper"]}>
      <div
        className={`${styles.backShadow} ${
          contactUser || messageInfo ? styles.show : ""
        }`}
        onClick={() => {
          setMessageInfo(null);
          setContactUser(null);
        }}
      />
      {contactUser ? (
        <div className={styles2.box}>
          <p className={styles2.title}>연락을 주고 받아 보세요.</p>
          <p className={styles2.contents}>
            연락을 처음 할 때에는 본인의 신원을 먼저 밝혀주세요.
          </p>
          <p className={styles2.subTitle}>이메일</p>
          <div className={styles2.textBox}>{contactUser.email}</div>
        </div>
      ) : messageInfo && messageInfo.message ? (
        <div className={styles2.box}>
          <p className={styles2.title}>
            {messageInfo.user.nickname} 님께서 메시지를 보내셨어요
          </p>
          <p className={styles2.textBox}>{messageInfo.message}</p>
        </div>
      ) : (
        <></>
      )}
      <header>
        <div className={styles.back}>
          <img src={BackArrow} alt="뒤로" onClick={goBack} />
        </div>
        <p>구매 요청 목록</p>
      </header>
      <button
        className={
          mode === 1 ? `${styles.fixed} ${styles.selected}` : styles.fixed
        }
        onClick={() => {
          setMode(1);
        }}
      >
        정가 구매 요청
      </button>
      <button
        className={
          mode === 2
            ? `${styles.suggested} ${styles.selected}`
            : styles.suggested
        }
        onClick={() => {
          setMode(2);
        }}
      >
        가격 제안
      </button>
      <section className={styles["body-wrapper"]}>
        {mode === 1 && (
          <FixedPrice
            fixedList={fixedList}
            setContactUser={setContactUser}
            setMessageInfo={setMessageInfo}
            setUpdate={setUpdate}
          />
        )}
        {mode === 2 && (
          <Suggestion
            suggestedList={suggestedList}
            setContactUser={setContactUser}
            setMessageInfo={setMessageInfo}
            setUpdate={setUpdate}
          />
        )}
      </section>
    </div>
  );
};

export default RequestPage;
