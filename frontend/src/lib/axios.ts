import { backendURL } from "@/constants/constants";
import axios from "axios";

const api = axios.create({
  baseURL: backendURL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

console.log("API BASE URL: ", api.defaults.baseURL);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    return Promise.reject({
      status: error?.response?.status,
      message,
      error: error?.response?.data?.errors || [],
    });
  },
);

export default api;
