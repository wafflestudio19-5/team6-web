import { Dispatch, SetStateAction, useState } from "react";
import { otherRequestType, userType } from "../../../type/types";
import { srcPair } from "../../SalesHistory/SalesHistory";
import { requester } from "../../../apis/requester";
import styles from "../Suggestion/Suggestion.module.scss";
import profile from "../../../icons/MyCarrot/test-profile.png";
import { calculateTimeDifference } from "../../Utilities/functions";

type Props = {
  suggestedList: otherRequestType[];
  setContactUser: Dispatch<SetStateAction<userType | null>>;
  setMessageInfo: Dispatch<
    SetStateAction<{ user: userType; message: string } | null>
  >;
  setUpdate: Dispatch<SetStateAction<boolean>>;
};

const Suggestion = ({
  suggestedList,
  setContactUser,
  setMessageInfo,
  setUpdate,
}: Props) => {
  const [srcList, setSrcList] = useState<srcPair[]>([]);

  /* (next) 유저 프로필 이미지 안받아옴
  useEffect(() => {
    suggestedList.forEach((request) =>
      requester
        .get(`/images/${request.user.image}/`)
        .then((res) => {
          setSrcList((srcList) => [
            ...srcList,
            {
              id: article.id,
              src: res.data.url,
            },
          ]);
        })
        .catch((e) => console.log(e))
    );
  });*/

  const handleAccept = (request: otherRequestType) => {
    requester
      .put(
        `/products/${request.product.id}/purchases/${request.id}/approval/`,
        {
          accepted: true,
        }
      )
      .then((res) => {
        setUpdate((update) => !update);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  const handleRefuse = (request: otherRequestType) => {
    requester
      .put(
        `/products/${request.product.id}/purchases/${request.id}/approval/`,
        {
          accepted: false,
        }
      )
      .then((res) => {
        setUpdate((update) => !update);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  const handleSoldout = (request: otherRequestType) => {
    requester
      .put(`/products/${request.product.id}/status/`, { action: "sold out" })
      .then((res) => {
        setUpdate((update) => !update);
      })
      .catch((e) => console.log(e));
  };

  //(next) profile image
  const requestComponents = suggestedList.map((request) => {
    console.log(request.product);
    return (
      <div className={styles.requestWrapper}>
        <div
          className={styles.clickArea}
          onClick={() => {
            setMessageInfo({ user: request.user, message: request.message });
          }}
        />
        <div className={styles.upper}>
          <img className={styles.thumbnail} src={profile} alt="프로필 이미지" />
          <div className={styles.dataContainer}>
            <div className={styles.firstLine}>
              <p className={styles.title}>{request.user.name}</p>
            </div>
            <div className={styles.secondLine}>
              <p className={styles.region}>{request.user.location}</p>
              <p className={styles.time}>
                {calculateTimeDifference(request.updated_at)}
              </p>
            </div>
            <div className={styles.thirdLine}>
              <p className={styles.price}>
                {request.suggested_price.toLocaleString("ko-KR")}원
              </p>
            </div>
          </div>
        </div>
        <div className={styles.lower}>
          <div className={styles.line}>
            <div className={styles.buttons}>
              {request.accepted ? (
                <>
                  <div
                    className={styles.orangeButton}
                    onClick={() => {
                      setContactUser(request.user);
                    }}
                  >
                    연락처 확인하기
                  </div>
                  {request.product.status === "SOLD_OUT" ? (
                    <div className={`${styles.button} ${styles.unable}`}>
                      거래 완료
                    </div>
                  ) : (
                    <div
                      className={styles.button}
                      onClick={() => handleSoldout(request)}
                    >
                      거래 완료로 변경
                    </div>
                  )}
                </>
              ) : request.product.status === "SOLD_OUT" ? (
                <div
                  className={`${styles.button} ${styles.unable} ${styles.long}`}
                >
                  다른 유저에게 거래 완료되었습니다.
                </div>
              ) : (
                <>
                  <div
                    className={styles.button}
                    onClick={() => handleAccept(request)}
                  >
                    거래 수락
                  </div>
                  <div className={styles.verticalLine} />
                  <div
                    className={styles.button}
                    onClick={() => {
                      handleRefuse(request);
                    }}
                  >
                    거래 거절
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className={styles.wrapper}>
      {suggestedList.length ? (
        <>{requestComponents}</>
      ) : (
        <p>정가 구매 요청이 없어요.</p>
      )}
    </div>
  );
};

export default Suggestion;
