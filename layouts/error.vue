<template>
    <div class="flex flex-col">
        <div class="flex flex-col justify-center items-center flex-grow">
            <div
                v-if="error.statusCode === 404"
                class="hidden md:block font-bold"
                style="font-size: 15em"
            >
                {{ error.statusCode }}
            </div>
            <div
                v-if="error.statusCode === 404"
                class="block md:hidden font-bold"
                style="font-size: 7em"
            >
                {{ error.statusCode }}
            </div>
            <h1 v-if="error.statusCode === 404">Page not found</h1>
            <h1 v-else>An error occurred</h1>
            <app-button
                v-if="$store.state.auth.loggedIn"
                type="link"
                class="mt-5 dark:bg-indigo-600 dark:text-gray-100 bg-gray-400 text-gray-900"
                size="large"
                :icon="['fas', 'arrow-left']"
                :to="{ name: 'feed' }"
                >Go to feed</app-button
            >
            <app-button
                v-else
                type="link"
                class="mt-5 dark:bg-indigo-600 dark:text-gray-100 bg-gray-400 text-gray-900"
                size="large"
                :icon="['fas', 'arrow-left']"
                to="/"
                >Go to main page</app-button
            >
        </div>
        <app-footer class="flex-grow-0"></app-footer>
    </div>
</template>

<script>
export default {
    props: {
        error: Object,
    },
    layout: 'default', // you can set a custom layout for the error page
}
</script>
