import styles from "./SalesArticle.module.scss";
import ChatIcon from "../../../../icons/chatting.png";
import LikesIcon from "../../../../icons/blackHeart.png";
import { myProductsData } from "../../../../type/product";
import { calculateTimeDifference } from "../../../Utilities/functions";
import { useNavigate } from "react-router-dom";

const SalesArticle = (props: { article: myProductsData }) => {
  const navigate = useNavigate();

  const toShort = (location: any) => {
    return location.split(" ").at(-1);
  };

  const LinkToArticle = () => {
    navigate(`/article/${props.article.id}`, {
      state: { prev: "profile-sales" },
    });
  };

  return (
    <article className={styles["article-wrapper"]} onClick={LinkToArticle}>
      <div className={styles.thumbnail}>
        <img src={""} alt="상품 이미지" />
      </div>
      <div className={styles["data-wrapper"]}>
        <p className={styles.title}>{props.article.title}</p>
        <p className={styles["location-time"]}>
          {toShort(props.article.location)} ·{" "}
          {calculateTimeDifference(props.article.created_at)}
        </p>
        <div className={styles["status-price-wrapper"]}>
          {props.article.status === "RESERVED" && (
            <div className={`${styles.status} ${styles.reserved}`}>
              <span>예약중</span>
            </div>
          )}
          {props.article.status === "SOLD_OUT" && (
            <div className={`${styles.status} ${styles["sold-out"]}`}>
              <span>거래완료</span>
            </div>
          )}
          <p
            className={`${styles.price} ${
              props.article.price === 0 && styles.free
            }`}
          >
            {props.article.price !== 0 &&
              props.article.price.toLocaleString("ko-KR") + "원"}
            {props.article.price === 0 && "나눔🧡"}
          </p>
        </div>
        <div
          className={`${styles["chats-likes-wrapper"]} ${
            props.article.chats !== 0 &&
            props.article.likes !== 0 &&
            styles["coexist"]
          }`}
        >
          {props.article.chats !== 0 && (
            <div className={styles.container}>
              <img src={ChatIcon} alt="chats" />
              <span>{props.article.chats}</span>
            </div>
          )}
          {props.article.likes !== 0 && (
            <div className={styles.container}>
              <img src={LikesIcon} alt="likes" />
              <span>{props.article.likes}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default SalesArticle;
