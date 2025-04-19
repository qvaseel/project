import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Flex, Skeleton, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/hooks/useUserProfile";

const Navbar = () => {
  const { profileUser, loading, logout } = useUserProfile();

  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
    setTimeout(() => {
      logout();
    }, 1000);
  };

  return (
    <Flex justify="end" p="3">
      <Skeleton loading={loading}>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="py-2 px-4 flex gap-2 items-center cursor-pointer hover:bg-slate-100 rounded-lg"
          >
            <ChevronDownIcon className="h-5 w-5" />
            <Text size="4">{profileUser?.role.id == 3 ? `Администратор` : `${profileUser?.lastName} ${profileUser?.firstName}`}</Text>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              {profileUser?.role.id == 1 && (
                <button
                  onClick={() => {
                    router.push("/profile");
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
                >
                  Перейти в профиль
                </button>
              )}
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
              >
                Выйти
              </button>
            </div>
          )}
        </div>
      </Skeleton>
    </Flex>
  );
};

export default Navbar;
