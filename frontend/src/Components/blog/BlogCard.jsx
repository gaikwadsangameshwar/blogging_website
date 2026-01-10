import { useState } from "react";
import { Link } from "react-router-dom";
import { toggleLike } from "../../services/authService";

export default function BlogCard({ blog }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(blog.likes?.length || 0);
  const [loading, setLoading] = useState(false);

  const handleLike = async (e) => {
    e.preventDefault();        
    e.stopPropagation();      

    try {
      setLoading(true);
      const res = await toggleLike(blog._id);
      setLiked(res.liked);
      setLikesCount(res.totalLikes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link to={`/blog/${blog._id}`}>
      <div className="relative bg-gray-800 text-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col">

      
        <button
          onClick={handleLike}
          disabled={loading}
          className={`absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-sm transition
            ${liked ? "bg-red-500 text-white" : "bg-gray-700 text-white"}
          `}
        >
          ❤️ {likesCount}
        </button>

       
        {blog.thumbnail && (
          <div className="w-full h-48 overflow-hidden">
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        )}

        <div className="p-5 flex flex-col gap-3">
          <h2 className="text-xl font-bold truncate">{blog.title}</h2>

          <span className="inline-block text-blue-400 text-sm">
            {blog.category}
          </span>

          <p className="text-gray-300 line-clamp-3">
            {blog.context}
          </p>
        </div>
      </div>
    </Link>
  );
}
