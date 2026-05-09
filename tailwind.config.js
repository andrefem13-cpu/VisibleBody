/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0a0f1e',
          secondary: '#111827',
          panel: '#0d1526',
          border: '#1e2d45',
        },
        accent: {
          teal: '#00d4c8',
          amber: '#f5a623',
          violet: '#7c6af7',
        },
        text: {
          primary: '#f0f4ff',
          secondary: '#8b9abb',
          muted: '#4a5568',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
