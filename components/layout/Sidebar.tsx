"use client";
import React from "react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import { BiLogOut } from "react-icons/bi";
import SidebarTweetButton from "./SidebarTweetButton";
import { signOut, useSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";

const Sidebar = () => {
  const { data: session } = useSession();
  const { data: currentUser } = useCurrentUser();
  console.log(session,currentUser);

  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      label: "Profile",
      href: `/users/${session?.user?.id}`,
      icon: FaUser,
      auth: true,
    },
  ];

  // useEffect(() => {
  //   // if (!session?.user?.email) {
  //   //   update(); // Re-fetch the session
  //   // }
  //   console.log(session?.user?);
  //   update()
  // }, [session?.user]);

  return (
    <div className="col-span-1 h-full pr-4 md:pr-4">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item.auth}
              alert={item.alert as boolean}
            />
          ))}
          {session?.user?.email && (
            <SidebarItem
              onClick={() => signOut()}
              icon={BiLogOut}
              label="Logout"
            />
          )}

          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
