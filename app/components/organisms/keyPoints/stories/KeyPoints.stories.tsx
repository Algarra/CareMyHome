import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { KeyPoints } from "../KeyPoints";
import { MapPinIcon } from "../../../theme/icons/MapPin";
import { DollarIcon } from "../../../theme/icons/Dollar";
import { PlantIcon } from "../../../theme/icons/Plant";
import { PeopleIcon } from "../../../theme/icons/People";
import { FileLinesIcon } from "../../../theme/icons/FileLines";
import { EyeIcon } from "../../../theme/icons/Eye";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof KeyPoints> = {
  title: "Organisms/KeyPoints",
  component: KeyPoints,
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
      <KeyPoints
        title={controls.title}
        text={controls.text}
        keys={controls.keys}
      />
    );
  },
  argTypes: {},
  args: {
    title: "6 key point to find the perfect room",
    text: "Finding the perfect room to rent can be a crucial decision, as it directly impacts your comfort and lifestyle. Here are six key points to consider when searching for the ideal room to rent:",
    keys: [
      {
        icon: <MapPinIcon size={6} />,
        title: "Location",
        text: "Consider the location's proximity to your workplace, educational institution, or other essential places like grocery stores, hospitals, and public transportation. Think about the neighborhood's safety, atmosphere, and overall vibe.",
      },
      {
        icon: <DollarIcon size={6} />,
        title: "Budget",
        text: "Determine a realistic budget for rent, including utilities and any other associated costs. Ensure you have a clear understanding of what's included in the rent (e.g., utilities, internet, parking) and what's not. ",
      },
      {
        icon: <PlantIcon size={6} />,
        title: "Amenities and Facilities",
        text: "List the amenities and facilities you prioritize, such as laundry facilities, a well-equipped kitchen, parking, or a private bathroom. Check the condition and quality of these amenities during a visit.",
      },
      {
        icon: <PeopleIcon size={6} />,
        title: "Roommates and Compatibility",
        text: "If you'll have roommates, meet or communicate with them to ensure compatibility in terms of lifestyle, cleanliness, and house rules. Clarify expectations regarding chores, shared expenses, and personal space.",
      },
      {
        icon: <FileLinesIcon size={6} />,
        title: "Lease Terms and Agreement",
        text: "Carefully review the lease agreement, paying attention to terms, lease duration, security deposit, and any restrictions. Ensure you understand the rules regarding subletting, maintenance responsibilities, and notice periods for moving out.",
      },
      {
        icon: <EyeIcon size={6} />,
        title: "Inspection and Walkthrough",
        text: "Schedule a visit to inspect the room and the entire living space. Look for signs of wear and tear, pests, or maintenance issues that need addressing. Take photos during the walkthrough for reference.",
      },
    ],
  },
};
