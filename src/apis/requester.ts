import axios from "axios";
import { toast } from "react-hot-toast";

export const user = axios.create({
  baseURL: "https://carrotserver.shop/api/v1",
});

const requester = axios.create({
  baseURL: "https://carrotserver.shop/api/v1",
});

requester.interceptors.request.use(
  function (config) {
    // 요청 바로 직전 axios 설정값에 대해 작성합니다.
    // @ts-ignore
    config.headers.Authentication = localStorage.getItem("token");
    return config;
  },
  function (error) {
    // 요청 에러 처리를 작성합니다.
    return Promise.reject(error);
  }
);

requester.interceptors.response.use(
  function (response) {
    /*
          http status가 200인 경우
          응답 바로 직전에 대해 작성합니다.
          .then() 으로 이어집니다.
      */
    return response;
  },

  function (error) {
    /*
          http status가 200이 아닌 경우
          응답 에러 처리를 작성합니다.
          .catch() 으로 이어집니다.
      */
    if (error.response.status === "401") {
      localStorage.removeItem("token");
      toast("자동 로그아웃 되었습니다.");
    }
    return Promise.reject(error);
  }
);

export default requester;
