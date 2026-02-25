import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["Bebas Neue", "cursive"],
        montserrat: ["Montserrat", "sans-serif"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
      },
      colors: {
        dark: {
          DEFAULT: "#0a0a0a",
          100: "#1a1a1a",
          200: "#2a2a2a",
          300: "#3a3a3a",
        },
        orange: {
          DEFAULT: "#ff4500",
          light: "#ff6a33",
          dark: "#cc3700",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-orange": "linear-gradient(135deg, #ff4500 0%, #ff6a33 100%)",
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        "marquee-left": "marqueeLeft 15s linear infinite",
        "marquee-right": "marqueeRight 18s linear infinite",
        "ninja-star": "ninjaStar 4s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px #ff4500, 0 0 10px #ff4500" },
          "100%": {
            boxShadow: "0 0 10px #ff4500, 0 0 20px #ff4500, 0 0 30px #ff4500",
          },
        },
        marqueeLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        ninjaStar: {
          "0%": { 
            transform: "rotate(0deg) scale(1)",
            opacity: "0.8"
          },
          "25%": { 
            transform: "rotate(90deg) scale(1.2)",
            opacity: "1"
          },
          "50%": { 
            transform: "rotate(180deg) scale(1)",
            opacity: "0.8"
          },
          "75%": { 
            transform: "rotate(270deg) scale(1.2)",
            opacity: "1"
          },
          "100%": { 
            transform: "rotate(360deg) scale(1)",
            opacity: "0.8"
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
