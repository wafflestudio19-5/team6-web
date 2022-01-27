import styles from "./GetInformation.module.scss";
import carrotLogo from "../../icons/daangn-logo.svg";
import * as React from "react";
import { useEffect, useState } from "react";
import { formatPhoneNumber } from "../Utilities/functions";
import CheckIcon from "../SignUpPage/CheckIcon/CheckIcon";
import { useLocation, useNavigate } from "react-router-dom";

const GetInformation = () => {
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  const regPhone = /^\d{3}-\d{4}-\d{4}$/;
  const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  useEffect(() => {
    location.state === null && navigate("/main?page=home");
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/select-location", {
      state: {
        prev: "first-social-login",
        phone: phone,
        email: email,
      },
    });
  };

  return (
    <div className={styles.wrapper}>
      <img src={carrotLogo} className={styles.daangnlogo} alt="logo" />
      <form onSubmit={handleSubmit}>
        <div className={styles["input-box"]}>
          <input
            name="phone"
            value={phone}
            onChange={(e) => {
              setPhone(formatPhoneNumber(e.target.value));
            }}
            placeholder="휴대폰 번호"
          />
          {phone.length !== 0 ? (
            <CheckIcon
              config={regPhone.test(phone)}
              configMessage={"올바른 휴대폰 번호 형식이 아닙니다."}
            />
          ) : null}
        </div>
        <div className={styles["input-box"]}>
          <input
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="이메일 주소"
          />
          {email.length !== 0 ? (
            <CheckIcon
              config={regEmail.test(email)}
              configMessage={"올바른 이메일 형식이 아닙니다."}
            />
          ) : null}
        </div>
        <button
          className={styles["set-location"]}
          disabled={!regPhone.test(phone) || !regEmail.test(email)}
        >
          내 동네 설정하기
        </button>
      </form>
    </div>
  );
};

export default GetInformation;
