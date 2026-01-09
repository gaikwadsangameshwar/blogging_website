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


export const getProfile = async (data) => {
  const  res  = await axiosInstance.get("/users/me",data);
  return res.data;
};


export const changeDetails = async (details) => {
  const { data } = await axiosInstance.patch(
    "/users/change-details",
    details
  );
  return data;
};


export const updateProfile = async (formData) => {
  const { data } = await axiosInstance.put(
    "/users/profile",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
};

export const updatePassword = async (passwordData) => {
  const { data } = await axiosInstance.put(
    "/users/change-password",
    passwordData
  );
  return data;
};

