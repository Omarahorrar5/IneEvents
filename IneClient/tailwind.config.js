/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core colors matching the dark futuristic vibe
        primary: '#00F9BB',        // Bright teal for accents and buttons
        secondary: '#00E0FF',      // Cyan for hover states or highlights
        dark: '#0B0F2A',           // Deep base background color
        surface: '#1B1F3B',        // For navbar, footer, cards
        card: '#242A45',           // For forms, login boxes
        textMain: '#F1F1F1',       // Main readable text color
        textMuted: '#A8B2D1',      // Subtle text, descriptions
        success: '#2DF49E',        // Green for success
        danger: '#FF4D6D',         // Red for errors
        redd: '#d81237ff'
      },
    },
  },
  plugins: [],
}
