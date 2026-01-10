import { useEffect, useState } from "react";
import axios from "axios";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlogId, setEditingBlogId] = useState(null); 
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);

 
  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/blogs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);


  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  
  const handleEdit = (blog) => {
    setEditingBlogId(blog._id);
    setFormData({ title: blog.title, content: blog.content });
  };

  const handleCancel = () => {
    setEditingBlogId(null);
    setFormData({ title: "", content: "" });
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `/blogs/${editingBlogId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
     
      setBlogs(blogs.map((b) => (b._id === res.data._id ? res.data : b)));
      handleCancel(); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {blogs.map((blog) => (
        <div key={blog._id} className="border p-4 mb-4 rounded shadow">
          {editingBlogId === blog._id ? (
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="border p-2 w-full mb-2"
              />
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="border p-2 w-full mb-2"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h2 className="text-xl font-bold">{blog.title}</h2>
              <p className="my-2">{blog.content}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
