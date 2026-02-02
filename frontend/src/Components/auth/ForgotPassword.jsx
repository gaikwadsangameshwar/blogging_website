import { useState } from "react";
import { updatePassword } from "../../services/authService";

function ChangePassword() {
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      await updatePassword(password);
      setSuccess(true);
      setMessage("Password changed successfully");
      setPassword({ oldPassword: "", newPassword: "" });
    } catch (err) {
      console.error(err);
      setMessage("Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handlePasswordSubmit}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg space-y-4"
      >
        <h3 className="text-xl font-semibold text-center text-gray-800">
          Change Password
        </h3>

        <input
          type="password"
          name="oldPassword"
          placeholder="Current password"
          value={password.oldPassword}
          onChange={handlePasswordChange}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New password"
          value={password.newPassword}
          onChange={handlePasswordChange}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {message && (
          <p
            className={`text-center text-sm ${
              success ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold text-white transition-colors ${
            loading
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
