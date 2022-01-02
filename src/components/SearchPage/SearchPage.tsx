import styles from "./SearchPage.module.scss";
import { useState } from "react";
import leftArrow from "../../icons/leftArrow.png";

const SearchPage = () => {
  const [keyword, setKeyword] = useState<string>();
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <img className={styles.leftArrow} src={leftArrow} alt="뒤로 가기" />
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
