"use client";
import { useSearchParams } from "next/navigation";
import { be_service } from "../../../utils/Fixtures";
import { useEffect, useState } from "react";
import { useUserStore } from "../../../zustand/user";
import { Button } from "../../atoms/buttons/button";
import { Spinner } from "../../atoms/spinner";
import { localizedT } from "../../../utils";
import { Colors } from "../../theme/colors";
import { GoogleIcon } from "../../theme/icons/Google";
import { useShallow } from "zustand/react/shallow";
import { signIn } from "next-auth/react";

export const GoogleLoginButton = ({
  actualLocale,
}: {
  actualLocale: string;
}) => {
  const t = localizedT(actualLocale);
  const [loaging, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const { getUser } = useUserStore(
    useShallow((state) => ({
      getUser: state.getUser,
    }))
  );

  useEffect(() => {
    (async () => {
      const googleInitToken = searchParams?.get("googleToken");

      if (googleInitToken) {
        setLoading(true);
        await fetch(`${be_service}/users/auth/validate/${googleInitToken}`, {
          credentials: "include",
        });
        await getUser();
        setLoading(false);
      }
    })();
  }, [searchParams]);

  if (loaging)
    return (
      <Button
        color={Colors.RED}
        buttonClasses=" flex w-full justify-center gap-2"
      >
        <Spinner />
      </Button>
    );

  return (
    <Button
      color={Colors.RED}
      buttonClasses=" flex w-full justify-center gap-2"
      onClick={() => signIn("google")}
    >
      <GoogleIcon size={4} /> {t("layout.GoogleLoginButton.label")}
    </Button>
  );
};
