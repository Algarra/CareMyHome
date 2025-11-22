/* eslint-disable react-hooks/rules-of-hooks */
import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { useArgs } from "@storybook/store";
import { PhoneInput } from "../PhoneInput";
import { inputColorsClasses } from "..";
import { Colors } from "../../../theme/colors";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PhoneInput> = {
  title: "Atoms/PhoneInput",
  component: PhoneInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Sandbox: StoryObj = {
  render: (controls: Args) => {
    const [, setArgs] = useArgs();
    return (
      <div style={{ width: "300px" }}>
        <PhoneInput
          color={controls.color}
          handleOnChange={(e) => {
            setArgs({ value: e.value });
          }}
          value={controls.value}
          placeholder={controls.placeholder}
          label={controls.label}
          disabled={controls.disabled}
          hasError={controls.hasError}
          type={controls.type}
        />
      </div>
    );
  },
  argTypes: {
    label: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    handleAlertClose: {
      control: "none",
    },
    color: {
      control: "select",
      options: Object.keys(inputColorsClasses),
    },
    disabled: {
      control: "boolean",
    },
    hasError: {
      control: "boolean",
    },
    value: {
      control: "text",
    },
  },
  args: {
    label: "LABEL",
    placeholder: "Placeholder",
    color: Colors.VIOLET,
    disabled: false,
    hasError: false,
    value: "value",
    type: "text",
  },
};
