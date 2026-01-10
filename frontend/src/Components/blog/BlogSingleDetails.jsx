import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toggleLike } from "../../services/authService";
import {getSingleBlog} from "../../services/blogService"

export default function BlogSingleDetails() {
  const { postId } = useParams();
  const [blog, setBlog] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await getSingleBlog(postId);
      setBlog(res);
      setLikesCount(res.likes.length);
      setLoading(false);
    };
    fetchBlog();
  }, [postId]);

  const handleLike = async () => {
    try {
      const res = await toggleLike(postId);
      setLiked(res.liked);
      setLikesCount(res.totalLikes);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>

      {/* LIKE BUTTON */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
            liked ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          ❤️ {liked ? "Liked" : "Like"}
        </button>

        <span className="text-gray-600">
          {likesCount} Likes
        </span>
      </div>

      <img
        src={blog.thumbnail}
        alt={blog.title}
        className="rounded-lg mb-6"
      />

      <p className="text-gray-700 text-lg leading-relaxed">
        {blog.context}
      </p>
    </div>
  );
}
