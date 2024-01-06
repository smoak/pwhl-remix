module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
        "auto-fill": "repeat(auto-fill, minmax(300px, 1fr))",
      },
    },
  },
};
