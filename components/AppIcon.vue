<template>
    <span :class="classes"></span>
</template>

<script>
export default {
    name: 'AppIcon',
    props: {
        prefix: {
            type: String,
            default: 'fa',
        },
        icon: {
            type: [String, Array],
        },
        size: {
            type: String,
            default: null,
        },
        animation: {
            type: String,
            default: null,
        },
    },
    computed: {
        classes() {
            const result = []
            if (Array.isArray(this.icon)) {
                result.push([`${this.icon[0]} fa-${this.icon[1]}`])
            } else {
                result.push([`${this.prefix} fa-${this.icon}`])
            }

            if (this.size != null) result.push(`fa-${this.size}`)

            if (this.animation != null) result.push(`fa-${this.animation}`)

            return result.join(' ')
        },
    },
}
</script>
