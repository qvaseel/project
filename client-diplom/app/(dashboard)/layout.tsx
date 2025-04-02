"use client";

import { Sidebar } from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import useAuthStore from "@/store/authStore";
import { useEffect } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { token, decodedUser, profileUser, setProfileUser } = useAuthStore();

  useEffect(() => {
    if (token && decodedUser && !profileUser) {
      setProfileUser(decodedUser.id);
    }
  }, [token, decodedUser, profileUser, setProfileUser]);

  return (
    <div className="flex gap-1 w-full">
      <Sidebar />
      <div className="flex flex-col w-full px-10">
        <Navbar />
        <main className="">{children}</main>
      </div>
    </div>
  );
}
