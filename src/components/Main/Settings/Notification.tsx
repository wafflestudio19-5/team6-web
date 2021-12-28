import styles from "./Settings.module.scss";
import backArrow from "../../../icons/leftArrow.png";
import { Dispatch, SetStateAction } from "react";

const Notification = (props: {
  setNotification: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.subHeader}>
        <div
          className={styles["backArrow-wrapper"]}
          onClick={() => props.setNotification(false)}
        >
          <img className={styles.backArrow} src={backArrow} alt="뒤로가기" />
        </div>
        <div className={styles.pageName}>알림</div>
      </div>
      <div className={styles["section-wrapper"]}>
        <div className={styles.section}>
          <div className={styles.title}>거래 알림</div>
          <div className={styles.button}>
            거래 관련 알림
            <div className={styles.contents}>거래 메시지 알림</div>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.title}>서비스 알림</div>
          <div className={styles.button}>
            활동 알림
            <div className={styles.contents}>관심, 조회수 등 알림</div>
          </div>
          <div className={styles.button}>
            기타 알림
            <div className={styles.contents}>가계부, 나눔의 날 등 알림</div>
          </div>
          <div className={styles.button}>마케팅 알림</div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
