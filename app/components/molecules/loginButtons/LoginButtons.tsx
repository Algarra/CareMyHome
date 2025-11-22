"use client";
import { useUserStore } from "../../../zustand/user";
import Link from "next/link";
import { FC, startTransition, useEffect } from "react";
import { localizedT } from "../../../utils";
import { Spinner } from "../../atoms/spinner";
import { TextButton } from "../../atoms/buttons/textButton";
import { tshirtSizes } from "../../theme/tshirtSizes";
import { AvatarDetail } from "../avatarDetail";

type LoginButtonsProps = { actualLocale: string };

export const LoginButtons: FC<LoginButtonsProps> = ({ actualLocale }) => {
  const t = localizedT(actualLocale);
  const user = useUserStore((state) => state.user);
  const userLoading = useUserStore((state) => state.userLoading);
  const getUser = useUserStore((state) => state.getUser);

  useEffect(() => {
    const existingUser = window.localStorage.getItem("existingUser");
    if (existingUser)
      startTransition(() => {
        getUser();
      });
  }, [getUser]);

  if (user?.username) {
    return (
      <Link
        href={t("localePath") + "/dashboard"}
        title="profile"
        className="ml-3"
      >
        <AvatarDetail
          userName={user.username}
          userColor={user.userColor}
          image={user.image}
        />
      </Link>
    );
  }

  if (userLoading)
    return (
      <span className="mr-3 ml-6">
        <Spinner />
      </span>
    );

  return (
    <>
      <Link href={t("localePath") + "/login"} className="ml-2" title="login">
        <TextButton
          borderAnimation
          size={tshirtSizes.SMALL}
          buttonClasses=" sm:px-5 sm:py-2.5 "
        >
          {t("layout.navbar.loginLabel")}
        </TextButton>
      </Link>
    </>
  );
};
