/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/nextjs";
import { ImageSkeleton } from "../ImageSkeleton";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ImageSkeleton> = {
  title: "Atoms/ImageSkeleton",
  component: ImageSkeleton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen", // or `padded` by default
  },
};

export default meta;

export const Skeleton: StoryObj = {
  render: () => {
    return (
      <div className=" flex w-full h-full p-48 bg-neutral-600">
        <ImageSkeleton />
      </div>
    );
  },
  argTypes: {},
  args: {},
};
