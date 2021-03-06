import styles from "./Onsales.module.scss";
import chatIcon from "../../../icons/chat.png";
import heartIcon from "../../../icons/blackHeart.png";
import requester from "../../../apis/requester";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
  const [isLast, setIsLast] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const getNewProducts = async () => {
    try {
      const response = await requester.get<GetMyProductsDto>(
        `/users/me/products/?pageNumber=${pageCount}&pageSize=10&status=for-sale`
      );
      setIsLast(response.data.last);
      setPageCount(pageCount + 1);
      setOnsaleList(onsaleList.concat(response.data.content));
    } catch (e) {
      return undefined;
    }
  };
  useEffect(() => {
    (async () => {
      await getNewProducts();
    })();
  }, []);

  useEffect(() => {
    if (!isLast && bottom) {
      (async () => {
        await getNewProducts();
      })();
    }
  }, [bottom]);

  const handleScroll = useCallback(() => {
    if (!isLast && listRef.current) {
      const { clientHeight, scrollHeight, scrollTop } = listRef.current;
      if (Math.round(scrollTop + clientHeight) >= scrollHeight - 200) {
        if (!bottom) {
          setBottom(true);
        }
      }
    }
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
      <div key={article.id} className={styles.articleWrapper}>
        <div
          className={styles.clickArea}
          onClick={() => goToProductPage(article)}
        />
        <div className={styles.upper}>
          <img
            className={styles.thumbnail}
            src={article.image_url}
            alt="?????? ?????????"
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
              <p className={styles.region}>{article.location} ??</p>
              <p className={styles.time}>
                {calculateTimeDifference(
                  article.created_at,
                  article.last_bring_up_my_post
                )}
              </p>
            </div>
            <div className={styles.thirdLine}>
              {article.status === SalesStatus.RESERVED && (
                <div className={styles.reservation}>?????????</div>
              )}
              <p className={styles.price}>
                {article.price.toLocaleString("ko-KR")}???
              </p>
            </div>
            <div className={styles.lastLine}>
              {article.chats !== 0 && (
                <div className={styles.chatContainer}>
                  <img
                    className={styles.chatImg}
                    src={chatIcon}
                    alt="????????????"
                  />
                  <p className={styles.chat}>{article.chats}</p>
                </div>
              )}
              {article.likes !== 0 && (
                <div className={styles.heartContainer}>
                  <img
                    className={styles.heartImg}
                    src={heartIcon}
                    alt="?????????"
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
                ??????????????? ??????
              </div>
            ) : (
              <div
                className={styles.button}
                onClick={() => changeToOnsale(article)}
              >
                ??????????????? ??????
              </div>
            )}
            <div className={styles.verticalLine} />
            <div
              className={styles.button}
              onClick={() => changeToSoldout(article)}
            >
              ?????? ????????? ??????
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div ref={listRef} onScroll={handleScroll} className={styles.wrapper}>
      {onsaleList.length ? (
        <div>{onsaleComponents}</div>
      ) : (
        <p className={styles.emptyText}>???????????? ???????????? ?????????.</p>
      )}
    </div>
  );
};
export default Onsales;
