import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "../Badge";
import { badgeColorsClasses } from "../utils";
import { Colors } from "../../../theme/colors";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
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
    return <Badge color={controls.color}>{controls.children}</Badge>;
  },
  argTypes: {
    color: {
      control: "select",
      options: Object.keys(badgeColorsClasses),
    },
    children: {
      control: "text",
    },
  },
  args: {
    color: Colors.BLUE,
    children: "Button",
  },
};
