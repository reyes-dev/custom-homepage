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
                "plain": "url('https://images.pexels.com/photos/932261/pexels-photo-932261.jpeg')",
            },
            colors: {
                angel: "#fdfdff",
                angel_area_title: "#fec34b",
                angelhover: "#ef476f",
                angeltitle: "#b56576",
                plainish: "#353535",
                plain_area_title: "#91664C",
                boringhover: "#eb5e28",
                boringtitle: "#D5BDAF",
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
