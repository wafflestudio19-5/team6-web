import styles from "./Requests.module.scss";
import chatIcon from "../../../icons/chat.png";
import heartIcon from "../../../icons/blackHeart.png";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { myRequestData } from "../../../type/types";
import { useNavigate } from "react-router-dom";
import { calculateTimeDifference } from "../../Utilities/functions";
import { srcPair } from "../PurchaseHistory";

import bell from "../../../icons/bell.png";
import requester from "../../../apis/requester";
import { TUserInfo } from "../../../type/user";

const Requests = (props: {
  requestList: myRequestData[];
  setRequestUser: Dispatch<SetStateAction<TUserInfo | null>>;
  srcList: srcPair[];
}) => {
  const navigate = useNavigate();

  const goToProductPage = (id: number) => {
    navigate(`/article/${id}`, {
      state: { prev: "purchase-history" },
    });
  };

  const changeToRequestPage = (id: number) => {
    /* (now) 구매 요청 페이지 구현 후 연결
    navigate(`/request/${id}`, {
      state: { prev: "purchase-history" },
    });
     */
  };

  const cancelRequest = (data: myRequestData) => {
    // (next) api doesn't return the request id
  };

  const handleAction = (data: myRequestData) => {
    props.setRequestUser(data.product.user);
  };

  const requestComponents = props.requestList.map((article) => {
    return (
      <div className={styles.articleWrapper}>
        <div
          className={styles.clickArea}
          onClick={() => goToProductPage(article.product.id)}
        />
        <div className={styles.upper}>
          <img
            className={styles.thumbnail}
            src={
              props.srcList.find((pair) => pair.id === article.product.id)?.src
            }
            alt="대표 이미지"
          />
          <div className={styles.dataContainer}>
            <div className={styles.firstLine}>
              <p className={styles.title}>{article.product.title}</p>
              {article.accepted && (
                <img
                  className={styles.bell}
                  src={bell}
                  onClick={() => handleAction(article)}
                />
              )}
            </div>
            <div className={styles.secondLine}>
              <p className={styles.region}>{article.product.location} ·</p>
              <p className={styles.time}>
                {calculateTimeDifference(
                  article.product.created_at,
                  article.product.last_bring_up_my_post
                )}
              </p>
            </div>
            <div className={styles.thirdLine}>
              {article.product.status === "RESERVED" && (
                <div className={styles.reservation}>예약중</div>
              )}
              <p className={styles.price}>
                {article.product.price.toLocaleString("ko-KR")}원
              </p>
            </div>
            <div className={styles.lastLine}>
              {article.product.chats !== 0 && (
                <div className={styles.chatContainer}>
                  <img
                    className={styles.chatImg}
                    src={chatIcon}
                    alt="거래요청"
                  />
                  <p className={styles.chat}>{article.product.chats}</p>
                </div>
              )}
              {article.product.likes !== 0 && (
                <div className={styles.heartContainer}>
                  <img
                    className={styles.heartImg}
                    src={heartIcon}
                    alt="좋아요"
                  />
                  <p className={styles.heart}>{article.product.likes}</p>
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
              onClick={() => changeToRequestPage(article.product.id)}
            >
              요청 가격 변경
            </div>
            <div className={styles.verticalLine} />
            <div
              className={styles.button}
              onClick={() => cancelRequest(article)}
            >
              요청 취소
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={styles.wrapper}>
      {props.requestList.length ? (
        <>{requestComponents}</>
      ) : (
        <p>거래 요청중인 게시물이 없어요.</p>
      )}
    </div>
  );
};
export default Requests;
