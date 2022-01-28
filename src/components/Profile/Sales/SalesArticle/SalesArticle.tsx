import styles from "./SalesArticle.module.scss";
import ChatIcon from "../../../../icons/chatting.png";
import LikesIcon from "../../../../icons/blackHeart.png";
import { productType } from "../../../../type/types";
import {
  calculateTimeDifferenceForProfile,
  toShortDivision,
} from "../../../Utilities/functions";
import { useNavigate } from "react-router-dom";

const SalesArticle = ({
  article,
  prev,
}: {
  article: productType;
  prev: string;
}) => {
  const navigate = useNavigate();

  const LinkToArticle = () => {
    navigate(`/article/${article.id}`, {
      state: { prev: prev },
    });
  };

  return (
    <article className={styles["article-wrapper"]} onClick={LinkToArticle}>
      <div className={styles.thumbnail}>
        <img src={article.image_url} alt="상품 이미지" />
      </div>
      <div className={styles["data-wrapper"]}>
        <p className={styles.title}>{article.title}</p>
        <p className={styles["location-time"]}>
          {toShortDivision(article.location)} ·{" "}
          {calculateTimeDifferenceForProfile(article.created_at)}
        </p>
        <div className={styles["status-price-wrapper"]}>
          {article.status === "RESERVED" && (
            <div className={`${styles.status} ${styles.reserved}`}>
              <span>예약중</span>
            </div>
          )}
          {article.status === "SOLD_OUT" && (
            <div className={`${styles.status} ${styles["sold-out"]}`}>
              <span>거래완료</span>
            </div>
          )}
          <p
            className={`${styles.price} ${article.price === 0 && styles.free}`}
          >
            {article.price !== 0 &&
              article.price.toLocaleString("ko-KR") + "원"}
            {article.price === 0 && "나눔🧡"}
          </p>
        </div>
        <div
          className={`${styles["chats-likes-wrapper"]} ${
            article.chats !== 0 && article.likes !== 0 && styles["coexist"]
          }`}
        >
          {article.chats !== 0 && (
            <div className={styles.container}>
              <img src={ChatIcon} alt="chats" />
              <span>{article.chats}</span>
            </div>
          )}
          {article.likes !== 0 && (
            <div className={styles.container}>
              <img src={LikesIcon} alt="likes" />
              <span>{article.likes}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default SalesArticle;
