<template>
    <div
        class="flex justify-start items-center space-x-2">
        <div
            class="inline w-12 h-12 bg-gray-800 text-white dark:text-dark dark:bg-gray-400 flex justify-center items-center rounded overflow-hidden">
            <responsive-image
                v-if="blog.media.length > 0"
                class="w-full"
                :image="blog.media[0]" />
            <div v-else class="w-full h-full flex justify-center items-center uppercase block">
                <span>{{ blog.slug[0] }}</span>
            </div>
        </div>
        <span>{{ blog.slug }}</span>
    </div>
</template>

<script>
export default {
    name: 'BlogChooserElement',
    props: ['blog']
}
</script>
