import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { Spinner } from "../Spinner";
import { spinnerIconColorClassess } from "../../../theme/icons/utils";
import { Colors } from "../../../theme/colors";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Spinner> = {
  title: "Atoms/Spinner",
  component: Spinner,
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
    return <Spinner color={controls.color} size={controls.size} />;
  },
  argTypes: {
    color: {
      control: "select",
      options: Object.keys(spinnerIconColorClassess),
    },
    size: {
      control: "number",
    },
  },
  args: {
    color: Colors.GREEN,
    size: 12,
  },
};
