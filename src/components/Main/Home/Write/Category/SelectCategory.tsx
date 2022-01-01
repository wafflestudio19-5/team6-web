import styles from "../WriteArticle.module.scss";
import backButton from "../../../../../icons/leftArrow.png";
import orangeCheck from "../../../../../icons/orangecheck.png";
import * as React from "react";
import { Dispatch } from "react";

const SelectCategory = ({
  category,
  setCategory,
  setIsCategoryModalOpen,
}: {
  category: string;
  setCategory: Dispatch<React.SetStateAction<string>>;
  setIsCategoryModalOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const onClickBack = () => {
    setIsCategoryModalOpen(false);
  };
  const onClickCategory = (e: string) => {
    setCategory(e);
    setIsCategoryModalOpen(false);
  };
  return (
    <>
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
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
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
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
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
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
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
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
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
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
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
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
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
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
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
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
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
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
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
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
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
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
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
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
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
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
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
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
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
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
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
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
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
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
            )}
          </div>
        </div>
      </div>
      )
    </>
  );
};

export default SelectCategory;
