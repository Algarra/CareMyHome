import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "../Button";
import { ButtonSizes, buttonColorsClasses } from "../utils";
import { tshirtSizes } from "../../../../theme/tshirtSizes";
import { Colors } from "../../../../theme/colors";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: "Atoms/Buttons/Button",
  component: Button,
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

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Sandbox: StoryObj = {
  render: (controls: Args) => {
    return (
      <Button
        color={controls.color}
        size={controls.size}
        onClick={() => {
          console.log("clicked");
        }}
      >
        {controls.children}
      </Button>
    );
  },
  argTypes: {
    color: {
      control: "select",
      options: Object.keys(buttonColorsClasses),
    },
    size: {
      control: "select",
      options: Object.keys(ButtonSizes),
    },
    children: {
      control: "text",
    },
  },
  args: {
    size: tshirtSizes.BASE,
    color: Colors.VIOLET,
    children: "Button",
  },
};
