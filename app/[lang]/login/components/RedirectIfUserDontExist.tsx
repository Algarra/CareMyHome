"use client";

import { useUserStore } from "@/app/zustand/user";
import { useShallow } from "zustand/react/shallow";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export const RedirectIfUserIsLoggedIn = ({ cookie }: { cookie?: string }) => {
  const user = useUserStore(useShallow((state) => state.user));
  const getUser = useUserStore((state) => state.getUser);

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [cookie]);

  useEffect(() => {
    if (user?.email) {
      const redirectAfterLoginPath =
        localStorage.getItem("redirectAfterLoginPath") ?? "/dashboard";
      localStorage.removeItem("redirectAfterLoginPath");
      redirect(redirectAfterLoginPath);
    }
  }, [user]);

  return null;
};
