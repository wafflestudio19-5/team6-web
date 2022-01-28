import styles from "./EditLocationLevel.module.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackArrowIcon from "../../../../icons/leftArrow.png";
import CancelIcon from "../../../../icons/MyCarrot/white-cancel.png";
import LevelZero from "../../../../icons/MyCarrot/level_zero.png";
import LevelOne from "../../../../icons/MyCarrot/level_one.png";
import LevelTwo from "../../../../icons/MyCarrot/level_two.png";
import LevelThree from "../../../../icons/MyCarrot/level_three.png";
import { Slider } from "@mui/material";
import { toShortDivision } from "../../../Utilities/functions";
import requester from "../../../../apis/requester";
import Button from "@mui/material/Button";
import { toast } from "react-hot-toast";

type TRegion = {
  region: string;
  is_active: boolean;
};

type TNumberOfRegions = {
  zero: number;
  one: number;
  two: number;
  three: number;
};

const EditLocationLevel = () => {
  const [level, setLevel] = useState<number>(1);
  const [prevLevel, setPrevLevel] = useState<string>("LEVEL_ONE");
  const [localPosition, setLocalPosition] = useState<string>("");
  const [rightRegion, setRightRegion] = useState<TRegion>({
    region: "",
    is_active: false,
  });
  const [adjacentRegions, setAdjacentRegions] = useState<TNumberOfRegions>({
    zero: 0,
    one: 0,
    two: 0,
    three: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    getMyInfo();
  }, []);

  const getMyInfo = () => {
    requester
      .get("/users/me/")
      .then((res) => {
        setLevel(toNumber(res.data.active_range_of_location));
        setPrevLevel(res.data.active_range_of_location);
        setLocalPosition(res.data.active_location);
        getAdjacentRegion(res.data.active_location);
        console.log(res.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const toNumber = (level: string) => {
    if (level === "LEVEL_ZERO") return 0;
    else if (level === "LEVEL_ONE") return 1;
    else if (level === "LEVEL_TWO") return 2;
    else return 3;
  };

  const toString = (level: number) => {
    if (level === 0) return "LEVEL_ZERO";
    else if (level === 1) return "LEVEL_ONE";
    else if (level === 2) return "LEVEL_TWO";
    else return "LEVEL_THREE";
  };

  const numberOfRegionsByLevel = (level: number) => {
    if (level === 0) return adjacentRegions.zero;
    else if (level === 1) return adjacentRegions.one;
    else if (level === 2) return adjacentRegions.two;
    else return adjacentRegions.three;
  };

  const getAdjacentRegion = (localPosition: string) => {
    requester
      .get(`/location/?name=${localPosition}`)
      .then((res) => {
        setAdjacentRegions({
          zero: res.data.level_zero_count,
          one: res.data.level_one_count,
          two: res.data.level_two_count,
          three: res.data.level_three_count,
        });
      })
      .catch(() => {
        console.log("get adjacent regions error");
      });
  };

  const LinkToSelectLocation = () => {
    navigate("/select-location", {
      state: { prev: "edit" },
    });
  };

  const handleSliderChange = (event: any, newValue: any) => {
    setLevel(newValue);
  };

  const handleToEditRangeOfLocation = () => {
    requester
      .patch("/users/me/", {
        range_of_location: toString(level),
      })
      .then(() => {
        toast("거래 범위가 변경되었습니다.");
        navigate("/main", {
          state: { page: "user" },
        });
      })
      .catch(() => {
        console.log("edit range_of_location error");
      });
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <Link to={"/main"} state={{ page: "user" }} className={styles.back}>
          <img src={BackArrowIcon} alt="뒤로" />
        </Link>
        <p>내 동네 설정</p>
      </header>
      <div className={styles["body-wrapper"]}>
        <p className={styles["extra-text-one"]}>동네 선택</p>
        <p className={styles["extra-text-two"]}>
          지역은 최소 1개 이상 최대 2개까지 설정 가능해요.
        </p>
        <button
          className={`${styles["location-button"]} ${styles["left-button"]}`}
        >
          <span>{toShortDivision(localPosition)}</span>
          <img src={CancelIcon} alt="삭제" />
        </button>
        <button
          className={`${styles["add-button"]} ${styles["right-button"]}`}
          onClick={LinkToSelectLocation}
        >
          +
        </button>
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
      <footer>
        <Button
          className={styles["complete-button"]}
          variant="contained"
          color="warning"
          disabled={level === toNumber(prevLevel)}
          onClick={handleToEditRangeOfLocation}
        >
          완료
        </Button>
      </footer>
    </div>
  );
};

export default EditLocationLevel;
