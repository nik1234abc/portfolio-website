/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0D1117",
        surface: "#13181F",
        panel: "#171D25",
        accent: {
          50: "#f7f1e5",
          100: "#eadcc2",
          200: "#d9c19a",
          300: "#c9a66f",
          400: "#b08d57",
          500: "#9d7a49",
          600: "#87653d",
          700: "#6f5234",
          800: "#56402b",
          900: "#403020"
        }
      },
      boxShadow: {
        glow: "0 20px 80px rgba(176, 141, 87, 0.18)",
        panel: "0 24px 60px rgba(0, 0, 0, 0.28)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(176, 141, 87, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(176, 141, 87, 0.08) 1px, transparent 1px)"
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
