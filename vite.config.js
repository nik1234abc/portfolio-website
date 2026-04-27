import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/",
  server: {
    host: true
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-ui": ["lucide-react", "react-helmet-async"],
          "data-java": [
            "./src/data/portfolio.js",
            "./src/data/springBootInterview.js",
            "./src/data/restApiInterview.js",
            "./src/data/kafkaInterview.js"
          ],
          "data-coding": ["./src/data/coding.js"],
          "data-quiz": ["./src/data/quizData.js"],
          "data-microservices": ["./src/data/microservicesInterview.js"]
        }
      }
    }
  }
});
