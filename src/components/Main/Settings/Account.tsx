import styles from "./Account.module.scss";
import styles2 from "../../Utilities/confirm.module.scss";
import backArrow from "../../../icons/leftArrow.png";
import { ChangeEventHandler, Dispatch, SetStateAction, useState } from "react";
import requester from "../../../apis/requester";
import { formatPhoneNumber, regEmail, regPhone } from "../../SignUpPage/SignUp";
import { toast } from "react-hot-toast";
import { useUserDispatch, useUserState } from "../../../context/user-context";

const Account = (props: { setAccount: Dispatch<SetStateAction<boolean>> }) => {
  const [emailModal, setEmailModal] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const user = useUserState();
  const setUser = useUserDispatch();

  if (!user) {
    return <div className={styles.wrapper} />;
  }

  const handlePhoneChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPhoneInput(formatPhoneNumber(e.target.value));
  };

  const handlePhoneConfirm = () => {
    if (!phoneInput) {
      toast.error("변경할 전화번호를 입력해주세요.");
    } else if (regPhone.test(phoneInput)) {
      requester
        .patch("/users/me/", { phone: phoneInput })
        .then(() => {
          setUser({ ...user, phone: phoneInput });
          setPhoneModal(false);
        })
        .catch((e) => {});
      setPhoneInput("");
    } else {
      toast.error("올바른 전화번호 형식이 아닙니다.");
    }
  };

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmailInput(e.target.value);
  };

  const handleEmailConfirm = () => {
    if (!emailInput) {
      toast.error("변경할 이메일을 입력해주세요.");
    } else if (regEmail.test(emailInput)) {
      requester
        .patch("/users/me/", { email: emailInput })
        .then(() => {
          setUser({ ...user, email: emailInput });
          setEmailInput("");
        })
        .catch((e) => {});
      setEmailModal(false);
    } else {
      toast.error("올바른 이메일 형식이 아닙니다.");
    }
  };
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
          <div className={styles.button}>
            <div className={styles.textArea}>
              이메일
              <div className={styles.contents}>{user.email}</div>
            </div>
            <div
              className={styles.changeText}
              onClick={() => setEmailModal(true)}
            >
              변경
            </div>
          </div>
          <div className={styles.button}>
            <div className={styles.textArea}>
              전화번호
              <div className={styles.contents}>{user.phone}</div>
            </div>
            <div
              className={styles.changeText}
              onClick={() => setPhoneModal(true)}
            >
              변경
            </div>
          </div>
        </div>
      </div>
      {emailModal && (
        <>
          <div
            className={styles.backShadow}
            onClick={() => {
              setEmailModal(false);
              setEmailInput("");
            }}
          />
          <div className={styles2.box}>
            <p className={styles2.title}>이메일 변경</p>
            <input
              value={emailInput}
              className={styles2.input}
              placeholder={user.email}
              onChange={handleEmailChange}
            />
            <div className={styles2.confirmButton} onClick={handleEmailConfirm}>
              확인
            </div>
            <div
              className={styles2.cancelButton}
              onClick={() => {
                setEmailModal(false);
                setEmailInput("");
              }}
            >
              취소
            </div>
          </div>
        </>
      )}
      {phoneModal && (
        <>
          <div
            className={styles.backShadow}
            onClick={() => {
              setPhoneModal(false);
              setPhoneInput("");
            }}
          />
          <div className={styles2.box}>
            <p className={styles2.title}>전화번호 변경</p>
            <input
              value={phoneInput}
              className={styles2.input}
              placeholder={user.phone}
              onChange={handlePhoneChange}
            />
            <div className={styles2.confirmButton} onClick={handlePhoneConfirm}>
              확인
            </div>
            <div
              className={styles2.cancelButton}
              onClick={() => {
                setPhoneModal(false);
                setPhoneInput("");
              }}
            >
              취소
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
