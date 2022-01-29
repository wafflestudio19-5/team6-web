import styles from "./HomeGoods.module.scss";
import Close from "../../../icons/Home/add-2.png";
import Write from "../../../icons/Home/write.png";
import Open from "../../../icons/Home/add-1.png";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import chatIcon from "../../../icons/chat.png";
import heartIcon from "../../../icons/blackHeart.png";
import requester from "../../../apis/requester";
import Product from "../../../apis/Product/Product";
import { calculateTimeDifference } from "../../Utilities/functions";
import useProduct from "../../../apis/Product/useProduct";

const HomeGoods = (props: {
  writeHandle: boolean;
  setWriteHandle: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const observer = useRef<IntersectionObserver | null>(null);

  const { products, hasMore } = useProduct({
    pageNumber: pageNumber,
    searched: true,
  });

  const lastElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevState) => prevState + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  const handleWrite = () => {
    navigate("/write");
  };
  const onClickArticle = (id: number) => {
    navigate(`/article/${id}`);
  };

  if (props.writeHandle) {
    return (
      <div className={styles.wrapper}>
        {products.map((rawData) => {
          return (
            <div
              className={styles.articleWrapper}
              key={rawData.id}
              onClick={() => onClickArticle(rawData.id)}
            >
              <img
                className={styles.thumbnail}
                src={rawData.image_url}
                alt="대표 이미지"
              />
              <div className={styles.dataContainer}>
                <p className={styles.title}>{rawData.title}</p>
                <div className={styles.secondLine}>
                  <p className={styles.region}>{rawData.location} ·</p>
                  <p className={styles.time}>
                    {calculateTimeDifference(
                      rawData.created_at,
                      rawData.last_bring_up_my_post
                    )}
                  </p>
                </div>
                <div className={styles.thirdLine}>
                  {rawData.status === "RESERVED" && (
                    <div className={styles.reservation}>예약중</div>
                  )}
                  {rawData.status === "SOLD_OUT" && (
                    <div className={styles.saleClosed}>거래완료</div>
                  )}
                  <p className={styles.price}>
                    {rawData.price !== 0 &&
                      rawData.price.toLocaleString("ko-KR") + "원"}
                    {rawData.price === 0 && "나눔🧡"}
                  </p>
                </div>
                <div className={styles.lastLine}>
                  {rawData.chats !== 0 && (
                    <div className={styles.chatContainer}>
                      <img
                        className={styles.chatImg}
                        src={chatIcon}
                        alt="채팅"
                      />
                      <p className={styles.chat}>{rawData.chats}</p>
                    </div>
                  )}
                  {rawData.likes !== 0 && (
                    <div className={styles.heartContainer}>
                      <img
                        className={styles.heartImg}
                        src={heartIcon}
                        alt="좋아요"
                      />
                      <p className={styles.heart}>{rawData.likes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
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
      {products.map((rawData, index) => {
        if (products.length === index + 1)
          return (
            <div
              ref={lastElementRef}
              className={styles.articleWrapper}
              key={rawData.id}
              onClick={() => onClickArticle(rawData.id)}
            >
              <img
                className={styles.thumbnail}
                src={rawData.image_url}
                alt="대표 이미지"
              />
              <div className={styles.dataContainer}>
                <p className={styles.title}>{rawData.title}</p>
                <div className={styles.secondLine}>
                  <p className={styles.region}>{rawData.location} ·</p>
                  <p className={styles.time}>
                    {calculateTimeDifference(
                      rawData.created_at,
                      rawData.last_bring_up_my_post
                    )}
                  </p>
                </div>
                <div className={styles.thirdLine}>
                  {rawData.status === "RESERVED" && (
                    <div className={styles.reservation}>예약중</div>
                  )}
                  {rawData.status === "SOLD_OUT" && (
                    <div className={styles.saleClosed}>거래완료</div>
                  )}
                  <p className={styles.price}>
                    {rawData.price !== 0 &&
                      rawData.price.toLocaleString("ko-KR") + "원"}
                    {rawData.price === 0 && "나눔🧡"}
                  </p>
                </div>
                <div className={styles.lastLine}>
                  {rawData.chats !== 0 && (
                    <div className={styles.chatContainer}>
                      <img
                        className={styles.chatImg}
                        src={chatIcon}
                        alt="채팅"
                      />
                      <p className={styles.chat}>{rawData.chats}</p>
                    </div>
                  )}
                  {rawData.likes !== 0 && (
                    <div className={styles.heartContainer}>
                      <img
                        className={styles.heartImg}
                        src={heartIcon}
                        alt="좋아요"
                      />
                      <p className={styles.heart}>{rawData.likes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        else
          return (
            <div
              className={styles.articleWrapper}
              key={rawData.id}
              onClick={() => onClickArticle(rawData.id)}
            >
              <img
                className={styles.thumbnail}
                src={rawData.image_url}
                alt="대표 이미지"
              />
              <div className={styles.dataContainer}>
                <p className={styles.title}>{rawData.title}</p>
                <div className={styles.secondLine}>
                  <p className={styles.region}>{rawData.location} ·</p>
                  <p className={styles.time}>
                    {calculateTimeDifference(
                      rawData.created_at,
                      rawData.last_bring_up_my_post
                    )}
                  </p>
                </div>
                <div className={styles.thirdLine}>
                  {rawData.status === "RESERVED" && (
                    <div className={styles.reservation}>예약중</div>
                  )}
                  {rawData.status === "SOLD_OUT" && (
                    <div className={styles.saleClosed}>거래완료</div>
                  )}
                  <p className={styles.price}>
                    {rawData.price !== 0 &&
                      rawData.price.toLocaleString("ko-KR") + "원"}
                    {rawData.price === 0 && "나눔🧡"}
                  </p>
                </div>
                <div className={styles.lastLine}>
                  {rawData.chats !== 0 && (
                    <div className={styles.chatContainer}>
                      <img
                        className={styles.chatImg}
                        src={chatIcon}
                        alt="채팅"
                      />
                      <p className={styles.chat}>{rawData.chats}</p>
                    </div>
                  )}
                  {rawData.likes !== 0 && (
                    <div className={styles.heartContainer}>
                      <img
                        className={styles.heartImg}
                        src={heartIcon}
                        alt="좋아요"
                      />
                      <p className={styles.heart}>{rawData.likes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
      })}
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
