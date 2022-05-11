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
        gray60: "#7A7A7A",
        gray80: "#404040",
      },
      boxShadow: {
        search: "0px 5px 20px rgba(96, 100, 112, 0.1);",
        modalPopUp: "0px 1px 10px rgba(0, 0, 0, 0.15);",
        currentLocation: "0px 0px 4px rgba(0, 0, 0, 0.25);",
      },
      keyframes: {
        modalPopUp: {
          "0%": { opacity: 0, transform: "translateY(100%)" },
          "100%": { opacity: 1, transform: "translateY(0%)" },
        },
        modalPopDown: {
          "0%": { opacity: 1, transform: "translateY(0%)" },
          "100%": { opacity: 0, transform: "translateY(100%)" },
        },
      },
      animation: {
        modalPopUp: "modalPopUp 1s ease-in-out",
        modalPopDown: "modalPopDown 1s ease-out",
      },
    },
  },
  plugins: [],
};
