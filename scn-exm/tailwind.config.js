// tailwind.config.js

module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx,css}', // Adjust paths to match your project structure
    './.storybook/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        customColor: '#1c1c1e',
      },
    },
  },
  plugins: [],
};
