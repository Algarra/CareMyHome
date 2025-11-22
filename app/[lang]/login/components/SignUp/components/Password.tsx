import { Input } from "@/app/components/atoms/input";
import { EyeIcon } from "@/app/components/theme/icons/Eye";
import {
  validatePassword,
  validatePasswordLetteres,
  validatePasswordLength,
  validatePasswordCapitalLetteres,
  validatePasswordNumbers,
  validatePasswordSpecialCharacter,
} from "@/app/utils/passwordValidator";
import { FC, memo, useState } from "react";

export const Password: FC<{
  setPasswordValue: (value: string) => void;
  label: string;
}> = memo(({ setPasswordValue, label }) => {
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative mb-3" data-te-input-wrapper-init>
      <Input
        label={label + "*"}
        value={password}
        type={visible ? "text" : "password"}
        handleOnChange={(e) => {
          setHasError(
            !validatePassword(e.target.value) && e.target.value.length > 0
          );
          setPasswordValue(e.target.value);
          setPassword(e.target.value);
        }}
        hasError={hasError}
      />
      <span
        onClick={() => setVisible(!visible)}
        className={` text-black dark:text-white absolute top-9 right-2 ${
          !visible && "opacity-50"
        }`}
      >
        <EyeIcon />
      </span>
      {hasError && (
        <>
          {!validatePasswordLength(password) && (
            <span className="text-red-500 text-xs">
              Password must be at least 10 characters long<br></br>
            </span>
          )}
          {!validatePasswordLetteres(password) && (
            <span className="text-red-500 text-xs">
              Password must have at least one letter<br></br>
            </span>
          )}
          {!validatePasswordCapitalLetteres(password) && (
            <span className="text-red-500 text-xs">
              Password must have at least one Capital letter<br></br>
            </span>
          )}
          {!validatePasswordNumbers(password) && (
            <span className="text-red-500 text-xs">
              Password must be at least one number<br></br>
            </span>
          )}
          {!validatePasswordSpecialCharacter(password) && (
            <span className="text-red-500 text-xs">
              Password must be at least one special character<br></br>
            </span>
          )}
        </>
      )}
    </div>
  );
});

Password.displayName = "Password";
