<template>
    <div
        class="-mx-4 p-4 sticky md:static top-0 z-50 dark:bg-gray-900 bg-gray-300 text-gray-900 dark:text-gray-200 flex items-center justify-between">
        <!-- bg-gray-300 dark:bg-gray-900 -->
        <div class="flex items-center z-50">
            <div class="md:hidden mr-5">
                <span class="fas fa-bars fa-2x" @click="menuOpen = !menuOpen" />
            </div>
            <nuxt-link
                :to="loggedIn ? '/feed' : '/'"
                class="text-3xl font-semibold uppercase">
                Endiaries
            </nuxt-link>
        </div>
        <div
            class="text-3xl w-full justify-end md:text-base md:space-x-2 space-y-2 md:space-y-0 px-2 md:px-0 flex flex-col md:flex-row md:items-center"
            :class="{
                'inset-0 pt-20 md:pt-0 fixed md:relative md:h-full md:flex z-40 bg-gray-300 dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent': menuOpen,
                'hidden md:flex': !menuOpen,
            }">
            <div class="h-16 md:h-8 px-1 flex items-center">
                <DarkThemeToggle />
            </div>
            <template v-if="loggedIn">
                <div
                    v-if="blogs !== false"
                    class="h-14 relative">
                    <div
                        class="flex hover:bg-gray-400 dark:hover:bg-gray-800 overflow-hidden"
                        :class="
                            accountsSelectorOpen
                                ? 'bg-gray-400 dark:bg-gray-800 rounded-t'
                                : 'rounded'
                        "
                        @click="accountsSelectorOpen = !accountsSelectorOpen">
                        <div
                            class="blog-chooser p-1 overflow-hidden flex justify-between w-full md:w-64 items-center">
                            <blog-chooser-element :blog="blogs[0]" />

                            <div
                                class="w-12 md:w-6 h-12 md:h-6 flex justify-center items-center">
                                <span
                                    class="fas fa-sm"
                                    :class="
                                        accountsSelectorOpen
                                            ? 'fa-chevron-up'
                                            : 'fa-chevron-down'
                                    " />
                            </div>
                        </div>
                    </div>

                    <div
                        v-if="accountsSelectorOpen"
                        class="w-full bg-gray-400 dark:bg-gray-800 absolute rounded-b overflow-hidden">
                        <blog-chooser-element
                            v-for="blog in blogs"
                            :key="blog.id"
                            class="hover:bg-gray-200 dark:hover:bg-gray-700 p-1"
                            :blog="blog" />
                    </div>
                </div>
                <placeholder v-else class="h-14 w-1/3 rounded" />
                <nuxt-link
                    to="/account/overview"
                    class="md:w-8 h-16 md:h-8 p-1 rounded flex flex-row-reverse md:flex-col space-x-2 md:space-x-0 space-x-reverse justify-end md:justify-center items-center hover:bg-gray-400 dark:hover:bg-gray-800">
                    <span class="md:hidden">Settings</span>
                    <div
                        class="w-12 md:w-auto h-12 md:h-auto flex justify-center items-center">
                        <span class="fas fa-cog fa-lg" />
                    </div>
                </nuxt-link>
                <div
                    class="md:w-8 h-16 md:h-8 p-1 rounded flex flex-row-reverse md:flex-col space-x-2 md:space-x-0 space-x-reverse justify-end md:justify-center items-center hover:bg-gray-400 dark:hover:bg-gray-800"
                    @click="logOut">
                    <span class="md:hidden">Sign out</span>
                    <div
                        class="w-12 md:w-auto h-12 md:h-auto flex justify-center items-center">
                        <span class="fas fa-sign-out-alt fa-lg" />
                    </div>
                </div>
            </template>
            <template v-else>
                <nuxt-link
                    to="/account/login"
                    class="md:w-8 h-16 md:h-8 p-1 rounded flex flex-row-reverse md:flex-col space-x-2 md:space-x-0 space-x-reverse justify-end md:justify-center items-center hover:bg-gray-400 dark:hover:bg-gray-800">
                    <span class="md:hidden">Sign in</span>
                    <div
                        class="w-12 md:w-auto h-12 md:h-auto flex justify-center items-center">
                        <span class="fas fa-sign-in-alt fa-lg" />
                    </div>
                </nuxt-link>
            </template>
        </div>
    </div>
</template>

<script>
import Placeholder from '~/components/Placeholder'
import BlogChooserElement from '~/components/BlogChooserElement'
export default {
    components: { BlogChooserElement, Placeholder },
    props: {
        dark: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            menuOpen: false,
            accountsSelectorOpen: false,
            blogs: false
        }
    },
    async fetch () {
        await this.loadBlogs()
    },
    computed: {
        loggedIn () {
            return this.$store.state.auth.loggedIn
        }
    },
    mounted () {
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.blog-chooser')) { this.accountsSelectorOpen = false }
        })
    },
    methods: {
        async logOut () {
            await this.$axios.$post('account/logout')
            await this.$router.push('/')
        },
        async loadBlogs () {
            this.blogs = (await this.$axios.$get('account/blogs')).data
        }
    }
}
</script>
