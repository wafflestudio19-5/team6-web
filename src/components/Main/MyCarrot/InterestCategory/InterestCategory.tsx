import styles from "../InterestCategory/InterestCategory.module.scss";
import { Checkbox } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import requester from "../../../../apis/requester";
import backButton from "../../../../icons/leftArrow.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const categoryFormat = (category: string | undefined) => {
  switch (category) {
    case "DIGITAL_DEVICE":
      return 1;
    case "HOME_APPLIANCE":
      return 2;
    case "FURNITURE_AND_INTERIOR":
      return 3;
    case "KIDS":
      return 4;
    case "LIVING_AND_FOOD":
      return 5;
    case "KIDS_BOOK":
      return 6;
    case "SPORTS_AND_LEISURE":
      return 7;
    case "WOMEN_STUFF":
      return 8;
    case "WOMEN_CLOTHES":
      return 9;
    case "MEN_STUFF_AND_CLOTHES":
      return 10;
    case "GAME_AND_HOBBIES":
      return 11;
    case "BEAUTY_AND_COSMETICS":
      return 12;
    case "PET":
      return 13;
    case "BOOKS_AND_TICKETS_AND_RECORDS":
      return 14;
    case "BOTANICAL":
      return 15;
    case "ETC":
      return 16;
    case "I_AM_BUYING":
      return 17;
    default:
      break;
  }
};

