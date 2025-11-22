import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { Title } from "../Title";
import { titleSize } from "..";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Title> = {
  title: "Atoms/Title",
  component: Title,
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
      <Title size={controls.size} titleClasses={controls.titleClasses}>
        {controls.children}
      </Title>
    );
  },
  argTypes: {
    children: {
      control: "text",
    },
    titleClasses: {
      control: "text",
    },
    size: {
      control: "select",
      options: Object.values(titleSize),
    },
  },
  args: {
    children: "Title",
    size: titleSize.H2,
    titleClasses: "",
  },
};
