module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
module.exports = {
  plugins: [
    require("@tailwindcss/postcss")({
      /* options */
    }),
    require("autoprefixer"),
  ],
};
