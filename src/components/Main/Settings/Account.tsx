import styles from "./Settings.module.scss";
import backArrow from "../../../icons/leftArrow.png";
import { Dispatch, SetStateAction } from "react";

const Account = (props: { setAccount: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.subHeader}>
        <div
          className={styles["backArrow-wrapper"]}
          onClick={() => props.setAccount(false)}
        >
          <img className={styles.backArrow} src={backArrow} alt="뒤로가기" />
        </div>
        <div className={styles.pageName}>계정 / 정보 관리</div>
      </div>
      <div className={styles["section-wrapper"]}>
        <div className={styles.section}>
          <div className={styles.title}>계정 정보</div>
          <div className={styles.button}>이메일</div>
          <div className={styles.button}>
            휴대폰 번호
            <div className={styles.contents}>010-XXXX-XXXX</div>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.title}>기타</div>
          <div className={styles.button}>서비스 이용약관</div>
        </div>
      </div>
    </div>
  );
};

export default Account;
