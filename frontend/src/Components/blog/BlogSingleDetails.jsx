import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BlogSingleDetails() {
  const { postId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!postId) return;

  const fetchBlog = async () => {
    try {
      const res = await axios.get(
        `http://localhost:2000/api/v1/posts/${postId}`
      );
      setBlog(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchBlog();
}, [postId]);



  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      {blog.thumbnail && (
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full mb-6 rounded"
        />
      )}

      <p className="text-gray-700">{blog.context}</p>
    </div>
  );
}
