import styles from "./HistoryButtons.module.scss";
import saleIcon from "../../../../icons/MyCarrot/receipt.png";
import purchaseIcon from "../../../../icons/MyCarrot/shopping.png";
import watchlistIcon from "../../../../icons/MyCarrot/heart.png";
import { useNavigate } from "react-router-dom";

const HistoryButtons = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["history-wrapper"]}>
      <button
        className={styles.sale}
        onClick={() => {
          navigate("/sales-history");
        }}
      >
        <div className={styles.background}>
          <img src={saleIcon} alt="판매" />
        </div>
        <p>판매내역</p>
      </button>
      <button
        className={styles.purchase}
        onClick={() => {
          navigate("/purchase-history");
        }}
      >
        <div className={styles.background}>
          <img src={purchaseIcon} alt="구매" />
        </div>
        <p>구매내역</p>
      </button>
      <button
        className={styles.watchlist}
        onClick={() => {
          console.log("관심목록");
        }}
      >
        <div className={styles.background}>
          <img src={watchlistIcon} alt="관심" />
        </div>
        <p>관심목록</p>
      </button>
    </div>
  );
};

export default HistoryButtons;
