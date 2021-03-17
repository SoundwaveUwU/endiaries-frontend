<template>
    <div class="flex justify-center py-5">
        <app-post v-if="post" :post="post" :link-post="false" :link-to-post="false" />
        <app-post-placeholder v-else />
    </div>
</template>

<script>
export default {
    name: 'PostId',
    data () {
        return {
            data: null
        }
    },
    async fetch () {
        this.data = await this.$axios.$get(`post/${this.$route.params.id}`)
    },
    computed: {
        post () {
            return this.data?.post
        }
    }
}
</script>
