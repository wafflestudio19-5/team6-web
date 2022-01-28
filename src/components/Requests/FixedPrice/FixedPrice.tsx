import { Dispatch, SetStateAction, useEffect, useState } from "react";
import requester from "../../../apis/requester";
import styles from "./FixedPrice.module.scss";
import profile from "../../../icons/MyCarrot/test-profile.png";
import { calculateTimeDifference } from "../../Utilities/functions";
import { UserDto } from "../../../type/dto/user.dto";
import { PurchaseOrderDto } from "../../../type/dto/purchase-order.dto";
import { GetPurchaseOrdersDto } from "../../../type/dto/for-api/get-purchase-orders.dto";
import { RequestStatus } from "../../../type/enum/request-status";
import { SalesStatus } from "../../../type/enum/sales-status";

type Props = {
  id: string;
  setRequest: Dispatch<SetStateAction<PurchaseOrderDto | null>>;
  setMessageInfo: Dispatch<
    SetStateAction<{ user: UserDto; message: string } | null>
  >;
};

const FixedPrice = ({ id, setRequest, setMessageInfo }: Props) => {
  const [requests, setRequests] = useState<PurchaseOrderDto[]>([]);

  useEffect(() => {
    requester
      .get<GetPurchaseOrdersDto>(
        `/purchase-orders/?productId=${id}&pageNumber=0&pageSize=15&withPriceSuggestion=false`
      )
      .then((res) => {
        setRequests(
          res.data.content.filter((request) => !request.suggested_price)
        );
      });
  }, []);

  const handleAccept = (targetRequest: PurchaseOrderDto) => {
    requester
      .put(`/purchase-orders/${targetRequest.id}/status/`, {
        action: "accept",
      })
      .then((res) => {
        setRequests(
          requests.map((request) => {
            if (request.id !== targetRequest.id) {
              return request;
            } else {
              return { ...request, status: RequestStatus.ACCEPTED };
            }
          })
        );
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  const handleRefuse = (targetRequest: PurchaseOrderDto) => {
    requester
      .put(`/purchase-orders/${targetRequest.id}/status/`, {
        action: "reject",
      })
      .then((res) => {
        setRequests(
          requests.map((request) => {
            if (request.id !== targetRequest.id) {
              return request;
            } else {
              return { ...request, status: RequestStatus.REJECTED };
            }
          })
        );
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  const handleSoldout = (targetRequest: PurchaseOrderDto) => {
    requester
      .put(`/purchase-orders/${targetRequest.id}/status/`, {
        action: "confirm",
      })
      .then((res) => {
        setRequests(
          requests.map((request) => {
            if (request.id !== targetRequest.id) {
              return request;
            } else {
              return {
                ...request,
                status: RequestStatus.CONFIRMED,
                product: { ...request.product, status: SalesStatus.SOLD_OUT },
              };
            }
          })
        );
      })
      .catch((e) => console.log(e.response));
  };

  const requestComponents = requests.map((request) => {
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
              <p className={styles.title}>{request.user.nickname}</p>
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
                      setRequest(request);
                    }}
                  >
                    연락처 확인하기
                  </div>
                  <div
                    className={styles.button}
                    onClick={() => handleSoldout(request)}
                  >
                    거래 완료하기
                  </div>
                </>
              ) : request.status === RequestStatus.REJECTED ? (
                request.product.status === SalesStatus.SOLD_OUT ? (
                  <div
                    className={`${styles.button} ${styles.unable} ${styles.long}`}
                  >
                    다른 유저에게 거래 완료되었습니다.
                  </div>
                ) : (
                  <div
                    className={`${styles.button} ${styles.unable} ${styles.long}`}
                  >
                    거래 요청을 거절하셨습니다.
                  </div>
                )
              ) : request.status === RequestStatus.CONFIRMED ? (
                <>
                  <div
                    className={styles.button}
                    onClick={() => {
                      setRequest(request);
                    }}
                  >
                    연락처 확인하기
                  </div>
                  <div className={`${styles.button} ${styles.unable}`}>
                    해당 요청과 거래 완료
                  </div>
                </>
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
        <>
          <div className={styles.priceBar}>
            게시 가격: {requests[0].product.price.toLocaleString("ko-KR")}원
          </div>
          <>{requestComponents}</>
        </>
      ) : (
        <p>정가 구매 요청이 없어요.</p>
      )}
    </div>
  );
};

export default FixedPrice;
