import "./Login.scss";
import carrotLogo from "../../icons/daangn-logo.svg";
import kakaoLogo from "../../icons/kakao-logo.png";
import { ChangeEventHandler, useEffect, useState } from "react";
import * as React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { requester } from "../../apis/requester";
import { toast } from "react-hot-toast";

type TLoginForm = {
  username: string;
  password: string;
};

const Login = () => {
  const [inputs, setInputs] = useState<TLoginForm>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const token: string | null = localStorage.getItem("token");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const loginTest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await requester({
        method: "POST",
        url: "/users/signin/",
        data: {
          name: inputs.username,
          password: inputs.password,
        },
      });
      localStorage.setItem("token", res.data.access_token);
      navigate("/main");
    } catch (error) {
      toast.error("로그인 정보 틀림");
    }
  };

  return (
    <div>
      {token && <Navigate replace to="/main" />}
      <div className="login-wrapper">
        <img src={carrotLogo} className="daangn-logo" alt="logo" />
        <form onSubmit={loginTest}>
          <input
            className="login-input-username"
            name="username"
            value={inputs.username}
            onChange={handleChange}
            placeholder="아이디를 입력해 주세요."
            autoComplete="off"
          />
          <input
            className="login-input-password"
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해 주세요."
          />
          <button className="login-button">로그인</button>
        </form>
        <button className="social-login-button kakao">
          <img src={kakaoLogo} alt="logo" />
          <span>카카오 로그인</span>
        </button>
        <div className="sign-up-wrapper">
          <span>동네 주민들과 가깝고 따뜻한 거래를</span>
          <Link to="/signup" className="sign-up-button">
            <i>
              <u>회원가입</u>
            </i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
