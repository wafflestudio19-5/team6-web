import styles from "./HomeGoods.module.scss";
import Close from "../../../icons/Home/add-2.png";
import Write from "../../../icons/Home/write.png";
import Open from "../../../icons/Home/add-1.png";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import dummyData from "../../Article/DummyData";
import chatIcon from "../../../icons/chat.png";
import heartIcon from "../../../icons/blackHeart.png";

const HomeGoods = (props: {
  writeHandle: boolean;
  setWriteHandle: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

  const handleWrite = () => {
    navigate("/write");
  };
  const onClickArticle = (id: number) => {
    navigate(`/article/${id}`);
  };

  const articleData = dummyData.map((article) => {
    return (
      <div
        className={styles.articleWrapper}
        onClick={() => onClickArticle(article.id)}
      >
        <img
          className={styles.thumbnail}
          src={article.product_img[0]}
          alt="대표 이미지"
        />

        <div className={styles.dataContainer}>
          <p className={styles.title}>{article.title}</p>
          <div className={styles.secondLine}>
            <p className={styles.region}>{article.region} ·</p>
            <p className={styles.time}>{article.time}</p>
          </div>
          <p className={styles.price}>
            {article.price.toLocaleString("ko-KR")}원
          </p>
          <div className={styles.lastLine}>
            {article.chat !== 0 && (
              <div className={styles.chatContainer}>
                <img className={styles.chatImg} src={chatIcon} alt="채팅" />
                <p className={styles.chat}>{article.chat}</p>
              </div>
            )}
            {article.interest !== 0 && (
              <div className={styles.heartContainer}>
                <img className={styles.heartImg} src={heartIcon} alt="좋아요" />
                <p className={styles.heart}>{article.interest}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  });

  if (props.writeHandle) {
    return (
      <div className={styles.wrapper}>
        {articleData}
        <img
          className={styles.closeButton}
          src={Close}
          onClick={() => props.setWriteHandle(false)}
          alt="닫기"
        />
        <div
          className={`${styles.writeBox} ${styles.show}`}
          onClick={handleWrite}
        >
          <p className={styles.writeTag}>중고거래</p>
          <img className={styles.writeImg} src={Write} alt="쓰기" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {articleData}
      <img
        className={styles.openButton}
        src={Open}
        onClick={() => props.setWriteHandle(true)}
        alt="열기"
      />
      <div className={styles.writeBox}>
        <p className={styles.writeTag}>중고거래</p>
        <img className={styles.writeImg} src={Write} alt="쓰기" />
      </div>
    </div>
  );
};

export default HomeGoods;
