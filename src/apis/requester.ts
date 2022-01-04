import axios from "axios";

export const requester = axios.create({
  baseURL: "https://carrotserver.shop/api/v1",
  headers: {
<<<<<<< HEAD
    Authentication: `Bearer ${localStorage.getItem("token")}`,
=======
    Authentication: `${localStorage.getItem("token")}`,
>>>>>>> 15ce7d0a2c43bcd70afb1c2d5c06727763b946e7
  },
});
