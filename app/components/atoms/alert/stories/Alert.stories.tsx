import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { Alert } from "../Alert";
import { alertColorsClasses } from "../utils";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Alert> = {
  title: "Atoms/Alert",
  component: Alert,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Sandbox: StoryObj = {
  render: (controls: Args) => {
    return (
      <Alert
        color={controls.color}
        handleAlertClose={() => {
          console.log("Close clicked");
        }}
      >
        {controls.children}
      </Alert>
    );
  },
  argTypes: {
    children: {
      control: "text",
    },
    color: {
      control: "select",
      options: Object.keys(alertColorsClasses),
    },
    handleAlertClose: {
      control: "none",
    },
  },
  args: {
    children: "This is an Alert message.",
    color: "violet",
  },
};
