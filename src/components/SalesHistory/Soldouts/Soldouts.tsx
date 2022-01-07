import styles from "./Soldouts.module.scss";
import chatIcon from "../../../icons/chat.png";
import heartIcon from "../../../icons/blackHeart.png";
import moreActions from "../../../icons/more.png";
import { myProductsData } from "../../../type/types";
import { requester } from "../../../apis/requester";
import { calculateTimeDifference } from "../../Utilities/functions";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { srcPair } from "../SalesHistory";

import { useNavigate } from "react-router-dom";

const Soldouts = (props: {
  soldoutList: myProductsData[];
  setSoldoutActions: Dispatch<SetStateAction<boolean>>;
  setActionTarget: Dispatch<SetStateAction<number>>;
}) => {
  const [srcList, setSrcList] = useState<srcPair[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    props.soldoutList.forEach((article) => {
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
        .catch((e) => console.log("??", e));
    });
  }, []);

  const goToProductPage = (data: myProductsData) => {
    navigate(`/article/${data.id}`, {
      state: { prev: "sales-history" },
    });
  };
  const changeToVisible = (data: myProductsData) => {
    requester
      .put(`/products/${data.id}/status/`, { action: "show" })
      .catch((e) => console.log(e));
  };

  const handleAction = (id: number) => {
    props.setSoldoutActions(true);
    props.setActionTarget(id);
  };

  const soldoutComponents = props.soldoutList.map((article) => {
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
                {calculateTimeDifference(article.created_at)}
              </p>
            </div>
            <div className={styles.thirdLine}>
              {article.status === "SOLD_OUT" && (
                <div className={styles.saleClosed}>거래완료</div>
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
      {props.soldoutList.length ? (
        <>{soldoutComponents}</>
      ) : (
        <p>거래완료된 게시물이 없어요.</p>
      )}
    </div>
  );
};

export default Soldouts;
