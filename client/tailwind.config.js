/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",
        primaryHover: "#6D28D9",
        accent: "#A855F7",
        bg: "#09090B",
        surface: "#18181B",
        surface2: "#27272A",
        border: "#3F3F46",
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
        textPrimary: "#FAFAFA",
        textSecondary: "#A1A1AA",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        btn: "12px",
        card: "20px",
        modal: "24px",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.2)",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};
