import axiosInstance from "./axios";

export const registerUser = async (data) => {
  const res = await axiosInstance.post("/users/register", data);
  return res.data;
};


export const loginUser=async(data)=>{
  const res=await axiosInstance.post("/users/login",data)
  return res.data;
}

export const logout=async(data)=>{
  const res=await axiosInstance.post("/users/logout",data)
  return res.data;
}