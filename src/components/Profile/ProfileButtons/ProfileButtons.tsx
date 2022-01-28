import styles from "./ProfileButtons.module.scss";
import RightArrow from "../../../icons/MyCarrot/right-arrow.png";
import { Link } from "react-router-dom";

const ProfileButtons = ({
  name,
  products,
}: {
  name: string;
  products: number;
}) => {
  return (
    <div className={styles["sales-wrapper"]}>
      <Link to={`/profile/${name}/sales?mode=entire`} className={styles.link}>
        <span>판매상품 {products}개</span>
        <img src={RightArrow} alt="바로가기" />
      </Link>
      {/*<Link to={"/main"} className={styles.link}>
        <span>받은 매너 평가</span>
        <img src={RightArrow} alt="바로가기" />
      </Link>
      <Link to={"/main"} className={styles.link}>
        <span>받은 거래 후기(#)</span>
        <img src={RightArrow} alt="바로가기" />
      </Link>*/}
    </div>
  );
};

export default ProfileButtons;
