import styles from "./Settings.module.scss";
import confirmStyles from "../../Utilities/confirm.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import backArrow from "../../../icons/leftArrow.png";

const Settings = (props: {
  confirm: boolean;
  setConfirm: Dispatch<SetStateAction<boolean>>;
}) => {
  const [notification, setNotification] = useState(false);
  const [account, setAccount] = useState(false);
  const [withdrawal, setWithdrawal] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    props.setConfirm(false);
  };

  const changeToNotification = () => {
    setNotification(true);
  };

  const changeToAccount = () => {
    setAccount(true);
  };

  const changeToWithdrawal = () => {
    setWithdrawal(true);
  };

  if (notification) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.fakeHeader} />
        <div className={styles.subHeader}>
          <img
            className={styles.backArrow}
            onClick={() => setNotification(false)}
            src={backArrow}
            alt="뒤로가기"
          />
          <p className={styles.pageName}>알림</p>
        </div>
          <div className={styles.section}>
            <p className={styles.title}>거래 알림</p>
            <p className={styles.button}>거래 관련 알림</p>
            <p className={styles.contents}>거래 메시지 알림</p>
          </div>
          <div className={styles.section}>
            <p className={styles.title}>서비스 알림</p>
            <p className={styles.button}>활동 알림</p>
            <p className={styles.contents}>관심, 조회수 등 알림</p>
            <p className={styles.button}>기타 알림</p>
            <p className={styles.contents}>가계부, 나눔의 날 등 알림</p>
            <p className={styles.button}>마케팅 알림</p>
          </div>
          <div className={styles.section}>
            <p className={styles.title}>서비스 알림</p>
            <p className={styles.button}>활동 알림</p>
            <p className={styles.contents}>관심, 조회수 등 알림</p>
            <p className={styles.button}>기타 알림</p>
            <p className={styles.contents}>가계부, 나눔의 날 등 알림</p>
            <p className={styles.button}>마케팅 알림</p>
          </div>
        </div>
    );
  }

  if (account) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.fakeHeader} />
        <div className={styles.subHeader}>
          <img
            className={styles.backArrow}
            onClick={() => setAccount(false)}
            src={backArrow}
            alt="뒤로가기"
          />
          <p className={styles.pageName}>계정 / 정보 관리</p>
        </div>
          <div className={styles.section}>
            <p className={styles.title}>계정 정보</p>
            <p className={styles.button}>이메일</p>
            <p className={styles.button}>휴대폰 번호</p>
            <p className={styles.contents}>010-XXXX-XXXX</p>
          </div>
          <div className={styles.section}>
            <p className={styles.title}>기타</p>
            <p className={styles.button}>서비스 이용약관</p>
          </div>
        </div>
    );
  }

  if (withdrawal) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.fakeHeader} />
        <div className={styles.subHeader}>
          <img
            className={styles.backArrow}
            onClick={() => setWithdrawal(false)}
            src={backArrow}
            alt="뒤로가기"
          />
          <p className={styles.pageName}>알림</p>
        </div>
          <div className={styles.section}>
            <p className={styles.title}>거래 알림</p>
            <p className={styles.button}>거래 관련 알림</p>
            <p className={styles.contents}>거래 메시지 알림</p>
          </div>
          <div className={styles.section}>
            <p className={styles.title}>서비스 알림</p>
            <p className={styles.button}>활동 알림</p>
            <p className={styles.contents}>관심, 조회수 등 알림</p>
            <p className={styles.button}>기타 알림</p>
            <p className={styles.contents}>가계부, 나눔의 날 등 알림</p>
            <p className={styles.button}>마케팅 알림</p>
          </div>
          <div className={styles.section}>
            <p className={styles.title}>서비스 알림</p>
            <p className={styles.button}>활동 알림</p>
            <p className={styles.contents}>관심, 조회수 등 알림</p>
            <p className={styles.button}>기타 알림</p>
            <p className={styles.contents}>가계부, 나눔의 날 등 알림</p>
            <p className={styles.button}>마케팅 알림</p>
          </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
        <div className={styles.section}>
          <p className={styles.title}>알림 설정</p>
          <p className={styles.button} onClick={changeToNotification}>
            알림
          </p>
        </div>
        <div className={styles.section}>
          <p className={styles.title}>사용자 설정</p>
          <p className={styles.button} onClick={changeToAccount}>
            계정 / 정보 관리
          </p>
        </div>
        <div className={styles.section}>
          <p className={styles.title}>기타 설정</p>
          <p className={styles.button} onClick={() => props.setConfirm(true)}>
            로그아웃
          </p>
          <p className={styles.button} onClick={changeToWithdrawal}>
            탈퇴하기
          </p>
        </div>
        {props.confirm && (
          <div className={confirmStyles.box}>
            <p className={confirmStyles.title}>로그아웃</p>
            <p className={confirmStyles.contents}>정말 로그아웃 하시겠나요?</p>
            <button className={confirmStyles.confirmButton} onClick={logout}>
              로그아웃
            </button>
            <button
              className={confirmStyles.cancelButton}
              onClick={() => props.setConfirm(false)}
            >
              닫기
            </button>
          </div>
        )}
    </div>
  );
};

export default Settings;
