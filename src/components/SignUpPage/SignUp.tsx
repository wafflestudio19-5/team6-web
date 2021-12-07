import styles from "./SignUp.module.scss";
import carrotLogo from "../../icons/daangn-logo.svg";
import kakaologo from "../../icons/kakao-logo.svg";
import { Link, Navigate } from "react-router-dom";
import * as React from "react";
import { ChangeEventHandler, useState } from "react";

type TSignupForm = {
  username: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  email: string;
  location: string;
};

const SignUp = () => {
  const token: string | null = localStorage.getItem("token");

  const [inputs, setInputs] = useState<TSignupForm>({
    username: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    email: "",
    location: "",
  });

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {token && <Navigate replace to="/main" />}
      <div className={styles["signup-page-wrapper"]}>
        <img src={carrotLogo} className={styles.daangnlogo} alt="logo" />
        <section className={styles["social-login-wrapper"]}>
          <h2>동네 사람들과 안 쓰는 물건을 거래하려면 가입하세요.</h2>
          <button
            onClick={() => {
              console.log("소셜 로그인");
            }}
          >
            <img src={kakaologo} alt="logo" />
            <span>카카오 로그인</span>
          </button>
          <div className={styles["hr-sect"]}>또는</div>
        </section>
        <form>
          <input
            name="username"
            value={inputs.username}
            onChange={handleChange}
            placeholder="ID"
          />
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            placeholder="비밀번호"
          />
          <input
            type="password"
            name="passwordConfirm"
            value={inputs.passwordConfirm}
            onChange={handleChange}
            placeholder="비밀번호 확인"
          />
          <input
            name="phone"
            value={inputs.phone}
            onChange={handleChange}
            placeholder="휴대폰 번호"
          />
          <input
            name="email"
            value={inputs.email}
            onChange={handleChange}
            placeholder="이메일 주소"
          />
          <button className={styles["set-location"]}>내 동네 설정하기</button>
        </form>
        <hr />
        <section className={styles.backtologin}>
          <p>계정이 있으신가요?</p>
          <Link to="/login" className={styles.goback}>
            <i>로그인</i>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default SignUp;
