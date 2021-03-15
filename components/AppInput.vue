<template>
    <div class="w-full my-2">
        <label class="w-full">
            <slot>
                <span>{{ label }}</span>
            </slot>
            <input
                class="px-3 py-2 text-lg border-2 dark:border-gray-900 border-gray-300 w-full rounded dark:bg-gray-800 dark:text-gray-100 bg-gray-200 focus:outline-none"
                :value="value"
                v-bind="$attrs"
                @input="$emit('input', $event.target.value)"
            />
            <span
                v-if="error && error.length"
                class="text-red-600 mt-1 text-sm.block"
            >
                <ul>
                    <li v-for="errorItem in error">{{ errorItem }}</li>
                </ul>
            </span>
        </label>
    </div>
</template>

<script>
export default {
    name: 'AppInput',
    props: {
        name: String,
        value: String,
        error: {
            type: [Array, Boolean],
            default: false,
        },
        label: String,
    },
}
</script>
