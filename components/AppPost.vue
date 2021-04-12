<template>
    <div v-if="post !== null" class="flex w-full h-full" style="max-width: 629px;">
        <nuxt-link
            :to="{ name: 'blog-slug', params: { slug: finalBlog(post).slug } }"
            class="w-20 hidden mr-2 lg:block">
            <div class="w-20 h-20 sticky top-2 object-center object-cover rounded overflow-hidden">
                <responsive-image
                    v-if="finalBlog(post).media.length > 0"
                    :image="finalBlog(post).media[0]"
                    :alt="finalBlog(post).title" />
                <div v-else class="dark:bg-gray-700 bg-gray-400 w-20 h-20 justify-center items-center flex">
                    <span class="text-6xl uppercase font-bold">{{ finalBlog(post).slug[0] }}</span>
                </div>
            </div>
        </nuxt-link>
        <app-card class="row-auto w-full" style="max-width: 541px">
            <app-post-part
                v-for="(parentPost, index) in finalParentPosts(post)"
                :key="`parentPost_${parentPost.id}`"
                class="border-b dark:border-gray-800"
                :post="parentPost"
                :show-title="index === 0"
                :blog="finalBlog(parentPost)" />
            <app-post-part
                :post="post"
                :blog="finalBlog(post)" />
            <div
                class="m-2 flex justify-between items-center dark:text-gray-300 text-gray-600">
                <nuxt-link
                    v-if="linkToPost"
                    :to="{
                        name: 'post-id',
                        params: { id: post.id },
                    }"
                    class="dark:hover:text-white hover:text-black"
                    :title="post.created_at">
                    {{ post.created_at_human_readable }}
                </nuxt-link>
                <span
                    v-else
                    class="dark:hover:text-white hover:text-black"
                    :title="post.created_at">
                    {{ post.created_at_human_readable }}
                </span>
                <div class="flex">
                    <div class="dark:hover:text-green-400 hover:text-green-600">
                        <span class="fas fa-bullhorn" />
                        <span>{{ $n(post.shares) }}</span>
                    </div>
                    <div
                        class="ml-2 dark:hover:text-pink-400 hover:text-pink-600">
                        <span class="fas fa-heart" />
                        <span>6 969</span>
                    </div>
                </div>
            </div>
        </app-card>
    </div>
</template>

<script>
export default {
    name: 'AppPost',
    props: {
        post: {
            type: Object,
            default: null
        },
        linkToPost: {
            type: Boolean,
            default: true
        },
        linkPost: {
            type: Boolean,
            default: true
        },
        blogs: {
            type: Array,
            default: null
        },
        parentPosts: {
            type: Array,
            default: null
        }
    },
    methods: {
        finalBlog (post) {
            return this.blogs.filter(blog => blog.id === post.blog)[0]
        },
        finalParentPosts (post) {
            if (post.parent_chain.length === 0) { return [] }

            return this.parentPosts.filter((parentPost) => {
                return post.parent_chain.includes(parentPost.id)
            })
        }
    }
}
</script>
