import defaultTheme from "tailwindcss/defaultTheme";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Urbanist", ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "h1 + *": {
              marginTop: "0",
            },
            "ul + *": {
              marginTop: "0",
            },
            "ol + *": {
              marginTop: "0",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
