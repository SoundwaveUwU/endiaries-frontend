<template>
    <component
        :is="getComponent"
        :class="classes"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <slot name="icon">
            <div v-if="icon" class="flex items-center">
                <app-icon :icon="icon" :class="iconClass" />
            </div>
        </slot>
        <div class="w-full flex justify-center items-center">
            <slot></slot></div
    ></component>
</template>

<script>
export default {
    name: 'AppButton',
    props: {
        icon: {
            type: [String, Array, Boolean],
            default: false,
        },
        iconClass: {
            type: [String],
            default: '',
        },
        size: {
            type: String,
            default: 'normal',
        },
        type: {
            type: String,
            default: 'button',
        },
    },
    computed: {
        classes() {
            const result = [
                'rounded',
                'text-center',
                'border',
                'border-transparent',
                'm-1',
                'focus:outline-none',
                'flex',
                'justify-between',
                'items-center',
            ]

            switch (this.size) {
                case 'large':
                    result.push('px-4', 'py-3', 'text-xl', 'space-x-3')
                    break
                case 'small':
                    result.push('px-2', 'py-1', 'text-sm', 'space-x-1')
                    break
                default:
                    result.push(
                        'px-2 md:px-3',
                        'py-1 md:py-2',
                        'text-sm md:text-regular',
                        'space-x-2'
                    )
            }

            return result
        },
        getComponent() {
            switch (this.type) {
                case 'link':
                    return 'nuxt-link'
                default:
                    return 'button'
            }
        },
    },
}
</script>
