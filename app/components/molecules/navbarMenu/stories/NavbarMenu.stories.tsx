import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { NavbarMenu } from "../NavbarMenu";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof NavbarMenu> = {
  title: "Molecules/NavbarMenu",
  component: NavbarMenu,
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
      <div className={`w-full h-[20em] flex `}>
        <div className="mb-auto w-full">
          <NavbarMenu
            links={controls.links}
            highlighted="home"
            actualLocale="es"
          />
        </div>
      </div>
    );
  },
  argTypes: {},
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    links: [
      { link: "#", text: "Home" },
      {
        text: "Company",
        submenuLinks: [
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
      { link: "#", text: "Team" },
      { link: "#", text: "Contact" },
    ],
  },
};
