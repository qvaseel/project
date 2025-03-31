"use client";

import { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";
import { Profile } from "@/components/Profile";
import { Sidebar } from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function PageDashboard({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
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

//   if (loading) return <p>Загрузка...</p>;
//   if (!profileUser) return <p>Ошибка загрузки профиля.</p>;

  return (
    <div className="flex gap-1 w-full">
      <Sidebar />
      <div className="flex flex-col w-full px-10">
        <Navbar />
        <main className="">
          {children}
        </main>
      </div>
    </div>
  );
}
