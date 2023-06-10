/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // extend: {
    //   backgroundImage: {
    //     "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
    //     "gradient-conic":
    //       "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    //   },
    // },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#083160",

          secondary: "#20ad5d",

          accent: "#677adb",

          neutral: "#262d40",

          "base-100": "#ffffff",

          info: "#75b4ea",

          success: "#199a6f",

          warning: "#d8ad03",

          error: "#fb6592",
        },
      },
    ],
  },
  // plugins: [],
  plugins: [require("daisyui")],
};
