import styles from "./Sales.module.scss";
import { Link } from "react-router-dom";
import BackArrowIcon from "../../../icons/leftArrow.png";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import SalesArticle from "./SalesArticle/SalesArticle";
import { myProductsData } from "../../../type/product";
import { requester } from "../../../apis/requester";
import { srcPair } from "../../SalesHistory/SalesHistory";

const Sales = () => {
  const [mode, setMode] = useState<string>("one");
  const [srcList, setSrcList] = useState<srcPair[]>([]);
  const [salesList, setSalesList] = useState<myProductsData[] | null>(null);
  const [onSaleList, setOnSaleList] = useState<myProductsData[] | null>(null);
  const [soldList, setSoldList] = useState<myProductsData[] | null>(null);

  useEffect(() => {
    getMySales();
  }, []);

  const getMySales = async () => {
    try {
      const res = await requester.get(
        "/users/me/products/?pageNumber=0&pageSize=15"
      );
      console.log(res.data.content);
      setSalesList(res.data.content);
      setOnSaleList(
        res.data.content.filter(
          (data: myProductsData) =>
            data.status === "FOR_SALE" || data.status === "RESERVED"
        )
      );
      setSoldList(
        res.data.content.filter(
          (data: myProductsData) => data.status === "SOLD_OUT"
        )
      );
      res.data.content.forEach((article: myProductsData) =>
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
    } catch (error) {
      console.log("get sales error");
    }
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <Link to="/main" state={{ page: "user" }} className={styles.back}>
          <img src={BackArrowIcon} alt="뒤로" />
        </Link>
        <p>판매 상품 보기</p>
      </header>
      <div className={styles["upper-tabs"]}>
        <Button
          className={
            mode === "one"
              ? `${styles.entire} ${styles.selected} ${styles.tab}`
              : `${styles.entire} ${styles.tab}`
          }
          onClick={() => {
            setMode("one");
          }}
        >
          전체
        </Button>
        <Button
          className={
            mode === "two"
              ? `${styles["on-sale"]} ${styles.selected} ${styles.tab}`
              : `${styles["on-sale"]} ${styles.tab}`
          }
          onClick={() => {
            setMode("two");
          }}
        >
          판매중
        </Button>
        <Button
          className={
            mode === "three"
              ? `${styles.sold} ${styles.selected} ${styles.tab}`
              : `${styles.sold} ${styles.tab}`
          }
          onClick={() => {
            setMode("three");
          }}
        >
          판매완료
        </Button>
        <div className={`${styles.underline} ${styles[mode]}`} />
      </div>
      <div className={styles["body-wrapper"]}>
        {mode === "one" &&
          salesList?.map((article) => (
            <SalesArticle
              key={article.id}
              article={article}
              srcList={srcList}
            />
          ))}
        {mode === "two" &&
          onSaleList?.map((article) => (
            <SalesArticle
              key={article.id}
              article={article}
              srcList={srcList}
            />
          ))}
        {mode === "three" &&
          soldList?.map((article) => (
            <SalesArticle
              key={article.id}
              article={article}
              srcList={srcList}
            />
          ))}
        {mode === "one" && salesList?.length === 0 && (
          <div className={styles.empty}>
            <span className={styles.first}>게시글이 없어요.</span>
          </div>
        )}
        {mode === "two" && onSaleList?.length === 0 && (
          <div className={styles.empty}>
            <span className={styles.second}>판매중인 게시글이 없어요.</span>
          </div>
        )}
        {mode === "three" && soldList?.length === 0 && (
          <div className={styles.empty}>
            <span className={styles.third}>거래완료된 게시글이 없어요.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sales;
