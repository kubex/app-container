const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./examples/*.{html,js}", "src/ts/*.ts"],
  theme:   {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
