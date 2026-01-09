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

    if (!formData.username || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await loginUser(formData); 
      toast.success("Login successful!");
      navigate("/createblog"); 
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-6 w-96 rounded-lg shadow-lg"
      >
        <h1 className="text-center text-2xl font-bold">Login</h1>

        <input
          type="username"
          name="username"
          placeholder="Enter your email"
          value={formData.username}
          onChange={handleChange}
          className="border px-2 py-1"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className="border px-2 py-1"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 transition-all py-2 rounded text-lg font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
