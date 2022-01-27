import styles from "./SignUp.module.scss";
import carrotLogo from "../../icons/daangn-logo.svg";
import kakaologo from "../../icons/kakao-logo.png";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import * as React from "react";
import { ChangeEventHandler, useEffect, useState } from "react";
import CheckIcon from "./CheckIcon/CheckIcon";
import Button from "@mui/material/Button";
import { user } from "../../apis/requester";
import { toast } from "react-hot-toast";

type TSignupForm = {
  username: string;
  nickname: string;
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
    nickname: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    email: "",
    location: "",
  });
  const [duplicated, setDuplicated] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    location.state && setInputs(location.state.inputs);
    location.state = null;
  });

  /* 회원가입 format
     username: 6-14자의 영문+숫자 조합
     nickname: 3-14자의 한글,영문,숫자
     password: 8-16자의 영문+숫자+특수문자 조합
     phone: xxx-xxxx-xxxx
     email: 일반적인 email 양식
   */
  const regId = /^[A-Za-z0-9]{6,14}$/;
  const regNickname = /^[가-힣A-Za-z0-9]{3,14}$/;
  const regPassword =
    /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=*()]).*$/;
  const regPhone = /^\d{3}-\d{4}-\d{4}$/;
  const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  /* phone input을 xxx-xxxx-xxxx 형태로 format */
  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    // 숫자가 아닌 부분 지워서 숫자로만 이루어진 문자열로 바꾼다.
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;

    /* 입력한 숫자 개수가 3개 이하일 경우 */
    if (phoneNumberLength < 4) return phoneNumber;
    /* 입력한 숫자 개수가 4개 이상 7개 이하일 경우 */
    if (phoneNumberLength < 8) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    /* 입력한 숫자 개수 7개 이상일 경우, 11개 입력한 경우 그 이상 입력 안 됨. */
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
      3,
      7
    )}-${phoneNumber.slice(7, 11)}`;
  };

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    if (e.target.name === "phone") {
      setInputs({
        ...inputs,
        phone: formatPhoneNumber(e.target.value),
      });
    } else if (e.target.name === "username") {
      setInputs({
        ...inputs,
        username: e.target.value,
      });
      setDuplicated(true);
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleToCheckDuplicate = async () => {
    try {
      const res = await user.get(`/users/duplicate/?name=${inputs.username}`);
      if (res.data) toast.error("중복된 아이디가 존재합니다.");
      setDuplicated(res.data);
    } catch (error) {
      console.log("duplicate error");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/select-location", {
      state: { prev: "signup", signupForm: inputs },
    });
  };

  return (
    <div>
      {token && <Navigate replace to="/main" />}
      <div className={styles["signup-page-wrapper"]}>
        <img src={carrotLogo} className={styles.daangnlogo} alt="logo" />
        <section className={styles["social-login-wrapper"]}>
          <h2>동네 주민들과 따뜻한 거래를 나누려면 가입하세요.</h2>
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
        <form onSubmit={handleSubmit}>
          <div className={styles.inputbox}>
            <input
              className={styles.username}
              name="username"
              value={inputs.username}
              onChange={handleChange}
              placeholder="ID"
            />
            {inputs.username.length !== 0 ? (
              <CheckIcon
                config={regId.test(inputs.username)}
                configMessage={"아이디는 6~14자의 영문+숫자 조합이여야 합니다."}
              />
            ) : (
              <div className={styles.emptybox} />
            )}
            <Button
              tabIndex={-1}
              className={styles.uniquecheck}
              variant="contained"
              color="primary"
              disabled={!regId.test(inputs.username)}
              onClick={handleToCheckDuplicate}
            >
              중복체크
            </Button>
          </div>
          <div className={styles.inputbox}>
            <input
              name="nickname"
              value={inputs.nickname}
              onChange={handleChange}
              placeholder="닉네임"
            />
            {inputs.nickname.length !== 0 ? (
              <CheckIcon
                config={regNickname.test(inputs.nickname)}
                configMessage={
                  "닉네임은 띄어쓰기 없이 3~14자의 한글,영문,숫자만 가능합니다."
                }
              />
            ) : null}
          </div>
          <div className={styles.inputbox}>
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              placeholder="비밀번호"
            />
            {inputs.password.length !== 0 ? (
              <CheckIcon
                config={regPassword.test(inputs.password)}
                configMessage={
                  "비밀번호는 8~16자의 영문+숫자+특수문자만 가능합니다."
                }
              />
            ) : null}
          </div>
          <div className={styles.inputbox}>
            <input
              type="password"
              name="passwordConfirm"
              value={inputs.passwordConfirm}
              onChange={handleChange}
              placeholder="비밀번호 확인"
            />
            {inputs.passwordConfirm.length !== 0 ? (
              <CheckIcon
                config={inputs.password === inputs.passwordConfirm}
                configMessage={"위에 입력한 비밀번호와 다릅니다."}
              />
            ) : null}
          </div>
          <div className={styles.inputbox}>
            <input
              name="phone"
              value={inputs.phone}
              onChange={handleChange}
              placeholder="휴대폰 번호"
            />
            {inputs.phone.length !== 0 ? (
              <CheckIcon
                config={regPhone.test(inputs.phone)}
                configMessage={"올바른 휴대전화번호 형식이 아닙니다."}
              />
            ) : null}
          </div>
          <div className={styles.inputbox}>
            <input
              name="email"
              value={inputs.email}
              onChange={handleChange}
              placeholder="이메일 주소"
            />
            {inputs.email.length !== 0 ? (
              <CheckIcon
                config={regEmail.test(inputs.email)}
                configMessage={"올바른 이메일 형식이 아닙니다."}
              />
            ) : null}
          </div>
          <div className={styles["text-wrapper"]}>
            {duplicated && (
              <p>중복체크 버튼을 눌러 중복된 아이디가 없는지 확인해주세요.</p>
            )}
          </div>
          <button
            className={styles["set-location"]}
            disabled={
              !regId.test(inputs.username) ||
              !regPassword.test(inputs.password) ||
              inputs.password !== inputs.passwordConfirm ||
              !regPhone.test(inputs.phone) ||
              !regEmail.test(inputs.email) ||
              duplicated
            }
          >
            내 동네 설정하기
          </button>
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
