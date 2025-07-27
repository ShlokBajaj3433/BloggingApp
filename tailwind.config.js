/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1a202c', // A dark, strong primary color
        'secondary': '#2d3748', // A slightly lighter secondary color
        'accent': '#2b6cb0', // An accent color for buttons and links
        'highlight': '#a0aec0', // For borders and subtle highlights
        'text-primary': '#f7fafc', // Primary text color (white)
        'text-secondary': '#e2e8f0', // Secondary text color
      },
    },
  },
 
  // ...
  plugins: [require('@tailwindcss/typography')],
  
}