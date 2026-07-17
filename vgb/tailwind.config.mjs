/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        vgb: {
          navy: "#000428",
          blue: "#004e92",
          gold: "#ffd700",
        },
      },
    },
  },
  plugins: [],
};

export default config;
