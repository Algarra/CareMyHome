import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { Blockquote } from "../Blockquote";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Blockquote> = {
  title: "Atoms/Blockquote",
  component: Blockquote,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Sandbox: StoryObj = {
  render: (controls: Args) => {
    return <Blockquote>{controls.children}</Blockquote>;
  },
  argTypes: {
    children: {
      control: "text",
    },
  },
  args: {
    children:
      '"A blockquote is a typographic element used in written or digital content to visually set apart and highlight a quotation or excerpt from another source. It is often used to indicate that the enclosed text is a direct quotation from someone or something else. Blockquotes are typically formatted by indenting the text from both the left and right margins or by using distinctive formatting (such as different font styles or background shading) to make the quoted text stand out. They help readers easily recognize and distinguish quoted material within a larger body of text."',
  },
};
