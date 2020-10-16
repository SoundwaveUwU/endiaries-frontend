export default {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'NewTumbler',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                type: 'text/css',
                href:
                    'https://use.fontawesome.com/releases/v5.15.1/css/all.css',
            },
        ],
        htmlAttrs: {
            lang: 'en',
        },
        bodyAttrs: {
            class: ['bg-gray-300', 'dark:bg-gray-900'],
        },
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/stylelint
        '@nuxtjs/stylelint-module',
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
        '@nuxtjs/google-analytics',
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        '@nuxtjs/auth',
        'nuxt-i18n',
    ],

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

    auth: {
        strategies: {
            local: {
                scheme: 'refresh',
                token: {
                    property: 'access_token',
                    maxAge: 1800,
                    // type: 'Bearer'
                },
                refreshToken: {
                    property: 'refresh_token',
                    data: 'refresh_token',
                    maxAge: 60 * 60 * 24 * 30,
                },
                user: {
                    property: 'user',
                    autoFetch: true,
                },
                endpoints: {
                    login: { url: '/api/account/token', method: 'post' },
                    refresh: { url: '/api/account/refresh', method: 'post' },
                    user: { url: '/api/account/current', method: 'get' },
                    logout: { url: '/api/account/logout', method: 'post' },
                },
                // autoLogout: false
            },
        },
    },

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {},

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        modern: 'client',
    },

    firebase: {
        config: {
            apiKey: 'AIzaSyC_-AQX-Dx4C2xYpto1bwhM1EgeCAP63DY',
            authDomain: 'newtumbler.firebaseapp.com',
            databaseURL: 'https://newtumbler.firebaseio.com',
            projectId: 'newtumbler',
            storageBucket: 'newtumbler.appspot.com',
            messagingSenderId: '948324749725',
            appId: '1:948324749725:web:9746b05354323127ea5f74',
            measurementId: 'G-DC0XDN1SL4',
        },
        services: {
            auth: false, // Just as example. Can be any other service.
            firestore: false,
        },
    },
}
