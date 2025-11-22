import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { be_service } from "./Fixtures";

export const useValiedateInternalUser = () => {
  const router = useRouter();

  useLayoutEffect(() => {
    (async () => {
      await fetch(`${be_service}/users/internal-user-check`, {
        credentials: "include",
      }).catch(() => {
        router.push("/blog/login");
      });
    })();
  }, []);
};
