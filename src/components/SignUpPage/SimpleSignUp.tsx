import styles from "./SimpleSignUp.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import carrotLogo from "../../icons/daangn-logo.svg";
import * as React from "react";

const SimpleSignUp = () => {
  const token: string | null = localStorage.getItem("token");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      console.log("들어왔다");
    } else {
      !token && navigate("/login");
    }
  });

  return (
    <div className={styles.wrapper}>
      <img src={carrotLogo} className={styles.logo} alt="당근 마켓" />
    </div>
  );
};

export default SimpleSignUp;
