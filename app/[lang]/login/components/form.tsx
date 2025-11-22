"use client";

import { FC, useState } from "react";
import { Login } from "./LogIn";
import { SignUp } from "./SignUp";
import { Toggle } from "@/app/components/atoms/toggle";
import { localizedT } from "@/app/utils";

export const SignUpLogInform: FC<{ actualLoacale: string }> = ({
  actualLoacale,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const t = localizedT(actualLoacale);

  return (
    <>
      <div className=" flex w-full justify-end ">
        <span>
          <Toggle
            checked={!isSignUp}
            togglelasses=" mx-auto"
            label="Login / Sign Up"
            handleOnChange={() => setIsSignUp(!isSignUp)}
          />
        </span>
      </div>
      {isSignUp ? (
        <Login actualLoacale={t("actualLocale")} />
      ) : (
        <SignUp actualLoacale={t("actualLocale")} />
      )}
    </>
  );
};
