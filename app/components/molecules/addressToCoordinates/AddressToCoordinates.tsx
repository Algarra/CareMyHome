"use client";
import { MouseEvent, useRef, useState } from "react";
import { Input } from "../../atoms/input";
import { Spinner } from "../../atoms/spinner";
import { TextButton } from "../../atoms/buttons/textButton";
import { tshirtSizes } from "../../theme/tshirtSizes";
import { SearchIcon } from "../../theme/icons/Search";

export const AddressToCoordinates = ({
  setCoordinates,
  onError,
  placeholder,
  showButtonAlways,
  disableError,
}: {
  setCoordinates: (coordinate: [number, number]) => void;
  onError?: () => void;
  placeholder?: string;
  showButtonAlways?: boolean;
  disableError?: boolean;
}) => {
  const address = useRef("");
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCoordinates = async (e: MouseEvent<HTMLButtonElement, any>) => {
    e.preventDefault();
    setLoading(true);
    const resp = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address.current
      )}`
    ).then((resp) => resp.json());

    if (resp.length) {
      const bestFit = resp[0];
      setCoordinates([Number(bestFit.lat), Number(bestFit.lon)]);
      setErrorAddress(false);
    } else {
      if (onError) onError();
      if (!disableError) setErrorAddress(true);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        getCoordinates(e as any);
      }}
      className={" flex gap-2 relative "}
    >
      <div className="flex relative w-full justify-center">
        <Input
          placeholder={placeholder ?? "Search location"}
          onChange={(e) => {
            address.current = e.target.value;
            setShowSearchButton(!!e.target.value);
            setErrorAddress(false);
          }}
          hasError={errorAddress}
          disabled={loading}
        />
        {loading && (
          <span className=" absolute top-2">
            <Spinner />
          </span>
        )}
      </div>
      {(showSearchButton || showButtonAlways) && (
        <div className="flex align-middle absolute right-0 top-1 ">
          <TextButton
            size={tshirtSizes.SMALL}
            buttonClasses=" my-auto "
            onClick={getCoordinates}
          >
            <SearchIcon size={3} />
            <span className="sr-only">Search address</span>
          </TextButton>
        </div>
      )}
    </form>
  );
};
