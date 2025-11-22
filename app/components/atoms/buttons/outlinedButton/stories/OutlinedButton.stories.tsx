import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { OutlinedButton } from "../OutlinedButton";
import { OutlinedButtonSizes } from "../utils";
import {
  outlinedButtonFromColorsClasses,
  outlinedButtonToColorsClasses,
} from "../utils/outlinedButtonColors";
import { tshirtSizes } from "../../../../theme/tshirtSizes";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof OutlinedButton> = {
  title: "Atoms/Buttons/OutlinedButton",
  component: OutlinedButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Sandbox: StoryObj = {
  render: (controls: Args) => {
    return (
      <OutlinedButton
        color={controls.color}
        fromColor={controls.fromColor}
        toColor={controls.toColor}
        size={controls.size}
        onClick={() => {
          console.log("clicked");
        }}
        buttonClasses={controls.buttonClasses}
      >
        {controls.children}{" "}
      </OutlinedButton>
    );
  },
  argTypes: {
    color: {
      control: "select",
      options: { ...Object.keys(outlinedButtonFromColorsClasses), undefined },
    },
    fromColor: {
      control: "select",
      options: Object.keys(outlinedButtonFromColorsClasses),
    },
    toColor: {
      control: "select",
      options: Object.keys(outlinedButtonToColorsClasses),
    },
    size: {
      control: "select",
      options: Object.keys(OutlinedButtonSizes),
    },
    children: {
      control: "text",
    },
  },
  args: {
    size: tshirtSizes.BASE,
    color: undefined,
    fromColor: "fuchsia",
    toColor: "violet",
    children: "Outlined Button",
    buttonClasses: "",
  },
};
