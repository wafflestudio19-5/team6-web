import styles from "./WriteArticle.module.scss";

import closeButton from "../../../../icons/closebutton.png";
import camera from "../../../../icons/camera.png";
import sentence from "../../../../icons/addProperty.png";
import setting from "../../../../icons/settingSlider.png";
import rightButton from "../../../../icons/right.png";
import deleteButton from "../../../../icons/crossClose.png";

import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import requester from "../../../../apis/requester";
import { toast } from "react-hot-toast";
import Slider from "react-slick";
import SelectCategory from "./Category/SelectCategory";
import "./slick.scss";
import "./slickTheme.scss";
import SelectKidage from "./Kidage/SelectKidage";
import ConfirmModal from "./Confirm/ConfirmModal";
import { TextareaAutosize } from "@mui/material";
import Product from "../../../../apis/Product/Product";
import Phrase from "./Phrase/Phrase";
import LocationRange from "./Location/LocationRange";

const settings = {
  className: "left",
  infinite: false,
  centerPadding: "60px",
  slidesToShow: 5,
  swipeToSlide: true,
  draggable: true,
};
const categoryDecode = (category: number) => {
  switch (category) {
    case 1:
      return "디지털기기";
    case 2:
      return "생활가전";
    case 3:
      return "가구/인테리어";
    case 4:
      return "유아동";
    case 5:
      return "생활/가공식품";
    case 6:
      return "유아도서";
    case 7:
      return "스포츠/레저";
    case 8:
      return "여성잡화";
    case 9:
      return "여성의류";
    case 10:
      return "남성패션/잡화";
    case 11:
      return "게임/취미";
    case 12:
      return "뷰티/미용";
    case 13:
      return "반려동물용품";
    case 14:
      return "도서/티켓/음반";
    case 15:
      return "식물";
    case 16:
      return "기타 중고물품";
    case 17:
      return "삽니다";
    default:
      break;
  }
};
const categoryEncode = (category: string) => {
  switch (category) {
    case "디지털기기":
      return 1;
    case "생활가전":
      return 2;
    case "가구/인테리어":
      return 3;
    case "유아동":
      return 4;
    case "생활/가공식품":
      return 5;
    case "유아도서":
      return 6;
    case "스포츠/레저":
      return 7;
    case "여성잡화":
      return 8;
    case "여성의류":
      return 9;
    case "남성패션/잡화":
      return 10;
    case "게임/취미":
      return 11;
    case "뷰티/미용":
      return 12;
    case "반려동물용품":
      return 13;
    case "도서/티켓/음반":
      return 14;
    case "식물":
      return 15;
    case "기타 중고물품":
      return 16;
    case "삽니다":
      return 17;
    default:
      break;
  }
};
const WriteArticle = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const [isCategoryModalOpen, setIsCategoryModalOpen] =
    useState<boolean>(false);
  const [isKidsModalOpen, setIsKidsModalOpen] = useState<boolean>(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [isPhraseOpen, setIsPhraseOpen] = useState<boolean>(false);
  const [isLocationOpen, setIsLocationOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [negotiable, setNegotiable] = useState<boolean>(false);
  const [category, setCategory] = useState<number | undefined>(0);
  const [price, setPrice] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [rangeOfLocation, setRangeOfLocation] = useState<number>(3);
  const [imgPreview, setImgPreview] = useState<string[]>([camera]);
  const [imgFiles, setImgFiles] = useState<FileList | null>(null);
  const [forAge, setForAge] = useState<number[] | null>(null);
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const imgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!!loc.state) {
      setImgPreview(imgPreview.concat(loc.state.image_urls));
      setImgUrl(loc.state.image_urls);
      setTitle(loc.state.title);
      setCategory(categoryEncode(loc.state.category));
      setPrice("₩ " + loc.state.price.toLocaleString("ko-KR"));
      setNegotiable(loc.state.negotiable);
      setForAge(kidsAgeFormat(loc.state.for_age));
      setValue(loc.state.content);
    }
    if (localStorage.getItem("verified") === "false") {
      navigate("/main");
      toast("지역 인증을 해야 해요!");
    }
  }, []);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCategory = () => {
    setIsCategoryModalOpen(true);
  };
  const onClickClose = () => {
    navigate(-1);
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
    const kidsAgeFormattedList: number[] = [];
    if (ages.includes("ZERO_TO_SIX_MONTH")) kidsAgeFormattedList.push(1);
    if (ages.includes("SEVEN_TO_TWELVE_MONTH")) kidsAgeFormattedList.push(2);
    if (ages.includes("OVER_ONE_TO_TWO")) kidsAgeFormattedList.push(3);
    if (ages.includes("THREE_TO_FIVE")) kidsAgeFormattedList.push(4);
    if (ages.includes("SIX_TO_EIGHT")) kidsAgeFormattedList.push(5);
    if (ages.includes("OVER_NINE")) kidsAgeFormattedList.push(6);
    return kidsAgeFormattedList;
  };

  const onClickDone = () => {
    if (!title || !category || !value) setIsConfirmOpen(true);
    else if (value.length <= 5)
      toast("글이 너무 짧아요. 조금 더 길게 작성해주세요.", {
        style: {
          borderRadius: "4px",
          background: "black",
          padding: "6px",
          color: "#fff",
          font: "-moz-initial",
        },
        position: "bottom-center",
      });
    else if (imgPreview.length === 1) {
      if (!loc.state) {
        const myPromise = Product.postProduct({
          image_urls: [],
          title: title,
          content: value,
          price: parseInt(price.replace(/[^0-9]/g, "")),
          negotiable: negotiable,
          category: category,
          for_age: forAge,
          range_of_location: rangeOfLocation,
        }).then((res) => navigate("/main"));
        toast.promise(myPromise, {
          loading: "Uploading...",
          success: "Successfully Uploaded!",
          error: "Failed",
        });
      } else {
        const myPromise = Product.patchProduct(loc.state.id, {
          image_urls: [],
          title: title,
          content: value,
          price: parseInt(price.replace(/[^0-9]/g, "")),
          negotiable: negotiable,
          category: category,
          for_age: forAge,
          range_of_location: rangeOfLocation,
        }).then((res) => navigate("/main"));
        toast.promise(myPromise, {
          loading: "Uploading...",
          success: "Successfully Uploaded!",
          error: "Failed",
        });
      }
    } else {
      const formData = new FormData();
      // @ts-ignore
      console.log(!!imgFiles);
      if (imgFiles) {
        Object.values(imgFiles).map((e) => {
          formData.append("images", e);
        });
        if (!loc.state) {
          requester({ method: "POST", url: "/images/", data: formData }).then(
            (res) => {
              const myPromise = Product.postProduct({
                image_urls: res.data.contents.map((data: any) => {
                  return data.url;
                }),
                title: title,
                content: value,
                price: parseInt(price.replace(/[^0-9]/g, "")),
                negotiable: negotiable,
                category: category,
                for_age: forAge,
                range_of_location: rangeOfLocation,
              }).then((res) => navigate("/main"));
              toast.promise(myPromise, {
                loading: "Uploading...",
                success: "Successfully Uploaded!",
                error: "Failed",
              });
            }
          );
        } else {
          // 새로 이미지를 올리는 경우
          requester.post("/images/", formData).then((res) => {
            const myPromise = Product.patchProduct(loc.state.id, {
              image_urls: imgUrl.concat(
                res.data.contents.map((data: any) => {
                  return data.url;
                })
              ),
              title: title,
              content: value,
              price: parseInt(price.replace(/[^0-9]/g, "")),
              negotiable: negotiable,
              category: category,
              for_age: forAge,
              range_of_location: rangeOfLocation,
            }).then((res) => navigate("/main"));
            toast.promise(myPromise, {
              loading: "Uploading...",
              success: "Successfully Uploaded!",
              error: "Failed",
            });
          });
        }
      } else {
        // 원래 이미지에서 제거만 하는 경우
        const myPromise = Product.patchProduct(loc.state.id, {
          image_urls: imgPreview.filter((e, index) => index !== 0),
          title: title,
          content: value,
          price: parseInt(price.replace(/[^0-9]/g, "")),
          negotiable: negotiable,
          category: category,
          for_age: forAge,
          range_of_location: rangeOfLocation,
        }).then((res) => navigate("/main"));
        toast.promise(myPromise, {
          loading: "Uploading...",
          success: "Successfully Uploaded!",
          error: "Failed",
        });
      }
    }
  };
  const handleCheck = () => {
    if (!!price) setNegotiable(!negotiable);
  };
  const handlePhrase = () => {
    setIsPhraseOpen(true);
  };
  const handleRegion = () => {
    setIsLocationOpen(true);
  };
  const priceFormat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberFormat = e.target.value.replace(/[^0-9]/g, "");
    if (!!numberFormat) {
      const commaFormat = parseInt(numberFormat).toLocaleString("ko-KR");
      setPrice("₩ " + commaFormat);
    } else {
      setPrice("");
    }
  };

  const onClickImg = (e: React.MouseEvent) => {
    imgRef.current?.click();
  };

  const onChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const nowImgList = e.target.files;
    setImgFiles(nowImgList);
    const nowImgUrlList = [...imgPreview];
    if (!!nowImgList) {
      for (let i = 0; i < nowImgList.length; i++) {
        const nowImgUrl = URL.createObjectURL(nowImgList[i]);
        nowImgUrlList.push(nowImgUrl);
      }
    }
    if (nowImgUrlList.length <= 11) setImgPreview(nowImgUrlList);
    else toast("이미지는 최대 10개까지 첨부할 수 있어요.");
  };

  const deleteImg = (image: string) => {
    const newImgPreview = imgPreview.filter((e) => e !== image);
    setImgPreview(newImgPreview);
    if (imgUrl.includes(image))
      setImgUrl(imgUrl.filter((url) => url !== image));
  };

  const carouselImg = imgPreview.map((image) => {
    if (image === camera && imgPreview.length === 1)
      return (
        <div className={styles.imageUploadContainer} key={Math.random()}>
          <img
            className={styles.imageUpload}
            src={camera}
            alt="이미지 업로드"
            onClick={onClickImg}
          />
          <p className={styles.imgCount}>{imgPreview.length - 1}/10</p>
        </div>
      );
    else if (image === camera && imgPreview.length !== 1)
      return (
        <div className={styles.imageUploadContainer}>
          <img
            className={styles.imageUpload}
            src={camera}
            alt="이미지 업로드"
            onClick={onClickImg}
          />
          <p className={styles.imgCount}>{imgPreview.length - 1}/10</p>
        </div>
      );
    return (
      <div className={styles.carouselImgContainer}>
        <img className={styles.carouselImg} src={image} alt={"상품 이미지"} />
        <img
          className={styles.deleteButton}
          src={deleteButton}
          alt={"이미지 제거"}
          onClick={() => deleteImg(image)}
        />
      </div>
    );
  });

  const ageFormat = (forAge: number[] | null) => {
    const ageFormatList = [];
    if (forAge?.includes(1)) ageFormatList.push("0~6개월");
    if (forAge?.includes(2)) ageFormatList.push("7~12개월");
    if (forAge?.includes(3)) ageFormatList.push("13~24개월");
    if (forAge?.includes(4)) ageFormatList.push("3~5세");
    if (forAge?.includes(5)) ageFormatList.push("6~8세");
    if (forAge?.includes(6)) ageFormatList.push("9세 이상");
    return ageFormatList.map((age, index) => {
      if (index === 0 && ageFormatList.length === 1) return age;
      else if (index === 0 && ageFormatList.length !== 1) return age + ",";
      else if (index === ageFormatList.length - 1) return " " + age;
      else return " " + age + ",";
    });
  };
  return (
    <>
      {!isCategoryModalOpen && (
        <div className={styles.writePageWrapper}>
          {isConfirmOpen && (
            <ConfirmModal
              title={title}
              category={category}
              content={value}
              setIsConfirmOpen={setIsConfirmOpen}
            />
          )}
          {isKidsModalOpen && (
            <SelectKidage
              forAge={forAge}
              setForAge={setForAge}
              setIsKidsModalOpen={setIsKidsModalOpen}
            />
          )}
          {isPhraseOpen && (
            <Phrase setValue={setValue} setIsPhraseOpen={setIsPhraseOpen} />
          )}
          {isLocationOpen && (
            <LocationRange
              isLocationOpen={isLocationOpen}
              setIsLocationOpen={setIsLocationOpen}
              rangeOfLocation={rangeOfLocation}
              setRangeOfLocation={setRangeOfLocation}
            />
          )}
          <div
            className={`${styles.backShadow} ${
              isConfirmOpen ? styles.show : ""
            }`}
            onClick={() => setIsConfirmOpen(false)}
          />
          <div
            className={`${styles.backShadow} ${
              isKidsModalOpen ? styles.show : ""
            }`}
            onClick={() => setIsKidsModalOpen(false)}
          />
          <div
            className={`${styles.backShadow} ${
              isPhraseOpen ? styles.show : ""
            }`}
            onClick={() => setIsPhraseOpen(false)}
          />
          <div className={styles.header}>
            <img
              className={styles.closeButton}
              src={closeButton}
              alt="닫기"
              onClick={onClickClose}
            />
            {!!loc.state ? (
              <h1 className={styles.headerPatchTitle}>중고거래 글 수정하기</h1>
            ) : (
              <h1 className={styles.headerPostTitle}>중고거래 글쓰기</h1>
            )}
            <p className={styles.finish} onClick={onClickDone}>
              완료
            </p>
          </div>
          <div className={styles.footer}>
            <div>
              <img
                className={styles.sentence}
                src={sentence}
                alt="자주쓰는 문구"
                onClick={handlePhrase}
              />
              <p className={styles.usually} onClick={handlePhrase}>
                자주쓰는 문구
              </p>
            </div>
            <div>
              <img
                className={styles.neighborhood}
                src={setting}
                alt="보여줄 동네"
                onClick={handleRegion}
              />
              <p className={styles.show} onClick={handleRegion}>
                보여줄 동네 설정
              </p>
            </div>
          </div>
          <div className={styles.contentWrapper}>
            <div className={styles.imageUploadWrapper}>
              <input
                className={styles.imgInput}
                type="file"
                accept="image/*"
                multiple
                ref={imgRef}
                onChange={onChangeImg}
              />
              <Slider {...settings}>{carouselImg}</Slider>
            </div>
            <div className={styles.titleWrapper}>
              <input
                className={styles.title}
                placeholder="글 제목"
                value={title}
                onChange={onChangeTitle}
              />
            </div>
            <div className={styles.categoryWrapper} onClick={handleCategory}>
              <p className={styles.category}>
                {!!category ? categoryDecode(category) : "카테고리 선택"}
              </p>
              <img
                className={styles.rightButton}
                src={rightButton}
                alt="카테고리 선택"
              />
            </div>
            <div
              className={
                !!price ? styles.priceWrapper : styles.disabledPriceWrapper
              }
            >
              <input
                className={styles.price}
                placeholder="₩ 가격 (선택사항)"
                value={price}
                onChange={priceFormat}
              />
              <input
                className={styles.pCheckBox}
                type={"checkbox"}
                checked={negotiable}
              />
              <label htmlFor={styles.pCheckBox} onClick={handleCheck} />
              <p className={styles.priceP}>가격 제안받기</p>
            </div>
            <div className={styles.articleWrapper}>
              <TextareaAutosize
                className={styles.content}
                placeholder={
                  "게시글 내용을 작성해주세요.(가품 및 판매금지품목은 게시가 제한될 수 있어요.)"
                }
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            {category === 4 && (
              <div
                className={styles.kidsAgeSelector}
                onClick={() => setIsKidsModalOpen(true)}
              >
                <p className={styles.useAge}>사용 나이</p>
                <div className={styles.forAge}>
                  <p className={!!forAge ? styles.age : styles.ageSelect}>
                    {ageFormat(forAge)}
                  </p>
                  <img
                    className={styles.rightButton}
                    src={rightButton}
                    alt="카테고리 선택"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {isCategoryModalOpen && (
        <SelectCategory
          category={category}
          setCategory={setCategory}
          setIsCategoryModalOpen={setIsCategoryModalOpen}
        />
      )}
    </>
  );
};

export default WriteArticle;
