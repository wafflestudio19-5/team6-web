import axios from "axios";

export const requester = axios.create({
  baseURL: "https://carrotserver.shop/api/v1",
  headers: {
    Authentication: `${localStorage.getItem("token")}`,
  },
});

export const user = axios.create({
  baseURL: "https://carrotserver.shop/api/v1",
});
