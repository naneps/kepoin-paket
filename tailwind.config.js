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
          primary: "#433cc4",

          secondary: "#0871e0",

          accent: "#14ad00",

          neutral: "#272b35",

          "base-100": "#f8f9fc",

          info: "#4da4c7",

          success: "#1fdb7a",

          warning: "#ec8313",

          error: "#e04262",
        },
      },
    ],
  },
  // plugins: [],
  plugins: [require("daisyui")],
};
