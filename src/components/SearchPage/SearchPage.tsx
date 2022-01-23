import styles from "./SearchPage.module.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import leftArrow from "../../icons/leftArrow.png";
import { useNavigate, useLocation } from "react-router-dom";
import grayCross from "../../icons/grayCross.png";
import slider from "../../icons/settingSlider.png";
import { toast } from "react-hot-toast";
import useProduct from "../../apis/Product/useProduct";
import useSearchProduct from "../../apis/Product/useSearchProduct";
import { calculateTimeDifference } from "../Utilities/functions";
import chatIcon from "../../icons/chat.png";
import heartIcon from "../../icons/blackHeart.png";

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const observer = useRef<IntersectionObserver | null>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [category, setCategory] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [searched, setSearched] = useState<boolean>(false);

  const { products, hasMore } = useSearchProduct({
    title: keyword,
    categories: category,
    pageNumber: pageNumber,
    searched: searched,
  });
  const onClickBack = () => {
    navigate("/main");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearched(false);
    setPageNumber(0);
    setKeyword(e.target.value);
  };
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!keyword) toast.error("내용을 입력해주세요!");
      else setSearched(true);
    }
  };
  const onClickArticle = (id: number) => {
    navigate(`/article/${id}`);
  };

  const lastElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevState) => prevState + 1);
          console.log("intersect");
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <img
            className={styles.leftArrow}
            src={leftArrow}
            onClick={onClickBack}
            alt="뒤로 가기"
          />
          <input
            className={styles.inputKeyword}
            value={keyword}
            onChange={handleChange}
            onKeyPress={onKeyPress}
            placeholder={`"낙성대동" 근처에서 검색`}
          />
          {!!keyword && (
            <img
              className={styles.crossButton}
              alt={"x"}
              src={grayCross}
              onClick={() => setKeyword("")}
            />
          )}
        </div>
        <div className={styles.filter}>
          <img src={slider} alt={"필터"} className={styles.slider} />
          <h1 className={styles.searchFilter}>검색 필터</h1>
          <p className={styles.soldOutSentence}>거래 완료 안보기</p>
        </div>
        {searched && (
          <>
            <div className={styles.content}>
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
                        src={rawData.image}
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
                        src={rawData.image}
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
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SearchPage;
