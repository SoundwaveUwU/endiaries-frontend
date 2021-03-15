/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    purge: [
        './components/**/*.{vue,js}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
    ],
    darkMode: 'class',
    variants: {},
    plugins: [
        function ({ addComponents }) {
            addComponents({
                '.container': {
                    width: '100%',
                    '@screen sm': {
                        width: '630px',
                    },
                    '@screen md': {
                        width: '740px',
                    },
                    '@screen lg': {
                        width: '1000px',
                    },
                    '@screen xl': {
                        width: '1200px',
                    },
                    '@screen 2xl': {
                        width: '1500px',
                    },
                },
            })
        },
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            maxWidth: 'auto',
        },
        extend: {
            fontFamily: {
                sans: [
                    'Roboto',
                    ...defaultTheme.fontFamily.sans,
                ]
            },
        }
    },
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
        defaultLineHeights: true,
        standardFontWeights: true,
    },
}
