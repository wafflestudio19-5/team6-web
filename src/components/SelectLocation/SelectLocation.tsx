import styles from "./SelectLocation.module.scss";
import { regionData } from "../../Region";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import BackArrow from "../../icons/leftArrow.png";
import Spinner from "../../icons/SelectLocation/spinner-circle.gif";
import SearchIcon from "../../icons/SelectLocation/search.png";
import CancelIcon from "../../icons/SelectLocation/cancel.png";
import CurrentIcon from "../../icons/SelectLocation/current.png";
import SearchResultIcon from "../../icons/SelectLocation/search-result.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CLIENT_ID } from "../../KakaoLogin/OAuth";
import RegionList from "./RegionList/RegionList";
import { user } from "../../apis/requester";
import requester from "../../apis/requester";
import { toast } from "react-hot-toast";
import { useRestoreDom } from "slate-react/dist/components/android/use-restore-dom";
import { useUserDispatch } from "../../context/user-context";

type TSignupForm = {
  username: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  email: string;
  location: string;
};

type TRequiredInformation = {
  phone: string;
  email: string;
};

const SelectLocation = () => {
  const [prev, setPrev] = useState<string>("");
  const [signupForm, setSignupForm] = useState<TSignupForm>();
  const [requiredInformation, setRequiredInformation] =
    useState<TRequiredInformation>({
      phone: "",
      email: "",
    });
  const [searchingRegion, setSearchingRegion] = useState<string>("");
  const [searchingList, setSearchingList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchState, setSearchState] = useState<string>("NO_INPUT");

  const setUser = useUserDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const regionQuery = params.get("region");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (location.state) {
      setPrev(location.state.prev);
      location.state.prev === "signup" &&
        setSignupForm(location.state.signupForm);
      location.state.prev === "first-social-login" &&
        setRequiredInformation({
          phone: location.state.phone,
          email: location.state.email,
        });
      location.state.prev === "edit" &&
        !localStorage.getItem("token") &&
        navigate("/login", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
    if (regionQuery !== null) {
      if (regionQuery !== "") {
        const regionList = regionData.filter(
          (region) => region.match(regionQuery) !== null
        );
        regionList.length !== 0
          ? setSearchState("REGIONS_EXIST")
          : setSearchState("NOT_EXIST");
        setSearchingList(regionList);
      } else {
        setSearchState("NO_INPUT");
        setSearchingList([]);
      }
      setSearchingRegion(regionQuery);
    } else {
      getLocal();
    }
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleToGoBack = () => {
    prev === "signup"
      ? navigate("/signup", {
          state: { inputs: signupForm },
          replace: true,
        })
      : navigate(-1);
  };

  const handleToFirstSocialLogin = (region: string) => {
    requester
      .patch("/users/me/", {
        ...requiredInformation,
      })
      .then(() => {
        requester
          .put("/users/me/location/", {
            location: region,
            range_of_location: "LEVEL_ONE",
          })
          .then(() => {
            toast("?????? ????????? ?????????????????????.");
            navigate("/main?page=home");
          })
          .catch((error) => {
            toast.error(error);
          });
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleToSignUp = (region: string) => {
    user
      .post("/users/", {
        ...signupForm,
        name: signupForm?.username,
        location: region,
        range_of_location: "LEVEL_ONE",
      })
      .then(() => {
        user
          .post("/users/signin/", {
            name: signupForm?.username,
            password: signupForm?.password,
          })
          .then((res) => {
            localStorage.setItem("token", res.data.access_token);
            requester.get("/users/me/").then((res) => {
              setUser(res.data);
            });
            navigate("/main?page=home");
          })
          .catch((error) => {
            toast.error("????????? ??????");
          });
      })
      .catch(() => {
        toast.error("???????????? ??????");
        navigate("/login", { replace: true });
      });
  };

  const handleToAddLocation = (region: string) => {
    requester
      .post("/users/me/location/", {
        location: region,
        range_of_location: "LEVEL_ONE",
      })
      .then(() => {
        navigate(-1);
      })
      .catch(() => {
        toast.error("?????? ?????? ??????");
        navigate(-1);
      });
  };

  const handleToSwitchLocation = (region: string) => {
    requester
      .put("/users/me/location/", {
        location: region,
        range_of_location: "LEVEL_ONE",
      })
      .then(() => {
        navigate(-1);
      })
      .catch(() => {
        toast.error("?????? ?????? ??????");
        navigate(-1);
      });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[\s\uFEFF\xA0]+/gi;
    const searchWord = e.target.value.replace(regex, ""); // ??? ??? ??????????????? ??????
    if (searchWord === "") {
      navigate(`/select-location?region=${searchWord}`, { replace: true });
      setSearchState("NO_INPUT");
      setSearchingList([]);
    } else {
      navigate(`/select-location?region=${searchWord}`, { replace: true });
      const regionList = regionData.filter(
        (region) => region.match(searchWord) !== null
      );
      regionList.length !== 0
        ? setSearchState("REGIONS_EXIST")
        : setSearchState("NOT_EXIST");
      setSearchingList(regionList);
    }
    setSearchingRegion(searchWord);
  };

  const clearInput = () => {
    navigate(`/select-location?region=`, { replace: true });
    setSearchState("NO_INPUT");
    setSearchingRegion("");
    setSearchingList([]);
    inputRef.current?.focus();
  };

  const getLocal = () => {
    if (navigator.geolocation) {
      clearInput();
      setLoading(true);
      setSearchState("GET_LOCATION");
      navigator.geolocation.getCurrentPosition(
        function (position) {
          axios
            .get(
              `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${position.coords.longitude}&y=${position.coords.latitude}`,
              {
                headers: {
                  Authorization: `KakaoAK ${CLIENT_ID}`,
                },
              }
            )
            .then((res) => {
              setSearchingList(
                regionData.filter(
                  (region) =>
                    region.match(res.data.documents[1].address_name) !== null
                )
              );
              setLoading(false);
            })
            .catch(() => {
              console.log("????????? ?????? ??????");
            });
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <button className={styles.back} onClick={handleToGoBack}>
          <img src={BackArrow} alt="??????" />
        </button>
        <form onSubmit={onSubmit}>
          <input
            ref={inputRef}
            value={searchingRegion}
            onChange={onChange}
            placeholder="??? ?????? ??????(???,???,???)?????? ??????"
          />
          <img src={SearchIcon} className={styles.search} alt="??????" />
          <img
            src={CancelIcon}
            className={`${styles.cancel} ${
              searchingRegion.length !== 0 && styles.show
            }`}
            onClick={clearInput}
            alt="?????????"
          />
        </form>
      </header>
      <div className={styles["body-wrapper"]}>
        <button className={styles["current-location"]} onClick={getLocal}>
          <img src={CurrentIcon} alt="?????? ??????" />
          <span>?????? ????????? ??????</span>
        </button>
        {searchState === "GET_LOCATION" &&
          (loading ? (
            <img className={styles.spinner} src={Spinner} alt="?????????" />
          ) : (
            <>
              <p className={styles.text}>?????? ?????? ?????? ??????</p>
              <RegionList
                searchingList={searchingList}
                handleCallback={
                  prev === "signup"
                    ? handleToSignUp
                    : prev === "edit"
                    ? handleToAddLocation
                    : prev === "switch"
                    ? handleToSwitchLocation
                    : handleToFirstSocialLogin
                }
              />
            </>
          ))}
        {searchState === "REGIONS_EXIST" && (
          <>
            <p className={styles.text}>{`'${searchingRegion}' ????????????`}</p>
            <RegionList
              searchingList={searchingList}
              handleCallback={
                prev === "signup"
                  ? handleToSignUp
                  : prev === "edit"
                  ? handleToAddLocation
                  : prev === "switch"
                  ? handleToSwitchLocation
                  : handleToFirstSocialLogin
              }
            />
          </>
        )}
        {searchState === "NOT_EXIST" && (
          <>
            <p className={styles.text}>{`'${searchingRegion}' ????????????`}</p>
            <img
              className={styles["no-result"]}
              src={SearchResultIcon}
              alt="?????? ??????"
            />
            <p className={styles["no-result-text-one"]}>
              ?????? ????????? ????????????.
              <br />
              ?????? ????????? ?????? ??????????????????!
            </p>
          </>
        )}
        {searchState === "NO_INPUT" && (
          <p className={styles["no-result-text-one"]}>???????????? ???????????????.</p>
        )}
      </div>
    </div>
  );
};

export default SelectLocation;
