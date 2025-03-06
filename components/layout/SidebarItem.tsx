"use client";

import useLoginModal from "@/hooks/useLoginModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
  alert,
}) => {
  const session = useSession();
  const loginModal = useLoginModal();

  const router = useRouter();
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }
    if (auth && !session?.data?.user) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, onClick, session, loginModal, auth,href]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      {/* mobile view */}
      <div className="lg:hidden relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-80 cursor-pointer ">
        <Icon size={28} color="white" />
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-3 left-1" size={60} />
        ) : null}
      </div>
      <div
        className="relative
        hidden 
        lg:flex 
        items-row 
        gap-4 
        p-4 
        rounded-full 
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer
        items-center
        "
      >
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0 " size={70} />
        ) : null}
      </div>
    </div>
  );
};

export default SidebarItem;
