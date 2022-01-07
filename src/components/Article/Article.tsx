import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./Article.module.scss";
import confirmStyles from "./confirm.module.scss";
import leftArrowIcon from "../../icons/leftArrow.png";
import homeIcon from "../../icons/home.png";
import shareIcon from "../../icons/share.png";
import moreIcon from "../../icons/more.png";
import redHeartIcon from "../../icons/redHeart.png";
import blackHeartIcon from "../../icons/blackHeart.png";
import Slider from "react-slick";

import "./slickTheme.scss";
import "./slick.scss";

import Product from "../../apis/Product/Product";
import User from "../../apis/User/User";

import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextareaAutosize,
} from "@mui/material";
import { toast } from "react-hot-toast";
import requester from "../../apis/requester";
import { calculateTimeDifference } from "../Utilities/functions";

type articleData = {
  id: number;
  user: {
    name: string;
    email: string;
  };
  image: number[];
  title: string;
  content: string;
  price: number;
  negotiable: boolean;
  location: string;
  category: string;
  hit: number;
  likes: number;
  chats: number;
  price_suggestions: number;
  status: string;
  created_at: string;
  updated_at: string;
  last_bring_up_my_post: string;
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

const Article = () => {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const location = useLocation();
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const [currentArticle, setCurrentArticle] = useState<articleData | null>(
    null
  );
  const [isHeartClicked, setIsHeartClicked] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("FOR_SALE");
  const [isSettingModalOpen, setIsSettingModalOpen] = useState<boolean>(false);
  const [carouselImg, setCarouselImg] = useState<any>([]);

  useEffect(() => {
    Product.getProduct(id).then((res) => {
      if (res.data.id !== parseInt(id)) navigate("/main");
      else {
        setCurrentArticle(res.data);
        User.getMe().then((r) => {
          if (res.data.user.email === r.data.email) setIsSeller(true);
          else setIsSeller(false);
        });
      }
      setStatus(res.data.status);
      res.data.images?.map((image: number) => {
        requester(`/images/${image}/`).then((res) =>
          setCarouselImg((prevState: any) => {
            const tempState = prevState.concat(
              <div>
                <img
                  className={styles.carouselImg}
                  src={res.data.url}
                  alt={"상품 이미지"}
                />
              </div>
            );
            return tempState;
          })
        );
      });
    });
  }, [id]);

  const onClickArrow = () => {
    if (location?.state) {
      location.state.prev === "profile/sales" &&
        navigate("/" + location.state.prev, {
          state: { mode: location.state.mode },
        });
    } else {
      navigate("/main");
    }
  };
  const onClickHome = () => {
    navigate("/main");
  };
  const onClickShare = () => {
    console.log("share");
  };
  const onClickSetting = () => {
    setIsSettingModalOpen(true);
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
  const handleStatus = (e: SelectChangeEvent) => {
    if (e.target.value === "RESERVED") {
      Product.putStatus(id, "reserve")
        .then((res) => {
          setStatus(e.target.value);
        })
        .catch((e) => console.log(e));
    } else if (e.target.value === "FOR_SALE" && status === "RESERVED") {
      Product.putStatus(id, "cancel reserve")
        .then((res) => {
          setStatus(e.target.value);
        })
        .catch((e) => console.log(e));
    }
  };

  const selectSetting = (select: string) => {
    if (select === "patch") {
      navigate("/write", {
        state: {
          title: currentArticle?.title,
          category: categoryFormat(currentArticle?.category),
          price: currentArticle?.price,
          negotiable: currentArticle?.negotiable,
          for_age: currentArticle?.for_age,
          content: currentArticle?.content,
          id: id,
        },
      });
    } else if (select === "bump") {
      Product.putStatus(id, select)
        .then((res) => {
          toast("success");
          navigate("/main");
        })
        .catch((e) => toast.error(e.response.data.error_message));
    } else if (select === "hide") {
      Product.putStatus(id, select)
        .then((res) => toast("success"))
        .catch((e) => toast.error(e.response.data.error_message));
    } else if (select === "delete") {
      Product.deleteProduct(id)
        .then((res) => {
          toast("success");
          navigate("/main");
        })
        .catch((e) => toast.error(e.response.data.error_message));
    } else if (select === "report") {
      toast("신고 완료!");
      setIsSettingModalOpen(false);
    } else if (select === "hideUser") {
      toast("유저 차단 완료!");
      setIsSettingModalOpen(false);
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
            onClick={onClickSetting}
          />
        </div>
        <div className={styles.footer}>
          <img
            className={styles.heart}
            src={isHeartClicked ? redHeartIcon : blackHeartIcon}
            onClick={onClickHeart}
          />
          <h1 className={styles.price}>
            {currentArticle?.price !== 0 &&
              currentArticle?.price.toLocaleString("ko-KR") + "원"}
            {currentArticle?.price === 0 && "나눔🧡"}
          </h1>
          <p className={styles.priceProposal} onClick={onClickPriceProposal}>
            {isSeller
              ? `가격제안 ${currentArticle?.price_suggestions}명`
              : "가격 제안하기"}
          </p>
          <button className={styles.chatButton} onClick={onClickChatButton}>
            {isSeller ? "요청 목록 보기" : "거래 요청하기"}
          </button>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.carousel}>
            <Slider {...settings}>{carouselImg}</Slider>
          </div>
          <div className={styles.profile}>
            <img
              src={"currentArticle?.profileImg"}
              className={styles.profileImg}
              onClick={onClickProfileImg}
            />
            <h1 className={styles.userName}>{currentArticle?.user.name}</h1>
            <p className={styles.userRegion}>{currentArticle?.location}</p>
            <h1 className={styles.mannerTemp}>{""}°C</h1>
          </div>
          {isSeller && (
            <div className={styles.statusSelect}>
              <FormControl size={"small"}>
                <Select
                  className={styles.select}
                  id="demo-simple-select"
                  value={status}
                  onChange={(e) => handleStatus(e)}
                  displayEmpty
                >
                  <MenuItem value={"FOR_SALE"}>판매중</MenuItem>
                  <MenuItem value={"RESERVED"}>예약중</MenuItem>
                  <MenuItem value={"SOLD_OUT"}>판매완료</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
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
                {calculateTimeDifference(
                  currentArticle?.created_at,
                  currentArticle?.last_bring_up_my_post
                )}
              </p>
            </div>
            <TextareaAutosize
              readOnly
              className={styles.content}
              value={currentArticle?.content}
            />
            {currentArticle?.category === "KIDS" && !!currentArticle?.for_age && (
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
        {isSettingModalOpen && (
          <div>
            {isSeller && (
              <div>
                <div className={confirmStyles.sellerBox}>
                  <div className={confirmStyles.contents}>
                    <p
                      className={confirmStyles.content}
                      onClick={() => selectSetting("patch")}
                    >
                      게시글 수정
                    </p>
                    <p
                      className={confirmStyles.content}
                      onClick={() => selectSetting("bump")}
                    >
                      끌어올리기
                    </p>
                    <p
                      className={confirmStyles.content}
                      onClick={() => selectSetting("hide")}
                    >
                      숨기기
                    </p>
                    <p
                      className={confirmStyles.contentDelete}
                      onClick={() => selectSetting("delete")}
                    >
                      삭제
                    </p>
                  </div>
                </div>
                <div className={confirmStyles.buttonBox}>
                  <div className={confirmStyles.button}>취소</div>
                </div>
              </div>
            )}
            {!isSeller && (
              <div>
                <div className={confirmStyles.customerBox}>
                  <div className={confirmStyles.contents}>
                    <p
                      className={confirmStyles.content}
                      onClick={() => selectSetting("report")}
                    >
                      신고
                    </p>
                    <p
                      className={confirmStyles.contentHide}
                      onClick={() => selectSetting("hideUser")}
                    >
                      이 사용자의 글 보지 않기
                    </p>
                  </div>
                </div>
                <div className={confirmStyles.buttonBox}>
                  <div
                    className={confirmStyles.button}
                    onClick={() => setIsSettingModalOpen(false)}
                  >
                    취소
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div
          className={`${styles.backShadow} ${
            isSettingModalOpen ? styles.show : ""
          }`}
          onClick={() => setIsSettingModalOpen(false)}
        />
      </div>
    </>
  );
};

export default Article;
