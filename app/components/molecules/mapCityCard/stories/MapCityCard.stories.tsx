import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { MapCityCard } from "../MapCityCard";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof MapCityCard> = {
  title: "Molecules/MapCityCard",
  component: MapCityCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Sandbox: StoryObj = {
  render: (controls: Args) => {
    return (
      <MapCityCard
        actualLoacale="en"
        costOfliving={controls.costOfliving}
        rentCostForNomads1bed={controls.rentCostForNomads1bed}
        rentCostForNomads2bed={controls.rentCostForNomads2bed}
        rentCostForNomads3bed={controls.rentCostForNomads3bed}
        groceries={controls.groceries}
        normalRestaurantPrice={controls.normalRestaurantPrice}
        cityPath={""}
      />
    );
  },
  argTypes: {},
  args: {
    costOfliving: 10,
    rentCostForNomads1bed: 10,
    rentCostForNomads2bed: 10,
    rentCostForNomads3bed: 10,
    groceries: 10,
    normalRestaurantPrice: 10,
  },
};
