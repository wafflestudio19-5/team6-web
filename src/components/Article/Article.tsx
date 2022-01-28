import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./Article.module.scss";
import styles2 from "../Utilities/confirm.module.scss";
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
import confirmModal from "../Main/Home/Write/Confirm/ConfirmModal";
import { articleData } from "../../type/types";

const settings = {
  dots: true,
  infinite: true,
  speed: 200,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

const readInKorean = (price: number) => {
  return;
};

export const categoryFormat = (category: string | undefined) => {
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
  const [requestModal, setRequestModal] = useState(false);
  const [inputs, setInputs] = useState<{
    suggested_price: string;
    message: string;
  }>({ suggested_price: "", message: "" });
  const [suggest, setSuggest] = useState(false);

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
      res.data.image_urls?.map((image: string) => {
        setCarouselImg((prevState: any) => {
          const tempState = prevState.concat(
            <div>
              <img
                className={styles.carouselImg}
                src={image}
                alt={"상품 이미지"}
              />
            </div>
          );
          return tempState;
        });
      });
    });
  }, [id]);

  const onClickArrow = () => {
    if (location?.state) {
      if (location.state.prev === "profile/sales") {
        navigate("/" + location.state.prev + `?mode=${location.state.mode}`);
      } else {
        navigate("/" + location.state.prev);
      }
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
  const onClickProfileImg = () => {
    console.log("profile image");
    // navigate("/profile/{id}");
  };

  const kidsAgeFormat = (
    ages: (
      | "ZERO_TO_SIX_MONTH"
      | "SEVEN_TO_TWELVE_MONTH"
      | "OVER_ONE_TO_TWO"
      | "THREE_TO_FIVE"
      | "SIX_TO_EIGHT"
      | "OVER_NINE"
    )[]
  ) => {
    const kidsAgeFormattedList: any = [];
    if (ages.includes("ZERO_TO_SIX_MONTH"))
      kidsAgeFormattedList.push("0~6개월");
    if (ages.includes("SEVEN_TO_TWELVE_MONTH"))
      kidsAgeFormattedList.push("7~12개월");
    if (ages.includes("OVER_ONE_TO_TWO"))
      kidsAgeFormattedList.push("13~24개월");
    if (ages.includes("THREE_TO_FIVE")) kidsAgeFormattedList.push("3~5세");
    if (ages.includes("SIX_TO_EIGHT")) kidsAgeFormattedList.push("6~8세");
    if (ages.includes("OVER_NINE")) kidsAgeFormattedList.push("9세 이상");
    return kidsAgeFormattedList.map((age: string, index: number) => {
      if (index === 0 && kidsAgeFormattedList.length === 1) return age;
      else if (index === 0 && kidsAgeFormattedList.length !== 1)
        return age + ",";
      else if (index === kidsAgeFormattedList.length - 1) return " " + age;
      else return " " + age + ",";
    });
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
          image_urls: currentArticle?.image_urls,
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
  const changeToRequests = () => {
    navigate(`/request/${id}`);
  };
  const handleRequest = () => {
    if (currentArticle) {
      setInputs({ ...inputs, suggested_price: `${currentArticle.price}` });
    }
    setSuggest(false);
    setRequestModal(true);
  };
  const handlePriceChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    const numRegex = /^[0-9]+$/;
    if (e.target.value === "" || numRegex.test(e.target.value)) {
      setInputs({
        ...inputs,
        suggested_price: e.target.value,
      });
    }
  };

  const handleMessageChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInputs({
      ...inputs,
      message: e.target.value,
    });
  };
  const handleConfirm = () => {
    if (currentArticle) {
      if (inputs.suggested_price) {
        requester
          .post(`/purchase-orders/`, {
            suggested_price: inputs.suggested_price,
            message: inputs.message,
            product_id: currentArticle.id,
          })
          .catch((e) => {
            console.log(e.response);
          });
        setRequestModal(false);
        setInputs({ suggested_price: "", message: "" });
      } else {
        toast.error("가격은 반드시 입력해야 해요");
      }
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
          {isSeller ? (
            <p className={styles.priceProposal} onClick={changeToRequests}>
              가격제안 {currentArticle?.price_suggestions}명
            </p>
          ) : (
            <p
              className={styles.priceProposal}
              onClick={() => {
                setSuggest(true);
                setInputs({ suggested_price: "", message: "" });
                setRequestModal(true);
              }}
            >
              가격 제안하기
            </p>
          )}
          {isSeller ? (
            <button className={styles.chatButton} onClick={changeToRequests}>
              요청 목록 보기
            </button>
          ) : (
            <button className={styles.chatButton} onClick={handleRequest}>
              거래 요청하기
            </button>
          )}
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
        <div
          className={`${styles.backShadow} ${requestModal ? styles.show : ""}`}
          onClick={() => {
            setRequestModal(false);
          }}
        />
        {requestModal && (
          <div className={styles2.box}>
            {suggest ? (
              <>
                <p className={styles2.title}>가격 제안하기</p>
                <p className={styles2.contents}>
                  구매하고 싶은 가격을 입력하세요. 판매자가 올린 가격{" "}
                  {currentArticle?.price.toLocaleString("ko-KR")}원에 비해 너무
                  높거나 낮은 가격을 적으면 거래가 어려울 수 있어요.
                </p>
                <input
                  name="price"
                  className={styles2.priceBox}
                  placeholder="가격을 입력하세요"
                  value={inputs.suggested_price}
                  onChange={handlePriceChange}
                />
                <p className={styles2.priceText}>
                  {inputs.suggested_price.length > 0 &&
                    parseInt(inputs.suggested_price).toLocaleString("ko-KR")}
                  원
                </p>
                <textarea
                  name="message"
                  className={styles2.messageBox}
                  placeholder="전달할 메시지를 입력해주세요"
                  value={inputs.message}
                  onChange={handleMessageChange}
                />
              </>
            ) : (
              <>
                <p className={styles2.title}>정가에 구매 요청하기</p>
                <p className={styles2.contents}>
                  메시지를 정성껏 적어 보내면 거래가 성사될 가능성이 더
                  높아질거에요. 판매자가 올린 가격{" "}
                  {currentArticle?.price.toLocaleString("ko-KR")}원에
                  구매하시려면 확인 버튼을 눌러주세요.
                </p>
                <textarea
                  name="message"
                  className={styles2.messageBox}
                  placeholder="전달할 메시지를 입력해주세요"
                  value={inputs.message}
                  onChange={handleMessageChange}
                />
              </>
            )}
            <div className={styles2.confirmButton} onClick={handleConfirm}>
              확인
            </div>
            <div
              className={styles2.cancelButton}
              onClick={() => {
                setRequestModal(false);
              }}
            >
              닫기
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Article;
