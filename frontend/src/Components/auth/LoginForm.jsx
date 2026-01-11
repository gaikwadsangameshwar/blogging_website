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
    console.log("LOGIN RESPONSE:", response);

   
    const { user, accessToken, refreshToken } = response.data;


    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    toast.success("Login successful!");

    if (user.role === "admin") {
      navigate("/home", { replace: true });
    } else {
      navigate("/home", { replace: true });
    }

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-900 text-white px-4 md:px-20 gap-10">

      <div className="text-center md:text-left md:w-1/2 space-y-4">
        <h1 className="text-3xl font-bold">Welcome Back!</h1>
        <p className="text-gray-300">
          Login to access your account and start exploring amazing blogs on our platform.
        </p>
      </div>

      
      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col w-full md:w-1/2 gap-4 bg-gray-800 p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          className="border border-gray-600 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-600 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded-lg font-semibold text-lg"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
