import styles from "./HomeGoods.module.scss";
import Close from "../../../icons/Home/add-2.png";
import Write from "../../../icons/Home/write.png";
import Open from "../../../icons/Home/add-1.png";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dummyData from "../../Article/DummyData";
import chatIcon from "../../../icons/chat.png";
import heartIcon from "../../../icons/blackHeart.png";
import { requester } from "../../../apis/requester";
import { calculateTimeDifference } from "../../Utilities/functions";

type homeGoodsData = {
  count: number;
  results: homeGoods[];
};

type homeGoods = {
  id: number;
  user: {
    name: string;
    email: string;
  };
  image: any;
  title: string;
  price: number;
  location: string;
  likes: number;
  chats: number;
  status: string;
  created_at: string;
  updated_at: string;
};

const HomeGoods = (props: {
  writeHandle: boolean;
  setWriteHandle: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);

  const handleWrite = () => {
    navigate("/write");
  };
  const onClickArticle = (id: number) => {
    navigate(`/article/${id}`);
  };

  useEffect(() => {
    requester.get(`/products/?pageNumber=0&pageSize=15`).then((res) => {
      console.log(res.data);
      setData(
        res.data.content.map((article: homeGoods) => {
          const time = new Date(article.created_at);
          requester
            .get(`/images/${article.image}/`)
            .then((res) => {
              console.log(res);
            })
            .catch((e) => console.log(e.response));
          return (
            <div
              className={styles.articleWrapper}
              key={article.id}
              onClick={() => onClickArticle(article.id)}
            >
              <img className={styles.thumbnail} src={""} alt="대표 이미지" />
              <div className={styles.dataContainer}>
                <p className={styles.title}>{article.title}</p>
                <div className={styles.secondLine}>
                  <p className={styles.region}>{article.location} ·</p>
                  <p className={styles.time}>
                    {calculateTimeDifference(article.created_at)}
                  </p>
                </div>
                <div className={styles.thirdLine}>
                  {article.status === "RESERVED" && (
                    <div className={styles.reservation}>예약중</div>
                  )}
                  {article.status === "SOLD_OUT" && (
                    <div className={styles.saleClosed}>거래완료</div>
                  )}
                  <p className={styles.price}>
                    {article.price !== 0 &&
                      article.price.toLocaleString("ko-KR") + "원"}
                    {article.price === 0 && "나눔🧡"}
                  </p>
                </div>
                <div className={styles.lastLine}>
                  {article.chats !== 0 && (
                    <div className={styles.chatContainer}>
                      <img
                        className={styles.chatImg}
                        src={chatIcon}
                        alt="채팅"
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
          );
        })
      );
    });
  }, [navigate]);

  if (props.writeHandle) {
    return (
      <div className={styles.wrapper}>
        {data}
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
      {data}
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
