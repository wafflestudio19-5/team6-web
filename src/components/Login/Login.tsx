import "./Login.scss";
import carrotLogo from "../../icons/daangn-logo.svg";
import googleLogo from "../../icons/google-logo.svg";
import kakaoLogo from "../../icons/kakao-logo.svg";
import {ChangeEventHandler, useEffect, useState} from "react";
import * as React from "react";
import {useNavigate} from "react-router-dom";

type TLoginForm = {
    username: string;
    password: string;
}

const Login = () => {
    const [inputs, setInputs] = useState<TLoginForm>({
        username: "",
        password: ""
    });

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        localStorage.setItem("token", "000");
    }

    return (
        <div className="login-wrapper">
            <img src={carrotLogo} className="daangn-logo" alt="logo" />
            <form onSubmit={ handleSubmit }>
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
                <img src={kakaoLogo} className="kakao-logo" alt="logo"/>
                <span>카카오 로그인</span>
            </button>
        </div>
    )
}

export default Login;