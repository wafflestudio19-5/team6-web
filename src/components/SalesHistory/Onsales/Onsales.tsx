import styles from "./Onsales.module.scss";
import chatIcon from "../../../icons/chat.png";
import heartIcon from "../../../icons/blackHeart.png";
import requester from "../../../apis/requester";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import moreActions from "../../../icons/more.png";
import { useNavigate } from "react-router-dom";
import { calculateTimeDifference } from "../../Utilities/functions";
import { ActionTarget, srcPair } from "../SalesHistory";
import { ProductSimpleWithoutUserDto } from "../../../type/dto/product-simple-without-user.dto";
import { GetMyProductsDto } from "../../../type/dto/for-api/get-my-products.dto";
import { SalesStatus } from "../../../type/enum/sales-status";
import { ProductStatusAction } from "../../../type/enum/product-status-action";

const Onsales = (props: {
  setOnsaleActions: Dispatch<SetStateAction<boolean>>;
  setActionTarget: Dispatch<SetStateAction<ActionTarget>>;
}) => {
  const [onsaleList, setOnsaleList] = useState<ProductSimpleWithoutUserDto[]>(
    []
  );
  useEffect(() => {
    requester
      .get<GetMyProductsDto>(
        "/users/me/products/?pageNumber=0&pageSize=15&status=for-sale"
      )
      .then((res) => {
        setOnsaleList(res.data.content);
      });
  }, []);

  const navigate = useNavigate();

  const changeToReserved = (data: ProductSimpleWithoutUserDto) => {
    requester
      .put(`/products/${data.id}/status/`, {
        action: ProductStatusAction.RESERVED,
      })
      .then((res) => {
        setOnsaleList(
          onsaleList.map((product) => {
            if (product.id !== data.id) {
              return product;
            } else {
              return { ...product, status: SalesStatus.RESERVED };
            }
          })
        );
      })
      .catch((e) => console.log(e));
  };
  const changeToOnsale = (data: ProductSimpleWithoutUserDto) => {
    requester
      .put(`/products/${data.id}/status/`, {
        action: ProductStatusAction.FOR_SALE,
      })
      .then((res) => {
        setOnsaleList(
          onsaleList.map((product) => {
            if (product.id !== data.id) {
              return product;
            } else {
              return { ...product, status: SalesStatus.FOR_SALE };
            }
          })
        );
      })
      .catch((e) => console.log(e));
  };
  const changeToSoldout = (data: ProductSimpleWithoutUserDto) => {
    // (next) make it possible to select the buyer
    requester
      .put(`/products/${data.id}/status/`, {
        action: ProductStatusAction.SOLD_OUT,
      })
      .then((res) => {
        setOnsaleList(onsaleList.filter((product) => product.id !== data.id));
      })
      .catch((e) => console.log(e));
  };
  const goToProductPage = (data: ProductSimpleWithoutUserDto) => {
    navigate(`/article/${data.id}`, {
      state: { prev: "sales-history" },
    });
  };
  const handleAction = (id: number) => {
    props.setOnsaleActions(true);
    props.setActionTarget({
      id: id,
      list: onsaleList,
      dispatch: setOnsaleList,
    });
  };

  const onsaleComponents = onsaleList.map((article) => {
    return (
      <div className={styles.articleWrapper}>
        <div
          className={styles.clickArea}
          onClick={() => goToProductPage(article)}
        />
        <div className={styles.upper}>
          <img
            className={styles.thumbnail}
            src={article.image_url}
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
                {calculateTimeDifference(
                  article.created_at,
                  article.last_bring_up_my_post
                )}
              </p>
            </div>
            <div className={styles.thirdLine}>
              {article.status === SalesStatus.RESERVED && (
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
            {article.status === SalesStatus.FOR_SALE ? (
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
      {onsaleList.length ? (
        <>{onsaleComponents}</>
      ) : (
        <p>판매중인 게시물이 없어요.</p>
      )}
    </div>
  );
};
export default Onsales;
