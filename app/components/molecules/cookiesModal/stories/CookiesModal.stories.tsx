import type { Meta, StoryObj } from "@storybook/nextjs";
import { CookieModal } from "../CookieModal";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CookieModal> = {
  title: "Molecules/CookieModal",
  component: CookieModal,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen", // or `padded` by default
  },
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Sandbox: StoryObj = {
  render: () => {
    return (
      <div className="h-96 w-full">
        <CookieModal />
      </div>
    );
  },
  argTypes: {},
  args: {},
};
