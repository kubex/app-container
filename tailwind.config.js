const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content:  ["*"],
  darkMode: 'class',
  safelist: [
    {pattern: /.*/}
  ],
  theme:    {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins:  [],
}
