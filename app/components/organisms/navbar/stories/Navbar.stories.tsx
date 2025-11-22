import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { Navbar } from "../Navbar";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Navbar> = {
  title: "Organisms/Navbar",
  component: Navbar,
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
      <div
        className={`${controls.scrollCheck ? "h-[300em]" : "h-screen"}
         flex w-full `}
      >
        <div className="mb-auto w-full">
          <Navbar actualLocale="en" />
        </div>
      </div>
    );
  },
  argTypes: {},
  args: {},
};
