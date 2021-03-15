<template>
    <div class="flex justify-center py-5">
        <app-post :post="post" v-if="post" :linkPost="false" :linkToPost="false" />
        <app-post-placeholder v-else />
    </div>
</template>

<script>
export default {
    name: 'PostId',
    async fetch() {
        this.data = await this.$axios.$get(`post/${this.$route.params.id}`)
    },
    data() {
        return {
            data: null,
        };
    },
    computed: {
        post() {
            return this.data?.post;
        }
    }
}
</script>
