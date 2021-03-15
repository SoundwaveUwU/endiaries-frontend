<template>
    <div class="flex h-full" v-if="post !== null" style="max-width: 629px;">
        <nuxt-link :to="{ name: 'blog-slug', params: { slug: post.blog.slug } }" class="w-20 hidden mr-2 lg:block">
            <div class="w-20 h-20 sticky top-2 object-center object-cover rounded overflow-hidden">
            <responsive-image
                :image="post.blog.media[0]"
                :alt="post.blog.title"
            />
            </div>
        </nuxt-link>
        <app-card class="row-auto w-full" style="max-width: 541px">
            <div
                v-for="(parentPost, index) in post.parent_chain"
                :key="`parentPost_${parentPost.id}`"
                class="border-b dark:border-gray-800"
            >
                <nuxt-link
                    :to="{
                        name: 'post-id',
                        params: { id: parentPost.id },
                    }"
                    class="flex items-center m-2 space-x-2"
                >
                    <div>
                    <responsive-image
                        :image="parentPost.blog.media[0]"
                        :alt="parentPost.blog.title"
                        class="w-8 h-8 object-center object-cover rounded"
                    /></div>
                    <span class="font-bold">{{ parentPost.blog.slug }}</span>
                </nuxt-link>
                <template v-if="index === 0">
                    <h1 class="text-3xl font-bold m-2">
                        {{ parentPost.title }}
                    </h1>
                </template>
                <template v-for="block in parentPost.blocks">
                    <template v-if="block.type === 'text'">
                        <div class="m-2" v-for="paragraph in block.content">
                            {{ paragraph }}
                        </div>
                    </template>
                    <template v-if="block.type === 'image'">
                        <div
                            v-for="media in parentPost.media.filter(item => block.media.includes(item.id))"
                            class="min-w-full dark:bg-gray-800 bg-gray-200 flex justify-center items-center"
                        >
                            <responsive-image
                                :image="media"
                                alt=""
                                class="w-full"
                            />
                        </div>
                    </template>
                </template>
            </div>
            <nuxt-link
                :to="linkPost ? {
                    name: 'post-id',
                    params: { id: post.id },
                } : {
                    name: 'blog-slug',
                    params: { slug: post.blog.slug },
                }"
                class="flex items-center m-2 h-8 space-x-2"
            >
                <div>
                    <responsive-image
                        :image="post.blog.media[0]"
                        :alt="post.blog.title"
                        class="w-8 h-8 object-center object-cover rounded"
                    />
                </div>
                <span class="font-bold">{{ post.blog.slug }}</span>
            </nuxt-link>
            <template v-for="block in post.blocks">
                <template v-if="block.type === 'text'">
                    <div class="m-2" v-for="paragraph in block.content">
                        {{ paragraph }}
                    </div>
                </template>
                <template v-if="block.type === 'image'">
                    <div
                        v-for="media in post.media.filter(item => block.media.includes(item.id))"
                        class="min-w-full dark:bg-gray-800 bg-gray-200 flex justify-center items-center"
                    >
                        <responsive-image
                            :image="media"
                            alt=""
                            class="w-full"
                        />
                    </div>
                </template>
            </template>
            <div
                class="m-2 flex justify-between items-center dark:text-gray-300 text-gray-600"
            >
                <nuxt-link
                    :to="{
                        name: 'post-id',
                        params: { id: post.id },
                    }"
                    class="dark:hover:text-white hover:text-black"
                    :title="post.created_at"
                    v-if="linkToPost"
                >
                    {{ post.created_at_human_readable }}
                </nuxt-link>
                <span
                    class="dark:hover:text-white hover:text-black"
                    :title="post.created_at"
                    v-else
                >
                    {{ post.created_at_human_readable }}
                </span>
                <div class="flex">
                    <div class="dark:hover:text-green-400 hover:text-green-600">
                        <span class="fas fa-bullhorn"></span>
                        <span>{{ $n(post.shares) }}</span>
                    </div>
                    <div
                        class="ml-2 dark:hover:text-pink-400 hover:text-pink-600"
                    >
                        <span class="fas fa-heart"></span>
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
        post: Object,
        linkToPost: {
            type: Boolean,
            default: true,
        },
        linkPost: {
            type: Boolean,
            default: true,
        }
    },
}
</script>
