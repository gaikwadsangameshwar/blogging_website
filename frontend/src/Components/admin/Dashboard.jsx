import { useEffect, useState } from "react";
import { getAllUser } from "../../services/authService";
import { getAllBlog, deleteBlog } from "../../services/blogService";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await getAllUser();
        const blogsRes = await getAllBlog();

        setUsers(usersRes.data);
        setBlogs(blogsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
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

      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-white shadow-md p-6">
        <h2 className="text-3xl font-bold text-indigo-600 mb-10">
          Admin Panel
        </h2>

        <nav className="flex md:flex-col gap-4 text-lg">
          <a href="#users" className="hover:text-indigo-500">Users</a>
          <a href="#blogs" className="hover:text-indigo-500">Blogs</a>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 md:p-10">

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Users" value={users.length} color="indigo" />
          <StatCard title="Total Blogs" value={blogs.length} color="green" />
          <StatCard
            title="Published"
            value={blogs.filter((b) => b.status === "published").length}
            color="blue"
          />
          <StatCard
            title="Drafts"
            value={blogs.filter((b) => b.status === "draft").length}
            color="yellow"
          />
        </section>

            <section id="users" className="mb-10">
  <h2 className="text-2xl font-bold text-indigo-600 mb-6">
    All Users
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {users.map((user) => (
      <div
        key={user._id}
        className="bg-white rounded-xl shadow hover:shadow-lg transition p-5"
      >
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={user.avatar || "https://via.placeholder.com/80"}
            alt={user.username}
            className="w-16 h-16 rounded-full object-cover border"
          />

          <div>
            <h3 className="text-lg font-semibold">{user.username}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* INFO */}
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <span className="font-medium">Role:</span>{" "}
            <span className="capitalize">{user.role}</span>
          </p>
          <p>
            <span className="font-medium">Joined:</span>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* ACTION */}
        <button
          onClick={() => setSelectedUser(user)}
          className="mt-5 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg"
        >
          View Details
        </button>
      </div>
    ))}
  </div>
</section>

        {/* BLOGS */}
        <section id="blogs">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            All Blogs
          </h2>

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full">
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
                {blogs.map((blog) => (
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
                    <td className="p-3 flex gap-2">
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

      {/* USER DETAILS MODAL */}
      {selectedUser && (
        <UserDetailsForm
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;

/* ---------------- COMPONENTS ---------------- */

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

const UserDetailsForm = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-indigo-600 mb-4">
          User Details
        </h2>

        <div className="flex justify-center mb-4">
          <img
            src={user.avatar || "https://via.placeholder.com/100"}
            alt="user"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        <div className="space-y-3">
          <Input label="Name" value={user.username} />
          <Input label="Email" value={user.email} />
          <Input label="Role" value={user.role} />
          <Input
            label="Joined On"
            value={new Date(user.createdAt).toLocaleDateString()}
          />
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Input = ({ label, value }) => (
  <div>
    <label className="text-sm text-gray-500">{label}</label>
    <input
      value={value}
      disabled
      className="w-full border rounded px-3 py-2 bg-gray-50"
    />
  </div>
);
