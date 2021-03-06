import { Dispatch, SetStateAction, useState, useEffect } from "react";
import styles from "../SearchPage.module.scss";
import leftArrow from "../../../icons/leftArrow.png";
import { Checkbox } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { toShortDivision } from "../../Utilities/functions";
import User from "../../../apis/User/User";
import { Slider } from "@mui/material";
import requester from "../../../apis/requester";
import { toast } from "react-hot-toast";

type TFilterInfo = {
  categories: number[];
  minPrice: number | string;
  maxPrice: number | string;
  range_of_location: number;
};

type TNumberOfRegions = {
  zero: number;
  one: number;
  two: number;
  three: number;
};

const initialValue = {
  categories: [],
  minPrice: "",
  maxPrice: "",
  range_of_location: 3,
};
const SearchFilter = (props: {
  setIsFilterModalOpen: Dispatch<SetStateAction<boolean>>;
  filterInfo: TFilterInfo;
  setFilterInfo: Dispatch<SetStateAction<TFilterInfo>>;
  setFiltered: Dispatch<SetStateAction<boolean>>;
  setPageNumber: Dispatch<SetStateAction<number>>;
}) => {
  const [localPosition, setLocalPosition] = useState<string>("");
  const [adjacentRegions, setAdjacentRegions] = useState<TNumberOfRegions>({
    zero: 0,
    one: 0,
    two: 0,
    three: 0,
  });
  const [level, setLevel] = useState<number>(3);
  const [minPrice, setMinPrice] = useState<number | string>("");
  const [maxPrice, setMaxPrice] = useState<number | string>("");
  const [categories, setCategories] = useState<number[]>([]);
  const [isInit, setIsinit] = useState<boolean>(false);

  useEffect(() => {
    User.getMe().then((res) => {
      setLocalPosition(res.data.first_location);
      getAdjacentRegion(res.data.first_location);
    });
    setLevel(props.filterInfo.range_of_location);
    setCategories(props.filterInfo.categories);
    setMaxPrice(props.filterInfo.maxPrice);
    setMinPrice(props.filterInfo.minPrice);
  }, []);

  useEffect(() => {
    if (categories.length === 0 && !maxPrice && !minPrice && level === 3)
      setIsinit(true);
    else setIsinit(false);
  }, [categories, minPrice, maxPrice, level]);

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setFilterInfo({
      ...props.filterInfo,
      minPrice: parseInt(e.target.value),
    });
    setMinPrice(parseInt(e.target.value));
  };

  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setFilterInfo({
      ...props.filterInfo,
      maxPrice: parseInt(e.target.value),
    });
    setMaxPrice(parseInt(e.target.value));
  };

  const categoryHandle = (e: number) => {
    if (categories.includes(e))
      setCategories(categories.filter((category) => category !== e));
    else setCategories([...categories, e]);
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

  const numberOfRegionsByLevel = (level: number) => {
    if (level === 0) return adjacentRegions.zero;
    else if (level === 1) return adjacentRegions.one;
    else if (level === 2) return adjacentRegions.two;
    else return adjacentRegions.three;
  };

  const handleSliderChange = (event: any, newValue: any) => {
    setLevel(newValue);
    props.setFilterInfo({ ...props.filterInfo, range_of_location: level });
  };

  const onClickInitialize = () => {
    setCategories([]);
    setLevel(3);
    setMinPrice("");
    setMaxPrice("");
  };

  const onClickApply = () => {
    // @ts-ignore
    if (!!maxPrice && !!minPrice && parseInt(maxPrice) < parseInt(minPrice)) {
      toast.error("?????? ????????? ??????????????????!");
    } else {
      props.setFilterInfo({
        categories: categories,
        minPrice: minPrice,
        maxPrice: maxPrice,
        range_of_location: level,
      });
      props.setIsFilterModalOpen(false);
      props.setFiltered(true);
      props.setPageNumber(0);
    }
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <img
            className={styles.leftArrow}
            src={leftArrow}
            onClick={() => props.setIsFilterModalOpen(false)}
            alt="?????? ??????"
          />
          <h1 className={styles.title}>?????? ??????</h1>
        </div>
        <div className={styles.footer}>
          <div className={styles.initializeButton} onClick={onClickInitialize}>
            ?????????
          </div>
          <div className={styles.applyButton} onClick={onClickApply}>
            {isInit ? "????????? ??????" : "?????? ??????"}
          </div>
        </div>
        <div className={styles.filterContent}>
          <h1 className={styles.categoryTitle}>????????????</h1>
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
              <p className={styles.categoryName}>???????????????</p>
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
              <p className={styles.categoryName}>????????????</p>
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
              <p className={styles.categoryName}>??????/????????????</p>
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
              <p className={styles.categoryName}>?????????</p>
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
              <p className={styles.categoryName}>??????/????????????</p>
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
              <p className={styles.categoryName}>????????????</p>
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
              <p className={styles.categoryName}>?????????/??????</p>
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
              <p className={styles.categoryName}>????????????</p>
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
              <p className={styles.categoryName}>????????????</p>
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
              <p className={styles.categoryName}>????????????/??????</p>
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
              <p className={styles.categoryName}>??????/??????</p>
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
              <p className={styles.categoryName}>??????/??????</p>
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
              <p className={styles.categoryName}>??????????????????</p>
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
              <p className={styles.categoryName}>??????/??????/??????</p>
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
              <p className={styles.categoryName}>??????</p>
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
              <p className={styles.categoryName}>?????? ????????????</p>
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
              <p className={styles.categoryName}>?????????</p>
            </div>
          </div>
          <h1 className={styles.priceTitle}>?????? ??????</h1>
          <div className={styles.priceContainer}>
            <input
              className={styles.priceInput}
              type="number"
              placeholder={"0"}
              value={minPrice}
              onChange={handleMinPrice}
            />
            <h1 className={styles.priceRange}>~</h1>
            <input
              className={styles.priceInput}
              placeholder={"????????????"}
              type="number"
              value={maxPrice}
              onChange={handleMaxPrice}
            />
          </div>
          <h1 className={styles.locationTitle}>????????? ?????? ??????</h1>
          <div className={styles["body-wrapper"]}>
            <p className={styles["first-text"]}>{`${toShortDivision(
              localPosition
            )}??? ?????? ?????? ${numberOfRegionsByLevel(level)}???`}</p>
            <div className={styles["slider-wrapper"]}>
              <Slider
                aria-label="Temperature"
                style={{
                  color: "#ff8a3d",
                }}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFilter;
