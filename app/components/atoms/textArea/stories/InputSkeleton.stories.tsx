/* eslint-disable react-hooks/rules-of-hooks */
import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { InputSkeleton } from "../TextAreaSkeleton";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof InputSkeleton> = {
  title: "Atoms/TextArea",
  component: InputSkeleton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;

export const Skeleton: StoryObj = {
  render: (controls: Args) => {
    return (
      <div style={{ width: "300px" }}>
        <InputSkeleton label={controls.label} />
      </div>
    );
  },
  argTypes: {
    label: {
      name: "Label",
      control: "text",
    },
  },
  args: {
    label: "LABEL",
  },
};
