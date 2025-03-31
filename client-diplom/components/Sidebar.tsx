import { PAGES } from "@/shared/constants/pages";
import { Link, TabNav } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import React from "react";
import { HomeIcon, UserIcon } from "@heroicons/react/24/outline";

interface Props {
  className?: string;
}

export const Sidebar: React.FC<Props> = ({ className }) => {
  const pathname = usePathname();
  return (
    <div className={`${className} w-[240px] p-8 shadow-xl h-screen`}>

      <TabNav.Root className="flex-col items-left w-full">
        {PAGES.map((link, index) => (
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
    </div>
  );
};