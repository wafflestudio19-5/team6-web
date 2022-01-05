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
  for_age:
    | "ZERO_TO_SIX_MONTH"
    | "SEVEN_TO_TWELVE_MONTH"
    | "OVER_ONE_TO_TWO"
    | "THREE_TO_FIVE"
    | "SIX_TO_EIGHT"
    | "OVER_NINE";
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
  const calculateTimeDifference = (current: string | undefined) => {
    if (!!current) {
      const now = new Date();
      const late = new Date(current);
      if ((now.getTime() - late.getTime()) / 1000 < 60)
        return (
          Math.floor((now.getTime() - late.getTime()) / 1000).toString() +
          "초 전"
        );
      // 초 단위
      else if ((now.getTime() - late.getTime()) / (1000 * 60) < 60)
        return (
          Math.floor(
            (now.getTime() - late.getTime()) / (1000 * 60)
          ).toString() + "분 전"
        );
      // 분 단위
      else if ((now.getTime() - late.getTime()) / (1000 * 60 * 60) < 24)
        return (
          Math.floor(
            (now.getTime() - late.getTime()) / (1000 * 60 * 60)
          ).toString() + "시간 전"
        );
      else
        return (
          Math.floor(
            (now.getTime() - late.getTime()) / (1000 * 60 * 60 * 24)
          ).toString() + "일 전"
        );
    } else return null;
  };
  const categoryFormat = (category: string | undefined) => {
    switch (category) {
      case "DIGITAL_DEVICE":
        return "디지털기기";
      case "HOME_APPLIANCE":
        return "생활가전";
      case "FURNITURE_AND_INTERIOR":
        return "가구/인테리어";
      case "KIDS":
        return "유아동";
      case "LIVING_AND_FOOD":
        return "생활/가공식품";
      case "KIDS_BOOK":
        return "유아도서";
      case "SPORTS_AND_LEISURE":
        return "스포츠/레저";
      case "WOMEN_STUFF":
        return "여성잡화";
      case "WOMEN_CLOTHES":
        return "여성의류";
      case "MEN_STUFF_AND_CLOTHES":
        return "남성패션/잡화";
      case "GAME_AND_HOBBIES":
        return "게임/취미";
      case "BEAUTY_AND_COSMETICS":
        return "뷰티/미용";
      case "PET":
        return "반려동물용품";
      case "BOOKS_AND_TICKETS_AND_RECORDS":
        return "도서/티켓/음반";
      case "BOTANICAL":
        return "식물";
      case "ETC":
        return "기타 중고물품";
      case "I_AM_BUYING":
        return "삽니다";
      default:
        break;
    }
  };
  const kidsAgeFormat = (
    Age:
      | "ZERO_TO_SIX_MONTH"
      | "SEVEN_TO_TWELVE_MONTH"
      | "OVER_ONE_TO_TWO"
      | "THREE_TO_FIVE"
      | "SIX_TO_EIGHT"
      | "OVER_NINE"
  ) => {
    switch (Age) {
      case "ZERO_TO_SIX_MONTH":
        return "0~6개월";
      case "SEVEN_TO_TWELVE_MONTH":
        return "7~12개월";
      case "OVER_ONE_TO_TWO":
        return "13~24개월";
      case "THREE_TO_FIVE":
        return "3~5세";
      case "SIX_TO_EIGHT":
        return "6~8세";
      case "OVER_NINE":
        return "9세 이상";
      default:
        return null;
    }
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
            <div className={styles.secondLine}>
              <p className={styles.category}>
                {categoryFormat(currentArticle?.category)} ·
              </p>
              <p className={styles.time}>
                {calculateTimeDifference(currentArticle?.created_at)}
              </p>
            </div>
            <TextareaAutosize
              readOnly
              className={styles.content}
              value={currentArticle?.content}
            />
            {currentArticle?.category === "KIDS" && (
              <div className={styles.kidsContainer}>
                <h1 className={styles.kidsHeader}>사용 나이</h1>
                <p className={styles.kidsContent}>
                  {kidsAgeFormat(currentArticle?.for_age)}
                </p>
              </div>
            )}
            <div className={styles.lastLine}>
              <p className={styles.likes}>관심 {currentArticle?.likes} ·</p>
              <p className={styles.hit}>조회 {currentArticle?.hit}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
