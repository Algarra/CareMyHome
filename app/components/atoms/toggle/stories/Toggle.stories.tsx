import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { Toggle } from "../Toggle";
import { useArgs } from "@storybook/store";
import { toggleColorsClasses } from "../utils";
import { Colors } from "../../../theme/colors";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Toggle> = {
  title: "Atoms/Toggle",
  component: Toggle,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Sandbox: StoryObj = {
  render: (controls: Args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [, setArgs] = useArgs();

    return (
      <Toggle
        checked={controls.checked}
        label={controls.label}
        color={controls.color}
        handleOnChange={(e) => {
          setArgs({ checked: e.target.checked });
        }}
      />
    );
  },
  argTypes: {
    active: {
      color: {
        control: "select",
        options: Object.keys(toggleColorsClasses),
      },
      control: "boolean",
    },
  },
  args: {
    checked: false,
    color: Colors.VIOLET,
    label: "Toggle",
  },
};
