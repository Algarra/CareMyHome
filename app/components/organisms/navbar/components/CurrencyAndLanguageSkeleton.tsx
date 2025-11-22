import { ButtonSkeleton } from "../../../atoms/buttons/button";
import { GlobeIcon } from "../../../theme/icons/Globe";

export const CurrencyAndLanguageSkeleton = () => (
  <div className=" flex gap-2">
    <ButtonSkeleton>
      <GlobeIcon />
      <span className="sr-only">Open main menu</span>
    </ButtonSkeleton>

    <ButtonSkeleton>
      <GlobeIcon />
      <span className="sr-only">Open main menu</span>
    </ButtonSkeleton>
  </div>
);
