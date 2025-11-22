import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { PeopleGrid } from "../PeopleGrid";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PeopleGrid> = {
  title: "Organisms/PeopleGrid",
  component: PeopleGrid,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen", // or `padded` by default
  },
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Sandbox: StoryObj = {
  render: (controls: Args) => {
    return (
      <PeopleGrid
        title={controls.title}
        description={controls.description}
        peopleList={controls.peopleList}
      />
    );
  },
  argTypes: {
    title: {
      control: "text",
    },
    description: {
      control: "text",
    },
  },
  args: {
    title: "Our Team",
    description:
      "Meet our exceptional development team: A talented group of innovators dedicated to crafting cutting-edge solutions and bringing your visions to life.",
    peopleList: [
      {
        image:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        name: "Daniel Algarra",
        title: "Javascript developer",
        description:
          "Bonnie drives the technical strategy of the flowbite platform and brand.",
        linkedInLink: "https://www.linkedin.com/in/daniel-algarra-navarro/",
      },
      {
        image:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        name: "Daniel Algarra",
        title: "Javascript developer",
        description:
          "Bonnie drives the technical strategy of the flowbite platform and brand.",
        linkedInLink: "https://www.linkedin.com/in/daniel-algarra-navarro/",
      },
      {
        image:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        name: "Daniel Algarra",
        title: "Javascript developer",
        description:
          "Bonnie drives the technical strategy of the flowbite platform and brand.",
        linkedInLink: "https://www.linkedin.com/in/daniel-algarra-navarro/",
      },
    ],
  },
};
