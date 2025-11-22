import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { TextButton } from "../TextButton";
import { TextButtonSizes, textButtonColorsClasses } from "../utils";
import { tshirtSizes } from "../../../../theme/tshirtSizes";
import { Colors } from "../../../../theme/colors";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TextButton> = {
  title: "Atoms/Buttons/TextButton",
  component: TextButton,
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
      <TextButton
        color={controls.color}
        size={controls.size}
        highlighted={controls.highlighted}
        onClick={() => {
          console.log("clicked");
        }}
      >
        {controls.children}
      </TextButton>
    );
  },
  argTypes: {
    color: {
      control: "select",
      options: Object.keys(textButtonColorsClasses),
    },
    size: {
      control: "select",
      options: Object.keys(TextButtonSizes),
    },
    children: {
      control: "text",
    },
    highlighted: {
      control: "boolean",
    },
  },
  args: {
    size: tshirtSizes.BASE,
    color: Colors.VIOLET,
    children: "Text button",
    highlighted: false,
  },
};
