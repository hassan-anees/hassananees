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
            // Better list spacing controls
            "ul > li": {
              marginTop: "0.25rem", // Adjust this value
              marginBottom: "0.25rem",
            },
            "ol > li": {
              marginTop: "0.25rem", // Adjust this value
              marginBottom: "0.25rem",
            },
            "li > p": {
              marginTop: "0rem",
              marginBottom: "0rem",
            },
            ul: {
              marginTop: "0.5rem", // Space before the list
              marginBottom: "0.5rem", // Space after the list
            },
            ol: {
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            },
            p: { color: "rgb(55, 65, 81)" },
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:last-of-type::after": { content: "none" },
            blockquote: { fontWeight: "normal" },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
