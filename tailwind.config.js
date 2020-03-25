const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    theme: {
        colors: { ...defaultTheme.colors, 'beautiful-blue': '#186db6' },
        inset: {
            '1': '1rem',
            '3': '3rem',
        },
        fontFamily: {
            serif: ['Roboto Slab', ...defaultTheme.fontFamily.serif],
            sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        },
    },
    variants: {},
    plugins: [],
};
