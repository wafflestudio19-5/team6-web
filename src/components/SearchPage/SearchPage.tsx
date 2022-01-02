import styles from "./SearchPage.module.scss";
import { useState } from "react";
import leftArrow from "../../icons/leftArrow.png";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [keyword, setKeyword] = useState<string>();
  const navigate = useNavigate();
  const onClickBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <img
            className={styles.leftArrow}
            src={leftArrow}
            onClick={onClickBack}
            alt="뒤로 가기"
          />
          <input
            className={styles.inputKeyword}
            value={keyword}
            placeholder={`"낙성대동" 근처에서 검색`}
          />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
