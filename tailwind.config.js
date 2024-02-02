/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'male': "url('/assets/images/male/bg.jpg')",
        'female': "url('/img/footer-texture.png')",
      }
    }
  },
  plugins: [],
}

