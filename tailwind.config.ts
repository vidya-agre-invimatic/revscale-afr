import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sendlytics: {
          primary: {
            green: '#53A669',
            blue: '#0284C7',
          },
          text: {
            default: '#222329',
            white: '#FFFFFF',
          },
          grey: {
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#E3E6EB',
            400: '#82868C',
            500: '#3A3C40',
            600: '#9B9B9B',
          },
          growth: '#00AE1D',
          loss: '#FF0004',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
