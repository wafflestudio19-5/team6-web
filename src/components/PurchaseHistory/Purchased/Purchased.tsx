import styles from "./Purchased.module.scss";
import chatIcon from "../../../icons/chat.png";
import heartIcon from "../../../icons/blackHeart.png";
import requester from "../../../apis/requester";
import { calculateTimeDifference } from "../../Utilities/functions";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import { PurchaseOrdersWithoutUserDto } from "../../../type/dto/purchase-orders-without-user.dto";
import { GetMyPurchaseOrdersDto } from "../../../type/dto/for-api/get-my-purchase-orders.dto";
import styles2 from "../../Utilities/confirm.module.scss";

const Purchased = (props: {
  shadow: boolean;
  setShadow: Dispatch<SetStateAction<boolean>>;
}) => {
  const [purchasedList, setPurchasedList] = useState<
    PurchaseOrdersWithoutUserDto[]
  >([]);
  const [modal, setModal] = useState(false);
  const [targetRequest, setTargetRequest] =
    useState<PurchaseOrdersWithoutUserDto>();

  const [isLast, setIsLast] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const getNewProducts = async () => {
    try {
      const response = await requester.get<GetMyPurchaseOrdersDto>(
        `/users/me/purchase-orders/?pageNumber=${pageCount}&pageSize=10&status=confirmed`
      );
      setIsLast(response.data.last);
      setPageCount(pageCount + 1);
      setPurchasedList(purchasedList.concat(response.data.content));
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
      setModal(false);
    }
  }, [props.shadow]);
  const navigate = useNavigate();

  const goToProductPage = (id: number) => {
    navigate(`/article/${id}`, {
      state: { prev: "purchase-history" },
    });
  };

  const soldoutComponents = purchasedList.map((article) => {
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
            </div>
            <div className={styles.secondLine}>
              <p className={styles.region}>{article.product.location} ·</p>
              <p className={styles.time}>
                {calculateTimeDifference(
                  article.created_at,
                  article.product.last_bring_up_my_post
                )}
              </p>
            </div>
            <div className={styles.thirdLine}>
              {article.product.status === "SOLD_OUT" && (
                <div className={styles.saleClosed}>거래완료</div>
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
                props.setShadow(true);
                setModal(true);
                setTargetRequest(article);
              }}
            >
              연락처 확인하기
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div ref={listRef} onScroll={handleScroll} className={styles.wrapper}>
      {purchasedList.length ? (
        <>{soldoutComponents}</>
      ) : (
        <p className={styles.emptyText}>거래완료된 게시물이 없어요.</p>
      )}
      {modal && (
        <div className={styles2.box}>
          <p className={styles2.title}>거래 완료</p>
          <p className={styles2.contents}>
            판매자 {targetRequest?.product.user.nickname}님과 거래한 상품에 대해
            추가적으로 할 이야기가 있다면 아래 연락처로 연락하세요.
          </p>
          <p className={styles2.subTitle}>이메일</p>
          <div className={styles2.textBox}>
            {targetRequest?.product.user.email}
          </div>
          <p className={styles2.subTitle}>전화번호</p>
          <div className={styles2.textBox}>
            {targetRequest?.product.user.phone}
          </div>
        </div>
      )}
    </div>
  );
};

export default Purchased;
