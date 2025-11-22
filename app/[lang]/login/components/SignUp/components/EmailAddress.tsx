"use client";
import { validateEmail } from "@/app/_actions";
import { Input } from "@/app/components/atoms/input";

import { FC, useEffect, useState } from "react";

export const Email: FC<{ setEmailValue: (value: string) => void }> = ({
  setEmailValue,
}) => {
  const [email, setEmail] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    (async () => {
      const isValid = await validateEmail(email);
      setHasError(!isValid && email.length > 0);
    })();
  }, [email]);

  return (
    <div className="relative mb-3" data-te-input-wrapper-init>
      <Input
        label="Email*"
        value={email}
        type="email"
        handleOnChange={(e) => {
          setEmail(e.target.value);
          setEmailValue(e.target.value);
        }}
        hasError={hasError}
      />
      {hasError && (
        <span className="text-red-500 text-xs mb-0">
          This email is not valid or it's incomplete
        </span>
      )}
    </div>
  );
};
