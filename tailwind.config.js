/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--lux-bg-alt)",
        surface: "var(--lux-bg)",
        panel: "var(--lux-panel-strong)",
        accent: {
          50: "#faf6ee",
          100: "#f0e6cc",
          200: "#e2cfa0",
          300: "#d4b878",
          400: "#C8A96B",
          500: "#b8944f",
          600: "#9A7D4A",
          700: "#7a6038",
          800: "#5c4828",
          900: "#3d2f1a"
        }
      },
      boxShadow: {
        glow: "0 20px 80px rgba(200, 169, 107, 0.16)",
        panel: "0 24px 60px rgba(0, 0, 0, 0.36)"
      },
      backgroundImage: {
        "hero-grid":
          "rgba(200, 169, 107, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(200, 169, 107, 0.07) 1px, transparent 1px)"
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["Manrope", "sans-serif"]
      },
      animation: {
        "pulse-soft": "pulseSoft 4.5s ease-in-out infinite"
      },
      keyframes: {
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.08)", opacity: "1" }
        }
      }
    }
  },
  plugins: []
};
