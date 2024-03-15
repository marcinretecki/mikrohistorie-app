export const theme = {
  colors: {
    teal: "#6bdffe",
    pink: "#ff80d4",
    bg: "#110e16",
    text: "#dddaf3",
    bg2: "#0c0a10",
    text80: "rgba(221, 218, 243, 0.80)",
    text60: "rgba(221, 218, 243, 0.60)",
    bg3: "#18141f",
    bg350: "rgba(24, 20, 31, 0.50)",
    bgBlue: "#1c1f3b",
    black60: "rgba(0, 0, 0, 0.60)",
    pressedLayer: "rgba(38, 0, 102, 0.10)",
    green: "#6bfec9",
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
