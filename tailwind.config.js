const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./public/*.html",
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*.js",
    "./app/views/**/*.html.erb",
    "./app/views/**/*.{erb,haml,html,slim,jsx}",
    "./app/javascript/components/*.jsx",
    "./app/assets/stylesheets/**/*.css",
    "./app/assets/builds/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        daruma: ["Darumadrop One", ...defaultTheme.fontFamily.sans],
        jura: ["Jura", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "angel-devil": "url('https://i.redd.it/wf3ehgf679ca1.png')",
      },
      colors: {
        angel: "#fdfdff",
        "area-title": "#fec34b",
        okaeri: "#b56576",
        funhover: "#ef476f",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
};
