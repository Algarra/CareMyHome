import { UserColor } from "@/app/types/user";
import Image from "@/utils/image";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

type AvatarDetailProps = {
  userName: string;
  userColor: UserColor;
  image?: {
    url: string;
    blurHash: string;
  };
  imageWrapperClasses?: string;
};

const UserColorsMap: { [key in UserColor]: string } = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  amber: "bg-amber-500",
  yellow: "bg-yellow-500",
  lime: "bg-lime-500",
  green: "bg-green-500",
  emerald: "bg-emerald-500",
  teal: "bg-teal-500",
  cyan: "bg-cyan-500",
  sky: "bg-sky-500",
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  violet: "bg-violet-500",
  purple: "bg-purple-500",
  fuchsia: "bg-fuchsia-500",
  pink: "bg-pink-500",
  rose: "bg-rose-500",
};

export const AvatarDetail: FC<AvatarDetailProps> = ({
  userName,
  userColor,
  image,
  imageWrapperClasses,
}) => {
  if (image)
    return (
      <div className="flex items-center space-x-4">
        <span
          className={twMerge(
            ` w-10 h-10 rounded-full overflow-hidden relative `,
            imageWrapperClasses
          )}
        >
          <Image
            src={image.url}
            alt="user image"
            fill
            blurDataURL={image.blurHash}
            className=" object-cover"
          />
        </span>
      </div>
    );

  const initial = userName.charAt(0).toUpperCase();

  return (
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl font-bold ${UserColorsMap[userColor]}`}
    >
      {initial}
    </div>
  );
};
