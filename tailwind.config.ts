import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        dicey: {
          dark: "#0f0a1a",
          darker: "#09061a",
          card: "#1a0f2e",
          border: "#2d1a4d",
          accent: "#ffffff",
          "accent-hover": "#e5e5e5",
          gold: "#ffffff",
          green: "#a855f7",
        },
      },
      keyframes: {
        "drop-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(-80px) scale(0.9)",
          },
          "40%": {
            opacity: "1",
            transform: "translateY(12px) scale(1.03)",
          },
          "55%": {
            transform: "translateY(-8px) scale(0.98)",
          },
          "70%": {
            transform: "translateY(5px) scale(1.01)",
          },
          "85%": {
            transform: "translateY(-2px) scale(1)",
          },
          "100%": {
            transform: "translateY(0) scale(1)",
          },
        },
        "slide-in-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(-50px) scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0) scale(1)",
          },
        },
        "nudge-right": {
          "0%": {
            transform: "translateX(0)",
          },
          "50%": {
            transform: "translateX(6px)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        "drop-in": "drop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "slide-in-left": "slide-in-left 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "nudge-right": "nudge-right 0.25s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
