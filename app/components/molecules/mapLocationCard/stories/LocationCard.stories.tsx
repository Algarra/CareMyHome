import type { Args, Meta, StoryObj } from "@storybook/nextjs";
import { MapLocationCard } from "../MapLocationCard";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof MapLocationCard> = {
  title: "Molecules/MapLocationCard",
  component: MapLocationCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Sandbox: StoryObj = {
  render: (controls: Args) => {
    return (
      <MapLocationCard
        actualLoacale="en"
        title={controls.title}
        imageList={controls.imageList}
        path={controls.path}
      />
    );
  },
  argTypes: {},
  args: {
    title: "Amaizing Room near the sea",
    imageList: [
      {
        alt: "image1",
        src: "https://firebasestorage.googleapis.com/v0/b/rooms-app-f32cb.appspot.com/o/storybookImages%2Fimage1.webp?alt=media&token=69af8322-1772-4f32-8fba-397f077000e3",
        title: "image1",
        encoded: "LD6[5R_3t7WB~q?bt7WB?b-;ofWB",
      },
      {
        alt: "image2",
        src: "https://firebasestorage.googleapis.com/v0/b/rooms-app-f32cb.appspot.com/o/storybookImages%2Fimage2.webp?alt=media&token=fbe1cbb6-146a-41aa-ade6-c2b97407f787",
        title: "image2",
        encoded: "LB6*dd?bD*4.~p-;E19G-;xuM{IU",
      },
      {
        alt: "image3",
        src: "https://firebasestorage.googleapis.com/v0/b/rooms-app-f32cb.appspot.com/o/storybookImages%2Fimage3.webp?alt=media&token=7dbf01b0-b578-4477-8f43-75dda767b162",
        title: "image3",
        encoded: "LD6t{_?bWBIA~q?bWBIU_3?bWBIU",
      },
      {
        alt: "image4",
        src: "https://firebasestorage.googleapis.com/v0/b/rooms-app-f32cb.appspot.com/o/storybookImages%2Fimage4.webp?alt=media&token=1f107097-aad7-4f70-9ad2-f29ace4847e3",
        title: "image4",
        encoded: "LG7UM5?vozM{~q?boyM{_3?bofM{",
      },
    ],
    path: "*",
  },
};
