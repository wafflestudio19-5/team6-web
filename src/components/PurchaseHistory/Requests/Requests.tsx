import styles from "./Requests.module.scss";
import chatIcon from "../../../icons/chat.png";
import heartIcon from "../../../icons/blackHeart.png";
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
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

  const [isLast, setIsLast] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const getNewProducts = async () => {
    try {
      const response = await requester.get<GetMyPurchaseOrdersDto>(
        `/users/me/purchase-orders/?pageNumber=${pageCount}&pageSize=10&status=pending`
      );
      setIsLast(response.data.last);
      setPageCount(pageCount + 1);
      setRequestList(requestList.concat(response.data.content));
    } catch (e) {
      return undefined;
    }
  };
  useEffect(() => {
    (async () => {
      await getNewProducts();
    })();
  }, []);

  useEffect(() => {
    if (!isLast && bottom) {
      (async () => {
        await getNewProducts();
      })();
    }
  }, [bottom]);

  const handleScroll = useCallback(() => {
    if (!isLast && listRef.current) {
      const { clientHeight, scrollHeight, scrollTop } = listRef.current;
      if (Math.round(scrollTop + clientHeight) >= scrollHeight - 200) {
        if (!bottom) {
          setBottom(true);
        }
      }
    }
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
      .put(`/purchase-orders/${targetRequest?.id}/`, {
        suggested_price:
          inputs.suggested_price !== `${targetRequest?.product.price}`
            ? inputs.suggested_price
            : null,
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
        <div className={styles.upper}>
          <img
            className={styles.thumbnail}
            src={article.product.image_url}
            alt="?????? ?????????"
          />
          <div className={styles.dataContainer}>
            <div className={styles.firstLine}>
              <p className={styles.title}>{article.product.title}</p>
              {article.status === RequestStatus.ACCEPTED && (
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
              <p className={styles.region}>{article.product.location} ??</p>
              <p className={styles.time}>
                {calculateTimeDifference(
                  article.product.created_at,
                  article.product.last_bring_up_my_post
                )}
              </p>
            </div>
            <div className={styles.thirdLine}>
              {article.product.status === "RESERVED" && (
                <div className={styles.reservation}>?????????</div>
              )}
              <p className={styles.price}>
                {article.product.price.toLocaleString("ko-KR")}???
              </p>
            </div>
            <div className={styles.lastLine}>
              {article.product.chats !== 0 && (
                <div className={styles.chatContainer}>
                  <img
                    className={styles.chatImg}
                    src={chatIcon}
                    alt="????????????"
                  />
                  <p className={styles.chat}>{article.product.chats}</p>
                </div>
              )}
              {article.product.likes !== 0 && (
                <div className={styles.heartContainer}>
                  <img
                    className={styles.heartImg}
                    src={heartIcon}
                    alt="?????????"
                  />
                  <p className={styles.heart}>{article.product.likes}</p>
                </div>
              )}
            </div>
          </div>
          <div
            className={styles.clickArea}
            onClick={() => {
              goToProductPage(article.product.id);
            }}
          />
        </div>
        <div className={styles.lower}>
          <div className={styles.line} />
          <div className={styles.buttons}>
            <div
              className={styles.button}
              onClick={() => {
                setInputs({
                  suggested_price: `${
                    article.suggested_price
                      ? article.suggested_price
                      : article.product.price
                  }`,
                  message: "",
                });
                props.setShadow(true);
                setPurchaseModal(true);
                setTargetRequest(article);
              }}
            >
              ?????? ?????? ??????
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
              ?????? ??????
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div ref={listRef} onScroll={handleScroll} className={styles.wrapper}>
      {requestList.length ? (
        <>{requestComponents}</>
      ) : (
        <p className={styles.emptyText}>?????? ???????????? ???????????? ?????????.</p>
      )}
      {purchaseModal && (
        <div className={styles2.box}>
          <p className={styles2.title}>?????? ?????? ??????</p>
          <p className={styles2.contents}>
            ?????? ?????? ?????????{" "}
            {targetRequest?.suggested_price
              ? targetRequest?.suggested_price.toLocaleString("ko-KR")
              : "0"}
            ??? ?????????.
            <br />
            ???????????? ?????? ??????{" "}
            {targetRequest?.product.price.toLocaleString("ko-KR")}?????? ?????? ??????
            ????????? ?????? ????????? ????????? ????????? ???????????? ????????????.
          </p>
          <input
            name="price"
            className={styles2.priceBox}
            placeholder="????????? ???????????????"
            value={inputs.suggested_price}
            onChange={handlePriceChange}
          />
          <p className={styles2.priceText}>
            {inputs.suggested_price.length > 0
              ? parseInt(inputs.suggested_price).toLocaleString("ko-KR")
              : "0"}
            ???
          </p>
          <textarea
            name="message"
            className={styles2.messageBox}
            placeholder="????????? ???????????? ??????????????????"
            value={inputs.message}
            onChange={handleMessageChange}
          />

          <div
            className={styles2.confirmButton}
            onClick={handlePurchaseConfirm}
          >
            ??????
          </div>
          <div
            className={styles2.cancelButton}
            onClick={() => {
              props.setShadow(false);
            }}
          >
            ??????
          </div>
        </div>
      )}
      {cancelModal && (
        <div className={styles2.box}>
          <p className={styles2.title}>?????? ??????</p>
          <p className={styles2.contents}>
            ????????? '{targetRequest?.product.title}'??? ?????? ?????? ?????????
            ?????????????????????????
          </p>
          <div className={styles2.confirmButton} onClick={handleCancelConfirm}>
            ??????
          </div>
          <div
            className={styles2.cancelButton}
            onClick={() => {
              props.setShadow(false);
            }}
          >
            ??????
          </div>
        </div>
      )}
      {alarmModal && (
        <div className={styles2.box}>
          <p className={styles2.title}>???????????? ?????? ????????? ???????????????.</p>
          <p className={styles2.contents}>
            ????????? ?????? ??? ????????? ????????? ????????? ?????? ???????????????.
          </p>
          <p className={styles2.subTitle}>?????????</p>
          <div className={styles2.textBox}>
            {targetRequest?.product.user.email}
          </div>
          <p className={styles2.subTitle}>????????????</p>
          <div className={styles2.textBox}>
            {targetRequest?.product.user.phone}
          </div>
        </div>
      )}
    </div>
  );
};
export default Requests;
