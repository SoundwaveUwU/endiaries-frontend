<template>
    <div
        class="-mx-4 p-4 sticky md:static top-0 z-50 dark:bg-gray-900 bg-gray-300 text-gray-900 dark:text-gray-200 flex items-center justify-between"
    >
        <!-- bg-gray-300 dark:bg-gray-900 -->
        <div class="flex items-center z-50">
            <div class="md:hidden mr-5">
                <span class="fas fa-bars fa-2x" @click="menuOpen = !menuOpen" />
            </div>
            <nuxt-link
                :to="loggedIn ? '/feed' : '/'"
                class="text-3xl font-semibold uppercase"
                >Endiaries</nuxt-link
            >
        </div>
        <div
            class="text-3xl md:text-base md:space-x-2 space-y-2 md:space-y-0 px-2 md:px-0 flex flex-col md:flex-row md:items-center"
            :class="{
                'inset-0 pt-20 md:pt-0 fixed md:relative md:h-full md:flex z-40 bg-gray-300 dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent': menuOpen,
                'hidden md:flex': !menuOpen,
            }"
        >
            <div class="h-16 md:h-8 px-1 flex items-center">
                <DarkThemeToggle />
            </div>
            <template v-if="loggedIn">
                <div class="h-16 md:h-8 relative">
                    <div
                        class="flex hover:bg-gray-400 dark:hover:bg-gray-800 overflow-hidden"
                        :class="
                            accountsSelectorOpen
                                ? 'bg-gray-400 dark:bg-gray-800 rounded-t'
                                : 'rounded'
                        "
                        @click="accountsSelectorOpen = !accountsSelectorOpen"
                    >
                        <div
                            class="blog-chooser p-1 overflow-hidden flex justify-between w-full md:w-64 items-center"
                        >
                            <div
                                class="flex justify-center items-center space-x-2"
                            >
                                <div
                                    class="inline w-12 md:w-6 h-12 md:h-6 bg-gray-800 text-white dark:text-dark dark:bg-gray-400 flex justify-center items-center rounded overflow-hidden"
                                >
                                    S
                                </div>
                                <span>soundwaveuwu</span>
                            </div>

                            <div
                                class="w-12 md:w-6 h-12 md:h-6 flex justify-center items-center"
                            >
                                <span
                                    class="fas fa-sm"
                                    :class="
                                        accountsSelectorOpen
                                            ? 'fa-chevron-up'
                                            : 'fa-chevron-down'
                                    "
                                ></span>
                            </div>
                        </div>
                    </div>

                    <div
                        v-if="accountsSelectorOpen"
                        class="w-full bg-gray-400 dark:bg-gray-800 absolute rounded-b overflow-hidden"
                    >
                        <div
                            class="flex p-1 w-full hover:bg-gray-500 dark:hover:bg-gray-700 overflow-hidden"
                        >
                            <div
                                class="flex justify-center items-center space-x-2 overflow-hidden"
                            >
                                <div
                                    class="inline w-12 md:w-6 h-12 md:h-6 bg-gray-800 dark:bg-gray-400 text-white dark:text-dark flex justify-center items-center rounded overflow-hidden"
                                >
                                    E
                                </div>
                                <span>short</span>
                            </div>
                        </div>
                        <div
                            class="flex p-1 w-full hover:bg-gray-500 dark:hover:bg-gray-700 overflow-hidden"
                        >
                            <div
                                class="flex justify-center items-center space-x-2 overflow-hidden"
                            >
                                <div
                                    class="inline w-12 md:w-6 h-12 md:h-6 bg-gray-800 dark:bg-gray-400 text-white dark:text-dark flex justify-center items-center rounded overflow-hidden"
                                >
                                    X
                                </div>
                                <span>seggsy</span>
                            </div>
                        </div>
                    </div>
                </div>
                <nuxt-link
                    to="/account/overview"
                    class="md:w-8 h-16 md:h-8 p-1 rounded flex flex-row-reverse md:flex-col space-x-2 md:space-x-0 space-x-reverse justify-end md:justify-center items-center hover:bg-gray-400 dark:hover:bg-gray-800"
                >
                    <span class="md:hidden">Settings</span>
                    <div
                        class="w-12 md:w-auto h-12 md:h-auto flex justify-center items-center"
                    >
                        <span class="fas fa-cog fa-lg"></span>
                    </div>
                </nuxt-link>
                <div
                    class="md:w-8 h-16 md:h-8 p-1 rounded flex flex-row-reverse md:flex-col space-x-2 md:space-x-0 space-x-reverse justify-end md:justify-center items-center hover:bg-gray-400 dark:hover:bg-gray-800"
                    @click="logOut"
                >
                    <span class="md:hidden">Sign out</span>
                    <div
                        class="w-12 md:w-auto h-12 md:h-auto flex justify-center items-center"
                    >
                        <span class="fas fa-sign-out-alt fa-lg"></span>
                    </div>
                </div>
            </template>
            <template v-else>
                <nuxt-link
                    to="/account/login"
                    class="md:w-8 h-16 md:h-8 p-1 rounded flex flex-row-reverse md:flex-col space-x-2 md:space-x-0 space-x-reverse justify-end md:justify-center items-center hover:bg-gray-400 dark:hover:bg-gray-800"
                >
                    <span class="md:hidden">Sign in</span>
                    <div
                        class="w-12 md:w-auto h-12 md:h-auto flex justify-center items-center"
                    >
                        <span class="fas fa-sign-in-alt fa-lg"></span>
                    </div>
                </nuxt-link>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        dark: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            menuOpen: false,
            accountsSelectorOpen: false,
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.loggedIn
        },
    },
    created() {
        if (process.server) {
        }
    },
    mounted() {
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.blog-chooser'))
                this.accountsSelectorOpen = false
        })
    },
    methods: {
        async logOut() {
            const response = await this.$axios.get('security/csrf')
            await this.$axios.$post('account/logout', {
                _token: response.data.token,
            })
            await this.$router.push('/')
        },
    },
}
</script>
