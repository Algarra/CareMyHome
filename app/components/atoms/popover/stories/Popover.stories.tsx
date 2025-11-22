import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { Popover } from "../Popover";
import { Badge } from "../../badge";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Popover> = {
  title: "Atoms/Popover",
  component: Popover,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Sandbox: StoryObj = {
  render: (controls: Args) => {
    return (
      <Popover popoverContent={controls.popoverContent}>
        {controls.children}
      </Popover>
    );
  },
  argTypes: {},
  args: {
    children: <Badge>Test the popover</Badge>,
    popoverContent: (
      <p className="w-64">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime nostrum
        facere consequuntur, architecto quis veritatis, nemo exercitationem
        earum quos beatae fugit ab nesciunt possimus, minima totam quasi enim
        iste cumque?
      </p>
    ),
  },
};
