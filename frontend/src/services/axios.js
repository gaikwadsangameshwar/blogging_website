import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blogging-website-1-y5mf.onrender.com",
  withCredentials: true,
});
export default axiosInstance;

