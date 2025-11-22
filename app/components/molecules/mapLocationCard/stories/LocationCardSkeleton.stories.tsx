import type { Meta, StoryObj } from "@storybook/nextjs";
import { LoationCardSkeleton } from "../MapLocationCardSkeleton";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof LoationCardSkeleton> = {
  title: "Molecules/MapLocationCard",
  component: LoationCardSkeleton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Skeleton: StoryObj = {
  render: () => {
    return <LoationCardSkeleton />;
  },
  argTypes: {},
  args: {},
};
