import type { Preview } from "@storybook/nextjs";

import "../app/globals.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "Colors",
      values: [
        {
          name: "Colors",
          value: `linear-gradient(336deg, #9747bc, #284741)`,
        },
        {
          name: "Colors2",
          value: `linear-gradient(344deg, #13a83c, #e671c5)`,
        },
        {
          name: "Solid",
          value: `#282C35`,
        },
      ],
    },
    layout: "centered",
  },
  tags: ["autodocs"],

  decorators: [
    // withThemeByClassName({
    //   themes: {
    //     light: "light",
    //     dark: "dark",
    //   },
    //   defaultTheme: "light",
    // }),
  ],
};
export default preview;
