<template>
    <div
        class="flex justify-center space-x-6 transition-colors duration-150 ease-in">
        <div class="flex justify-end w-full" style="max-width: 629px;">
            <div
                class="flex flex-col w-full space-y-2 mb-6">
                <template v-if="posts !== false">
                    <client-only>
                        <template v-if="posts.length > 0">
                            <app-post
                                v-for="post in posts"
                                :key="`post_${post.id}`"
                                :post="post"
                                :blogs="blogs"
                                :parent-posts="parentPosts"
                                style="max-width: 629px" />
                            <div class="flex justify-center">
                                <app-button
                                    :disabled="loading || !loadMore"
                                    :class="loadMoreClasses"
                                    :icon="loading ? 'circle-notch' : ''"
                                    icon-class="fa-spin"
                                    :size="loadMore ? 'large' : 'normal'"
                                    @click="loadBatchOfPosts">
                                    <span v-if="loadMore">Load more...</span>
                                    <span
                                        v-else>You have reached the end of your feed.
                                        Go touch some grass, please, for
                                        me.</span>
                                </app-button>
                            </div>
                        </template>
                        <template v-else>
                            <div
                                class="text-3xl space-y-5 flex flex-col justify-center items-center min-h-screen">
                                <div>No posts :(</div>
                                <div>
                                    Go on, follow someone, we'll wait here :)
                                </div>
                            </div>
                        </template>
                    </client-only>
                </template>
                <template v-else>
                    <app-post-placeholder v-for="id in [1, 2]" :key="id" />
                </template>
            </div>
        </div>
        <div class="w-1/4 hidden md:block space-y-5">
            <div>
                <h2 class="mb-1">
                    {{ $t('Popular tags') }}
                </h2>
                <div
                    class="border rounded dark:border-gray-800 overflow-hidden">
                    <div
                        v-for="i in [1, 2, 3, 4, 5, 6]"
                        :key="`tag_${i}`"
                        class="p-2 dark:hover:bg-gray-800 hover:bg-gray-400 flex justify-between items-center">
                        <span>tag #{{ i }}</span>
                        <span class="fas fa-chevron-right" />
                    </div>
                </div>
            </div>
            <div>
                <h2 class="mb-1">
                    {{ $t('Recommended blogs') }}
                </h2>
                <div class="border rounded overflow-hidden dark:border-gray-800">
                    <template v-if="recommendedBlogs !== false">
                        <div
                            v-for="blog in recommendedBlogs"
                            :key="`blog_${blog.id}`"
                            class="p-2 dark:hover:bg-gray-800 hover:bg-gray-400 flex justify-between items-center">
                            <nuxt-link
                                :to="{ name: 'blog-slug', params: { slug: blog.slug } }"
                                class="flex space-x-2 items-center">
                                <div
                                    v-if="blog.media">
                                    <responsive-image
                                        v-if="blog.media.length > 0"
                                        :image="blog.media[0]"
                                        class="w-8 h-8 rounded" />
                                    <div v-else class="dark:bg-gray-600 rounded bg-gray-300 w-8 h-8 justify-center items-center flex">
                                        <span class="text-xl uppercase font-bold">{{ blog.slug[0] }}</span>
                                    </div>
                                </div>
                                <div v-else class="w-8 h-8 flex justify-center items-center">
                                    <span>{{ blog.slug[0] }}</span>
                                </div>
                                <span>{{ blog.slug }}</span>
                            </nuxt-link>
                            <div class="flex space-x-2 items-center">
                                <span
                                    class="fas fa-user-plus mr-2"
                                    title="Follow this blog" />
                                <span
                                    class="fas fa-times"
                                    title="Do not recommend this blog" />
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div
                            v-for="blog in [1,2,3,4,5]"
                            :key="`placeholder_blog_${blog}`"
                            class="p-2 dark:hover:bg-gray-800 hover:bg-gray-400 flex justify-between items-center">
                            <div class="flex space-x-2 w-full items-center">
                                <placeholder class="w-8 h-8 rounded" />
                                <placeholder class="h-6 w-2/5" />
                            </div>
                            <div class="flex space-x-2 items-center">
                                <placeholder class="w-8 h-8 rounded" />
                                <placeholder class="w-8 h-8 rounded" />
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <!-- sticky  -->
            <div class="sticky space-y-1 top-5">
                <adsbygoogle />
                <adsbygoogle />

                <AppFooter />
            </div>
        </div>
    </div>
</template>

<script>
import Placeholder from '~/components/Placeholder'
export default {
    name: 'Feed',
    components: { Placeholder },
    data () {
        return {
            posts: false,
            blogs: false,
            parentPosts: false,

            recommendedBlogs: false,
            totalLoaded: 0,
            loadMore: true,
            loading: false,

            newPosts: 0
        }
    },
    computed: {
        loadMoreClasses () {
            return {
                'opacity-50': this.loading,
                'bg-blue-400 text-white': this.loadMore
            }
        }
    },
    mounted () {
        if (process.browser) {
            this.loadBatchOfPosts()
            this.loadRecommendedBlogs()
        }
    },
    methods: {
        async loadBatchOfPosts () {
            if (this.loading) { return }

            this.loading = true

            let url = 'feed'

            if (this.posts.length) {
                url = `feed?offset=${(this.totalLoaded + this.newPosts)}`
            }

            try {
                const data = (await this.$axios.$get(url))

                if (!data.posts.length) { this.loadMore = false }

                if (this.posts === false) {
                    this.posts = data.posts
                } else {
                    this.posts.push(...data.posts)
                }

                if (this.blogs === false) {
                    this.blogs = data.blogs
                } else {
                    this.blogs.push(...data.blogs)
                }

                if (this.parentPosts === false) {
                    this.parentPosts = data.parent_posts
                } else {
                    this.parentPosts.push(...data.parent_posts)
                }

                this.totalLoaded += data.posts.length
            } catch (e) {
            }

            this.loading = false
        },
        async loadRecommendedBlogs () {
            const url = 'blog'

            try {
                const data = (await this.$axios.$get(url)).data

                if (this.recommendedBlogs === false) { this.recommendedBlogs = data } else { this.recommendedBlogs.push(...data) }
            } catch (e) {
            }
        }
    }
}
</script>
