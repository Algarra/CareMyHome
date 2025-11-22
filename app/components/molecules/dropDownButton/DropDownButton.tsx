"use client";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { TextButton } from "../../atoms/buttons/textButton";
import { DropMenu } from "../dropMenu/DropMenu";
import { EdgeUpIcon } from "../../theme/icons/EdgeUp";
import { EdgeDownIcon } from "../../theme/icons/EdgeDown";

export const DropDownButton = ({
  handleOnClick,
  text,
  links,
}: {
  handleOnClick?: MouseEventHandler<HTMLButtonElement>;
  text: string;
  links: { link: string; text: string }[];
}) => {
  const buttonClicked = useRef(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const handleCloseDropdownMenu = () => {
    if (!buttonClicked.current) setOpenDropdown(false);
    buttonClicked.current = false;
  };

  useEffect(() => {
    window.addEventListener("click", handleCloseDropdownMenu);
    return () => window.removeEventListener("click", handleCloseDropdownMenu);
  }, []);

  return (
    <div>
      <TextButton
        onClick={(e) => {
          buttonClicked.current = true;
          setOpenDropdown(!openDropdown);
          if (handleOnClick) handleOnClick(e);
        }}
      >
        {text}
        <span className=" ml-2 my-auto">
          {openDropdown ? <EdgeUpIcon size={2} /> : <EdgeDownIcon size={2} />}
        </span>
      </TextButton>
      <DropMenu open={openDropdown} links={links} />
    </div>
  );
};
