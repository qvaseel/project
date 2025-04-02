import { PAGES } from "@/shared/constants/pages";
import { Heading, Link, Skeleton, TabNav } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  UserIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { Title } from "@radix-ui/themes/components/dialog";
import useAuthStore from "@/store/authStore";

interface Props {
  className?: string;
}

export const Sidebar: React.FC<Props> = ({ className }) => {
  const pathname = usePathname();
  const { decodedUser } = useAuthStore();
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (decodedUser) {
      const role = decodedUser?.roles?.[0] || "STUDENT";
      const rolePages =
        role === "ADMIN"
          ? PAGES.ADMIN
          : role === "STUDENT"
          ? PAGES.STUDENT
          : role === "TEACHER"
          ? PAGES.TEACHER
          : PAGES.STUDENT;
      setPages(rolePages);
    }
  }, [decodedUser]);

  return (
    <div
      className={`${className} w-[240px] p-8 shadow-xl h-screen flex flex-col gap-3`}
    >
      <div className="flex items-center gap-2">
        <AcademicCapIcon className="h-10 w-10" />
        <Heading>Веб-Вуз</Heading>
      </div>
      {!!pages.length && (
        <TabNav.Root className="flex-col items-left w-full">
          {pages.map((link, index) => (
            <TabNav.Link
            className="w-full"
            asChild
            active={pathname === `/${link.link}`}
            key={index}
          >
            <Link href={`/${link.link}`}>
              <link.icon className="h-5 w-5 mr-3" />
              {link.title}
            </Link>
          </TabNav.Link>
          ))}
        </TabNav.Root>
      )}
    </div>
  );
};
