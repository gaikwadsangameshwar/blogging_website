import { useEffect, useState } from "react";
import { getMyBlogs, deleteBlog } from "../../services/blogService";
import { useNavigate } from "react-router-dom";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getMyBlogs();
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return;

    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete blog");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (blogs.length === 0)
    return <p className="text-center mt-10">No blogs created yet.</p>;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center">📚 My Blogs</h2>

      <div className="max-w-4xl mx-auto space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
          >

            {blog.thumbnail && (
          <div className="w-full h-36 sm:h-44 md:h-48 overflow-hidden">
            <img
              src={blog.thumbnail}
              className="
                w-full h-full object-cover
                transition-transform duration-300
                md:hover:scale-110
              "
            />
          </div>
        )}
        <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
          <p className="text-gray-600">
            {blog.context?.slice(0, 150) || "No content"}...
          </p>
            <div className="flex justify-end gap-3 mt-4">
              <button 
              onClick={() => navigate(`/update-blog/${blog._id}`)} 
              className="px-4 py-2 rounded-lg border border-indigo-500 text-indigo-600 hover:bg-indigo-50">
              ✏️ Edit</button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
