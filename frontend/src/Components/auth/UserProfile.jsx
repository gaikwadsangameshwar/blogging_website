import { useEffect, useState } from "react";
import { getProfile } from "../../services/authService";
import { Link } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.data); // your backend returns { success, message, data }
      } catch (err) {
        console.error("Profile fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">User not found</p>
      </div>
    );

  // Render profile when user exists
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={user.avatar || "/avatar.png"}
              alt={user.username}
              className="w-28 h-28 rounded-full border-4 border-indigo-500 object-cover"
            />
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
          </div>
        </div>

        <div className="text-center mt-4 space-y-1">
          <h2 className="text-2xl font-semibold capitalize">{user.username}</h2>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>

        <div className="my-6 border-t" />

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">User ID</span>
            <span className="font-medium truncate w-40 text-right">{user._id}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Role</span>
            <span className="font-medium capitalize">{user.role}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Joined</span>
            <span className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col space-y-3">
          <Link to="/editprofile">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-medium transition">
              Edit Profile
            </button>
          </Link>

          <Link to="/changeavatar">
            <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-xl font-medium transition">
              Change Avatar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
