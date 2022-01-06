import styles from "./EditLocationLevel.module.scss";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BackArrowIcon from "../../../../icons/leftArrow.png";
import LevelZero from "../../../../icons/MyCarrot/level_zero.png";
import LevelOne from "../../../../icons/MyCarrot/level_one.png";
import LevelTwo from "../../../../icons/MyCarrot/level_two.png";
import LevelThree from "../../../../icons/MyCarrot/level_three.png";
import { Slider } from "@mui/material";

const EditLocationLevel = () => {
  const [level, setLevel] = useState<number>(1);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    //location.state && setLevel(location.state.level);
    location.state = null;
  });

  const handleSliderChange = (event: any, newLevel: number) => {
    setLevel(newLevel);
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <Link to={"/main"} state={{ page: "user" }} className={styles.back}>
          <img src={BackArrowIcon} alt="뒤로" />
        </Link>
        <p>거래범위 설정</p>
      </header>
      <div className={styles["body-wrapper"]}>
        <p>{level}</p>
        <Slider
          aria-label="Temperature"
          color="primary"
          defaultValue={1}
          step={1}
          marks
          min={0}
          max={3}
        />
        <img
          className={`${level === 0 ? styles.show : ""}`}
          src={LevelZero}
          alt="레벨 0"
        />
        <img
          className={`${level === 1 ? styles.show : ""}`}
          src={LevelOne}
          alt="레벨 1"
        />
        <img
          className={`${level === 2 ? styles.show : ""}`}
          src={LevelTwo}
          alt="레벨 2"
        />
        <img
          className={`${level === 3 ? styles.show : ""}`}
          src={LevelThree}
          alt="레벨 3"
        />
        <button
          onClick={() => {
            setLevel(0);
          }}
        >
          눌러 0
        </button>
        <button
          onClick={() => {
            setLevel(1);
          }}
        >
          눌러 1
        </button>
        <button
          onClick={() => {
            setLevel(2);
          }}
        >
          눌러 2
        </button>
        <button
          onClick={() => {
            setLevel(3);
          }}
        >
          눌러 3
        </button>
      </div>
    </div>
  );
};

export default EditLocationLevel;
