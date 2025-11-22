import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { Dropdown } from "..";
import { Button } from "../../buttons/button";
import { DropdownPosition } from "../utils";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Dropdown> = {
  title: "Atoms/Dropdown",
  component: Dropdown,
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
      <Dropdown
        options={controls.options}
        extraButton={controls.extraButton}
        position={
          DropdownPosition[controls.position as keyof typeof DropdownPosition]
        }
      >
        <Button> ANY BUTTON </Button>
      </Dropdown>
    );
  },
  argTypes: {
    position: {
      control: "select",
      options: Object.keys(DropdownPosition),
    },
  },
  args: {
    options: [
      {
        label: "First label",
        onclick: () => {
          console.log("First label");
        },
      },
      {
        label: "Second label",
        onclick: () => {
          console.log("Second label");
        },
      },
      {
        label: "Third label",
        onclick: () => {
          console.log("Third label");
        },
      },
      {
        label: "Fourth label",
        onclick: () => {
          console.log("Fourth label");
        },
      },
    ],
    extraButton: {
      label: "Extra Button",
      onclick: () => {
        console.log("Extra Button");
      },
    },
    position: Object.keys(DropdownPosition)[0],
  },
};
