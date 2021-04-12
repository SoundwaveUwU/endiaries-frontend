<template>
    <div class="container mx-auto px-4 flex flex-col min-h-screen">
        <AppHeader />
        <div class="flex flex-col md:flex-row p-5 space-y-5 md:space-x-5">
            <div class="w-full md:w-1/5">
                <div class="rounded overflow-hidden flex flex-col">
                    <nuxt-link
                        to="/account/overview"
                        class="button px-3 py-2 dark:bg-gray-800 bg-gray-200">
                        {{ $t('Account') }}
                    </nuxt-link>
                    <nuxt-link
                        to="/account/sessions"
                        class="button px-3 py-2 dark:bg-gray-800 bg-gray-200">
                        {{ $t('Sessions') }}
                    </nuxt-link>
                </div>
                <AppFooter />
            </div>
            <Nuxt class="relative flex-grow w-full" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Settings'
}
</script>
