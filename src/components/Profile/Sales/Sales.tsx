import styles from "./Sales.module.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BackArrowIcon from "../../../icons/leftArrow.png";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import SalesArticle from "./SalesArticle/SalesArticle";
import { productType } from "../../../type/types";
import requester from "../../../apis/requester";

const Sales = () => {
  const [mode, setMode] = useState<string>("");
  const [salesList, setSalesList] = useState<productType[] | null>(null);
  const [onSaleList, setOnSaleList] = useState<productType[] | null>(null);
  const [soldList, setSoldList] = useState<productType[] | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { name } = useParams() as { name: string };
  const params = new URLSearchParams(location.search);
  const modeQuery = params.get("mode");

  useEffect(() => {
    modeQuery && setMode(modeQuery);
    getSalesAll();
    getSalesForSale();
    getSalesSoldOut();
  }, []);

  const getSalesAll = () => {
    requester
      .get(`/users/${name}/products/?pageNumber=0&pageSize=20&status=all`)
      .then((res) => {
        setSalesList(res.data.content);
      })
      .catch(() => {
        console.log("전체 목록 받아오기 오류");
      });
  };

  const getSalesForSale = () => {
    requester
      .get(`/users/${name}/products/?pageNumber=0&pageSize=20&status=for-sale`)
      .then((res) => {
        setOnSaleList(res.data.content);
      })
      .catch(() => {
        console.log("판매중 목록 받아오기 오류");
      });
  };

  const getSalesSoldOut = () => {
    requester
      .get(`/users/${name}/products/?pageNumber=0&pageSize=20&status=sold-out`)
      .then((res) => {
        setSoldList(res.data.content);
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
      <div className={styles["body-wrapper"]}>
        {mode === "entire" &&
          salesList?.map((article) => (
            <SalesArticle
              key={article.id}
              prev={`profile/${name}/sales?mode=${mode}`}
              article={article}
            />
          ))}
        {mode === "on-sale" &&
          onSaleList?.map((article) => (
            <SalesArticle
              key={article.id}
              prev={`profile/${name}/sales?mode=${mode}`}
              article={article}
            />
          ))}
        {mode === "sold" &&
          soldList?.map((article) => (
            <SalesArticle
              key={article.id}
              prev={`profile/${name}/sales?mode=${mode}`}
              article={article}
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
