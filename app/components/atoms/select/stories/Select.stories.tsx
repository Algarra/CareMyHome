/* eslint-disable react-hooks/rules-of-hooks */
import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { useArgs } from "@storybook/store";
import { Select } from "../Select";
import { canadaCities } from "../../../../utils/canadaCities";
import { ButtonSizes, buttonColorsClasses } from "../../buttons/button";
import { Colors } from "../../../theme/colors";
import { tshirtSizes } from "../../../theme/tshirtSizes";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Select> = {
  title: "Atoms/Select",
  component: Select,
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

    if (controls.multipleSelection && !Array.isArray(controls.selected)) {
      setArgs({ value: [] });
    } else {
      if (!controls.multipleSelection && Array.isArray(controls.selected))
        setArgs({ value: "" });
    }
    return (
      <div style={{ height: "300px" }}>
        <Select
          options={controls.options}
          label={controls.label}
          value={controls.value}
          handleOnChange={(select) => {
            setArgs({ value: select });
          }}
          placeholder={controls.placeholder}
          multipleSelection={controls.multipleSelection}
          button={{
            buttonClasses: controls.buttonClasses,
            color: controls.buttonColor,
            size: controls.buttonSize,
          }}
        />
      </div>
    );
  },
  argTypes: {
    multipleSelection: {
      control: "boolean",
    },
    buttonColor: {
      control: "select",
      options: Object.keys(buttonColorsClasses),
    },
    buttonSize: {
      control: "select",
      options: Object.keys(ButtonSizes),
    },
  },
  args: {
    options: canadaCities
      .slice(0, 10)
      .map((CC) => ({ label: CC.city, key: CC.id })),
    placeholder: "Select a city",
    value: "",
    label: "LABEL",
    multipleSelection: false,
    buttonClasses: "",
    buttonColor: Colors.BLUE,
    buttonSize: tshirtSizes.BASE,
  },
};
