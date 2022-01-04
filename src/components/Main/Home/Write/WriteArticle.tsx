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
  const [title, setTitle] = useState<string>("");
  const [negotiable, setNegotiable] = useState<boolean>(false);
  const [category, setCategory] = useState<number | undefined>(0);
  const [price, setPrice] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [imgPreview, setImgPreview] = useState<string[]>([camera]);
  const [imgFiles, setImgFiles] = useState<FileList | null>(null);
  const [forAge, setForAge] = useState<number | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!!loc.state) {
      setTitle(loc.state.title);
      setCategory(categoryEncode(loc.state.category));
      setPrice("₩ " + loc.state.price.toLocaleString("ko-KR"));
      setNegotiable(loc.state.negotiable);
      setForAge(loc.state.for_age);
      setValue(loc.state.content);
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
      if (!loc.state)
        Product.postProduct({
          images: [0], // temporary
          title: title,
          content: value,
          price: parseInt(price.replace(/[^0-9]/g, "")),
          negotiable: negotiable,
          category: category,
          for_age: forAge,
          range_of_location: 0, // temporary
        }).then((res) => navigate("/main"));
      else
        Product.patchProduct(loc.state.id, {
          images: [0], // temporary
          title: title,
          content: value,
          price: parseInt(price.replace(/[^0-9]/g, "")),
          negotiable: negotiable,
          category: category,
          for_age: forAge,
          range_of_location: 0, // temporary
        }).then((res) => navigate("/main"));
    } else {
      const formData = new FormData();
      // @ts-ignore
      if (imgFiles) {
        Object.values(imgFiles).map((e) => {
          formData.append("images", e);
        });
        console.log(Object.values(imgFiles));
        requester({ method: "POST", url: "/images/", data: formData })
          .then((res) => {
            const imageIdList = res.data.contents.map(
              (e: { created_at: string; id: number; updated_at: string }) => {
                return e.id;
              }
            );
            if (!loc.state)
              Product.postProduct({
                images: imageIdList,
                title: title,
                content: value,
                price: parseInt(price.replace(/[^0-9]/g, "")),
                negotiable: negotiable,
                category: category,
                for_age: null,
                range_of_location: 0,
              }).then((res) => navigate("/main"));
            else
              Product.patchProduct(loc.state.id, {
                images: imageIdList,
                title: title,
                content: value,
                price: parseInt(price.replace(/[^0-9]/g, "")),
                negotiable: negotiable,
                category: category,
                for_age: null,
                range_of_location: 0,
              }).then((res) => navigate("/main"));
          })
          .catch((e) => toast.error(e.response.data.error_message));
      }
    }
  };
  const handleCheck = () => {
    if (!!price) setNegotiable(!negotiable);
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
    else console.log("이미지는 최대 10개까지 첨부할 수 있어요.");
  };

  const deleteImg = (image: string) => {
    const newImgPreview = imgPreview.filter((e) => e !== image);
    setImgPreview(newImgPreview);
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

  const ageFormat = (forAge: number | null) => {
    switch (forAge) {
      case 1:
        return "0~6개월";
      case 2:
        return "7~12개월";
      case 3:
        return "13~24개월";
      case 4:
        return "3~5세";
      case 5:
        return "6~8세";
      case 6:
        return "9세 이상";
      default:
        return "나이 선택";
    }
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
            <img
              className={styles.sentence}
              src={sentence}
              alt="자주쓰는 문구"
            />
            <p className={styles.usually}>자주쓰는 문구</p>
            <img
              className={styles.neighborhood}
              src={setting}
              alt="보여줄 동네"
            />
            <p className={styles.show}>보여줄 동네 설정</p>
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
