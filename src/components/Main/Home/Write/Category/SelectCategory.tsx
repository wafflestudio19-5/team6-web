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
  category: number | undefined;
  setCategory: Dispatch<React.SetStateAction<number | undefined>>;
  setIsCategoryModalOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const onClickBack = () => {
    setIsCategoryModalOpen(false);
  };
  const onClickCategory = (e: number) => {
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
              category === 1
                ? styles.clickedCategoryWrapper
                : styles.defaultCategoryWrapper
            }
            onClick={() => onClickCategory(1)}
          >
            <p className={styles.category}>디지털기기</p>
            {category === 1 && (
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
            )}
          </div>
          <div
            className={
              category === 2
                ? styles.clickedCategoryWrapper
                : styles.defaultCategoryWrapper
            }
            onClick={() => onClickCategory(2)}
          >
            <p className={styles.category}>생활가전</p>
            {category === 2 && (
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
            )}
          </div>
          <div
            className={
              category === 3
                ? styles.clickedCategoryWrapper
                : styles.defaultCategoryWrapper
            }
            onClick={() => onClickCategory(3)}
          >
            <p className={styles.category}>가구/인테리어</p>
            {category === 3 && (
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
            )}
          </div>
          <div
            className={
              category === 4
                ? styles.clickedCategoryWrapper
                : styles.defaultCategoryWrapper
            }
            onClick={() => onClickCategory(4)}
          >
            <p className={styles.category}>유아동</p>
            {category === 4 && (
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
            )}
          </div>
          <div
            className={
              category === 5
                ? styles.clickedCategoryWrapper
                : styles.defaultCategoryWrapper
            }
            onClick={() => onClickCategory(5)}
          >
            <p className={styles.category}>생활/가공식품</p>
            {category === 5 && (
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
            )}
          </div>
          <div
            className={
              category === 6
                ? styles.clickedCategoryWrapper
                : styles.defaultCategoryWrapper
            }
            onClick={() => onClickCategory(6)}
          >
            <p className={styles.category}>유아도서</p>
            {category === 6 && (
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
            )}
          </div>
          <div
            className={
              category === 7
                ? styles.clickedCategoryWrapper
                : styles.defaultCategoryWrapper
            }
            onClick={() => onClickCategory(7)}
          >
            <p className={styles.category}>스포츠/레저</p>
            {category === 7 && (
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
            )}
          </div>
          <div
            className={
              category === 8
                ? styles.clickedCategoryWrapper
                : styles.defaultCategoryWrapper
            }
            onClick={() => onClickCategory(8)}
          >
            <p className={styles.category}>여성잡화</p>
            {category === 8 && (
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
            )}
          </div>
          <div
            className={
              category === 9
                ? styles.clickedCategoryWrapper
                : styles.defaultCategoryWrapper
            }
            onClick={() => onClickCategory(9)}
          >
            <p className={styles.category}>여성의류</p>
            {category === 9 && (
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
            )}
          </div>
          <div
            className={
              category === 10
                ? styles.clickedCategoryWrapper
                : styles.defaultCategoryWrapper
            }
            onClick={() => onClickCategory(10)}
          >
            <p className={styles.category}>남성패션/잡화</p>
            {category === 10 && (
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
            )}
          </div>
          <div
            className={
              category === 11
                ? styles.clickedCategoryWrapper
                : styles.defaultCategoryWrapper
            }
            onClick={() => onClickCategory(11)}
          >
            <p className={styles.category}>게임/취미</p>
            {category === 11 && (
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
            )}
          </div>
          <div
            className={
              category === 12
                ? styles.clickedCategoryWrapper
                : styles.defaultCategoryWrapper
            }
            onClick={() => onClickCategory(12)}
          >
            <p className={styles.category}>뷰티/미용</p>
            {category === 12 && (
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
            )}
          </div>
          <div
            className={
              category === 13
                ? styles.clickedCategoryWrapper
                : styles.defaultCategoryWrapper
            }
            onClick={() => onClickCategory(13)}
          >
            <p className={styles.category}>반려동물용품</p>
            {category === 13 && (
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
            )}
          </div>
          <div
            className={
              category === 14
                ? styles.clickedCategoryWrapper
                : styles.defaultCategoryWrapper
            }
            onClick={() => onClickCategory(14)}
          >
            <p className={styles.category}>도서/티켓/음반</p>
            {category === 14 && (
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
            )}
          </div>
          <div
            className={
              category === 15
                ? styles.clickedCategoryWrapper
                : styles.defaultCategoryWrapper
            }
            onClick={() => onClickCategory(15)}
          >
            <p className={styles.category}>식물</p>
            {category === 15 && (
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
            )}
          </div>
          <div
            className={
              category === 16
                ? styles.clickedCategoryWrapper
                : styles.defaultCategoryWrapper
            }
            onClick={() => onClickCategory(16)}
          >
            <p className={styles.category}>기타 중고물품</p>
            {category === 16 && (
              <img className={styles.checked} src={orangeCheck} alt="선택됨" />
            )}
          </div>
          <div
            className={
              category === 17
                ? styles.clickedCategoryWrapper
                : styles.defaultCategoryWrapper
            }
            onClick={() => onClickCategory(17)}
          >
            <p className={styles.category}>삽니다</p>
            {category === 17 && (
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
