<template>
    <div>
        <nuxt-link
            v-if="blog"
            :to="linkPost ? {
                name: 'post-id',
                params: { id: post.id },
            } : {
                name: 'blog-slug',
                params: { slug: blog.slug },
            }"
            class="flex items-center m-2 h-8 space-x-2">
            <div>
                <responsive-image
                    v-if="blog.media.length > 0"
                    :image="blog.media[0]"
                    :alt="blog.title"
                    class="w-8 h-8 object-center object-cover rounded" />
                <div v-else class="dark:bg-gray-600 rounded bg-gray-300 w-8 h-8 justify-center items-center flex">
                    <span class="text-xl uppercase font-bold">{{ blog.slug[0] }}</span>
                </div>
            </div>
            <span class="font-bold">{{ blog.slug }}</span>
        </nuxt-link>
        <template v-if="showTitle">
            <h1 class="text-3xl font-bold m-2">
                {{ post.title }}
            </h1>
        </template>
        <template v-for="block in post.blocks">
            <template v-if="block.type === 'text'">
                <div v-for="paragraph in block.content" class="m-2">
                    {{ paragraph }}
                </div>
            </template>
            <template v-if="block.type === 'image'">
                <div
                    v-for="media in post.media.filter(item => block.media.includes(item.id))"
                    class="min-w-full dark:bg-gray-800 bg-gray-200 flex justify-center items-center">
                    <responsive-image
                        :image="media"
                        alt=""
                        class="w-full" />
                </div>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    name: 'AppPostPart',
    props: ['post', 'blog', 'linkPost', 'showTitle']
}
</script>
