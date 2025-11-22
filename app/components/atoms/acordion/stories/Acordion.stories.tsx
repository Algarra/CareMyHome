import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { Acordion } from "../Acordion";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Acordion> = {
  title: "Atoms/Acordion",
  component: Acordion,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Sandbox: StoryObj = {
  render: (controls: Args) => {
    return (
      <div className=" w-80">
        <Acordion title={controls.title} defaultOpen={controls.defaultOpen}>
          <h3>{controls.children}</h3>
        </Acordion>
      </div>
    );
  },
  argTypes: {},
  args: {
    children: "This is an Alert message.",
    title: "Title",
    defaultOpen: false,
  },
};
