import { FC, ReactNode, useEffect } from "react";
import { TextButton } from "../buttons/textButton";
import { CrossIcon } from "../../theme/icons/Cross";

export const Modal: FC<{
  open: boolean;
  children: ReactNode;
  setOpen: (newValue: boolean) => void;
}> = ({ open, setOpen, children }) => {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <div
      className={` ${open ? "" : "hidden"}
       fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full flex md:inset-0 min-h-[6em] max-h-full bg-neutral-900/50 dark:bg-black/70 p-3 `}
    >
      <div className=" relative m-auto p-4 w-full max-w-lg max-h-full bg-white text-black pt-10 rounded-lg shadow dark:bg-neutral-800 dark:text-white">
        <span className="absolute top-1 right-0">
          <TextButton onClick={() => setOpen(false)}>
            <CrossIcon size={3} />
          </TextButton>
        </span>

        {children}
      </div>
    </div>
  );
};
