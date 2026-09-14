import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        indigo: {
          950: "#172554",
        },
      },
      boxShadow: {
        soft: "0 18px 50px -28px rgba(30, 41, 59, 0.28)",
      },
      animation: {
        "fade-up": "fadeUp .45s ease-out both",
        "success-pop": "successPop .3s ease-out both",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        successPop: {
          from: { opacity: "0", transform: "scale(.85)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
