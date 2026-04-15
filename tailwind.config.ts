import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black:        "var(--black)",
        surface:      "var(--surface)",
        card:         "var(--card)",
        "card-hover": "var(--card-hover)",
        border:       "var(--border)",
        orange:       "var(--orange)",
        amber:        "var(--amber)",
        white:        "var(--white)",
        muted:        "var(--muted)",
        text:         "var(--text)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans:    ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
