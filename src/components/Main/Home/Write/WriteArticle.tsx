import styles from "./WriteArticle.module.scss";
import confirmStyles from "./confirm.module.scss";

import closeButton from "../../../../icons/closebutton.png";
import camera from "../../../../icons/camera.png";
import sentence from "../../../../icons/addProperty.png";
import setting from "../../../../icons/settingSlider.png";
import rightButton from "../../../../icons/right.png";
import deleteButton from "../../../../icons/crossClose.png";

import { useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect, useRef } from "react";
import { createEditor, Descendant, Node } from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { requester } from "../../../../apis/requester";
import dummyData from "../../../Article/DummyData";
import Slider from "react-slick";
import SelectCategory from "./Category/SelectCategory";
import "./slick.scss";
import "./slickTheme.scss";

const settings = {
  className: "left",
  infinite: false,
  centerPadding: "60px",
  slidesToShow: 5,
  swipeToSlide: true,
  draggable: true,
};

const WriteArticle = () => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] =
    useState<boolean>(false);
  const [isImgModalOpen, setIsImgModalOpen] = useState<boolean>(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [toastState, setToastState] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [negotiable, setNegotiable] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [value, setValue] = useState<Descendant[]>([
    { type: "paragraph", children: [{ text: "" }] },
  ]);
  const [imgPreview, setImgPreview] = useState<string[]>([camera]);

  const imgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (toastState) {
      setTimeout(() => setToastState(false), 4000);
    }
  }, [toastState]);

  const editor = useMemo(
    () => withHistory(withReact(createEditor() as ReactEditor)),
    []
  );
  const serialize = (value: Descendant[]) => {
    // value를 받고 plain text를 string 형식으로 리턴하는 함수입니다.
    return (
      value
        // Return the string content of each paragraph in the value's children.
        .map((n) => Node.string(n))
        // Join them all with line breaks denoting paragraphs.
        .join("\n")
    );
  };

  const navigate = useNavigate();

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
    if (!title || !category || !serialize(value)) setIsConfirmOpen(true);
    else if (serialize(value).length <= 5) setToastState(true);
    else if (imgPreview.length === 1) {
      dummyData.push({
        id: Math.floor(Math.random() * Math.pow(10, 10)),
        name: "현재유저",
        region: "현재지역",
        profile_img:
          "https://wafflestudio.com/_next/image?url=%2Fimages%2Ficon_intro.svg&w=256&q=75",
        title: title,
        product_img: [
          "https://wafflestudio.com/_next/image?url=%2Fimages%2Ficon_intro.svg&w=256&q=75",
        ],
        article: value,
        price: parseInt(price.replace(/[^0-9]/g, "")),
        time: "현재시간",
        temperature: 36.5,
        category: category,
        chat: 0,
        hit: 0,
        interest: 0,
        sale_state: "판매중",
      }); // axios.patch
      requester
        .post("/products/", {
          images: [1, 2],
          title: title,
          content: serialize(value),
          price: parseInt(price.replace(/[^0-9]/g, "")),
          negotiable: negotiable,
          category: category,
          location: "301",
        })
        .then((res) => console.log(res.data));
      navigate("/main");
    } else {
      dummyData.push({
        id: Math.floor(Math.random() * Math.pow(10, 10)),
        name: "현재유저",
        region: "현재지역",
        profile_img:
          "https://wafflestudio.com/_next/image?url=%2Fimages%2Ficon_intro.svg&w=256&q=75",
        title: title,
        product_img: imgPreview.slice(1),
        article: value,
        price: parseInt(price.replace(/[^0-9]/g, "")),
        time: "현재시간",
        temperature: 36.5,
        category: category,
        chat: 0,
        hit: 0,
        interest: 0,
        sale_state: "판매중",
      }); // axios.patch
      requester
        .post("/products/", {
          images: [1, 2],
          title: title,
          content: serialize(value),
          price: parseInt(price.replace(/[^0-9]/g, "")),
          negotiable: negotiable,
          category: category,
          location: "301",
        })
        .then((res) => console.log(res.data));
      navigate("/main");
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

  const handleToast = () => {
    setToastState(true);
  };

  const onClickImg = (e: React.MouseEvent) => {
    imgRef.current?.click();
  };

  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nowImgList = e.target.files;
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

  return (
    <>
      {!isCategoryModalOpen && !isImgModalOpen && (
        <div className={styles.writePageWrapper}>
          {isConfirmOpen && (
            <div className={confirmStyles.box}>
              <p className={confirmStyles.contents}>
                {!title && "제목"}
                {!title && (!category || !serialize(value)) && ", "}
                {!category && "카테고리"}
                {!category && !serialize(value) && ", "}
                {!serialize(value) && "내용"}
                {!!serialize(value) && !category ? "는 " : "은 "}
                필수 입력 항목이에요.
              </p>
              <button
                className={confirmStyles.confirmButton}
                onClick={() => setIsConfirmOpen(false)}
              >
                확인
              </button>
            </div>
          )}
          <div
            className={`${styles.backShadow} ${
              isConfirmOpen ? styles.show : ""
            }`}
            onClick={() => setIsConfirmOpen(false)}
          />
          <div className={styles.header}>
            <img
              className={styles.closeButton}
              src={closeButton}
              alt="닫기"
              onClick={onClickClose}
            />
            <h1 className={styles.headerTitle}>중고거래 글쓰기</h1>
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
                {!!category ? category : "카테고리 선택"}
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
              <Slate
                editor={editor}
                value={value}
                onChange={(value) => setValue(value)}
              >
                <Editable placeholder="301동에 올릴 게시글 내용을 작성해주세요.(가품 및 판매금지품목은 게시가 제한될 수 있어요.)" />{" "}
                {/* 현재 위치는 나중에 유저 데이터에서 받아와서 입력*/}
              </Slate>
            </div>
          </div>
          {toastState && (
            <div
              className={styles.toastWrapper}
              onClick={() => setToastState(false)}
            >
              <p className={styles.toastMessage}>
                글이 너무 짧아요. 조금 더 길게 작성해주세요.
              </p>
            </div>
          )}
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
