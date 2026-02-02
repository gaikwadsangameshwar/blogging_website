import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authService";
import toast from "react-hot-toast";

export default function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const response = await loginUser(formData);
      const { user, accessToken, refreshToken } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      toast.success("Login successful!");
      navigate("/home", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* LEFT TEXT (VISIBLE ON MOBILE & DESKTOP) */}
        <div className="text-white text-center md:text-left space-y-4 px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Welcome Back 👋
          </h1>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg">
            Login to your account and start exploring amazing blogs and ideas.
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="w-full max-w-md bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <input
              type="text"
              name="username"
              placeholder="Username or Email"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Logging..." : "Login"}
            </button>

            <div className="flex justify-between text-sm pt-2">
              <Link
                to="/change-password"
                className="text-blue-400 hover:underline"
              >
                Change Password?
              </Link>

              <Link
                to="/"
                className="text-blue-400 hover:underline"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
