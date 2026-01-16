import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://bloggs-01wb.onrender.com/api/v1",
  withCredentials: true,
});
export default axiosInstance;

