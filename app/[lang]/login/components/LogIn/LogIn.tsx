"use client";
import { Button } from "@/app/components/atoms/buttons/button";
import { Input } from "@/app/components/atoms/input";
import { Colors } from "@/app/components/theme/colors";
import { localizedT } from "@/app/utils";
import Link from "next/link";
import { FC, useState } from "react";
import { Password } from "./components/Password";
import { useRouter } from "next/navigation";

export const Login: FC<{ actualLoacale: string }> = ({ actualLoacale }) => {
  const [logInForm, setLogInForm] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState(false);
  const [passwodError, setPasswodError] = useState(false);
  const t = localizedT(actualLoacale);
  const router = useRouter();

  const handleLogIn = async () => {
    try {
      const resp = await fetch("/api/authenticate-user", {
        method: "POST",
        body: JSON.stringify(logInForm),
      }).then((resp) => resp.json());
      console.log("🚀 ~ handleLogIn ~ resp:", resp);
      if (resp.error === "User not found") {
        setEmailError(true);
        return;
      }
      if (resp.error === "Wrong password") {
        setPasswodError(true);
      }

      router.replace(`${t("localePath")}/dashboard`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="relative mb-3" data-te-input-wrapper-init>
        <Input
          label="Email address"
          value={logInForm.email}
          hasError={emailError}
          handleOnChange={(e) => {
            setEmailError(false);
            setLogInForm({ ...logInForm, email: e.target.value });
          }}
        />
        {emailError && (
          <span className="text-red-500 text-xs">Email may be wrong</span>
        )}
      </div>
      <Password
        label="Password"
        setPasswordValue={(psw) => {
          setPasswodError(false);
          setLogInForm({ ...logInForm, password: psw });
        }}
        hasError={passwodError}
      />

      <div className="mb-3 flex items-center justify-end">
        <Link
          className="text-primary transition duration-150 ease-in-out hover:text-gray-600 focus:text-gray-600 active:text-gray-700 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:text-gray-500 dark:active:text-gray-600"
          href={`${t("localePath")}/forgot-password`}
        >
          Forgot password?
        </Link>
      </div>
      <Button
        disabled={!logInForm.email || !logInForm.password}
        onClick={handleLogIn}
        color={Colors.BLUE}
        buttonClasses=" flex w-full justify-center gap-2 mb-6 "
      >
        Log in
      </Button>
    </>
  );
};
