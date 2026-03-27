/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F9F8F6',
        foreground: '#1A1A1A',
        muted: '#EBE5DE',
        'muted-foreground': '#6C6863',
        accent: '#D4AF37',
        'accent-foreground': '#FFFFFF',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      transitionDuration: {
        '1500': '1500ms',
        '2000': '2000ms',
      }
    },
  },
  plugins: [],
}
