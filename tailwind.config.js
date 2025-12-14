/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Gov.br Primary
        "gov-blue": {
          DEFAULT: "#1351B4",
          dark: "#0C326F",
          light: "#155BCB",
          50: "#E2E8F0",
          100: "#D4E5FF",
        },
        // UFMA
        "ufma-blue": "#0747A6",
        "ufma-green": "#2ECC71",
        // Feedback
        "feedback-success": "#168821",
        "feedback-warning": "#FFCD07",
        "feedback-error": "#E52207",
        "feedback-info": "#155BCB",
      },
      fontFamily: {
        sans: ["Open Sans", "Rawline", "system-ui", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
      fontSize: {
        "scale-01": "0.75rem", // 12px
        "scale-02": "0.875rem", // 14px (base)
        "scale-03": "1rem", // 16px
        "scale-04": "1.125rem", // 18px
        "scale-05": "1.5rem", // 24px
        "scale-06": "2rem", // 32px
        "scale-07": "2.5rem", // 40px
      },
      boxShadow: {
        "gov-sm": "0 1px 2px rgba(0, 0, 0, 0.05)",
        "gov-md": "0 4px 8px rgba(0, 0, 0, 0.08)",
        "gov-lg": "0 8px 16px rgba(0, 0, 0, 0.12)",
        "gov-xl": "0 16px 32px rgba(0, 0, 0, 0.16)",
        "focus-blue": "0 0 0 4px rgba(19, 81, 180, 0.25)",
        "focus-error": "0 0 0 4px rgba(229, 34, 7, 0.25)",
      },
      borderRadius: {
        gov: "8px",
        "gov-lg": "12px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
