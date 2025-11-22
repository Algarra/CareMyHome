import type { Meta, StoryObj } from "@storybook/nextjs";
import { ImageUpload } from "../ImageUpload";
import { localizedT } from "../../../../utils";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ImageUpload> = {
  title: "Molecules/ImageUpload",
  component: ImageUpload,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Sandbox: StoryObj = {
  render: () => {
    return (
      <div className=" w-[40em] h-96">
        <ImageUpload t={localizedT("en")} filesRef={{ current: [] }} />
      </div>
    );
  },
  argTypes: {},
  args: {},
};
