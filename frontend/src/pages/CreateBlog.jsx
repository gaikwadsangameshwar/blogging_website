import { useState } from "react";
import { createBlog } from "../services/blogService";

export default function CreateBlog({ onNewBlog }) {
  const [formData, setFormData] = useState({
    title: "",
    context: "",
    category: "",
    thumbnail: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, thumbnail: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim() || !formData.context.trim() || !formData.category.trim()) {
      setError("Title, context, and category are required");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("context", formData.context);
    data.append("category", formData.category);
    if (formData.thumbnail) data.append("thumbnail", formData.thumbnail);

    try {
      setLoading(true);
      const newBlog = await createBlog(data);
      if (onNewBlog && newBlog?.blog) onNewBlog(newBlog.blog);
      setFormData({ title: "", context: "", category: "", thumbnail: null });
      setPreview(null);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <form className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col gap-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-white text-center">Create a New Blog</h2>

        {/* Thumbnail Upload */}
        <div className="flex flex-col items-center gap-2">
          <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
            <span className="text-gray-400">Upload Thumbnail</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
          {preview && (
            <img
              src={preview}
              alt="thumbnail preview"
              className="w-40 h-40 object-cover rounded-md border border-gray-600 mt-2"
            />
          )}
        </div>

        {/* Error Message */}
        {error && <p className="text-red-400 text-center">{error}</p>}

        {/* Blog Title */}
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Blog Context */}
        <textarea
          name="context"
          placeholder="Blog Content"
          value={formData.context}
          onChange={handleChange}
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        {/* Category */}
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
          } text-white`}
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
}
