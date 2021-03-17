module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    extends: [
        '@nuxtjs'
    // 'prettier',
    // 'prettier/vue',
    // 'plugin:prettier/recommended',
    // 'plugin:nuxt/recommended',
    ],
    // plugins: ['prettier'],
    // add your custom rules here
    rules: {
        indent: ['error', 4],
        'vue/html-indent': ['error', 4],
        'vue/html-closing-bracket-newline': ['error', {
            singleline: 'never',
            multiline: 'never'
        }]
    }
}
