import axiosInstance from "./axios";


export const createBlog = async (data) => {
  const res = await axiosInstance.post(
  "/posts/createPost",
  data,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
return res.data;
}


export const getSingleBlog = async (postId) => {
  try {
    const res = await axiosInstance.get(`/posts/${postId}`);
    console.log("Fetched blog:", res.data);
     return res.data.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
};


export const getAllBlog=async()=>{
  try {
    const res=await axiosInstance.get("/posts")
    return res.data;
  } 
  catch (error) {
      console.log("Not getting the data from frontend",error)
  }
}


export const deleteBlog = async(postId, token) =>
  await axiosInstance.delete(`/posts/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
});


export const getBlogById = async(id) =>
  await axiosInstance.get(`/posts/${id}`);

export const updateBlog = async(id, data, token) =>
  await axiosInstance.patch(`/posts/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getMyBlogs=async()=>{
  const res= await axiosInstance.get("/posts/my-blogs")
  return res.data;
}