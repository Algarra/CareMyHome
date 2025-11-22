"use client";
import { Button } from "@/app/components/atoms/buttons/button";
import { Password } from "./components/Password";
import { Email } from "./components/EmailAddress";
import { UserName } from "./components/UserName";
import { FC, useEffect, useState } from "react";
import { useNotificationsStore } from "@/app/zustand/notifications";
import { NotificationOptions } from "@/app/types/notification";
import Link from "next/link";
import { localizedT } from "@/app/utils";
import { useRouter } from "next/navigation";

export const SignUp: FC<{ actualLoacale: string }> = ({ actualLoacale }) => {
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    passwordAgain: "",
    username: "",
  });
  const [hasFieldsError, setHasFieldsError] = useState(false);
  const setNotification = useNotificationsStore(
    (state) => state.setNotification
  );
  const t = localizedT(actualLoacale);
  const router = useRouter();

  const handleSignUp = async () => {
    if (
      signUpData.email === "" ||
      signUpData.password === "" ||
      signUpData.username === "" ||
      signUpData.passwordAgain === ""
    ) {
      setHasFieldsError(true);
      return;
    }
    if (signUpData.password !== signUpData.passwordAgain) {
      setNotification({
        message: "Passwords do not match",
        type: NotificationOptions.ERROR,
      });
      return;
    }

    try {
      const resp = await fetch("/api/create-user", {
        method: "POST",
        body: JSON.stringify(signUpData),
      }).then((res) => res.json());

      if (resp.error) {
        setNotification({
          message: "Something happened",
          type: NotificationOptions.ERROR,
        });
      } else {
        setNotification({
          message: "User created",
          type: NotificationOptions.SUCCESS,
        });
        router.push(`${t("localePath")}/dashboard`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setHasFieldsError(false);
  }, [signUpData]);

  return (
    <>
      <UserName
        setUserNameValue={(value) =>
          setSignUpData({ ...signUpData, username: value })
        }
      />
      <Email
        setEmailValue={(value) =>
          setSignUpData({ ...signUpData, email: value })
        }
      />
      <Password
        label="Password"
        setPasswordValue={(value) =>
          setSignUpData({ ...signUpData, password: value })
        }
      />
      <Password
        label="Repeat Password"
        setPasswordValue={(value) =>
          setSignUpData({ ...signUpData, passwordAgain: value })
        }
      />
      <div className="mb-2 flex items-center justify-end">
        <Link
          className="text-primary transition duration-150 ease-in-out hover:text-gray-600 focus:text-gray-600 active:text-gray-700 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:text-gray-500 dark:active:text-gray-600"
          href={`${t("localePath")}/forgot-password`}
        >
          Forgot password?
        </Link>
      </div>
      <Button
        onClick={handleSignUp}
        buttonClasses={`flex w-full justify-center gap-2 ${
          hasFieldsError ? "" : "mb-6"
        }`}
      >
        Sign up
      </Button>
      {hasFieldsError && (
        <span className="text-red-500 text-xs mb-6">
          Some required fields are missing<br></br>
        </span>
      )}
    </>
  );
};
