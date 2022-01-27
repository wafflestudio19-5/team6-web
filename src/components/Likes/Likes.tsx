import { Link } from "react-router-dom";
import styles from "./Likes.module.scss";
import BackArrow from "../../icons/leftArrow.png";
import { useEffect, useState } from "react";
import requester from "../../apis/requester";
import { GetMyLikesDto } from "../../type/dto/for-api/get-my-likes.dto";
import { ProductDto } from "../../type/dto/product.dto";
import moreActions from "../../icons/more.png";
import {calculateTimeDifference} from "../Utilities/functions";
import {SalesStatus} from "../../type/enum/sales-status";
import chatIcon from "../../icons/chat.png";
import heartIcon from "../../icons/blackHeart.png";

const Likes = () => {
  const [hearts, setHearts] = useState<ProductDto[]>([]);
  useEffect(() => {
    requester
      .get<GetMyLikesDto>("users/me/likes/?pageNumber=1&pageSize=15")
      .then((res) => {
        setHearts(res.data.content);
      });
  }, []);

  const likeComponents = onsaleList.map((article) => {
    return (
      <div className={styles.articleWrapper}>
        <div
          className={styles.clickArea}
          onClick={() => goToProductPage(article)}
        />
        <div className={styles.upper}>
          <img
            className={styles.thumbnail}
            src={article.image_url}
            alt="대표 이미지"
          />
          <div className={styles.dataContainer}>
            <div className={styles.firstLine}>
              <p className={styles.title}>{article.title}</p>
              <img
                className={styles.moreActions}
                src={moreActions}
                onClick={() => handleAction(article.id)}
              />
            </div>
            <div className={styles.secondLine}>
              <p className={styles.region}>{article.location} ·</p>
              <p className={styles.time}>
                {calculateTimeDifference(
                  article.created_at,
                  article.last_bring_up_my_post
                )}
              </p>
            </div>
            <div className={styles.thirdLine}>
              {article.status === SalesStatus.RESERVED && (
                <div className={styles.reservation}>예약중</div>
              )}
              <p className={styles.price}>
                {article.price.toLocaleString("ko-KR")}원
              </p>
            </div>
            <div className={styles.lastLine}>
              {article.chats !== 0 && (
                <div className={styles.chatContainer}>
                  <img
                    className={styles.chatImg}
                    src={chatIcon}
                    alt="거래요청"
                  />
                  <p className={styles.chat}>{article.chats}</p>
                </div>
              )}
              {article.likes !== 0 && (
                <div className={styles.heartContainer}>
                  <img
                    className={styles.heartImg}
                    src={heartIcon}
                    alt="좋아요"
                  />
                  <p className={styles.heart}>{article.likes}</p>
                </div>
              )}
            </div>
          </div>
        </div>

  return (
    <div className={styles["hearts-wrapper"]}>
      <header>
        <Link to="/main" state={{ page: "user" }} className={styles.back}>
          <img src={BackArrow} alt="뒤로" />
        </Link>
        <p>판매내역</p>
      </header>
      <section className={styles["body-wrapper"]}></section>
    </div>
  );
};

export default Likes;
