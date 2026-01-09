import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <Link to={`/blog/${blog._id}`}>
      <div 
      className="border bg-gray-800 text-white rounded shadow p-4 px-6 hover:scale-105 duration-300  
      cursor-pointer">
        {blog.thumbnail && (
            <img className="mb-4"
              src={blog.thumbnail}
              alt={blog.title}
              style={{ width: "100%", marginTop: "10px" }}
            />
          )}
      
        <h2 className="text-lg font-bold mb-4">{blog.title}</h2>
        <p className="mb-4">{blog.content}</p>
        <p>{blog.category}</p>

        <p>{}</p>

      </div>
    </Link>
  );
}
