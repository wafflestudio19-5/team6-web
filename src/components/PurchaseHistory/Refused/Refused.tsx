import styles from "./Refused.module.scss";
import chatIcon from "../../../icons/chat.png";
import heartIcon from "../../../icons/blackHeart.png";
import { calculateTimeDifference } from "../../Utilities/functions";

import { useNavigate } from "react-router-dom";
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { PurchaseOrdersWithoutUserDto } from "../../../type/dto/purchase-orders-without-user.dto";
import requester from "../../../apis/requester";
import { GetMyPurchaseOrdersDto } from "../../../type/dto/for-api/get-my-purchase-orders.dto";
import styles2 from "../../Utilities/confirm.module.scss";
import { GetMyProductsDto } from "../../../type/dto/for-api/get-my-products.dto";

const Refused = (props: {
  shadow: boolean;
  setShadow: Dispatch<SetStateAction<boolean>>;
}) => {
  const [refusedList, setRefusedList] = useState<
    PurchaseOrdersWithoutUserDto[]
  >([]);
  const [inputs, setInputs] = useState<{
    suggested_price: string;
    message: string;
  }>({ suggested_price: "", message: "" });
  const [targetRequest, setTargetRequest] =
    useState<PurchaseOrdersWithoutUserDto>();
  const [modal, setModal] = useState(false);

  const [isLast, setIsLast] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const getNewProducts = async () => {
    try {
      const response = await requester.get<GetMyPurchaseOrdersDto>(
        `/users/me/purchase-orders/?pageNumber=${pageCount}&pageSize=10&status=rejected`
      );
      setIsLast(response.data.last);
      setPageCount(pageCount + 1);
      setRefusedList(refusedList.concat(response.data.content));
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
    if (!props.shadow) setModal(false);
  }, [props.shadow]);

  const navigate = useNavigate();

  const changeToRequestPage = (id: number) => {
    setModal(true);
    props.setShadow(true);
  };

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
  const refusedComponents = refusedList.map((article) => {
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
            alt="?????? ?????????"
          />
          <div className={styles.dataContainer}>
            <div className={styles.firstLine}>
              <p className={styles.title}>{article.product.title}</p>
            </div>
            <div className={styles.secondLine}>
              <p className={styles.region}>{article.product.location} ??</p>
              <p className={styles.time}>
                {calculateTimeDifference(
                  article.created_at,
                  article.product.last_bring_up_my_post
                )}
              </p>
            </div>
            <div className={styles.thirdLine}>
              {article.product.status === "SOLD_OUT" && (
                <div className={styles.saleClosed}>????????????</div>
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
            onClick={() => goToProductPage(article.product.id)}
          />
        </div>
        <div className={styles.lower}>
          <div className={styles.line} />
          <div className={styles.buttons}>
            {article.product.status === "SOLD_OUT" ? (
              <div className={`${styles.button} ${styles.unable}`}>
                ?????? ????????? ??????????????????.
              </div>
            ) : (
              <div
                className={styles.button}
                onClick={() => changeToRequestPage(article.product.id)}
              >
                ?????? ?????????
              </div>
            )}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div ref={listRef} onScroll={handleScroll} className={styles.wrapper}>
      {refusedList.length ? (
        <>{refusedComponents}</>
      ) : (
        <p className={styles.emptyText}>??????????????? ???????????? ?????????.</p>
      )}
      {modal && (
        <div className={styles2.box}>
          <p className={styles2.title}>????????? ??????</p>
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
    </div>
  );
};
export default Refused;
