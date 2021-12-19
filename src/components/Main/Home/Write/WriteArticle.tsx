import styles from "./WriteArticle.module.scss";
import confirmStyles from "./confirm.module.scss";

import closeButton from "../../../../icons/closebutton.png";
import imageUploadButton from "../../../../icons/imageUpload.png";
import sentence from "../../../../icons/addProperty.png";
import setting from "../../../../icons/settingSlider.png";
import backButton from "../../../../icons/leftArrow.png";
import orangeCheck from "../../../../icons/orangecheck.png";
import rightButton from "../../../../icons/right.png";

import { useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { createEditor, Descendant, Node } from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import dummyData from "../../../Article/DummyData";
import * as React from "react";

const WriteArticle = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [toastState, setToastState] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [pChecked, setPChecked] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [value, setValue] = useState<Descendant[]>([
    { type: "paragraph", children: [{ text: "" }] },
  ]);

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

  const onClickBack = () => {
    setIsModalOpen(false);
  };
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onClickCategory = (e: string) => {
    setCategory(e);
    setIsModalOpen(false);
  };
  const handleCategory = () => {
    setIsModalOpen(true);
  };
  const onClickClose = () => {
    navigate(-1);
  };

  const onClickDone = () => {
    console.log(serialize(value).length);
    if (!title || !category || !serialize(value)) setIsConfirmOpen(true);
    else if (serialize(value).length <= 5) setToastState(true);
    else {
      dummyData.push({
        id: Math.floor(Math.random() * Math.pow(10, 10)),
        name: "현재유저",
        region: "현재지역",
        profile_img:
          "https://wafflestudio.com/_next/image?url=%2Fimages%2Ficon_intro.svg&w=256&q=75",
        title: title,
        product_img: [
          "https://wafflestudio.com/_next/image?url=%2Fimages%2Ficon_intro.svg&w=256&q=75",
        ], //
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
      navigate("/main");
    }
  };
  const handleCheck = () => {
    if (!!price) setPChecked(!pChecked);
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

  return (
    <>
      {!isModalOpen && (
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
              <img
                className={styles.imageUpload}
                src={imageUploadButton}
                alt="이미지 업로드"
              />
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
                checked={pChecked}
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
      {isModalOpen && (
        <div className={styles.writePageWrapper}>
          <div className={styles.header}>
            <img
              className={styles.backButton}
              src={backButton}
              alt="뒤로가기"
              onClick={onClickBack}
            />
            <h1 className={styles.headerTitle}>카테고리 선택</h1>
          </div>
          <div className={styles.categoryContentWrapper}>
            <div
              className={
                category === "디지털기기"
                  ? styles.clickedCategoryWrapper
                  : styles.defaultCategoryWrapper
              }
              onClick={() => onClickCategory("디지털기기")}
            >
              <p className={styles.category}>디지털기기</p>
              {category === "디지털기기" && (
                <img
                  className={styles.checked}
                  src={orangeCheck}
                  alt="선택됨"
                />
              )}
            </div>
            <div
              className={
                category === "생활가전"
                  ? styles.clickedCategoryWrapper
                  : styles.defaultCategoryWrapper
              }
              onClick={() => onClickCategory("생활가전")}
            >
              <p className={styles.category}>생활가전</p>
              {category === "생활가전" && (
                <img
                  className={styles.checked}
                  src={orangeCheck}
                  alt="선택됨"
                />
              )}
            </div>
            <div
              className={
                category === "가구/인테리어"
                  ? styles.clickedCategoryWrapper
                  : styles.defaultCategoryWrapper
              }
              onClick={() => onClickCategory("가구/인테리어")}
            >
              <p className={styles.category}>가구/인테리어</p>
              {category === "가구/인테리어" && (
                <img
                  className={styles.checked}
                  src={orangeCheck}
                  alt="선택됨"
                />
              )}
            </div>
            <div
              className={
                category === "유아동"
                  ? styles.clickedCategoryWrapper
                  : styles.defaultCategoryWrapper
              }
              onClick={() => onClickCategory("유아동")}
            >
              <p className={styles.category}>유아동</p>
              {category === "유아동" && (
                <img
                  className={styles.checked}
                  src={orangeCheck}
                  alt="선택됨"
                />
              )}
            </div>
            <div
              className={
                category === "생활/가공식품"
                  ? styles.clickedCategoryWrapper
                  : styles.defaultCategoryWrapper
              }
              onClick={() => onClickCategory("생활/가공식품")}
            >
              <p className={styles.category}>생활/가공식품</p>
              {category === "생활/가공식품" && (
                <img
                  className={styles.checked}
                  src={orangeCheck}
                  alt="선택됨"
                />
              )}
            </div>
            <div
              className={
                category === "유아도서"
                  ? styles.clickedCategoryWrapper
                  : styles.defaultCategoryWrapper
              }
              onClick={() => onClickCategory("유아도서")}
            >
              <p className={styles.category}>유아도서</p>
              {category === "유아도서" && (
                <img
                  className={styles.checked}
                  src={orangeCheck}
                  alt="선택됨"
                />
              )}
            </div>
            <div
              className={
                category === "스포츠/레저"
                  ? styles.clickedCategoryWrapper
                  : styles.defaultCategoryWrapper
              }
              onClick={() => onClickCategory("스포츠/레저")}
            >
              <p className={styles.category}>스포츠/레저</p>
              {category === "스포츠/레저" && (
                <img
                  className={styles.checked}
                  src={orangeCheck}
                  alt="선택됨"
                />
              )}
            </div>
            <div
              className={
                category === "여성잡화"
                  ? styles.clickedCategoryWrapper
                  : styles.defaultCategoryWrapper
              }
              onClick={() => onClickCategory("여성잡화")}
            >
              <p className={styles.category}>여성잡화</p>
              {category === "여성잡화" && (
                <img
                  className={styles.checked}
                  src={orangeCheck}
                  alt="선택됨"
                />
              )}
            </div>
            <div
              className={
                category === "여성의류"
                  ? styles.clickedCategoryWrapper
                  : styles.defaultCategoryWrapper
              }
              onClick={() => onClickCategory("여성의류")}
            >
              <p className={styles.category}>여성의류</p>
              {category === "여성의류" && (
                <img
                  className={styles.checked}
                  src={orangeCheck}
                  alt="선택됨"
                />
              )}
            </div>
            <div
              className={
                category === "남성패션/잡화"
                  ? styles.clickedCategoryWrapper
                  : styles.defaultCategoryWrapper
              }
              onClick={() => onClickCategory("남성패션/잡화")}
            >
              <p className={styles.category}>남성패션/잡화</p>
              {category === "남성패션/잡화" && (
                <img
                  className={styles.checked}
                  src={orangeCheck}
                  alt="선택됨"
                />
              )}
            </div>
            <div
              className={
                category === "게임/취미"
                  ? styles.clickedCategoryWrapper
                  : styles.defaultCategoryWrapper
              }
              onClick={() => onClickCategory("게임/취미")}
            >
              <p className={styles.category}>게임/취미</p>
              {category === "게임/취미" && (
                <img
                  className={styles.checked}
                  src={orangeCheck}
                  alt="선택됨"
                />
              )}
            </div>
            <div
              className={
                category === "뷰티/미용"
                  ? styles.clickedCategoryWrapper
                  : styles.defaultCategoryWrapper
              }
              onClick={() => onClickCategory("뷰티/미용")}
            >
              <p className={styles.category}>뷰티/미용</p>
              {category === "뷰티/미용" && (
                <img
                  className={styles.checked}
                  src={orangeCheck}
                  alt="선택됨"
                />
              )}
            </div>
            <div
              className={
                category === "반려동물용품"
                  ? styles.clickedCategoryWrapper
                  : styles.defaultCategoryWrapper
              }
              onClick={() => onClickCategory("반려동물용품")}
            >
              <p className={styles.category}>반려동물용품</p>
              {category === "반려동물용품" && (
                <img
                  className={styles.checked}
                  src={orangeCheck}
                  alt="선택됨"
                />
              )}
            </div>
            <div
              className={
                category === "도서/티켓/음반"
                  ? styles.clickedCategoryWrapper
                  : styles.defaultCategoryWrapper
              }
              onClick={() => onClickCategory("도서/티켓/음반")}
            >
              <p className={styles.category}>도서/티켓/음반</p>
              {category === "도서/티켓/음반" && (
                <img
                  className={styles.checked}
                  src={orangeCheck}
                  alt="선택됨"
                />
              )}
            </div>
            <div
              className={
                category === "식물"
                  ? styles.clickedCategoryWrapper
                  : styles.defaultCategoryWrapper
              }
              onClick={() => onClickCategory("식물")}
            >
              <p className={styles.category}>식물</p>
              {category === "식물" && (
                <img
                  className={styles.checked}
                  src={orangeCheck}
                  alt="선택됨"
                />
              )}
            </div>
            <div
              className={
                category === "기타 중고물품"
                  ? styles.clickedCategoryWrapper
                  : styles.defaultCategoryWrapper
              }
              onClick={() => onClickCategory("기타 중고물품")}
            >
              <p className={styles.category}>기타 중고물품</p>
              {category === "기타 중고물품" && (
                <img
                  className={styles.checked}
                  src={orangeCheck}
                  alt="선택됨"
                />
              )}
            </div>
            <div
              className={
                category === "삽니다"
                  ? styles.clickedCategoryWrapper
                  : styles.defaultCategoryWrapper
              }
              onClick={() => onClickCategory("삽니다")}
            >
              <p className={styles.category}>삽니다</p>
              {category === "삽니다" && (
                <img
                  className={styles.checked}
                  src={orangeCheck}
                  alt="선택됨"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WriteArticle;
