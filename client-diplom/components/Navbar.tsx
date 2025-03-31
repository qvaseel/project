import { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";
import { Profile } from "@/components/Profile";

const Navbar = () => {
  const { profileUser, decodedUser, setProfileUser, token, logout } =
    useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && decodedUser && !profileUser) {
      setProfileUser(decodedUser.id).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [decodedUser, profileUser, setProfileUser, token]);


  return (
    <div className="w-full h-16 flex items-center justify-between">
      <h1 className="text-xl font-bold text-sky-500">
        Управление учебным процессом
      </h1>
      <button className="py-2 px-4 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition">
        Профиль
      </button>
    </div>
  );
};

export default Navbar;
