/** @type {import('tailwindcss').Config} */

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const createScale = (name) =>
  shades.reduce((acc, shade) => {
    acc[shade] = `oklch(var(--${name}-${shade}) / <alpha-value>)`;
    return acc;
  }, {});

export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: createScale("background"),
          foreground: createScale("foreground"),
          primary: createScale("primary"),
          accent: createScale("accent"),
          secondary: createScale("secondary"),
        },
        fontFamily: {
          sans: ["var(--font-body)"],
          body: ["var(--font-body)"],
          heading: ["var(--font-heading)"],
          display: ["var(--font-heading)"],
          label: ["var(--font-label)"],
        },
      },
    },
    plugins: [],
  }