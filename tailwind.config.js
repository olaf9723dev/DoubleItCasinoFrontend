module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      '4xs': '280px',
      '3xs': '320px',
      '2xs': '380px',
      xs: '480px',
      sm: '640px',
      md: '768px',
      slg: '964px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1780px'
    },
    // Extend default configurations
    extend: {
      colors: {
        yellow: '#ffc020',
        blue: '#0094ff',
        green: '#0f6',
        gray: '#5f6368'
      },
      container: {
        center: true
      }
    }
  },
  plugins: []
};
