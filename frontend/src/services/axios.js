import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://sangam-blog.vercel.app",
  withCredentials: true,
});
export default axiosInstance;

