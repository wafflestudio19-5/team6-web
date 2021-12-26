import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import styles from "./Article.module.scss";
import dummyData from "./DummyData";
import leftArrowIcon from "../../icons/leftArrow.png";
import homeIcon from "../../icons/home.png";
import shareIcon from "../../icons/share.png";
import moreIcon from "../../icons/more.png";
import redHeartIcon from "../../icons/redHeart.png";
import blackHeartIcon from "../../icons/blackHeart.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { withHistory } from "slate-history";

type userData = {
  id: number;
  name: string; //
  profile_img: string; //
  region: string; //
  title: string;
  product_img: string[];
  article: Descendant[];
  price: number;
  time: string;
  temperature: number; //
  category: string;
  chat: number;
  interest: number;
  hit: number;
  sale_state: string
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
  const currentUser = dummyData.filter((data) => data.id === parseInt(id))[0];
  const [user, setUser] = useState<userData | null>(null);
  const [isHeartClicked, setIsHeartClicked] = useState<boolean>(false);
  const [value, setValue] = useState<Descendant[]>(
    currentUser?.article || [{ type: "paragraph", children: [{ text: "" }] }]
  );
  const editor = useMemo(
    () => withHistory(withReact(createEditor() as ReactEditor)),
    []
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate("/main");
    else setUser(currentUser);
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
  };
  const onClickShare = () => {
    console.log("share");
  };
  const onClickReport = () => {
    console.log("Report this user");
  };
  const onClickHeart = () => {
    setIsHeartClicked((prevState) => !prevState);
  };
  const onClickPriceProposal = () => {
    console.log("Propose Price");
    // navigate("/proposal");
  };
  const onClickChatButton = () => {
    console.log("chat");
    // navigate("/chat");
  };
  const onClickProfileImg = () => {
    console.log("profile image");
    // navigate("/profile/{id}");
  };

  return (
    <>
      {localStorage.getItem("token") === null && (
        <Navigate replace to="/login" />
      )}
      <div className={styles.articlePageWrapper}>
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
        <div className={styles.footer}>
          <img
            className={styles.heart}
            src={isHeartClicked ? redHeartIcon : blackHeartIcon}
            onClick={onClickHeart}
          />
          <h1 className={styles.price}>
            {user?.price.toLocaleString("ko-KR")}원
          </h1>
          <p className={styles.priceProposal} onClick={onClickPriceProposal}>
            가격 제안하기
          </p>
          <button className={styles.chatButton} onClick={onClickChatButton}>
            채팅으로 거래하기
          </button>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.carousel}>
            <Slider {...settings}>{carouselImg}</Slider>
          </div>
          <div className={styles.profile}>
            <img
              src={user?.profile_img}
              className={styles.profileImg}
              onClick={onClickProfileImg}
            />
            <h1 className={styles.userName}>{user?.name}</h1>
            <p className={styles.userRegion}>{user?.region}</p>
            <h1 className={styles.mannerTemp}>{user?.temperature}°C</h1>
          </div>
          <div className={styles.article}>
            <h1 className={styles.title}>
              {user?.sale_state === "예약중" && (
                  <div className={styles.reservation}>예약중</div>
              )}
              {user?.sale_state === "거래완료" && (
                  <div className={styles.saleClosed}>거래완료</div>
              )}
              {user?.title}
            </h1>
            <p>
              {user?.category}
              {user?.time}
            </p>
            <Slate
              editor={editor}
              value={value}
              onChange={(value) => setValue(value)}
            >
              <Editable readOnly />
            </Slate>
            <p>
              관심{user?.interest}
              조회{user?.hit}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
