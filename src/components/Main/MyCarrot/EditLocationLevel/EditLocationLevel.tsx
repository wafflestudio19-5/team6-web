import styles from "./EditLocationLevel.module.scss";
import confirmStyles from "../../../Utilities/confirm.module.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackArrowIcon from "../../../../icons/leftArrow.png";
import CancelIcon from "../../../../icons/MyCarrot/white-cancel.png";
import BlackCancel from "../../../../icons/MyCarrot/black-cancel.png";
import LevelZero from "../../../../icons/MyCarrot/level_zero.png";
import LevelOne from "../../../../icons/MyCarrot/level_one.png";
import LevelTwo from "../../../../icons/MyCarrot/level_two.png";
import LevelThree from "../../../../icons/MyCarrot/level_three.png";
import { Slider } from "@mui/material";
import { toShortDivision } from "../../../Utilities/functions";
import requester from "../../../../apis/requester";
import { toast } from "react-hot-toast";

type TNumberOfRegions = {
  zero: number;
  one: number;
  two: number;
  three: number;
};

const EditLocationLevel = () => {
  const [confirmOne, setConfirmOne] = useState<boolean>(false);
  const [confirmTwo, setConfirmTwo] = useState<boolean>(false);
  const [deleteFirst, setDeleteFirst] = useState<boolean>(true);
  const [level, setLevel] = useState<number>(1);
  const [firstRegion, setFirstRegion] = useState<string>("");
  const [secondRegion, setSecondRegion] = useState<string>("");
  const [isFirstActive, setIsFirstActive] = useState<boolean>(true);
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
        res.data.kakao_status === "INVALID" && navigate("/timer");
        setLevel(
          toNumber(
            res.data.is_first_location_active
              ? res.data.first_range_of_location
              : res.data.second_range_of_location
          )
        );
        setFirstRegion(res.data.first_location);
        setSecondRegion(res.data.second_location);
        setIsFirstActive(res.data.is_first_location_active);
        getAdjacentRegion(
          res.data.is_first_location_active
            ? res.data.first_location
            : res.data.second_location
        );
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
    requester
      .put("/users/me/location/", {
        location: isFirstActive ? firstRegion : secondRegion,
        range_of_location: toString(newValue),
      })
      .then(() => {
        console.log("???????????? ?????? ??????");
      })
      .catch(() => {
        toast.error("???????????? ?????? ??????");
      });
  };

  const handleAlter = (isActive: boolean) => {
    isActive &&
      requester({
        url: "/users/me/location/",
        method: "PATCH",
        data: "alter",
        headers: { "Content-Type": "text/plain" },
      })
        .then(getMyInfo)
        .catch(() => {
          toast.error("????????? ?????? ?????? ??????");
        });
  };

  const handleConfirm = () => {
    secondRegion ? setConfirmOne(true) : setConfirmTwo(true);
  };

  const handleDelete = (isFirstSelected: boolean) => {
    requester
      .delete(`/users/me/location/?isFirstSelected=${isFirstSelected}`)
      .then(() => {
        toast("?????? ?????? ??????");
        getMyInfo();
      })
      .catch(() => {
        toast.error("?????? ?????? ??????");
      });
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <Link to={"/main?page=user"} className={styles.back}>
          <img src={BackArrowIcon} alt="??????" />
        </Link>
        <p>??? ?????? ??????</p>
      </header>
      <div className={styles["body-wrapper"]}>
        <p className={styles["extra-text-one"]}>?????? ??????</p>
        <p className={styles["extra-text-two"]}>
          ????????? ?????? 1??? ?????? ?????? 2????????? ?????? ????????????.
        </p>
        <div
          className={`${styles["location-button-container"]} ${styles["left-button"]}`}
        >
          <button
            className={`${styles["location-button"]} ${
              !isFirstActive && styles.inactive
            }`}
            onClick={() => handleAlter(!isFirstActive)}
          >
            <span>{toShortDivision(firstRegion)}</span>
          </button>
          <button
            className={`${styles.delete} ${!isFirstActive && styles.inactive}`}
          >
            <img
              src={isFirstActive ? CancelIcon : BlackCancel}
              onClick={() => {
                handleConfirm();
                setDeleteFirst(true);
              }}
              alt="??????"
            />
          </button>
        </div>
        {secondRegion && (
          <div
            className={`${styles["location-button-container"]} ${styles["right-button"]}`}
          >
            <button
              className={`${styles["location-button"]} ${
                isFirstActive && styles.inactive
              }`}
              onClick={() => handleAlter(isFirstActive)}
            >
              <span>{toShortDivision(secondRegion)}</span>
            </button>
            <button
              className={`${styles.delete} ${isFirstActive && styles.inactive}`}
            >
              <img
                src={isFirstActive ? BlackCancel : CancelIcon}
                onClick={() => {
                  handleConfirm();
                  setDeleteFirst(false);
                }}
                alt="??????"
              />
            </button>
          </div>
        )}
        {!secondRegion && (
          <button
            className={`${styles["add-button"]} ${styles["right-button"]}`}
            onClick={LinkToSelectLocation}
          >
            +
          </button>
        )}
        <p className={styles["first-text"]}>{`${toShortDivision(
          isFirstActive ? firstRegion : secondRegion
        )}??? ?????? ?????? ${numberOfRegionsByLevel(level)}???`}</p>
        <p className={styles["second-text"]}>
          ????????? ????????? ???????????? ??? ??? ?????????.
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
          <span className={styles["left-span"]}>??? ??????</span>
          <span className={styles["right-span"]}>?????? ??????</span>
        </div>

        <img
          className={`${
            level === 0
              ? `${styles["level-image"]} ${styles.show}`
              : styles["level-image"]
          }`}
          src={LevelZero}
          alt="?????? 0"
        />
        <img
          className={`${
            level === 1
              ? `${styles["level-image"]} ${styles.show}`
              : styles["level-image"]
          }`}
          src={LevelOne}
          alt="?????? 1"
        />
        <img
          className={`${
            level === 2
              ? `${styles["level-image"]} ${styles.show}`
              : styles["level-image"]
          }`}
          src={LevelTwo}
          alt="?????? 2"
        />
        <img
          className={`${
            level === 3
              ? `${styles["level-image"]} ${styles.show}`
              : styles["level-image"]
          }`}
          src={LevelThree}
          alt="?????? 3"
        />
      </div>
      <div
        className={`${styles["back-shadow"]} ${
          (confirmOne || confirmTwo) && styles.visible
        }`}
        onClick={() => {
          confirmOne && setConfirmOne(false);
          confirmTwo && setConfirmTwo(false);
        }}
      />
      {(confirmOne || confirmTwo) && (
        <div className={`${confirmStyles.box} ${styles.confirm}`}>
          <div className={styles.contents}>
            {confirmOne
              ? "????????? ????????? ?????????????????????????"
              : "????????? ?????? 1??? ?????? ????????????????????? ?????????. ?????? ????????? ????????? ??????????????????????"}
          </div>
          <div
            className={confirmStyles.confirmButton}
            onClick={() => {
              confirmTwo
                ? navigate("/select-location", { state: { prev: "switch" } })
                : handleDelete(deleteFirst);
              confirmOne && setConfirmOne(false);
              confirmTwo && setConfirmTwo(false);
            }}
          >
            {confirmOne ? "??????" : "???, ???????????????"}
          </div>
          <div
            className={confirmStyles.cancelButton}
            onClick={() => {
              confirmOne && setConfirmOne(false);
              confirmTwo && setConfirmTwo(false);
            }}
          >
            ??????
          </div>
        </div>
      )}
    </div>
  );
};

export default EditLocationLevel;
