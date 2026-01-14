import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://sangam-blog.vercel.app/api/v1",
  withCredentials: true,
});
export default axiosInstance;

