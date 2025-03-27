
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        'space-grotesk': ["Space Grotesk", "sans-serif"],
        'dm-sans': ["DM Sans", "sans-serif"],
        'manrope': ["Manrope", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Updated color palette
        primary: {
          DEFAULT: "#1C2A39", // Deep Navy Blue
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#4FB3FF", // Sky Blue
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#D2691E", // Plumber Copper
          foreground: "#ffffff",
        },
        mint: "#7FFFD4", // Mint Green for accent
        neutrals: {
          DEFAULT: "#7D8A96", // Cool Gray
          steel: "#E3E7EB", // Steel Gray
        },
        soft: {
          DEFAULT: "#F9FAFB", // Soft White
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
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
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "pulse-light": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.7",
          },
        },
        "bounce": {
          "0%, 100%": { 
            transform: "translateY(0)"
          },
          "50%": { 
            transform: "translateY(-8px)"
          }
        },
        "typing": {
          "from": { 
            width: "0" 
          },
          "to": { 
            width: "100%" 
          }
        }
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "fade-down": "fade-down 0.5s ease-out",
        "pulse-light": "pulse-light 2s ease-in-out infinite",
        "bounce": "bounce 3s ease-in-out infinite",
        "typing": "typing 3s steps(30, end)",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        "card": "0 3px 8px rgba(0,0,0,0.06)",
        "card-hover": "0 6px 12px rgba(0,0,0,0.1)",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
