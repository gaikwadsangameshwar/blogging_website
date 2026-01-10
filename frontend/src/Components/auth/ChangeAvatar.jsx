import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/authService";

export default function ChangeAvatar() {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile();
      setPreview(res.data.avatar);
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!avatar) return;

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("avatar", avatar);

      await updateProfile(formData);
      setMessage("Avatar updated successfully ✅");
      setAvatar(null);
    } catch (err) {
      console.error(err);
      setMessage("Avatar update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center justify-center max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Change Avatar</h2>

      {preview && (
        <img
          src={preview}
          alt="avatar"
          className="w-24 h-24 rounded-full mb-4 text-center mx-auto"
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
        className="text-center justify-center"
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          {loading ? "Uploading..." : "Update Avatar"}
        </button>

        {message && (
          <p className="text-center text-sm mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}
