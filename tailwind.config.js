// tailwind.config.js
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        text: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        primary: colors.indigo["500"],
        error: colors.red["500"],
        gray: {
          925: "#07091B",
          950: "#010315",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
