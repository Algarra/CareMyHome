/* eslint-disable react-hooks/rules-of-hooks */
import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { Modal } from "../Modal";
import { useArgs } from "@storybook/store";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Modal> = {
  title: "Atoms/Modal",
  component: Modal,
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
      <div className=" w-96">
        <Modal
          open={controls.open}
          setOpen={(value) => {
            setArgs({ open: value });
          }}
        >
          content
        </Modal>
      </div>
    );
  },
  argTypes: {},
  args: {
    open: true,
  },
};