const InterestCategory = () => {
  const [categories, setCategories] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    requester.get("users/me/categories/").then((res) => {
      setCategories(
        res.data.categories.map((category: string) => {
          return categoryFormat(category);
        })
      );
    });
  }, []);

  const categoryHandle = (e: number) => {
    if (categories.includes(e))
      setCategories(categories.filter((category) => category !== e));
    else setCategories([...categories, e]);
  };

  const onClickBack = () => {
    const myPromise = requester
      .put("users/me/categories/", { categories: categories })
      .then((res) => navigate("/main?page=user"));
    toast.promise(myPromise, {
      loading: "Updating...",
      success: "Successfully Updated!",
      error: "Failed",
    });
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <p>관심 카테고리 설정</p>
          <img
            className={styles.backButton}
            src={backButton}
            onClick={onClickBack}
          />
        </div>
        <div className={styles.guide}>
          <span className={styles.guideMessage}>
            선택한 카테고리의 게시글만 홈에서 보여요.
          </span>
        </div>
        <div className={styles.categoryContainer}>
          <div className={styles.category}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={categories.includes(1)}
              style={{
                color: "#ff8a3d",
                padding: "0px",
                margin: "0 10px 0 10px",
                height: "40px",
              }}
              onChange={() => categoryHandle(1)}
            />
            <p className={styles.categoryName}>디지털기기</p>
          </div>
          <div className={styles.category}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={categories.includes(2)}
              style={{
                color: "#ff8a3d",
                padding: "0px",
                margin: "0 10px 0 10px",
                height: "40px",
              }}
              onChange={() => categoryHandle(2)}
            />
            <p className={styles.categoryName}>생활가전</p>
          </div>
          <div className={styles.category}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={categories.includes(3)}
              style={{
                color: "#ff8a3d",
                padding: "0px",
                margin: "0 10px 0 10px",
                height: "40px",
              }}
              onChange={() => categoryHandle(3)}
            />
            <p className={styles.categoryName}>가구/인테리어</p>
          </div>
          <div className={styles.category}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={categories.includes(4)}
              style={{
                color: "#ff8a3d",
                padding: "0px",
                margin: "0 10px 0 10px",
                height: "40px",
              }}
              onChange={() => categoryHandle(4)}
            />
            <p className={styles.categoryName}>유아동</p>
          </div>
          <div className={styles.category}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={categories.includes(5)}
              style={{
                color: "#ff8a3d",
                padding: "0px",
                margin: "0 10px 0 10px",
                height: "40px",
              }}
              onChange={() => categoryHandle(5)}
            />
            <p className={styles.categoryName}>생활/가공식품</p>
          </div>
          <div className={styles.category}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={categories.includes(6)}
              style={{
                color: "#ff8a3d",
                padding: "0px",
                margin: "0 10px 0 10px",
                height: "40px",
              }}
              onChange={() => categoryHandle(6)}
            />
            <p className={styles.categoryName}>유아도서</p>
          </div>
          <div className={styles.category}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={categories.includes(7)}
              style={{
                color: "#ff8a3d",
                padding: "0px",
                margin: "0 10px 0 10px",
                height: "40px",
              }}
              onChange={() => categoryHandle(7)}
            />
            <p className={styles.categoryName}>스포츠/레저</p>
          </div>
          <div className={styles.category}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={categories.includes(8)}
              style={{
                color: "#ff8a3d",
                padding: "0px",
                margin: "0 10px 0 10px",
                height: "40px",
              }}
              onChange={() => categoryHandle(8)}
            />
            <p className={styles.categoryName}>여성잡화</p>
          </div>
          <div className={styles.category}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={categories.includes(9)}
              style={{
                color: "#ff8a3d",
                padding: "0px",
                margin: "0 10px 0 10px",
                height: "40px",
              }}
              onChange={() => categoryHandle(9)}
            />
            <p className={styles.categoryName}>여성의류</p>
          </div>
          <div className={styles.category}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={categories.includes(10)}
              style={{
                color: "#ff8a3d",
                padding: "0px",
                margin: "0 10px 0 10px",
                height: "40px",
              }}
              onChange={() => categoryHandle(10)}
            />
            <p className={styles.categoryName}>남성패션/잡화</p>
          </div>
          <div className={styles.category}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={categories.includes(11)}
              style={{
                color: "#ff8a3d",
                padding: "0px",
                margin: "0 10px 0 10px",
                height: "40px",
              }}
              onChange={() => categoryHandle(11)}
            />
            <p className={styles.categoryName}>게임/취미</p>
          </div>
          <div className={styles.category}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={categories.includes(12)}
              style={{
                color: "#ff8a3d",
                padding: "0px",
                margin: "0 10px 0 10px",
                height: "40px",
              }}
              onChange={() => categoryHandle(12)}
            />
            <p className={styles.categoryName}>뷰티/미용</p>
          </div>
          <div className={styles.category}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={categories.includes(13)}
              style={{
                color: "#ff8a3d",
                padding: "0px",
                margin: "0 10px 0 10px",
                height: "40px",
              }}
              onChange={() => categoryHandle(13)}
            />
            <p className={styles.categoryName}>반려동물용품</p>
          </div>
          <div className={styles.category}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={categories.includes(14)}
              style={{
                color: "#ff8a3d",
                padding: "0px",
                margin: "0 10px 0 10px",
                height: "40px",
              }}
              onChange={() => categoryHandle(14)}
            />
            <p className={styles.categoryName}>도서/티켓/음반</p>
          </div>
          <div className={styles.category}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={categories.includes(15)}
              style={{
                color: "#ff8a3d",
                padding: "0px",
                margin: "0 10px 0 10px",
                height: "40px",
              }}
              onChange={() => categoryHandle(15)}
            />
            <p className={styles.categoryName}>식물</p>
          </div>
          <div className={styles.category}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={categories.includes(16)}
              style={{
                color: "#ff8a3d",
                padding: "0px",
                margin: "0 10px 0 10px",
                height: "40px",
              }}
              onChange={() => categoryHandle(16)}
            />
            <p className={styles.categoryName}>기타 중고물품</p>
          </div>
          <div className={styles.category}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={categories.includes(17)}
              style={{
                color: "#ff8a3d",
                padding: "0px",
                margin: "0 10px 0 10px",
                height: "40px",
              }}
              onChange={() => categoryHandle(17)}
            />
            <p className={styles.categoryName}>삽니다</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterestCategory;
