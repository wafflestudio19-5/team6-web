import styles from "./Requests.module.scss";
import chatIcon from "../../../icons/chat.png";
import heartIcon from "../../../icons/blackHeart.png";
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { calculateTimeDifference } from "../../Utilities/functions";

import bell from "../../../icons/bell.png";
import requester from "../../../apis/requester";
import { PurchaseOrdersWithoutUserDto } from "../../../type/dto/purchase-orders-without-user.dto";
import { GetMyPurchaseOrdersDto } from "../../../type/dto/for-api/get-my-purchase-orders.dto";
import { RequestStatus } from "../../../type/enum/request-status";
import styles2 from "../../Utilities/confirm.module.scss";

const Requests = (props: {
  shadow: boolean;
  setShadow: Dispatch<SetStateAction<boolean>>;
}) => {
  const [requestList, setRequestList] = useState<
    PurchaseOrdersWithoutUserDto[]
  >([]);
  const [purchaseModal, setPurchaseModal] = useState(false);
  const [inputs, setInputs] = useState<{
    suggested_price: string;
    message: string;
  }>({ suggested_price: "", message: "" });
  const [targetRequest, setTargetRequest] =
    useState<PurchaseOrdersWithoutUserDto>();
  const [alarmModal, setAlarmModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

  useEffect(() => {
    requester
      .get<GetMyPurchaseOrdersDto>(
        "/users/me/purchase-orders/?pageNumber=0&pageSize=15&status=pending"
      )
      .then((res) => {
        setRequestList(res.data.content);
      });
  }, []);

  useEffect(() => {
    if (!props.shadow) {
      setCancelModal(false);
      setAlarmModal(false);
      setPurchaseModal(false);
    }
  }, [props.shadow]);

  const navigate = useNavigate();

  const goToProductPage = (id: number) => {
    navigate(`/article/${id}`, {
      state: { prev: "purchase-history" },
    });
  };

  const handlePriceChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    const numRegex = /^[0-9]+$/;
    if (e.target.value === "" || numRegex.test(e.target.value)) {
      setInputs({
        ...inputs,
        suggested_price: e.target.value,
      });
    }
  };

  const handleMessageChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInputs({
      ...inputs,
      message: e.target.value,
    });
  };
  const handlePurchaseConfirm = () => {
    requester
      .patch(`/purchase-orders/${targetRequest?.id}/`, {
        suggested_price: inputs.suggested_price,
        message: inputs.message,
      })
      .catch((e) => {
        console.log(e.response);
      });
    props.setShadow(false);
    setInputs({ suggested_price: "", message: "" });
  };

  const handleCancelConfirm = async () => {
    try {
      await requester.delete(`/purchase-orders/${targetRequest?.id}/`);
      setRequestList(
        requestList.filter((request) => request.id !== targetRequest?.id)
      );
      props.setShadow(false);
    } catch (e) {}
  };

  const requestComponents = requestList.map((article) => {
    return (
      <div className={styles.articleWrapper}>
        <div
          className={styles.clickArea}
          onClick={() => goToProductPage(article.product.id)}
        />
        <div className={styles.upper}>
          <img
            className={styles.thumbnail}
            src={article.product.image_url}
            alt="대표 이미지"
          />
          <div className={styles.dataContainer}>
            <div className={styles.firstLine}>
              <p className={styles.title}>{article.product.title}</p>
              {article.status === RequestStatus.CONFIRMED && (
                <img
                  className={styles.bell}
                  src={bell}
                  onClick={() => {
                    props.setShadow(true);
                    setAlarmModal(true);
                    setTargetRequest(article);
                  }}
                />
              )}
            </div>
            <div className={styles.secondLine}>
              <p className={styles.region}>{article.product.location} ·</p>
              <p className={styles.time}>
                {calculateTimeDifference(
                  article.product.created_at,
                  article.product.last_bring_up_my_post
                )}
              </p>
            </div>
            <div className={styles.thirdLine}>
              {article.product.status === "RESERVED" && (
                <div className={styles.reservation}>예약중</div>
              )}
              <p className={styles.price}>
                {article.product.price.toLocaleString("ko-KR")}원
              </p>
            </div>
            <div className={styles.lastLine}>
              {article.product.chats !== 0 && (
                <div className={styles.chatContainer}>
                  <img
                    className={styles.chatImg}
                    src={chatIcon}
                    alt="거래요청"
                  />
                  <p className={styles.chat}>{article.product.chats}</p>
                </div>
              )}
              {article.product.likes !== 0 && (
                <div className={styles.heartContainer}>
                  <img
                    className={styles.heartImg}
                    src={heartIcon}
                    alt="좋아요"
                  />
                  <p className={styles.heart}>{article.product.likes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.lower}>
          <div className={styles.line} />
          <div className={styles.buttons}>
            <div
              className={styles.button}
              onClick={() => {
                setInputs({
                  suggested_price: `${article.suggested_price}`,
                  message: "",
                });
                props.setShadow(true);
                setPurchaseModal(true);
                setTargetRequest(article);
              }}
            >
              요청 가격 변경
            </div>
            <div className={styles.verticalLine} />
            <div
              className={styles.button}
              onClick={() => {
                props.setShadow(true);
                setCancelModal(true);
                setTargetRequest(article);
              }}
            >
              요청 취소
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={styles.wrapper}>
      {requestList.length ? (
        <>{requestComponents}</>
      ) : (
        <p>거래 요청중인 게시물이 없어요.</p>
      )}
      {purchaseModal && (
        <div className={styles2.box}>
          <p className={styles2.title}>요청 가격 변경</p>
          <p className={styles2.contents}>
            이전 요청 가격은{" "}
            {targetRequest?.suggested_price
              ? targetRequest?.suggested_price.toLocaleString("ko-KR")
              : "0"}
            원 입니다.
            <br />
            판매자가 올린 가격{" "}
            {targetRequest?.product.price.toLocaleString("ko-KR")}원에 비해 너무
            높거나 낮은 가격을 적으면 거래가 어려울 수 있어요.
          </p>
          <input
            name="price"
            className={styles2.priceBox}
            placeholder="가격을 입력하세요"
            value={inputs.suggested_price}
            onChange={handlePriceChange}
          />
          <p className={styles2.priceText}>
            {inputs.suggested_price.length > 0
              ? parseInt(inputs.suggested_price).toLocaleString("ko-KR")
              : "0"}
            원
          </p>
          <textarea
            name="message"
            className={styles2.messageBox}
            placeholder="전달할 메시지를 입력해주세요"
            value={inputs.message}
            onChange={handleMessageChange}
          />

          <div
            className={styles2.confirmButton}
            onClick={handlePurchaseConfirm}
          >
            확인
          </div>
          <div
            className={styles2.cancelButton}
            onClick={() => {
              props.setShadow(false);
            }}
          >
            닫기
          </div>
        </div>
      )}
      {cancelModal && (
        <div className={styles2.box}>
          <p className={styles2.title}>요청 취소</p>
          <p className={styles2.contents}>
            게시글 '{targetRequest?.product.title}'에 대한 거래 요청을
            취소하시겠습니까?
          </p>
          <div className={styles2.confirmButton} onClick={handleCancelConfirm}>
            확인
          </div>
          <div
            className={styles2.cancelButton}
            onClick={() => {
              props.setShadow(false);
            }}
          >
            닫기
          </div>
        </div>
      )}{" "}
    </div>
  );
};
export default Requests;
