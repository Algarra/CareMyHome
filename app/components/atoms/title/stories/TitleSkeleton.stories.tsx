import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { TitleSkeleton } from "../TitleSkeleton";
import { titleSkeletonWidth, titleSize } from "..";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TitleSkeleton> = {
  title: "Atoms/Title",
  component: TitleSkeleton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Skeleton: StoryObj = {
  render: (controls: Args) => {
    return (
      <div className=" w-[300px] ">
        <TitleSkeleton size={controls.size} width={controls.width} />
      </div>
    );
  },
  argTypes: {
    width: {
      control: "select",
      options: Object.keys(titleSkeletonWidth),
    },
    size: {
      control: "select",
      options: Object.values(titleSize),
    },
  },
  args: {
    width: "50%",
    size: titleSize.H2,
  },
};
