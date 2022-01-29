import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./LocationRange.module.scss";
import { Slider, TextareaAutosize } from "@mui/material";
import grayCross from "../../../../../icons/grayCross.png";
import { Link } from "react-router-dom";
import BackArrowIcon from "../../../../../icons/leftArrow.png";
import { toShortDivision } from "../../../../Utilities/functions";
import CancelIcon from "../../../../../icons/MyCarrot/white-cancel.png";
import LevelZero from "../../../../../icons/MyCarrot/level_zero.png";
import LevelOne from "../../../../../icons/MyCarrot/level_one.png";
import LevelTwo from "../../../../../icons/MyCarrot/level_two.png";
import LevelThree from "../../../../../icons/MyCarrot/level_three.png";
import Button from "@mui/material/Button";
import User from "../../../../../apis/User/User";
import requester from "../../../../../apis/requester";

type TNumberOfRegions = {
  zero: number;
  one: number;
  two: number;
  three: number;
};

const LocationRange = (props: {
  isLocationOpen: boolean;
  setIsLocationOpen: Dispatch<SetStateAction<boolean>>;
  rangeOfLocation: number;
  setRangeOfLocation: Dispatch<SetStateAction<number>>;
}) => {
  const [location, setLocation] = useState<string>("");
  const [level, setLevel] = useState<number>(3);
  const [adjacentRegions, setAdjacentRegions] = useState<TNumberOfRegions>({
    zero: 0,
    one: 0,
    two: 0,
    three: 0,
  });
  useEffect(() => {
    setLevel(props.rangeOfLocation);
    User.getMe().then((res) => {
      setLocation(res.data.first_location);
      getAdjacentRegion(res.data.first_location);
    });
  }, []);

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

  const numberOfRegionsByLevel = (level: number) => {
    if (level === 0) return adjacentRegions.zero;
    else if (level === 1) return adjacentRegions.one;
    else if (level === 2) return adjacentRegions.two;
    else return adjacentRegions.three;
  };

  const handleSliderChange = (event: any, newValue: any) => {
    setLevel(newValue);
  };

  const onClickBack = () => {
    props.setIsLocationOpen(false);
    props.setRangeOfLocation(level);
  };
  return (
    <>
      <div className={styles.wrapper}>
        <header>
          <img src={BackArrowIcon} alt="뒤로" onClick={onClickBack} />
          <p>내 동네 설정</p>
        </header>
        <div className={styles["body-wrapper"]}>
          <p className={styles["first-text"]}>{`${toShortDivision(
            location
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
            className={`${
              level === 0
                ? `${styles["level-image"]} ${styles.show}`
                : styles["level-image"]
            }`}
            src={LevelZero}
            alt="레벨 0"
          />
          <img
            className={`${
              level === 1
                ? `${styles["level-image"]} ${styles.show}`
                : styles["level-image"]
            }`}
            src={LevelOne}
            alt="레벨 1"
          />
          <img
            className={`${
              level === 2
                ? `${styles["level-image"]} ${styles.show}`
                : styles["level-image"]
            }`}
            src={LevelTwo}
            alt="레벨 2"
          />
          <img
            className={`${
              level === 3
                ? `${styles["level-image"]} ${styles.show}`
                : styles["level-image"]
            }`}
            src={LevelThree}
            alt="레벨 3"
          />
        </div>
      </div>
    </>
  );
};

export default LocationRange;
