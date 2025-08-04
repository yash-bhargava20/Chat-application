import { useSelector } from "react-redux";

const Profile = () => {
  const { authUser } = useSelector((state) => state.auth);
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="text-lg">
        Username:{" "}
        <span className="font-semibold">{authUser?.username || "-"}</span>
      </div>
    </div>
  );
};

export default Profile;
