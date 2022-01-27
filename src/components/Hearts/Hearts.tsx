import { Link } from "react-router-dom";
import styles from "./Hearts.module.scss";
import BackArrow from "../../icons/leftArrow.png";
import { useEffect, useState } from "react";
import requester from "../../apis/requester";
import { GetMyLikesDto } from "../../type/dto/for-api/get-my-likes.dto";
import { ProductDto } from "../../type/dto/product.dto";

const Hearts = () => {
  const [hearts, setHearts] = useState<ProductDto[]>([]);
  useEffect(() => {
    requester
      .get<GetMyLikesDto>("users/me/likes/?pageNumber=1&pageSize=15")
      .then((res) => {
        setHearts(res.data.content);
      });
  }, []);

  return (
    <div className={styles["hearts-wrapper"]}>
      <header>
        <Link to="/main" state={{ page: "user" }} className={styles.back}>
          <img src={BackArrow} alt="뒤로" />
        </Link>
        <p>판매내역</p>
      </header>
      <section className={styles["body-wrapper"]}></section>
    </div>
  );
};

export default Hearts;
