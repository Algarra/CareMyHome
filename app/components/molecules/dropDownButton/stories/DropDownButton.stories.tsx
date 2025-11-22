import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { DropDownButton } from "../DropDownButton";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof DropDownButton> = {
  title: "Molecules/DropDownButton",
  component: DropDownButton,
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
      <div className="h-96 w-96">
        <DropDownButton
          text={controls.text}
          links={controls.links}
          handleOnClick={(e) => {
            e.stopPropagation();
            console.log("clicked");
          }}
        />
      </div>
    );
  },
  argTypes: {
    text: {
      control: "text",
    },
    handleAlertClose: {
      control: "none",
    },
    links: {
      control: "none",
    },
  },
  args: {
    text: "Drop down button",
    links: [
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
    ],
  },
};
