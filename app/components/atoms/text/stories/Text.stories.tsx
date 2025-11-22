/* eslint-disable react-hooks/rules-of-hooks */
import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { Text } from "../Text";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Text> = {
  title: "Atoms/Text",
  component: Text,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;

export const Sandbox: StoryObj = {
  render: (controls: Args) => {
    return <Text> {controls.chinldren}</Text>;
  },
  argTypes: {},
  args: {
    chinldren: "Sample text",
  },
};
