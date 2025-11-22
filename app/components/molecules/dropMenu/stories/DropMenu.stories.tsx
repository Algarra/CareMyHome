import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { DropMenu } from "../DropMenu";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof DropMenu> = {
  title: "Molecules/DropMenu",
  component: DropMenu,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen", // or `padded` by default
  },
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Sandbox: StoryObj = {
  render: (controls: Args) => {
    return (
      <div className=" flex h-72 w-96 ">
        <DropMenu
          open={controls.open}
          links={[
            { link: "#", text: "About Us" },
            { link: "#", text: "Library" },
            { link: "#", text: "Resources" },
            { link: "#", text: "Pro Version" },
            { link: "#", text: "Blog" },
            { link: "#", text: "Newsletter" },
            { link: "#", text: "Playground" },
            { link: "#", text: "License" },
            { link: "#", text: "Contact Us" },
            { link: "#", text: "Support Center" },
            { link: "#", text: "Terms" },
          ]}
        />
      </div>
    );
  },
  argTypes: {
    links: {
      control: "none",
    },
    open: {
      control: "boolean",
    },
  },
  args: {
    open: true,
  },
};
