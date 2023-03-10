/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "Roboto-Mono": ["Roboto Mono"],
      },
      colors: {
        // Black
        "black-900": "#0d0d0f",
        "black-600": "#17161b",
        "black-500": "#1a171e",
        "black-400": "#898b91",
        // Red
        "my-red": "#eb1c24",
      },
      scale: {
        "-100": "-1",
      },
    },

    screens: {
      sm: "480px",

      md: "768px",

      lg: "1024px",
    },
  },
  plugins: [],
};
