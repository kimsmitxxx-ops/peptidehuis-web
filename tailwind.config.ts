import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        paper: "var(--color-paper)",
        "paper-soft": "var(--color-paper-soft)",
        "paper-ink": "var(--color-paper-ink)",
        "paper-ink-muted": "var(--color-paper-ink-muted)",
        "paper-border": "var(--color-paper-border)",
        primary: {
          DEFAULT: "var(--color-primary)",
          soft: "var(--color-primary-soft)",
          muted: "var(--color-primary-muted)",
          foreground: "var(--color-primary-foreground)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          soft: "var(--color-accent-soft)",
          muted: "var(--color-accent-muted)",
          foreground: "var(--color-accent-foreground)",
        },
        text: {
          DEFAULT: "var(--color-text)",
          muted: "var(--color-text-muted)",
          subtle: "var(--color-text-subtle)",
        },
        foreground: "var(--color-foreground)",
        border: "var(--color-border)",
        "border-strong": "var(--color-border-strong)",
        success: { DEFAULT: "var(--color-success)", soft: "var(--color-success-soft)" },
        danger: { DEFAULT: "var(--color-danger)", soft: "var(--color-danger-soft)" },
        warning: { DEFAULT: "var(--color-warning, #C97D2B)" },
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
