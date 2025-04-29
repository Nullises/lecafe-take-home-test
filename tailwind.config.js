/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./presentation/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "quicksand-bold": ["Quicksand-Bold", "sans-serif"],
        "mavenpro-regular": ["MavenPro-Regular", "sans-serif"],
        "mavenpro-bold": ["MavenPro-Bold", "sans-serif"],
      },
      colors: {
        textblack: "#333333",
        textwhite: "#FFFFFF",
        textgray: "#727272",
        textpink: "#FF58A4",
        buttonfucshia: "#FF6B86",
        buttonlightpink: "#D0BFBF",
        buttonstrongpink: "#FF58A4",
        buttonwhite: "#FFFFFF",
        buttonpink: "#FEB5DB",
        drawerpink: "#FFB1C7",
        blueGradient: "#7086E3",
        purpleGradient: "#9072E5",
        pinkGradient: "#FF6B86",
        orangeGradient: "#FFB03A",
        strongpinkGradient: "#FF58A4",
        blue: {
          50: "#7086E3",
        },
        purple: {
          50: "#9072E5",
        },
      },
      fontSize: {
        xxl: [
          "77px",
          {
            fontWeight: "700",
          },
        ],
        xl: [
          "39px",
          {
            fontWeight: "700",
            lineHeight: "33px",
          },
        ],
        lg: [
          "30px",
          {
            fontWeight: "700",
          },
        ],
        md: [
          "20px",
          {
            fontWeight: "700",
            lineHeight: "34px",
          },
        ],
        sm: [
          "14px",
          {
            fontWeight: "400",
            lineHeight: "16px",
          },
        ],
        smbold: [
          "14px",
          {
            fontWeight: "700",
            lineHeight: "19px",
          },
        ],
        xs: [
          "12px",
          {
            fontWeight: "700",
            lineHeight: "24px",
          },
        ],
      },
    },
  },
  plugins: [],
};
