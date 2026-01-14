import React, { useEffect, useState } from "react";
import { getAllUser } from "../../services/authService";
import { getAllBlog, deleteBlog } from "../../services/blogService";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await getAllUser();
        const blogsRes = await getAllBlog();
        setUsers(usersRes.data);
        setBlogs(blogsRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await deleteBlog(blogId, token);
      setBlogs((prev) => prev.filter((b) => b._id !== blogId));
    } catch (err) {
      alert("Failed to delete blog");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-lg font-semibold">Loading...</p>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">

      <aside className="w-full md:w-64 bg-white shadow-md p-4 md:p-6">
        <h2 className="text-xl md:text-3xl font-bold text-indigo-600 mb-4 md:mb-10">
          Admin Panel
        </h2>

        <nav className="flex md:flex-col gap-4 text-sm md:text-lg">
          <a href="#users" className="hover:text-indigo-500">Users</a>
          <a href="#blogs" className="hover:text-indigo-500">Blogs</a>
        </nav>
      </aside>

     
      <main className="flex-1 p-4 sm:p-6 md:p-10">

       
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Users" value={users.length} color="indigo" />
          <StatCard title="Total Blogs" value={blogs.length} color="green" />
          <StatCard
            title="Published"
            value={blogs.filter(b => b.status === "published").length}
            color="blue"
          />
          <StatCard
            title="Drafts"
            value={blogs.filter(b => b.status === "draft").length}
            color="yellow"
          />
        </section>

        
        <section id="users" className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-indigo-600 mb-4">
            All Users
          </h2>

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-[700px] w-full">
              <thead className="bg-indigo-100 text-indigo-700">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Joined</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className="border-b hover:bg-indigo-50">
                    <td className="p-3">{user.username}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3 capitalize">{user.role}</td>
                    <td className="p-3">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 flex flex-wrap gap-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Blogs Table */}
        <section id="blogs">
          <h2 className="text-xl md:text-2xl font-bold text-indigo-600 mb-4">
            All Blogs
          </h2>

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-[900px] w-full">
              <thead className="bg-purple-100 text-purple-700">
                <tr>
                  <th className="p-3">Title</th>
                  <th className="p-3">Author</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Created</th>
                  <th className="p-3">Updated</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map(blog => (
                  <tr key={blog._id} className="border-b hover:bg-purple-50">
                    <td className="p-3 font-medium">{blog.title}</td>
                    <td className="p-3">{blog.author}</td>
                    <td className={`p-3 font-semibold ${
                      blog.status === "published"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}>
                      {blog.status}
                    </td>
                    <td className="p-3">{blog.category}</td>
                    <td className="p-3">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      {new Date(blog.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 flex flex-wrap gap-2">
                      <Link
                        to={`/admin/update-blog/${blog._id}`}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteBlog(blog._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
};

const colorMap = {
  indigo: "bg-indigo-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  yellow: "bg-yellow-500",
};

const StatCard = ({ title, value, color }) => (
  <div className={`${colorMap[color]} text-white rounded-xl shadow p-5`}>
    <h3 className="text-sm uppercase opacity-80">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default Dashboard;
