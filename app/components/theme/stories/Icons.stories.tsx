import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import * as Icons from "../icons/indexSB";
import { Colors } from "../colors";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Icons.BedIcon> = {
  title: "Theme/Icons",
  component: Icons.BedIcon,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Sandbox: StoryObj = {
  render: (controls: Args) => {
    // @ts-expect-error
    const iconsList = Object.keys(Icons).map((key) => Icons[key]);

    return (
      <div className=" flex gap-3 flex-wrap text-sky-500">
        {iconsList.map((IconComp, index) => (
          <IconComp
            key={index}
            size={controls.size}
            // @ts-expect-error
            color={Colors[controls.color]}
          />
        ))}
      </div>
    );
  },
  argTypes: {
    color: { control: "select", options: Object.keys(Colors) },
  },
  args: {
    size: 5,
    color: Colors.BLUE,
  },
};
