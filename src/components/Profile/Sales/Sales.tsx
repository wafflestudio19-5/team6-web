import styles from "./Sales.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BackArrowIcon from "../../../icons/leftArrow.png";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import SalesArticle from "./SalesArticle/SalesArticle";
import { productType } from "../../../type/types";
import requester from "../../../apis/requester";
import { srcPair } from "../../SalesHistory/SalesHistory";

const Sales = () => {
  const [mode, setMode] = useState<string>("");
  const [srcList, setSrcList] = useState<srcPair[]>([]);
  const [salesList, setSalesList] = useState<productType[] | null>(null);
  const [onSaleList, setOnSaleList] = useState<productType[] | null>(null);
  const [soldList, setSoldList] = useState<productType[] | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const modeQuery = params.get("mode");

  useEffect(() => {
    modeQuery && setMode(modeQuery);
    getMySales();
  }, []);

  const getMySales = async () => {
    try {
      const res = await requester.get(
        "/users/me/products/?pageNumber=0&pageSize=20&status=for-sale"
      );
      setSalesList(res.data.content);
      setOnSaleList(
        res.data.content.filter(
          (data: productType) =>
            data.status === "FOR_SALE" || data.status === "RESERVED"
        )
      );
      setSoldList(
        res.data.content.filter(
          (data: productType) => data.status === "SOLD_OUT"
        )
      );
      res.data.content.forEach((article: productType) =>
        requester
          .get(`/images/${article.image_url}/`)
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
        <Link to="/profile" className={styles.back}>
          <img src={BackArrowIcon} alt="뒤로" />
        </Link>
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
            navigate("/profile/sales?mode=entire", { replace: true });
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
            navigate("/profile/sales?mode=on-sale", { replace: true });
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
            navigate("/profile/sales?mode=sold", { replace: true });
            setMode("sold");
          }}
        >
          판매완료
        </Button>
        <div className={`${styles.underline} ${styles[mode]}`} />
      </div>
      <div className={styles["body-wrapper"]}>
        {mode === "entire" &&
          salesList?.map((article) => (
            <SalesArticle
              key={article.id}
              mode={mode}
              article={article}
              srcList={srcList}
            />
          ))}
        {mode === "on-sale" &&
          onSaleList?.map((article) => (
            <SalesArticle
              key={article.id}
              mode={mode}
              article={article}
              srcList={srcList}
            />
          ))}
        {mode === "sold" &&
          soldList?.map((article) => (
            <SalesArticle
              key={article.id}
              mode={mode}
              article={article}
              srcList={srcList}
            />
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
