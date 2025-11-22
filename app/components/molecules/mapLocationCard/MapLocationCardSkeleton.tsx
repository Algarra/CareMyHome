import { TitleSkeleton } from "../../atoms/title/TitleSkeleton";
import { TextSkeleton } from "../../atoms/text";
import { ImageSkeleton } from "../../atoms/imageSkeleton";
import { titleSize } from "../../atoms/title";
import { BadgeSkeleton } from "../../atoms/badge";
import { ButtonSkeleton } from "../../atoms/buttons/button";
import { EdgeLeftIcon } from "../../theme/icons/EdgeLeft";
import { EdgeRightIcon } from "../../theme/icons/EdgeRight";
import { AnimalsIcon } from "../../theme/icons/Animals";
import { BathroomTapIcon } from "../../theme/icons/BathroomTap";
import { PlantIcon } from "../../theme/icons/Plant";
import { BoxIcon } from "../../theme/icons/Box";
import { PoolIcon } from "../../theme/icons/Pool";
import { Colors } from "../../theme/colors";
import { tshirtSizes } from "../../theme/tshirtSizes";

export const LoationCardSkeleton = () => {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 relative transition-all bg-white/50 rounded-lg shadow dark:bg-neutral-800/50 ">
      <div className="relative h-[18em] w-full overflow-hidden ">
        <span className=" z-10 absolute rounded-full bg-neutral-500/90 hover:bg-neutral-500/50 cursor-pointer top-32 left-3 p-2 ">
          <EdgeLeftIcon size={2} />
        </span>
        <span className=" z-10 absolute rounded-full bg-neutral-500/90 hover:bg-neutral-500/50 cursor-pointer top-32 right-3 p-2 ">
          <EdgeRightIcon size={2} />
        </span>

        <div className="rounded-lg object-cover w-full h-full max-w-full p-14 bg-neutral-200 dark:bg-neutral-700 ">
          <ImageSkeleton />
        </div>
      </div>
      <div
        className={` col-span-1 md:col-span-2 h-full p-5 flex-col transition-all z-10  flex justify-between`}
      >
        <div>
          <TitleSkeleton size={titleSize.H3} width={"70%"} />
          <TextSkeleton width={"70%"} lines={2} />
        </div>
        <div className=" w-full justify-between flex ">
          <span className=" flex flex-wrap gap-2 my-auto overflow-hidden max-h-14">
            <BadgeSkeleton>
              <AnimalsIcon size={3} color={Colors.SLATE} />
            </BadgeSkeleton>
            <BadgeSkeleton>
              <BathroomTapIcon size={3} color={Colors.SLATE} />
            </BadgeSkeleton>
            <BadgeSkeleton>
              <PlantIcon size={3} color={Colors.SLATE} />
            </BadgeSkeleton>
            <BadgeSkeleton>
              <BoxIcon size={3} color={Colors.SLATE} />
            </BadgeSkeleton>
            <BadgeSkeleton>
              <PoolIcon size={3} color={Colors.SLATE} />
            </BadgeSkeleton>
          </span>
          <span className=" min-w-[100px]">
            <ButtonSkeleton size={tshirtSizes.EXTRA_SMALL}>
              {" "}
              Check it
            </ButtonSkeleton>
          </span>
        </div>
      </div>
    </div>
  );
};
