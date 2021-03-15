<template>
    <div class="h-16 flex items-center text-gray-700 dark:text-gray-600">
        &copy; {{ year }} Endiaries
    </div>
</template>

<script>
export default {
    computed: {
        year() {
            return new Date().getFullYear()
        },
    },
}
</script>
