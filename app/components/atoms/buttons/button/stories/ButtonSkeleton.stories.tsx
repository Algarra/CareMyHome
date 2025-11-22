import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { ButtonSizes } from "../utils";
import { ButtonSkeleton } from "../ButtonSkeleton";
import { tshirtSizes } from "../../../../theme/tshirtSizes";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ButtonSkeleton> = {
  title: "Atoms/Buttons/ButtonSkeleton",
  component: ButtonSkeleton,
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
    return (
      <ButtonSkeleton size={controls.size}> {controls.content} </ButtonSkeleton>
    );
  },
  argTypes: {
    size: {
      name: "size",
      control: "select",
      options: Object.keys(ButtonSizes),
    },
    content: {
      name: "children",
      control: "text",
    },
  },
  args: {
    size: tshirtSizes.BASE,
    content: "Button",
  },
};
