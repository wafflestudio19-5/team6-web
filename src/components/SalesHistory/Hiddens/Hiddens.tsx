import styles from "./Hiddens.module.scss";
import chatIcon from "../../../icons/chat.png";
import heartIcon from "../../../icons/blackHeart.png";
import moreActions from "../../../icons/more.png";
import requester from "../../../apis/requester";
import { calculateTimeDifference } from "../../Utilities/functions";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ActionTarget } from "../SalesHistory";

import { useNavigate } from "react-router-dom";
import { ProductSimpleWithoutUserDto } from "../../../type/dto/product-simple-without-user.dto";
import { GetMyProductsDto } from "../../../type/dto/for-api/get-my-products.dto";

const Hiddens = (props: {
  setHiddenActions: Dispatch<SetStateAction<boolean>>;
  setActionTarget: Dispatch<SetStateAction<ActionTarget>>;
}) => {
  const [hiddenList, setHiddenList] = useState<ProductSimpleWithoutUserDto[]>(
    []
  );
  const [isLast, setIsLast] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const getNewProducts = async () => {
    try {
      const response = await requester.get<GetMyProductsDto>(
        `/users/me/products/?pageNumber=${pageCount}&pageSize=10&status=hidden`
      );
      setIsLast(response.data.last);
      setPageCount(pageCount + 1);
      setHiddenList(hiddenList.concat(response.data.content));
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

  const changeToVisible = (data: ProductSimpleWithoutUserDto) => {
    requester
      .put(`/products/${data.id}/status/`, { action: "show" })
      .then((res) => {
        setHiddenList(hiddenList.filter((product) => product.id !== data.id));
      })
      .catch((e) => console.log(e));
  };

  const goToProductPage = (data: ProductSimpleWithoutUserDto) => {
    navigate(`/article/${data.id}`, {
      state: { prev: "sales-history" },
    });
  };
  const handleAction = (id: number) => {
    props.setHiddenActions(true);
    props.setActionTarget({
      id: id,
      list: hiddenList,
      dispatch: setHiddenList,
    });
  };

  const hiddenComponents = hiddenList.map((article) => {
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
              {article.status === "SOLD_OUT" && (
                <div className={styles.saleClosed}>????????????</div>
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
            <div
              className={styles.button}
              onClick={() => changeToVisible(article)}
            >
              ????????? ??????
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div ref={listRef} className={styles.wrapper}>
      {hiddenList.length ? (
        <>{hiddenComponents}</>
      ) : (
        <p className={styles.emptyText}>???????????? ???????????? ?????????.</p>
      )}
    </div>
  );
};
export default Hiddens;
