import defaultTheme from "tailwindcss/defaultTheme";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Urbanist", ...defaultTheme.fontFamily.sans],
        serif: ["Urbanist", ...defaultTheme.fontFamily.sans], // override serif to use Urbanist
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "h1 + *": {
              marginTop: "0rem",
            },
            "h2 + *": {
              marginTop: "0rem",
            },
            "h3 + *": {
              marginTop: "0rem",
            },
            "ul + *": {
              marginTop: "0rem",
            },
            "ol + *": {
              marginTop: "0rem",
            },
            p: { color: "rgb(55, 65, 81)" },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
