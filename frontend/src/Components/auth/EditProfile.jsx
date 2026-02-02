import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { getProfile, updateDetails,  logout } from "../../services/authService";

export default function EditProfile() {
  const navigate = useNavigate(); 
  const [form, setForm] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setForm({ username: res.data.username, email: res.data.email });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      await updateDetails(form);
      setSuccess(true);
      setMessage("Profile updated successfully");
    } catch (err) {
      console.error(err);
      setMessage("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setMessage("");
    setSuccess(false);
    try {
      await logout({}); 
      localStorage.removeItem("token");
      setMessage("Logged out successfully");
      setSuccess(true);
      setForm({ username: "", email: "" });
      navigate("/login"); 
    } catch (err) {
      console.error(err);
      setMessage("Logout failed");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Account Settings</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Profile Details</h3>
          <input
            type="text"
            name="username"
            value={form.username || ""}
            onChange={handleProfileChange}
            placeholder="Username"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            name="email"
            value={form.email || ""}
            onChange={handleProfileChange}
            placeholder="Email"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          />
          <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg">
            Update Profile
          </button>
        </form>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
        >
          Logout
        </button>

        {message && (
          <p className={`text-center text-sm ${success ? "text-green-600" : "text-red-600"}`}>{message}</p>
        )}
      </div>
    </div>
  );
}
