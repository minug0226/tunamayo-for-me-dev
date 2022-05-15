module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        maple: ["MaplestoryOTFBold"],
      },
      colors: {
        tnBlue: "#70C3FF",
        tnDeepBlue: "#1DA0FF",
        tnBlueLight: "#B2DFFF",
        tnBlack: "#222222",
        tnRed: "#FF0000",
        tnRedLight: "#FF9999",
        gray20: "#D3D3D3",
        gray40: "#A7A7A7",
        gray60: "#7A7A7A",
        gray80: "#404040",
      },
      boxShadow: {
        search: "0px 1px 5px rgba(107, 107, 107, 0.1);",
        modalPopUp: "0px 1px 10px rgba(0, 0, 0, 0.15);",
        currentLocation: "0px 0px 4px rgba(0, 0, 0, 0.25);",
        navButton: "0px 1px 5px rgba(107, 107, 107, 0.1);",
      },
      keyframes: {
        onlyOpacity: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        overlayHide: {
          "0%": { opacity: 0.4 },
          "100%": { opacity: 0 },
        },
        drawPopUp: {
          "0%": { opacity: 0, transform: "translateX(-50%)" },
          "100%": { opacity: 1, transform: "translateX(0%)" },
        },
        drawPopDown: {
          "0%": { opacity: 1, transform: "translateX(0%)" },
          "100%": { opacity: 0, transform: "translateX(-50%)" },
        },
        modalPopUp: {
          "0%": { opacity: 0, transform: "translateY(100%)" },
          "100%": { opacity: 1, transform: "translateY(0%)" },
        },
        modalPopDown: {
          "0%": { opacity: 1, transform: "translateY(0%)" },
          "100%": { opacity: 0, transform: "translateY(100%)" },
        },
        dropdown: {
          "0%": {
            opacity: 1,
            transform: "scaleY(0%)",
          },
          "100%": { opacity: 1, transform: "scaleY(100%)" },
        },
      },
      animation: {
        drawPopUp: "drawPopUp 500ms ease-in-out",
        drawPopDown: "drawPopDown 500ms ease-in-out",
        modalPopUp: "modalPopUp 1s ease-in-out",
        modalPopDown: "modalPopDown 1s ease-out",
        dropdown: "dropdown 500ms ease-in-out",
        overlayHide: "overlayHide 500ms ease-in-out",
        onlyOpacity: "onlyOpacity 200ms ease-in-out",
      },
    },
  },
  plugins: [],
};
