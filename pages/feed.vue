<template>
    <div
        class="flex justify-center space-x-6 transition-colors duration-150 ease-in"
    >
        <div class="flex justify-end">
            <div
                class="flex flex-col w-full space-y-2 mb-6"
            >
                <template v-if="posts !== false">
                    <client-only>
                        <template v-if="posts.length > 0">
                            <app-post
                                v-for="post in posts"
                                :key="`post_${post.id}`"
                                :post="post"
                                style="max-width: 629px"
                            />
                            <div class="flex justify-center">
                                <app-button
                                    :disabled="loading || !loadMore"
                                    :class="loadMoreClasses"
                                    :icon="loading ? 'circle-notch' : ''"
                                    icon-class="fa-spin"
                                    :size="loadMore ? 'large' : 'normal'"
                                    @click="loadBatchOfPosts"
                                >
                                    <span v-if="loadMore">Load more...</span>
                                    <span v-else
                                    >You have reached the end of your feed.
                                        Go touch some grass, please, for
                                        me.</span
                                    >
                                </app-button>
                            </div>
                        </template>
                        <template v-else>
                            <div
                                class="text-3xl space-y-5 flex flex-col justify-center items-center min-h-screen"
                            >
                                <div>No posts :(</div>
                                <div>
                                    Go on, follow someone, we'll wait here :)
                                </div>
                            </div>
                        </template>
                    </client-only>
                </template>
                <template v-else>
                    <app-post-placeholder v-for="id in [1, 2]" :key="id"/>
                </template>
            </div>
        </div>
        <div class="w-1/4 hidden md:block">
            <div class="space-y-5">
                <div>
                    <h2 class="mb-1">Popular tags</h2>
                    <div
                        class="border rounded dark:border-gray-800 overflow-hidden"
                    >
                        <div
                            v-for="i in [1, 2, 3, 4, 5, 6]"
                            :key="`tag_${i}`"
                            class="p-2 dark:hover:bg-gray-800 hover:bg-gray-400 flex justify-between items-center"
                        >
                            <span>tag #{{ i }}</span>
                            <span class="fas fa-chevron-right"/>
                        </div>
                    </div>
                </div>
                <div v-if="recommendedBlogs !== false">
                    <h2 class="mb-1">Recommended blogs</h2>
                    <div class="border rounded dark:border-gray-800">
                        <div
                            v-for="blog in recommendedBlogs"
                            :key="`blog_${blog.id}`"
                            class="p-2 dark:hover:bg-gray-800 hover:bg-gray-400 flex justify-between items-center"
                        >
                            <nuxt-link :to="{ name: 'blog-slug', params: { slug: blog.slug } }"
                                       class="flex space-x-2 items-center">
                                <div>
                                    <responsive-image :image="blog.media[0]"
                                                      class="w-8 h-8 rounded"/>
                                </div>
                                <span>{{ blog.slug }}</span>
                            </nuxt-link>
                            <div class="flex items-center">
                            <span
                                class="fas fa-user-plus mr-2"
                                title="Follow this blog"
                            />
                                <span
                                    class="fas fa-times"
                                    title="Do not recommend this blog"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div
                        v-for="blog in [1,2,3,4,5]"
                        :key="`placeholder_blog_${blog}`"
                        class="p-2 dark:hover:bg-gray-800 hover:bg-gray-400 flex justify-between items-center"
                    >
                        <div class="flex items-center">
                            <div class="rounded animate-pulse dark:bg-gray-500 bg-gray-400 w-8 h-8 rounded"/>
                            <span
                                class="rounded animate-pulse dark:bg-gray-500 bg-gray-400 w-8 h-8 rounded">blog-name</span>
                        </div>
                        <div class="flex items-center">
                            <span class="fa rounded animate-pulse dark:bg-gray-500 bg-gray-400"/>
                            <span class="fa rounded animate-pulse dark:bg-gray-500 bg-gray-400"/>
                        </div>
                    </div>
                </div>
                <!-- sticky  -->
                <div class="sticky space-y-1 top-5">
                    <adsbygoogle/>
                    <adsbygoogle/>

                    <AppFooter/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'feed',
    data() {
        return {
            posts: false,
            recommendedBlogs: false,
            totalLoaded: 0,
            loadMore: true,
            loading: false,

            newPosts: 0,
        }
    },
    computed: {
        loadMoreClasses() {
            return {
                'opacity-50': this.loading,
                'bg-blue-400 text-white': this.loadMore,
            }
        },
    },
    mounted() {
        if (process.browser) {
            this.loadBatchOfPosts()
            this.loadRecommendedBlogs()
        }
    },
    methods: {
        async loadBatchOfPosts() {
            if (this.loading) return

            this.loading = true

            let url = `feed`

            if (this.posts.length) {
                url = `feed?offset=${(this.totalLoaded + this.newPosts)}`
            }

            try {
                const data = (await this.$axios.$get(url)).data

                if (!data.length) this.loadMore = false

                if (this.posts === false) this.posts = data
                else this.posts.push(...data)

                this.totalLoaded += data.length
            } catch (e) {
            }

            this.loading = false
        },
        async loadRecommendedBlogs() {
            let url = `blog`

            try {
                const data = (await this.$axios.$get(url)).data

                if (this.recommendedBlogs === false) this.recommendedBlogs = data
                else this.recommendedBlogs.push(...data)
            } catch (e) {
            }
        },
    },
}
</script>
