import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/posts"
        );

        const posts = response.data.posts || response.data.data || [];

        setBlogs(posts);
        setFilteredBlogs(posts);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filterByCategory = (category) => {
    setActiveCategory(category);

    if (category === "All") {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(
        blogs.filter((blog) => blog.category === category)
      );
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="flex gap-4 mb-6 text-center justify-center">
        {["All", "IT", "CAR","Technology"].map((cat) => (
          <button
            key={cat}
            onClick={() => filterByCategory(cat)}
            className={`px-4 py-2 rounded ${
              activeCategory === cat
                ? "bg-blue-800 text-white hover:bg-blue-700"
                : "bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {filteredBlogs?.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </>
  );
}
