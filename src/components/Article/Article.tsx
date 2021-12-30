import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./Article.module.scss";
import dummyData from "./DummyData";
import leftArrowIcon from "../../icons/leftArrow.png";
import homeIcon from "../../icons/home.png";
import shareIcon from "../../icons/share.png";
import moreIcon from "../../icons/more.png";
import redHeartIcon from "../../icons/redHeart.png";
import blackHeartIcon from "../../icons/blackHeart.png";
import Slider from "react-slick";

import "./slickTheme.scss";
import "./slick.scss";

import { BaseEditor, createEditor, Descendant } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { HistoryEditor, withHistory } from "slate-history";
import { requester } from "../../apis/requester";
import { TextareaAutosize } from "@mui/material";

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
  sale_state: string;
};
type articleData = {
  id: number;
  user: {
    name: string;
    email: string;
  };
  image: any;
  title: string;
  content: string;
  price: number;
  location: string;
  category: string;
  hit: number;
  likes: number;
  chats: number;
  price_suggestions: number;
  status: string;
  created_at: string;
  updated_at: string;
};
const settings = {
  dots: true,
  infinite: true,
  speed: 200,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

type CustomText = { text: string };
type CustomElement = { type: "paragraph"; children: CustomText[] };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
// Define a deserializing function that takes a string and returns a value.
const deserialize = (string: string) => {
  // Return a value array of children derived by splitting the string.
  return string.split("\n").map((line) => {
    return {
      type: "paragraph",
      children: [{ text: line }],
    };
  });
};
const Article = () => {
  const { id } = useParams() as { id: string };
  // const currentUser = dummyData.filter((data) => data.id === parseInt(id))[0];

  useEffect(() => {
    requester.get(`/products/${id}/`).then((res) => {
      if (res.data.id !== parseInt(id)) navigate("/main");
      else {
        setCurrentArticle(res.data);
        console.log(res.data);
      }
    });
  }, [id]);

  const [user, setUser] = useState<userData | null>(null);
  const [currentArticle, setCurrentArticle] = useState<articleData | null>(
    null
  );
  const [isHeartClicked, setIsHeartClicked] = useState<boolean>(false);
  const [value, setValue] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [
        {
          text: "hello",
        },
      ],
    },
  ]);
  const editor = useMemo(
    () => withHistory(withReact(createEditor() as ReactEditor)),
    []
  );

  const navigate = useNavigate();

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
            {currentArticle?.price.toLocaleString("ko-KR")}원
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
            <h1 className={styles.userName}>{currentArticle?.user.name}</h1>
            <p className={styles.userRegion}>{currentArticle?.location}</p>
            <h1 className={styles.mannerTemp}>{user?.temperature}°C</h1>
          </div>
          <div className={styles.article}>
            <h1 className={styles.title}>
              {currentArticle?.status === "예약중" && (
                <div className={styles.reservation}>예약중</div>
              )}
              {currentArticle?.status === "거래완료" && (
                <div className={styles.saleClosed}>거래완료</div>
              )}
              {currentArticle?.title}
            </h1>
            <p>
              {currentArticle?.category}
              {currentArticle?.created_at}
            </p>
            <TextareaAutosize
              readOnly
              className={styles.content}
              value={currentArticle?.content}
            />
            <p>
              관심{currentArticle?.likes}
              조회{currentArticle?.hit}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
