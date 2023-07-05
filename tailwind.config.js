import { mauve, violet, red, blackA } from "@radix-ui/colors";
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
export const content = ["./src/**/*.tsx"];
export const theme = {
  // data: {
  //   checked1: "background: #015f43",
  //   checked2: "background: #aa2834"
  // },
  extend: {
    colors: {
      ...mauve,
      ...violet,
      ...red,
      ...blackA,

      gengar: "#5d5984",
      amarelo: "#dfa500",
      redOpacity: "#E6D4D7",
      greenOpacity: "#D0DFD7",
      blueLight: "#6933ff",

      greenDark: "#015F43",
      green: "#00875F",
      greenLight: "#00B37E",
      red: "#AA2834",
      redLight: "#F75A68",

      background: "#202024",
      shape: "#29292E",
      shape2: "#323238",
      place: "#7C7C8A",
      place2: "#121214",

      titles: "#E1E1E6",
      textBody: "#C4C4CC",
      white: "#FFFFFF",

      roxo: "#6610f2",
      roxo2: "#6f42c1",

      transparent: "transparent",

      black: "#000",

      gray: {
        900: "#121214",
        800: "#202024",
        400: "#7c7c8a",
        200: "#c4c4cc",
        100: "#e1e1e6",
      },

      cyan: {
        500: "#81d8f7",
        300: "#9BE1FB",
      },
    },
    fontFamily: {
      display: ["Poppins, sans-serif"],
    },
    spacing: {
      leo: ["0, 0.5rem"],
    },
    fontSize: {
      xs: 14,
      sm: 16,
      md: 18,
      lg: 20,
      xl: 24,
      "2xl": 32,
    },
    keyframes: {
      gengar: {
        "0%": { transform: "scale(0.95)" },
        "70%": { transform: "scale(1)" },
        "100%": { transform: "scale(0.95)" },
      },
      overlayShow: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      contentShow: {
        from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
        to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
      },
    },
    animation: {
      gengar: "gengar 2s infinite",
      overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
    },
    dropShadow: {
      rsrs: "0 0 1em rgb(36, 15, 70)",
    },
  },
};
export const plugins = [];
