export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "dark-search-icon": "url('./assets/icons/darksearchicon.svg')",
        "light-search-icon": "url('./assets/icons/lightsearchicon.svg')",
        "radial-gradient":
          "linear-gradient(157deg, rgba(20,20,22,1) 35%, rgba(9,9,11,1) 100%)",
      },
    },
  },
  plugins: [],
};
