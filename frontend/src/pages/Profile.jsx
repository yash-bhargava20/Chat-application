import { useDispatch, useSelector } from "react-redux";
import { Camera, User, Info } from "lucide-react";
import { useState } from "react";
import { updateUser } from "../store/Slice/authslice";

const Profile = () => {
  // const BACKEND_URL =
  //   import.meta.env.VITE_API_URL || "https://threadly-backend.onrender.com";
  const dispatch = useDispatch();
  const { authUser, isUpdatingProfile } = useSelector((state) => state.auth);

  const [username, setUsername] = useState(authUser?.username || "");
  const [about, setAbout] = useState(authUser?.about || "");
  const [avatar, setAvatar] = useState("");

  const [avatarPreview, setAvatarPreview] = useState(
    authUser?.profilePic || "/avtar-holder.avif"
  );

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatar(reader.result);
      setAvatarPreview(reader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      username,
      about,
    };
    if (avatar) {
      payload.profilePic = avatar;
    }

    dispatch(updateUser(payload));
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-md p-3">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 mt-4"
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative">
              {authUser.profilePic ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="size-36 rounded-full object-cover mb-2"
                />
              ) : (
                <div className="size-36 flex items-center justify-center rounded-full bg-gray-200 mb-2">
                  <User className="w-16 h-16 text-gray-500" />
                </div>
              )}

              <label
                htmlFor="avatar-upload"
                className="absolute bottom-1 right-3 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100"
                title="Change profile picture"
              >
                <Camera className="w-6 h-6 text-gray-500" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera to update your photo"}
            </p>
          </div>

          <div className="w-full max-w-xs">
            <div className="flex items-center gap-1 mb-2">
              <User className="w-5 h-5 text-gray-500" />
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
            </div>
            <input
              type="text"
              className="mb-3 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <div className="flex items-center gap-1 mb-2">
              <Info className="w-5 h-5 text-gray-500" />
              <label className="block text-sm font-medium text-gray-700">
                About
              </label>
            </div>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-400"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Tell us about yourself..."
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-4xl max-w-40 w-full"
            disabled={isUpdatingProfile}
          >
            {isUpdatingProfile ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
