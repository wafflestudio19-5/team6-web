import styles from "./SearchPage.module.scss";
import { useState, useRef, useCallback } from "react";
import leftArrow from "../../icons/leftArrow.png";
import { useNavigate, useLocation } from "react-router-dom";
import grayCross from "../../icons/grayCross.png";
import slider from "../../icons/settingSlider.png";
import { toast } from "react-hot-toast";
import SearchFilter from "./Filter/SearchFilter";
import useSearchProduct from "../../apis/Product/useSearchProduct";
import { calculateTimeDifference } from "../Utilities/functions";
import chatIcon from "../../icons/chat.png";
import heartIcon from "../../icons/blackHeart.png";
import noResults from "../../icons/Search/noResults.jpg";

type TFilterInfo = {
  categories: number[];
  minPrice: number | string;
  maxPrice: number | string;
  range_of_location: number;
};
const SearchPage = () => {
  const initialValue = {
    categories: [],
    minPrice: "",
    maxPrice: "",
    range_of_location: 3,
  };
  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver | null>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [searched, setSearched] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [filterInfo, setFilterInfo] = useState<TFilterInfo>(initialValue);

  const { products, hasMore } = useSearchProduct({
    title: keyword,
    categories: filterInfo.categories,
    minPrice: filterInfo.minPrice,
    maxPrice: filterInfo.maxPrice,
    rangeOfLocation: filterInfo.range_of_location,
    pageNumber: pageNumber,
    searched: searched,
    filtered: filtered,
    setFiltered: setFiltered,
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
      if (!keyword) toast.error("????????? ??????????????????!");
      else setSearched(true);
    }
  };
  const onClickArticle = (id: number) => {
    navigate(`/article/${id}`, { state: { prev: "search" } });
  };
  const handleFilter = () => {
    setIsFilterModalOpen(true);
  };

  const lastElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore)
          setPageNumber((prevState) => prevState + 1);
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );
  return (
    <>
      {!isFilterModalOpen && (
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <img
              className={styles.leftArrow}
              src={leftArrow}
              onClick={onClickBack}
              alt="?????? ??????"
            />
            <input
              className={styles.inputKeyword}
              value={keyword}
              onChange={handleChange}
              onKeyPress={onKeyPress}
              placeholder={`"????????????" ???????????? ??????`}
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
          <div className={styles.filter} onClick={handleFilter}>
            <img src={slider} alt={"??????"} className={styles.slider} />
            <h1
              className={
                filterInfo.categories.length !== 0 ||
                !!filterInfo.minPrice ||
                !!filterInfo.maxPrice ||
                filterInfo.range_of_location !== 3
                  ? styles.searchFilterActive
                  : styles.searchFilter
              }
            >
              ?????? ??????
            </h1>
            <p className={styles.soldOutSentence}>?????? ?????? ?????????</p>
          </div>
          {searched && (
            <>
              <div className={styles.content}>
                {!!products[0] ? (
                  products.map((rawData, index) => {
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
                            alt="?????? ?????????"
                          />
                          <div className={styles.dataContainer}>
                            <p className={styles.title}>{rawData.title}</p>
                            <div className={styles.secondLine}>
                              <p className={styles.region}>
                                {rawData.location} ??
                              </p>
                              <p className={styles.time}>
                                {calculateTimeDifference(
                                  rawData.created_at,
                                  rawData.last_bring_up_my_post
                                )}
                              </p>
                            </div>
                            <div className={styles.thirdLine}>
                              {rawData.status === "RESERVED" && (
                                <div className={styles.reservation}>?????????</div>
                              )}
                              {rawData.status === "SOLD_OUT" && (
                                <div className={styles.saleClosed}>
                                  ????????????
                                </div>
                              )}
                              <p className={styles.price}>
                                {rawData.price !== 0 &&
                                  rawData.price.toLocaleString("ko-KR") + "???"}
                                {rawData.price === 0 && "??????????"}
                              </p>
                            </div>
                            <div className={styles.lastLine}>
                              {rawData.chats !== 0 && (
                                <div className={styles.chatContainer}>
                                  <img
                                    className={styles.chatImg}
                                    src={chatIcon}
                                    alt="??????"
                                  />
                                  <p className={styles.chat}>{rawData.chats}</p>
                                </div>
                              )}
                              {rawData.likes !== 0 && (
                                <div className={styles.heartContainer}>
                                  <img
                                    className={styles.heartImg}
                                    src={heartIcon}
                                    alt="?????????"
                                  />
                                  <p className={styles.heart}>
                                    {rawData.likes}
                                  </p>
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
                            alt="?????? ?????????"
                          />
                          <div className={styles.dataContainer}>
                            <p className={styles.title}>{rawData.title}</p>
                            <div className={styles.secondLine}>
                              <p className={styles.region}>
                                {rawData.location} ??
                              </p>
                              <p className={styles.time}>
                                {calculateTimeDifference(
                                  rawData.created_at,
                                  rawData.last_bring_up_my_post
                                )}
                              </p>
                            </div>
                            <div className={styles.thirdLine}>
                              {rawData.status === "RESERVED" && (
                                <div className={styles.reservation}>?????????</div>
                              )}
                              {rawData.status === "SOLD_OUT" && (
                                <div className={styles.saleClosed}>
                                  ????????????
                                </div>
                              )}
                              <p className={styles.price}>
                                {rawData.price !== 0 &&
                                  rawData.price.toLocaleString("ko-KR") + "???"}
                                {rawData.price === 0 && "??????????"}
                              </p>
                            </div>
                            <div className={styles.lastLine}>
                              {rawData.chats !== 0 && (
                                <div className={styles.chatContainer}>
                                  <img
                                    className={styles.chatImg}
                                    src={chatIcon}
                                    alt="??????"
                                  />
                                  <p className={styles.chat}>{rawData.chats}</p>
                                </div>
                              )}
                              {rawData.likes !== 0 && (
                                <div className={styles.heartContainer}>
                                  <img
                                    className={styles.heartImg}
                                    src={heartIcon}
                                    alt="?????????"
                                  />
                                  <p className={styles.heart}>
                                    {rawData.likes}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                  })
                ) : (
                  <div className={styles.noResultWrapper}>
                    <img src={noResults} className={styles.noResults} />
                    <p className={styles.noResultsMessage}>
                      ???! ???????????? ????????????
                    </p>
                    <p className={styles.noResultsMessage}>
                      <span className={styles.noResultsKeyword}>{keyword}</span>
                      ??? ??????????????? ?????????.
                    </p>
                    <p className={styles.noResultsMessage}>
                      ???????????? ?????? ??????????????????!
                    </p>
                    <div className={styles.guideWrapper}>
                      <h1 className={styles.guideHeader}>????????? ????????????.</h1>
                      <ul className={styles.guideUl}>
                        <li>???????????? ???????????? ?????????????????? ??????????????????.</li>
                        <li>
                          ???????????? ???????????? ??????????????????. (???: ?????? ?????? ??? ??????)
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
      {isFilterModalOpen && (
        <SearchFilter
          setIsFilterModalOpen={setIsFilterModalOpen}
          filterInfo={filterInfo}
          setFilterInfo={setFilterInfo}
          setFiltered={setFiltered}
          setPageNumber={setPageNumber}
        />
      )}
    </>
  );
};

export default SearchPage;
