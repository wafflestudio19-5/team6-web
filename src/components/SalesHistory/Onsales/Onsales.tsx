import styles from "./Onsales.module.scss";
import chatIcon from "../../../icons/chat.png";
import heartIcon from "../../../icons/blackHeart.png";
import requester from "../../../apis/requester";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import moreActions from "../../../icons/more.png";
import { myProductsData } from "../../../type/product";
import { useNavigate } from "react-router-dom";
import { calculateTimeDifference } from "../../Utilities/functions";
import { srcPair } from "../SalesHistory";

const Onsales = (props: {
  onsaleList: myProductsData[];
  setUpdate: Dispatch<SetStateAction<boolean>>;
  setOnsaleActions: Dispatch<SetStateAction<boolean>>;
  setActionTarget: Dispatch<SetStateAction<number>>;
}) => {
  const navigate = useNavigate();
  const [srcList, setSrcList] = useState<srcPair[]>([]);

  useEffect(() => {
    props.onsaleList.forEach((article) =>
      requester
        .get(`/images/${article.image}/`)
        .then((res) => {
          setSrcList((srcList) => [
            ...srcList,
            {
              id: article.id,
              src: res.data.url,
            },
          ]);
        })
        .catch((e) => console.log(e))
    );
  }, []);

  const changeToReserved = (data: myProductsData) => {
    requester
      .put(`/products/${data.id}/status/`, { action: "reserved" })
      .then((res) => {
        props.setUpdate((update) => !update);
      })
      .catch((e) => console.log(e));
  };
  const changeToOnsale = (data: myProductsData) => {
    requester
      .put(`/products/${data.id}/status/`, { action: "for sale" })
      .then((res) => {
        props.setUpdate((update) => !update);
      })
      .catch((e) => console.log(e));
  };
  const changeToSoldout = (data: myProductsData) => {
    // (next) make it possible to select the buyer
    requester
      .put(`/products/${data.id}/status/`, { action: "sold out" })
      .then((res) => {
        props.setUpdate((update) => !update);
      })
      .catch((e) => console.log(e));
  };
  const goToProductPage = (data: myProductsData) => {
    navigate(`/article/${data.id}`, {
      state: { prev: "sales-history" },
    });
  };
  const handleAction = (id: number) => {
    props.setOnsaleActions(true);
    props.setActionTarget(id);
  };

  const onsaleComponents = props.onsaleList.map((article) => {
    return (
      <div className={styles.articleWrapper}>
        <div
          className={styles.clickArea}
          onClick={() => goToProductPage(article)}
        />
        <div className={styles.upper}>
          <img
            className={styles.thumbnail}
            src={srcList.find((pair) => pair.id === article.id)?.src}
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
                {calculateTimeDifference(article.created_at, article.last_bring_up_my_post)}
              </p>
            </div>
            <div className={styles.thirdLine}>
              {article.status === "RESERVED" && (
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
        <div className={styles.lower}>
          <div className={styles.line} />
          <div className={styles.buttons}>
            {article.status === "FOR_SALE" ? (
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
              onClick={() => changeToSoldout(article)}
            >
              거래 완료로 변경
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
export default Onsales;
