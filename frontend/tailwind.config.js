/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "400px": "400px",
      },
      colors: {
        "primary-black": "#222831",
        "secondary-black": "#31363F",
        third: "#76ABAE",
        primarybg: "#EEEEEE",
        greenColor: "	#50C878", // Added custom green color
        redColor: "#ff0000",
        yellowColor: "#0000FF",
      },
    },
  },
  plugins: [],
};
