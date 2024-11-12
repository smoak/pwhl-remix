/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "kofi-wiggle": "kofi-wiggle 3s infinite",
      },
      colors: {
        "pwhl-purple": {
          50: "#33058d",
        },
        blue: {
          1000: "#5963b3",
        },
        red: {
          750: "#AF1E2D",
        },
      },
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fill, minmax(320px, 1fr))",
      },
      keyframes: {
        "kofi-wiggle": {
          "0%": { transform: "rotate(0) scale(1)" },
          "60%": { transform: "rotate(0) scale(1)" },
          "75%": { transform: "rotate(0) scale(1.12)" },
          "80%": { transform: "rotate(0) scale(1.1)" },
          "84%": { transform: "rotate(-10deg) scale(1.1)" },
          "88%": { transform: "rotate(10deg) scale(1.1)" },
          "92%": { transform: "rotate(-10deg) scale(1.1)" },
          "100%": { transform: "rotate(0) scale(1)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-react-aria-components")],
};
