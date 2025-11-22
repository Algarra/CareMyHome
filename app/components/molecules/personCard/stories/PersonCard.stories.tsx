import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { PersonCard } from "../PersonCard";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PersonCard> = {
  title: "Molecules/PersonCard",
  component: PersonCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Sandbox: StoryObj = {
  render: (controls: Args) => {
    return (
      <PersonCard
        image={controls.image}
        name={controls.name}
        title={controls.title}
        description={controls.description}
        facebookLink={controls.facebookLink}
        xLink={controls.xLink}
        githubLink={controls.githubLink}
        linkedInLink={controls.linkedInLink}
      />
    );
  },
  argTypes: {
    name: {
      control: "text",
    },
    title: {
      control: "text",
    },
    description: {
      control: "text",
    },
    facebookLink: {
      control: "text",
    },
    xLink: {
      control: "text",
    },
    githubLink: {
      control: "text",
    },
    linkedInLink: {
      control: "text",
    },
    image: {
      control: "text",
    },
  },
  args: {
    name: "Lana Byrd",
    title: "Marketing & Sale",
    description:
      "Lana drives the technical strategy of the flowbite platform and brand.",
    facebookLink: "#",
    xLink: "#",
    githubLink: "#",
    linkedInLink: "#",
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
};
