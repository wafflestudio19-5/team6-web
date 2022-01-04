import styles from "./Onsale.module.scss";
import { userData } from "../../Article/DummyData";
import chatIcon from "../../../icons/chat.png";
import heartIcon from "../../../icons/blackHeart.png";
import { requester } from "../../../apis/requester";
import { Dispatch, SetStateAction } from "react";
import moreActions from "../../../icons/more.png";

<<<<<<< HEAD
const Onsale = (props: {
  onsaleList: userData[];
  setOnsaleActions: Dispatch<SetStateAction<boolean>>;
}) => {
  const changeToReserved = (article: userData) => {
    console.log(article.title + " 예약중으로");
    /*
    requester.post(`/products/{product.id}/reserve`).then((res) => {}));
    */
  };
  const changeToOnsale = (article: userData) => {
    console.log(article.title + " 판매중으로");
    /*
    requester.post(`/products/{product.id}/reserve/cancel`).then((res) => {}));
    */
  };
  const changeToCompleted = (article: userData) => {
    console.log(article.title + " 거래완료로");
    /*
    requester.post(`/products/{product.id}/completed`).then((res) => {}));
    */
  };
  const goToProductPage = (article: userData) => {
    console.log(article.title + " 페이지로");
    /*
    requester.post(`/products/{product.id}/completed`).then((res) => {}));
    */
  };

  const onsaleComponents = props.onsaleList.map((article) => {
    return (
      <div
        className={styles.articleWrapper}
        onClick={() => goToProductPage(article)}
      >
        <div className={styles.upper}>
          <img
            className={styles.thumbnail}
            src={article.product_img[0]}
            alt="대표 이미지"
          />
          <div className={styles.dataContainer}>
            <div className={styles.firstLine}>
              <p className={styles.title}>{article.title}</p>
              <img
                className={styles.moreActions}
                src={moreActions}
                onClick={() => props.setOnsaleActions(true)}
              />
            </div>
            <div className={styles.secondLine}>
              <p className={styles.region}>{article.region} ·</p>
              <p className={styles.time}>{article.time}</p>
            </div>
            <div className={styles.thirdLine}>
              {article.sale_state === "예약중" && (
                <div className={styles.reservation}>예약중</div>
              )}
              <p className={styles.price}>
                {article.price.toLocaleString("ko-KR")}원
              </p>
            </div>
            <div className={styles.lastLine}>
              {article.chat !== 0 && (
                <div className={styles.chatContainer}>
                  <img
                    className={styles.chatImg}
                    src={chatIcon}
                    alt="거래요청"
                  />
                  <p className={styles.chat}>{article.chat}</p>
                </div>
              )}
              {article.interest !== 0 && (
                <div className={styles.heartContainer}>
                  <img
                    className={styles.heartImg}
                    src={heartIcon}
                    alt="좋아요"
                  />
                  <p className={styles.heart}>{article.interest}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.lower}>
          <div className={styles.line} />
          <div className={styles.buttons}>
            {article.sale_state === "판매중" ? (
              <div
                className={styles.button}
                onClick={() => changeToReserved(article)}
              >
                예약중으로 변경
              </div>
            ) : (
              <div
                className={styles.button}
                onClick={() => changeToOnsale(article)}
              >
                판매중으로 변경
              </div>
            )}
            <div className={styles.verticalLine} />
            <div
              className={styles.button}
              onClick={() => changeToCompleted(article)}
            >
              거래완료로 변경
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={styles.wrapper}>
      {props.onsaleList.length ? (
        <>{onsaleComponents}</>
      ) : (
        <p>판매중인 게시물이 없어요.</p>
      )}
    </div>
  );
};

=======
const Onsale = () => {
  return (
    <div className={styles.empty}>
      <p>판매중인 게시물이 없어요.</p>
    </div>
  );
};

>>>>>>> 15ce7d0a2c43bcd70afb1c2d5c06727763b946e7
export default Onsale;
