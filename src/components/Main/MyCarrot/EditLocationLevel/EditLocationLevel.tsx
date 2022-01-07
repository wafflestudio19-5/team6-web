import styles from "./EditLocationLevel.module.scss";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BackArrowIcon from "../../../../icons/leftArrow.png";
import LevelZero from "../../../../icons/MyCarrot/level_zero.png";
import LevelOne from "../../../../icons/MyCarrot/level_one.png";
import LevelTwo from "../../../../icons/MyCarrot/level_two.png";
import LevelThree from "../../../../icons/MyCarrot/level_three.png";
import { Box, Slider } from "@mui/material";
import { toShortDivision } from "../../../Utilities/functions";
import requester from "../../../../apis/requester";

type TNumberOfRegions = {
  zero: number;
  one: number;
  two: number;
  three: number;
};

const EditLocationLevel = () => {
  const [reflected, setReflected] = useState<boolean>(false);
  const [level, setLevel] = useState<number>(1);
  const [localPosition, setLocalPosition] = useState<string>("");
  const [adjacentRegions, setAdjacentRegions] = useState<TNumberOfRegions>({
    zero: 0,
    one: 0,
    two: 0,
    three: 0,
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setReflected(true);
      if (!reflected) {
        setLevel(toNumber(location.state.level));
        setLocalPosition(location.state.localPosition);
        getAdjacentRegion(location.state.localPosition);
      }
    } else {
      navigate("/main");
    }
  });

  const toNumber = (level: string) => {
    if (level === "LEVEL_ZERO") return 0;
    else if (level === "LEVEL_ONE") return 1;
    else if (level === "LEVEL_TWO") return 2;
    else return 3;
  };

  const numberOfRegionsByLevel = (level: number) => {
    if (level === 0) return adjacentRegions.zero;
    else if (level === 1) return adjacentRegions.one;
    else if (level === 2) return adjacentRegions.two;
    else return adjacentRegions.three;
  };

  const getAdjacentRegion = async (localPosition: string) => {
    try {
      const res = await requester.get(`/location/?name=${localPosition}`);
      setAdjacentRegions({
        zero: res.data.level_zero_count,
        one: res.data.level_one_count,
        two: res.data.level_two_count,
        three: res.data.level_three_count,
      });
    } catch (error) {
      console.log("get adjacent regions error");
    }
  };

  const handleSliderChange = (event: any, newValue: any) => {
    setLevel(newValue);
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
        <p className={styles["first-text"]}>{`${toShortDivision(
          localPosition
        )}과 근처 동네 ${numberOfRegionsByLevel(level)}개`}</p>
        <p className={styles["second-text"]}>
          선택한 범위의 게시글만 볼 수 있어요.
        </p>
        <div className={styles["slider-wrapper"]}>
          <Slider
            aria-label="Temperature"
            color="primary"
            defaultValue={1}
            value={level}
            onChange={handleSliderChange}
            step={1}
            marks
            min={0}
            max={3}
          />
        </div>
        <div className={styles["span-wrapper"]}>
          <span className={styles["left-span"]}>내 동네</span>
          <span className={styles["right-span"]}>근처 동네</span>
        </div>

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
      </div>
    </div>
  );
};

export default EditLocationLevel;