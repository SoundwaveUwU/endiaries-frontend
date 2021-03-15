export default {
    ssr: true,

    server: {
        port: process.env.NUXT_PORT || 3000, // default: 3000
        host: process.env.NUXT_HOST || '0.0.0.0', // default: localhost
    },

    loading: {
        height: '.25rem',
        color: '#374151',
    },

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'Endiaries',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [
            // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                type: 'text/css',
                href:
                    'https://use.fontawesome.com/releases/v5.15.1/css/all.css',
            },
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap',
            },
        ],
        htmlAttrs: {
            lang: 'en',
        },
        bodyAttrs: {
            class: [
                'bg-gray-300',
                'dark:bg-gray-900',
                'dark:text-gray-100',
                //'motion-reduce:transition-none transition-colors duration-150 ease-in',
            ],
        },
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [],

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        modern: 'client',
        extractCSS: true,
        postcss: {
            preset: {
                features: {
                    // Fixes: https://github.com/tailwindcss/tailwindcss/issues/1190#issuecomment-546621554
                    "focus-within-pseudo-class": false
                }
            }
        },
        babel: {
            presets ({ isServer, isClient }, preset) {
                if (process.env.NODE_ENV === 'development') {
                    // https://babeljs.io/docs/en/babel-preset-env
                    return [[
                        '@nuxt/babel-preset-app',
                        {
                            targets: isServer ? { node: 'current' } : {},
                            modern: isClient
                        }
                    ]]
                }
                return [preset]
            }
        }
    },

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: ['@/plugins/axios'],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        // '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/stylelint
        // '@nuxtjs/stylelint-module',
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
        '@nuxtjs/google-analytics',
        '@nuxtjs/google-adsense',
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/axios
        'nuxt-i18n',
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        'cookie-universal-nuxt',
        '@nuxtjs/sitemap'
    ],

    pwa: {
        icon: {
            source: 'assets/images/icon.png',
        },
    },

    i18n: {
        defaultLocale: 'en',
        lazy: true,
        strategy: 'no_prefix',
        locales: [
            { code: 'en', iso: 'en-US', file: 'en.js' },
            { code: 'ru', iso: 'ru-RU', file: 'ru.js' },
        ],
        langDir: 'locales/',
    },

    googleAnalytics: {
        id: 'G-GKYRCZ4NDZ',
    },

    'google-adsense': {
        id: 'ca-pub-1768983980449640',
        test: true,
    },

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
        baseURL: process.env.API_URL || 'https://endiaries.test/api',
        // credentials: true,
    },

    router: {
        middleware: ['auth'],
    },
}
