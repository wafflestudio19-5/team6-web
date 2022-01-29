import styles from "./Soldouts.module.scss";
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
import { useNavigate } from "react-router-dom";
import { ProductSimpleWithoutUserDto } from "../../../type/dto/product-simple-without-user.dto";
import { GetMyProductsDto } from "../../../type/dto/for-api/get-my-products.dto";
import { ActionTarget } from "../SalesHistory";

const Soldouts = (props: {
  setSoldoutActions: Dispatch<SetStateAction<boolean>>;
  setActionTarget: Dispatch<SetStateAction<ActionTarget>>;
}) => {
  const [soldoutList, setSoldoutList] = useState<ProductSimpleWithoutUserDto[]>(
    []
  );
  const [isLast, setIsLast] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const getNewProducts = async () => {
    try {
      const response = await requester.get<GetMyProductsDto>(
        `/users/me/products/?pageNumber=${pageCount}&pageSize=10&status=sold-out`
      );
      setIsLast(response.data.last);
      setPageCount(pageCount + 1);
      setSoldoutList(soldoutList.concat(response.data.content));
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

  const goToProductPage = (data: ProductSimpleWithoutUserDto) => {
    navigate(`/article/${data.id}`, {
      state: { prev: "sales-history" },
    });
  };
  const changeToVisible = (data: ProductSimpleWithoutUserDto) => {
    requester
      .put(`/products/${data.id}/status/`, { action: "for-sale" })
      .catch((e) => console.log(e));
  };

  const handleAction = (id: number) => {
    props.setSoldoutActions(true);
    props.setActionTarget({
      id: id,
      dispatch: setSoldoutList,
      list: soldoutList,
    });
  };

  const soldoutComponents = soldoutList.map((article) => {
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
      </div>
    );
  });

  return (
    <div ref={listRef} className={styles.wrapper} onScroll={handleScroll}>
      {soldoutList.length ? (
        <>{soldoutComponents}</>
      ) : (
        <p className={styles.emptyText}>거래완료된 게시물이 없어요.</p>
      )}
    </div>
  );
};

export default Soldouts;
