import { Dispatch, SetStateAction, useEffect, useState } from "react";
import requester from "../../../apis/requester";
import styles from "../Suggestion/Suggestion.module.scss";
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

const Suggestion = ({ id, setRequest, setMessageInfo }: Props) => {
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
      .catch((e) => console.log(e));
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
          <img className={styles.thumbnail} src={profile} alt="????????? ?????????" />
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
            <div className={styles.thirdLine}>
              <p className={styles.price}>
                {request.suggested_price.toLocaleString("ko-KR")}???
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
                    ????????? ????????????
                  </div>
                  <div
                    className={styles.button}
                    onClick={() => handleSoldout(request)}
                  >
                    ?????? ????????????
                  </div>
                </>
              ) : request.status === RequestStatus.REJECTED ? (
                request.product.status === SalesStatus.SOLD_OUT ? (
                  <div
                    className={`${styles.button} ${styles.unable} ${styles.long}`}
                  >
                    ?????? ???????????? ?????? ?????????????????????.
                  </div>
                ) : (
                  <div
                    className={`${styles.button} ${styles.unable} ${styles.long}`}
                  >
                    ?????? ????????? ?????????????????????.
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
                    ????????? ????????????
                  </div>
                  <div className={`${styles.button} ${styles.unable}`}>
                    ?????? ????????? ?????? ??????
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={styles.button}
                    onClick={() => handleAccept(request)}
                  >
                    ?????? ??????
                  </div>
                  <div className={styles.verticalLine} />
                  <div
                    className={styles.button}
                    onClick={() => {
                      handleRefuse(request);
                    }}
                  >
                    ?????? ??????
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
        <p className={styles.emptyText}>?????? ?????? ????????? ?????????.</p>
      )}
    </div>
  );
};

export default Suggestion;
