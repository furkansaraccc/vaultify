module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          border: 'hsl(var(--border))',
          // Add other color variables you're using
        },
      },
    },
    plugins: [],
  }