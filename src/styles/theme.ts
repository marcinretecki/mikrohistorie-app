export const theme = {
  colors: {
    // primary
    teal: "#6bdffe",
    tealPressed: "#64C9EF",

    // text
    text: "#E3E0F5",
    text80: "rgba(227, 224, 245, 0.80)",
    text60: "rgba(227, 224, 245, 0.60)",

    // accents
    pink: "#ff80d4",
    green: "#6bfec9",

    // background
    bg: "#110e16",
    bg2: "#0c0a10",
    bg3: "#18141f",
    bg350: "rgba(24, 20, 31, 0.50)",
    bgBlue: "#1c1f3b",
    bgBluePressed: "#363A63",

    black60: "rgba(0, 0, 0, 0.60)",
    overlayBG: "rgba(9, 5, 15, 0.8)",
  },
  shadows: {
    textShadowTealBig: {
      textShadowColor: "#0084AD",
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 16,
    },
    textShadowTealMedium: {
      textShadowColor: "#008BB8",
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 12,
    },
    viewShadowTeal: {
      color: "rgba(0, 84, 111, 0.40)",
      blur: 16,
    },
    viewShadowTealMedium: {
      color: "#008BB8",
      blur: 12,
    },
    viewShadowDark: {
      color: "rgba(0, 0, 0, 0.60)",
    },
  },
};

export type ThemeColors = keyof typeof theme.colors;
