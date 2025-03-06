import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, MouseEvent } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const { data: fetchUser } = useUser(userId);
  const router = useRouter();

  const onClick = useCallback((event: MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    const url = `/users/${userId}`;
    router.push(url);
  }, [router,userId]);

  return (
    <div
      className={`
  ${hasBorder ? "border-4 border-black" : ""}
  ${isLarge ? "h-32" : "h-12"}
  ${isLarge ? "w-32" : "w-12"}
  rounded-full hover:opacity-90 cursor-pointer relative transition
  `}
    >
      <Image
        className="object-cover rounded-full"
        src={fetchUser?.profileImage || "/images/placeholder.png"}
        alt="Avatar"
        fill
        onClick={onClick}
      />
    </div>
  );
};

export default Avatar;
