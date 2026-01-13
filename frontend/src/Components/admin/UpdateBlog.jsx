import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlog } from "../../services/blogService";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [context, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id);
        setTitle(res.data.title);
        setContent(res.data.context);
        setCategory(res.data.category);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateBlog(id, { title, context, category }, token);
      alert("Blog updated successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to update blog");
    }
  };

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-10">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6">
          Update Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Content</label>
            <textarea
              rows="6"
              value={context}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Update Blog
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
