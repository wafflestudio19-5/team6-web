import { Link, useNavigate } from "react-router-dom";
import styles from "./Likes.module.scss";
import BackArrow from "../../icons/leftArrow.png";
import { useCallback, useEffect, useRef, useState } from "react";
import requester from "../../apis/requester";
import { GetMyLikesDto } from "../../type/dto/for-api/get-my-likes.dto";
import { calculateTimeDifference } from "../Utilities/functions";
import { SalesStatus } from "../../type/enum/sales-status";
import chatIcon from "../../icons/chat.png";
import heartIcon from "../../icons/blackHeart.png";
import { ProductSimpleDto } from "../../type/dto/product-simple.dto";
import { ProductSimpleWithoutUserDto } from "../../type/dto/product-simple-without-user.dto";
import redHeartIcon from "../../icons/redHeart.png";
import blackHeartIcon from "../../icons/blackHeart.png";
import { GetMyPurchaseOrdersDto } from "../../type/dto/for-api/get-my-purchase-orders.dto";

const Likes = () => {
  const [likes, setLikes] = useState<
    { product: ProductSimpleDto; liked: boolean }[]
  >([]);
  const navigate = useNavigate();

  const [isLast, setIsLast] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const getNewProducts = async () => {
    try {
      const response = await requester.get<GetMyLikesDto>(
        `/users/me/likes/?pageNumber=${pageCount}&pageSize=15`
      );
      setIsLast(response.data.last);
      setPageCount(pageCount + 1);
      setLikes(
        likes.concat(
          response.data.content.map((like) => ({ product: like, liked: true }))
        )
      );
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
  useEffect(() => {
    requester
      .get<GetMyLikesDto>("/users/me/likes/?pageNumber=0&pageSize=15")
      .then((res) => {
        setLikes(
          res.data.content.map((product) => ({ product: product, liked: true }))
        );
      });
  }, []);

  const goToProductPage = (data: ProductSimpleWithoutUserDto) => {
    navigate(`/article/${data.id}`, {
      state: { prev: "likes" },
    });
  };

  const handleLike = async (id: number) => {
    await requester.post(`/products/${id}/likes/`);
    setLikes(
      likes.map((article) => ({ product: article.product, liked: true }))
    );
  };

  const handleUnlike = async (id: number) => {
    await requester.delete(`/products/${id}/likes/`);
    setLikes(
      likes.map((article) => ({ product: article.product, liked: false }))
    );
  };

  const likeComponents = likes.map((article) => {
    return (
      <div className={styles.articleWrapper}>
        <div
          className={styles.clickArea}
          onClick={() => goToProductPage(article.product)}
        />
        <div className={styles.upper}>
          <img
            className={styles.thumbnail}
            src={article.product.image_url}
            alt="대표 이미지"
          />
          <div className={styles.dataContainer}>
            <div className={styles.firstLine}>
              <p className={styles.title}>{article.product.title}</p>
              {article.liked ? (
                <img
                  className={styles.like}
                  src={redHeartIcon}
                  onClick={() => handleUnlike(article.product.id)}
                />
              ) : (
                <img
                  className={styles.like}
                  src={blackHeartIcon}
                  onClick={() => handleLike(article.product.id)}
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
              {article.product.status === SalesStatus.RESERVED && (
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
      </div>
    );
  });

  return (
    <div className={styles["likes-wrapper"]}>
      <header>
        <Link to="/main" state={{ page: "user" }} className={styles.back}>
          <img src={BackArrow} alt="뒤로" />
        </Link>
        <p>관심목록</p>
      </header>
      <div className={styles.wrapper}>
        {likes.length ? (
          <>{likeComponents}</>
        ) : (
          <p className={styles.emptyText}>관심 목록이 비었어요.</p>
        )}
      </div>
    </div>
  );
};

export default Likes;
