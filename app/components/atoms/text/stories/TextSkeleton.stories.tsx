/* eslint-disable react-hooks/rules-of-hooks */
import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { TextSkeleton } from "..";
import { textSkeletonWidth } from "../utils";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TextSkeleton> = {
  title: "Atoms/Text",
  component: TextSkeleton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;

export const Skeleton: StoryObj = {
  render: (controls: Args) => {
    return (
      <div className=" w-[300px] ">
        <TextSkeleton width={controls.width} lines={controls.lines} />
      </div>
    );
  },
  argTypes: {
    width: {
      control: "select",
      options: Object.keys(textSkeletonWidth),
    },
  },
  args: {
    chinldren: "",
    width: "70%",
    lines: 2,
  },
};
