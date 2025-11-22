import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { BadgeSkeleton } from "../BadgeSkeleton";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof BadgeSkeleton> = {
  title: "Atoms/Badge",
  component: BadgeSkeleton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
    darkMode: {
      current: "light",
      classTarget: "html",
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;

export const Skeleton: StoryObj = {
  render: (controls: Args) => {
    return <BadgeSkeleton> {controls.content} </BadgeSkeleton>;
  },
  argTypes: {
    content: {
      name: "children",
      control: "text",
    },
  },
  args: {
    content: "Badge",
  },
};
