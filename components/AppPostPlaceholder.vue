<template>
    <div class="flex space-x-2 w-full" style="max-width: 629px;">
        <div class="hidden md:block md:w-20">
            <placeholder class="w-20 h-20 hidden sticky top-2 lg:block object-center object-cover rounded" />
        </div>
        <app-card class="row-auto w-full" style="max-width: 541px">
            <div
                v-for="parentPost in parentPosts"
                :key="`parentPost_${parentPost}`"
            >
                <div class="flex items-center p-2 space-x-2">
                    <placeholder class="w-8 h-8 rounded object-center object-cover"/>
                    <placeholder class="inline-block w-1/3" />
                </div>
                <div
                    v-for="block in blocks"
                    :key="`parentPost_${parentPost}_block_${block}`"
                >
                    <placeholder class="m-2" />
                    <placeholder class="m-2" />
                    <placeholder class="m-2" />
                    <placeholder class="m-2 w-1/4" />
                    <placeholder style="height: 200px" class="rounded" />
                    <placeholder class="m-2" />
                    <placeholder class="m-2 w-1/4" />
                </div>
                <div class="border-t dark:border-gray-800"></div>
            </div>
            <div class="flex items-center p-2 space-x-2">
                <placeholder class="w-8 h-8 rounded object-center object-cover"/>
                <placeholder class="w-2/5" />
            </div>
            <div v-for="block in blocks" :key="`post_0_block_${block}`">
                <placeholder class="m-2" />
                <placeholder class="m-2" />
                <placeholder class="m-2" />
                <placeholder class="m-2 w-1/4" />
                <placeholder style="height: 200px" class="rounded" />
                <placeholder class="m-2" />
                <placeholder class="m-2 w-1/4" />
            </div>
            <div
                class="p-2 flex justify-between items-center dark:text-gray-300 text-gray-600"
            >
                <placeholder class="w-1/3" />
                <div class="flex space-x-2 w-1/3">
                    <div class="w-1/2 space-x-2 flex items-center">
                        <span class="fas fa-bullhorn"></span>
                        <placeholder class="inline-block w-full" />
                    </div>
                    <div class="w-1/2 space-x-2 flex items-center">
                        <span class="fas fa-heart"></span>
                        <placeholder class="inline-block w-full" />
                    </div>
                </div>
            </div>
        </app-card>
    </div>
</template>

<script>
import Placeholder from "~/components/Placeholder";
export default {
    name: 'AppPostPlaceholder',
    components: {Placeholder},
    computed: {
        parentPosts() {
            return 1
        },
        blocks() {
            return 1
        },
    },
}
</script>
