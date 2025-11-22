import { validateUsername } from "@/app/_actions";
import { FC, useEffect, useState } from "react";
import { Input } from "@/app/components/atoms/input";
import { useDebounce } from "@/app/utils/useDebounce";

export const UserName: FC<{ setUserNameValue: (value: string) => void }> = ({
  setUserNameValue,
}) => {
  const [userName, setUserName] = useState("");
  const [hasError, setHasError] = useState(false);
  const debouncedUsername = useDebounce(userName, 200);

  useEffect(() => {
    (async () => {
      const isValid = await validateUsername(debouncedUsername);
      setHasError(!isValid && debouncedUsername.length > 0);
    })();
  }, [debouncedUsername]);
  return (
    <div className="relative mb-3" data-te-input-wrapper-init>
      <Input
        label="User name*"
        value={userName}
        handleOnChange={(e) => {
          setUserName(e.target.value);
          setUserNameValue(e.target.value);
        }}
        hasError={hasError}
      />
      {hasError && (
        <span className="text-red-500 text-xs mb-0">
          This user name already exist
        </span>
      )}
    </div>
  );
};
