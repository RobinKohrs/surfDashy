/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    screens: {
      // tablet: "640px",
      // => @media (min-width: 640px) { ... }

      dt: "640px",
      // => @media (min-width: 1024px) { ... }

      // desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },

  plugins: [],
};

module.exports = config;
