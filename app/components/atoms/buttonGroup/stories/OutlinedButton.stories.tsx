import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { ButtonGroup } from "../ButtonGroup";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ButtonGroup> = {
  title: "Atoms/Buttons/ButtonGroup",
  component: ButtonGroup,
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
    return <ButtonGroup buttons={controls.buttons} />;
  },
  argTypes: {},
  args: {
    buttons: [
      {
        content: "Button 1",
        href: "*",
        handleClick: () => {
          console.log("Button 1 Click");
        },
      },
      {
        content: "Button 2",
        href: "*",
        handleClick: () => {
          console.log("Button 2 Click");
        },
      },
      {
        content: "Button 3",
        href: "*",
        handleClick: () => {
          console.log("Button 3 Click");
        },
      },
      {
        content: "Button 4",
        href: "*",
        handleClick: () => {
          console.log("Button 4 Click");
        },
      },
    ],
  },
};
