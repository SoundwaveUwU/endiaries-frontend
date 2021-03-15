<template>
    <div
        class="relative inline-block bg-gray-200 dark:bg-gray-800 rounded-full md:w-10 w-20 mr-2 align-middle select-none"
    >
        <input
            id="dark-mode"
            type="checkbox"
            name="dark-mode"
            :class="{
                'right-0 toggle-checkbox': dark,
                'md:right-4 right-8 toggle-checkbox': !dark,
            }"
            class="absolute block w-12 md:w-6 h-12 md:h-6 duration-300 rounded-full bg-gray-700 dark:bg-gray-300 border-4 dark:border-gray-800 appearance-none cursor-pointer focus:outline-none"
            @input="dark = !dark"
        />
        <label
            for="dark-mode"
            class="toggle-label transition-colors duration-150 ease-in block overflow-hidden h-12 md:h-6 rounded-full cursor-pointer"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            dark: null,
        }
    },
    computed: {
        circleCX() {
            return this.on ? 282.5 : 128.5
        },
        rectFill() {
            return this.on ? 'black' : 'transparent'
        },
    },
    watch: {
        dark(value) {
            localStorage.setItem('dark', value)

            const now = new Date()
            const time = now.getTime()
            const expireTime = time + 1000 * 36000
            now.setTime(expireTime)

            this.$cookies.set('dark', value, {
                expires: now,
            })
        },
    },
    created() {
        if (process.server) {
            if (this.$cookies.get('dark') !== null) {
                this.dark = this.$cookies.get('dark') === true
            }
        }
    },
    mounted() {
        if (this.dark !== null) return

        if (localStorage.getItem('dark') !== null) {
            this.dark = localStorage.getItem('dark') === 'true'
            return
        }

        this.dark =
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
    },
    head() {
        return {
            htmlAttrs: {
                class:
                    (this.dark ? 'dark' : '') +
                    ' transition duration-150 ease-in',
            },
        }
    },
}
</script>
