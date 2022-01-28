import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { otherRequestType } from "../../../type/types";
import requester from "../../../apis/requester";
import styles from "../Suggestion/Suggestion.module.scss";
import profile from "../../../icons/MyCarrot/test-profile.png";
import { calculateTimeDifference } from "../../Utilities/functions";
import { UserDto } from "../../../type/dto/user.dto";
import { PurchaseOrderDto } from "../../../type/dto/purchase-order.dto";
import { GetPurchaseOrdersDto } from "../../../type/dto/for-api/get-purchase-orders.dto";
import { RequestStatus } from "../../../type/enum/request-status";

type Props = {
  id: string;
  setContactUser: Dispatch<SetStateAction<UserDto | null>>;
  setMessageInfo: Dispatch<
    SetStateAction<{ user: UserDto; message: string } | null>
  >;
};

const Suggestion = ({ id, setContactUser, setMessageInfo }: Props) => {
  const [requests, setRequests] = useState<PurchaseOrderDto[]>([]);

  useEffect(() => {
    requester
      .get<GetPurchaseOrdersDto>(
        `/purchase-orders/?productId=${id}&pageNumber=0&pageSize=15&withPriceSuggestion=true`
      )
      .then((res) => {
        setRequests(res.data.content);
      });
  }, []);

  const handleAccept = (request: PurchaseOrderDto) => {
    requester
      .put(
        `/products/${request.product.id}/purchases/${request.id}/approval/`,
        {
          accepted: true,
        }
      )
      .then((res) => {})
      .catch((e) => {
        console.log(e.response);
      });
  };

  const handleRefuse = (request: PurchaseOrderDto) => {
    requester
      .put(
        `/products/${request.product.id}/purchases/${request.id}/approval/`,
        {
          accepted: false,
        }
      )
      .then((res) => {})
      .catch((e) => {
        console.log(e.response);
      });
  };

  const handleSoldout = (request: PurchaseOrderDto) => {
    requester
      .put(`/products/${request.product.id}/status/`, { action: "sold out" })
      .then((res) => {})
      .catch((e) => console.log(e));
  };

  //(next) profile image
  const requestComponents = requests.map((request) => {
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
              <p className={styles.region}>{request.user.first_location}</p>
              <p className={styles.time}>
                {calculateTimeDifference(
                  request.updated_at,
                  request.created_at
                )}
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
              {request.status === RequestStatus.ACCEPTED ? (
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
      {requests.length ? (
        <>{requestComponents}</>
      ) : (
        <p>정가 구매 요청이 없어요.</p>
      )}
    </div>
  );
};

export default Suggestion;
