import axiosInstance from "./axios";

export const registerUser = async (data) => {
  const res = await axiosInstance.post("/users/register", data);
  return res.data;
};


export const loginUser=async(data)=>{
  const res=await axiosInstance.post("/users/login",data)
  console.log("dataa",res)
  return res.data;
}

export const logout=async(data)=>{
  const res=await axiosInstance.post("/users/logout",data)
  return res.data;
}


export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const res = await axiosInstance.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
};


export const updateDetails = async (data) => {
  const res = await axiosInstance.patch("/users/change-details",data);
  return res.data;
};


export const updateProfile = async (formData) => {
  const { data } = await axiosInstance.post("/users/change-avatar",formData,{
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
};

export const updatePassword = async (passwordData) => {
  const { data } = await axiosInstance.post(
    "/users/change-password",
    passwordData
  );
  return data;
};

export const toggleLike = async (postId) => {
  const res = await axiosInstance.patch(`/users/like/${postId}`);
  return res.data.data;
};

