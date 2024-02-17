/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        purple: {
          DEFAULT: "#9747FF",
        },
      },
    },
    screens: {
      scr400: "400px",
      scr500: "500px",
      scr600: "600px",
      scr700: "700px",
      scr800: "800px",
      scr900: "900px",
      scr1000: "1000px",
      scr1100: "1100px",
      scr1200: "1200px",
      scr1250: "1250px",
    },
  },
  plugins: [],
};
