import axios from "axios";

export const requester = axios.create({
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
