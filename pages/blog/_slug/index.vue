<template>
    <div
        class="flex flex-col-reverse space-y-6 md:space-y-0 md:flex-row justify-around md:space-x-6 transition-colors duration-150 ease-in"
    >
        <div class="flex justify-center w-full lg:w-4/6">
            <div
                class="flex flex-col w-full space-y-2 mb-6"
                style="max-width: 629px"
            >
                <template v-if="posts !== false">
                    <template v-if="posts.length > 0">
                        <app-post
                            v-for="post in posts"
                            :key="`post_${post.id}`"
                            :post="post"
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
                        </div>
                    </template>
                </template>
                <template v-else>
                    <app-post-placeholder v-for="id in [1, 2]" :key="id"/>
                </template>
            </div>
        </div>
        <div class="w-full md:w-2/6 relative space-y-5">
            <div v-if="blog !== false">
                <app-card class="bg-gray-700 p-4 space-y-4">
                    <div class="flex space-x-4">
                        <div>
                            <responsive-image :image="blog.media[0]" class="w-32 h-32 rounded" />
                        </div>
                        <div class="text-2xl font-bold">
                            <span>{{ blog.title }}</span>
                        </div>
                    </div>
                    <div>
                        {{ blog.description }}
                    </div>
                </app-card>
            </div>
            <div class="sticky space-y-1 top-5">
                <adsbygoogle/>
                <adsbygoogle/>

                <AppFooter/>
            </div>
        </div>
    </div>
</template>

<script>
import ResponsiveImage from "~/components/ResponsiveImage";
export default {
    components: {ResponsiveImage},
    auth: false,
    name: 'BlogSlug',data() {
        return {
            posts: false,
            blog: false,
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
    async fetch() {
        await Promise.allSettled([
            this.loadBlog(),
            this.loadBatchOfPosts()
        ])
    },
    methods: {
        async loadBatchOfPosts() {
            if (this.loading) return

            this.loading = true

            let url = `blog/${this.$route.params.slug}/post`

            if (this.posts.length) {
                url = `blog/${this.$route.params.slug}/post?offset=${(this.totalLoaded + this.newPosts)}`
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
        async loadBlog() {
            let url = `blog/${this.$route.params.slug}`

            try {
                const data = (await this.$axios.$get(url)).data

                if (this.blog === false) this.blog = data
                else this.blog.push(...data)
            } catch (e) {
            }
        },
    },
}
</script>
