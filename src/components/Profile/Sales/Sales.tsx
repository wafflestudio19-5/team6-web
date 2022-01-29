import styles from "./Sales.module.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BackArrowIcon from "../../../icons/leftArrow.png";
import Button from "@mui/material/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import SalesArticle from "./SalesArticle/SalesArticle";
import { productType } from "../../../type/types";
import requester from "../../../apis/requester";
import { GetMyProductsDto } from "../../../type/dto/for-api/get-my-products.dto";

type Point = {
  x: number;
  y: number;
};

const Sales = () => {
  const [mode, setMode] = useState<string>("");
  const [salesList, setSalesList] = useState<productType[]>([]);
  const [onSaleList, setOnSaleList] = useState<productType[]>([]);
  const [soldList, setSoldList] = useState<productType[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { name } = useParams() as { name: string };
  const params = new URLSearchParams(location.search);
  const modeQuery = params.get("mode");
  const [isLast, setIsLast] = useState<{
    entire: boolean;
    forSale: boolean;
    sold: boolean;
  }>({ entire: false, forSale: false, sold: false });
  const [bottom, setBottom] = useState<{
    entire: boolean;
    forSale: boolean;
    sold: boolean;
  }>({ entire: false, forSale: false, sold: false });
  const [pageCount, setPageCount] = useState<{
    entire: number;
    forSale: number;
    sold: number;
  }>({ entire: 0, forSale: 0, sold: 0 });
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLast && bottom) {
      (async () => {
        await getSalesAll();
      })();
    }
  }, [bottom.entire]);

  useEffect(() => {
    if (!isLast && bottom) {
      (async () => {
        await getSalesForSale();
      })();
    }
  }, [bottom.forSale]);

  useEffect(() => {
    if (!isLast && bottom) {
      (async () => {
        await getSalesSoldOut();
      })();
    }
  }, [bottom.sold]);

  const handleScroll = useCallback(() => {
    if (modeQuery === "entire") {
      if (!isLast.entire && listRef.current) {
        const { clientHeight, scrollHeight, scrollTop } = listRef.current;
        console.log(scrollTop, clientHeight, scrollHeight);
        if (Math.round(scrollTop + clientHeight) >= scrollHeight - 200) {
          if (!bottom.entire) {
            setBottom({ ...bottom, entire: true });
          }
        }
      }
    } else if (modeQuery === "on-sale") {
      if (!isLast.forSale && listRef.current) {
        const { clientHeight, scrollHeight, scrollTop } = listRef.current;
        console.log(scrollTop, clientHeight, scrollHeight);
        if (Math.round(scrollTop + clientHeight) >= scrollHeight - 200) {
          if (!bottom.forSale) {
            setBottom({ ...bottom, forSale: true });
          }
        }
      }
    } else {
      if (!isLast.sold && listRef.current) {
        const { clientHeight, scrollHeight, scrollTop } = listRef.current;
        console.log(scrollTop, clientHeight, scrollHeight);
        if (Math.round(scrollTop + clientHeight) >= scrollHeight - 200) {
          if (!bottom.sold) {
            setBottom({ ...bottom, sold: true });
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    modeQuery && setMode(modeQuery);
    getSalesAll();
    getSalesForSale();
    getSalesSoldOut();
  }, []);

  const getSalesAll = () => {
    requester
      .get(
        `/users/${name}/products/?pageNumber=${pageCount.entire}&pageSize=10&status=all`
      )
      .then((res) => {
        setSalesList(salesList.concat(res.data.content));
        setIsLast(res.data.last);
        setPageCount({ ...pageCount, entire: pageCount.entire + 1 });
      })
      .catch(() => {
        console.log("전체 목록 받아오기 오류");
      });
  };

  const getSalesForSale = () => {
    requester
      .get(
        `/users/${name}/products/?pageNumber=${pageCount.forSale}&pageSize=10&status=for-sale`
      )
      .then((res) => {
        setOnSaleList(onSaleList.concat(res.data.content));
        setSalesList(res.data.content);
        setIsLast(res.data.last);
        setPageCount({ ...pageCount, entire: pageCount.entire + 1 });
      })
      .catch(() => {
        console.log("판매중 목록 받아오기 오류");
      });
  };

  const getSalesSoldOut = () => {
    requester
      .get(
        `/users/${name}/products/?pageNumber=${pageCount.sold}&pageSize=10&status=sold-out`
      )
      .then((res) => {
        setSoldList(soldList.concat(res.data.content));
        setSalesList(res.data.content);
        setIsLast(res.data.last);
        setPageCount({ ...pageCount, sold: pageCount.sold + 1 });
      })
      .catch(() => {
        console.log("판매완료 목록 받아오기 오류");
      });
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <button
          className={styles.back}
          onClick={() => navigate(`/profile/${name}`)}
        >
          <img src={BackArrowIcon} alt="뒤로" />
        </button>
        <p>판매 상품 보기</p>
      </header>
      <div className={styles["upper-tabs"]}>
        <Button
          className={
            mode === "entire"
              ? `${styles.entire} ${styles.selected} ${styles.tab}`
              : `${styles.entire} ${styles.tab}`
          }
          onClick={() => {
            navigate(`/profile/${name}/sales?mode=entire`, { replace: true });
            setMode("entire");
          }}
        >
          전체
        </Button>
        <Button
          className={
            mode === "on-sale"
              ? `${styles["on-sale"]} ${styles.selected} ${styles.tab}`
              : `${styles["on-sale"]} ${styles.tab}`
          }
          onClick={() => {
            navigate(`/profile/${name}/sales?mode=on-sale`, { replace: true });
            setMode("on-sale");
          }}
        >
          판매중
        </Button>
        <Button
          className={
            mode === "sold"
              ? `${styles.sold} ${styles.selected} ${styles.tab}`
              : `${styles.sold} ${styles.tab}`
          }
          onClick={() => {
            navigate(`/profile/${name}/sales?mode=sold`, { replace: true });
            setMode("sold");
          }}
        >
          판매완료
        </Button>
        <div className={`${styles.underline} ${styles[mode]}`} />
      </div>
      <div
        ref={listRef}
        onScroll={handleScroll}
        className={styles["body-wrapper"]}
      >
        {mode === "entire" &&
          salesList?.map((article) => (
            <SalesArticle key={article.id} article={article} />
          ))}
        {mode === "on-sale" &&
          onSaleList?.map((article) => (
            <SalesArticle key={article.id} article={article} />
          ))}
        {mode === "sold" &&
          soldList?.map((article) => (
            <SalesArticle key={article.id} article={article} />
          ))}
        {mode === "entire" && salesList?.length === 0 && (
          <div className={styles.empty}>
            <span className={styles.first}>게시글이 없어요.</span>
          </div>
        )}
        {mode === "on-sale" && onSaleList?.length === 0 && (
          <div className={styles.empty}>
            <span className={styles.second}>판매중인 게시글이 없어요.</span>
          </div>
        )}
        {mode === "sold" && soldList?.length === 0 && (
          <div className={styles.empty}>
            <span className={styles.third}>거래완료된 게시글이 없어요.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sales;
