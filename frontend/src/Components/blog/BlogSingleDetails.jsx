import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toggleLike } from "../../services/authService";
import { getSingleBlog } from "../../services/blogService";
import CommentSection from "../comments/CommentsSection";

export default function BlogSingleDetails() {
  const { postId } = useParams();

  const [blog, setBlog] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getSingleBlog(postId);
        const data = res.data?.data || res;

        setBlog(data);
        setLikesCount(data.likes?.length || 0);
        setLiked(data.isLiked || false); 
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
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

  if (loading) return <p className="text-center">Loading...</p>;
  if (!blog) return <p className="text-center">Blog not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 leading-tight">
        {blog.title}
      </h1>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium shadow-sm transition-all duration-300 hover:scale-105 ${
              liked 
                ? "bg-red-500 text-white shadow-red-300" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ❤️ {liked ? "Liked" : "Like"}
          </button>

          <span className="text-gray-500 text-sm font-medium">
            {likesCount} likes
          </span>
        </div>
      </div>

      {blog.thumbnail && (
        <div className="mb-8">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className=" max-h-[450px] object-cover rounded-xl shadow-md mx-auto"
          />
        </div>
      )}

      <p className="text-gray-800 text-lg leading-relaxed mb-12 whitespace-pre-line">
        {blog.context}
      </p>

      <div className="bg-white shadow-lg rounded-xl p-6 border">
        <h2 className="text-xl font-semibold mb-4">💬 Comments</h2>
        <CommentSection 
          blogId={blog._id} 
          currentUser={user} 
        />
      </div>
    </div>
  );
}
