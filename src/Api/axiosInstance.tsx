import axios from "axios";
import { handleLogout } from "../utils/logout";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("JOB_APP_TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.status === 404) {
      console.log(error);
      toast.error("Somthing went wrong !");
      handleLogout();
    }
    console.log(error);
  }
);

export default axiosInstance;
