import styles from "./ClosedSales.module.scss";
import { userData } from "../../Article/DummyData";
import chatIcon from "../../../icons/chat.png";
import heartIcon from "../../../icons/blackHeart.png";
import moreActions from "../../../icons/more.png";

const ClosedSales = (props: { closedList: userData[] }) => {
  const changeToVisible = (article: userData) => {
    console.log(article.title + " 숨기기 취소");
    /*
            requester.post(`/products/{product.id}/hidden/cancel`).then((res) => {}));
            */
  };

  const hiddenComponents = props.closedList.map((article) => {
    return (
      <div className={styles.articleWrapper}>
        <div className={styles.upper}>
          <img
            className={styles.thumbnail}
            src={article.product_img[0]}
            alt="대표 이미지"
          />
          <div className={styles.dataContainer}>
            <div className={styles.firstLine}>
              <p className={styles.title}>{article.title}</p>
              <img className={styles.moreActions} src={moreActions} />
            </div>
            <div className={styles.secondLine}>
              <p className={styles.region}>{article.region} ·</p>
              <p className={styles.time}>{article.time}</p>
            </div>
            <div className={styles.thirdLine}>
              {article.sale_state === "거래완료" && (
                <div className={styles.saleClosed}>거래완료</div>
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
            <div
              className={styles.button}
              onClick={() => changeToVisible(article)}
            >
              거래 후기 작성하기
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={styles.wrapper}>
      {props.closedList.length ? (
        <>{hiddenComponents}</>
      ) : (
        <p>판매중인 게시물이 없어요.</p>
      )}
    </div>
  );
};

export default ClosedSales;
