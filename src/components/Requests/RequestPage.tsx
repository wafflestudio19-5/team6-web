import styles from "./RequestPage.module.scss";
import styles2 from "../Utilities/confirm.module.scss";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackArrow from "../../icons/leftArrow.png";
import FixedPrice from "./FixedPrice/FixedPrice";
import Suggestion from "./Suggestion/Suggestion";
import { UserDto } from "../../type/dto/user.dto";
import profile from "../../icons/MyCarrot/test-profile.png";
import { calculateTimeDifference } from "../Utilities/functions";
import { PurchaseOrderDto } from "../../type/dto/purchase-order.dto";
import { RequestStatus } from "../../type/enum/request-status";

const RequestPage = () => {
  const { id } = useParams() as { id: string };
  const [mode, setMode] = useState(1);
  const [request, setRequest] = useState<PurchaseOrderDto | null>(null);
  const [messageInfo, setMessageInfo] = useState<{
    user: UserDto;
    message: string;
  } | null>(null);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goToUserProfile = () => {
    navigate(`/profile/${messageInfo?.user.name}`);
  };

  return (
    <div className={styles["request-wrapper"]}>
      <div
        className={`${styles.backShadow} ${
          request || messageInfo ? styles.show : ""
        }`}
        onClick={() => {
          setMessageInfo(null);
          setRequest(null);
        }}
      />
      {request ? (
        request.status === RequestStatus.ACCEPTED ? (
          <div className={styles2.box}>
            <p className={styles2.title}>연락을 주고 받아 보세요.</p>
            <p className={styles2.contents}>
              연락을 처음 할 때에는 본인의 신원을 먼저 밝혀주세요.
            </p>
            <p className={styles2.subTitle}>이메일</p>
            <div className={styles2.textBox}>{request.user.email}</div>
            <p className={styles2.subTitle}>전화번호</p>
            <div className={styles2.textBox}>{request.user.phone}</div>
          </div>
        ) : (
          <div className={styles2.box}>
            <p className={styles2.title}>거래가 완료되었습니다.</p>
            <p className={styles2.contents}>
              구매자 {request?.user.nickname}님과 거래한 상품에 대해 추가적으로
              할 이야기가 있다면 아래 연락처로 연락하세요.
            </p>
            <p className={styles2.subTitle}>이메일</p>
            <div className={styles2.textBox}>{request.user.email}</div>
            <p className={styles2.subTitle}>전화번호</p>
            <div className={styles2.textBox}>{request.user.phone}</div>
          </div>
        )
      ) : (
        messageInfo && (
          <div className={styles2.box}>
            <div className={styles2.profileContainer} onClick={goToUserProfile}>
              <img
                className={styles2.thumbnail}
                src={profile}
                alt="프로필 이미지"
              />
              <div className={styles2.dataContainer}>
                <div className={styles2.firstLine}>
                  <p className={styles2.title}>{messageInfo.user.nickname}</p>
                </div>
                <div className={styles2.secondLine}>
                  <p className={styles2.region}>
                    {messageInfo.user.first_location}
                  </p>
                </div>
              </div>
            </div>
            {messageInfo.message && (
              <>
                <p className={styles2.title}>
                  {messageInfo.user.nickname} 님께서 메시지를 보내셨어요
                </p>
                <p className={styles2.textBox}>{messageInfo.message}</p>
              </>
            )}
          </div>
        )
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
            id={id}
            setRequest={setRequest}
            setMessageInfo={setMessageInfo}
          />
        )}
        {mode === 2 && (
          <Suggestion
            id={id}
            setRequest={setRequest}
            setMessageInfo={setMessageInfo}
          />
        )}
      </section>
    </div>
  );
};

export default RequestPage;
