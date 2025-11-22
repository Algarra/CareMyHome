import type { Meta, StoryObj } from "@storybook/nextjs";
import { Footer } from "../Footer";
import { localizedT } from "../../../../utils";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Footer> = {
  title: "Organisms/Footer",
  component: Footer,
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
      <div className="w-full h-screen flex ">
        <div className="mt-auto w-full">
          <Footer t={localizedT("en")} />
        </div>
      </div>
    );
  },
  argTypes: {},
  args: {},
};
