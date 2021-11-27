import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Article.module.scss";
import dummyData from "./DummyData";
import leftArrowIcon from "../../icons/leftArrow.png";
import homeIcon from "../../icons/home.png";
import shareIcon from "../../icons/share.png";
import moreIcon from "../../icons/more.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type userData = {
  id: number;
  name: string;
  profile_img: string;
  region: string;
  title: string;
  product_img: string[];
  article: string;
  price: number;
  time: string;
  temperature: number;
  category: string;
  chat: number;
  interest: number;
  hit: number;
};
// 판매글 API랑 메인 페이지가 완성되지 않아서 더미데이터로 구현했습니다.

const settings = {
  dots: true,
  infinite: true,
  speed: 200,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
}; // https://sirong.tistory.com/38

const Article = () => {
  const { id } = useParams() as { id: string };
  const [user, setUser] = useState<userData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(dummyData.filter((data) => data.id === parseInt(id))[0]);
  }, [id]);

  const carouselImg = user?.product_img.map((image) => {
    return (
      <div>
        <img className={styles.carouselImg} src={image} alt={"상품 이미지"} />
      </div>
    );
  });

  const onClickArrow = () => {
    navigate("/main");
  };
  const onClickHome = () => {
    navigate("/main");
  }; // 화살표랑 홈버튼 기능 차이를 모르겠네요
  const onClickShare = () => {
    console.log("share");
  };
  const onClickReport = () => {
    console.log("Report this user");
  };

  return (
    <>
      <div className={styles.articleWrapper}>
        <div className={styles.header}>
          <img
            className={styles.backButton}
            src={leftArrowIcon}
            alt={"뒤로 가기"}
            onClick={onClickArrow}
          />
          <img
            className={styles.homeButton}
            src={homeIcon}
            alt={"뒤로 가기"}
            onClick={onClickHome}
          />
          <img
            className={styles.shareButton}
            src={shareIcon}
            alt={"뒤로 가기"}
            onClick={onClickShare}
          />
          <img
            className={styles.reportButton}
            src={moreIcon}
            alt={"뒤로 가기"}
            onClick={onClickReport}
          />
        </div>
        <div className={styles.carousel}>
          <Slider {...settings}>{carouselImg}</Slider>
        </div>
      </div>
    </>
  );
};

export default Article;
