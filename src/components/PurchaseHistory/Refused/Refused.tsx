import styles from "./Refused.module.scss";
import chatIcon from "../../../icons/chat.png";
import heartIcon from "../../../icons/blackHeart.png";
import { calculateTimeDifference } from "../../Utilities/functions";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PurchaseOrdersWithoutUserDto } from "../../../type/dto/purchase-orders-without-user.dto";
import requester from "../../../apis/requester";
import { GetMyPurchaseOrdersDto } from "../../../type/dto/for-api/get-my-purchase-orders.dto";

const Refused = () => {
  const [refusedList, setRefusedList] = useState<
    PurchaseOrdersWithoutUserDto[]
  >([]);

  useEffect(() => {
    requester
      .get<GetMyPurchaseOrdersDto>(
        "/users/me/purchase-orders/?pageNumber=0&pageSize=15&status=rejected"
      )
      .then((res) => {
        setRefusedList(res.data.content);
      });
  }, []);

  const navigate = useNavigate();

  const changeToRequestPage = (id: number) => {
    // 구매 요청 모달
  };

  const goToProductPage = (id: number) => {
    navigate(`/article/${id}`, {
      state: { prev: "purchase-history" },
    });
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
                거래 완료된 게시물입니다.
              </div>
            ) : (
              <div
                className={styles.button}
                onClick={() => changeToRequestPage(article.product.id)}
              >
                거래 재요청
              </div>
            )}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={styles.wrapper}>
      {refusedList.length ? (
        <>{refusedComponents}</>
      ) : (
        <p>거래반려된 게시물이 없어요.</p>
      )}
    </div>
  );
};
export default Refused;
