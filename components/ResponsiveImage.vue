<template>
    <div
        ref="image"
        class="relative overflow-hidden"
        :style="{ 'padding-bottom': paddingBottom }">
        <img
            :src="finalSrc"
            :srcset="finalSrcset"
            :sizes="sizes"
            loading="lazy"
            v-bind="$attrs"
            :width="finalWidth"
            :height="finalHeight"
            :alt="alt"
            class="absolute inset-0 w-full z-10"
            @load="calculateSizes"
            v-on="$listeners">
        <div class="absolute inset-0 dark:bg-gray-700 bg-gray-400 animate-pulse z-0" />
    </div>
</template>

<script>
export default {
    name: 'ResponsiveImage',
    props: {
        src: {
            type: String,
            default: ''
        },
        srcset: {
            type: String,
            default: ''
        },
        width: {
            type: Number,
            default: 0
        },
        height: {
            type: Number,
            default: 0
        },
        alt: {
            type: String
        },
        image: {
            type: Object,
            default: () => {
            }
        }
    },
    data () {
        return {
            sizes: '1px'
        }
    },
    computed: {
        finalSrc () {
            return this.image?.src ?? this.src
        },
        finalSrcset () {
            return this.image?.srcset ?? this.srcset
        },
        finalWidth () {
            return this.image?.width ?? this.width
        },
        finalHeight () {
            console.log(this.image)
            return this.image?.height ?? this.height
        },
        paddingBottom () {
            return this.finalHeight / this.finalWidth * 100 + '%'
        }
    },
    mounted () {
        this.$nextTick(function () {
            this.calculateSizes()
        })
        window.addEventListener('resize', this.calculateSizes)
    },
    methods: {
        calculateSizes () {
            this.sizes = this.$refs.image
                ? Math.ceil(
                    ((this.$refs.image.getBoundingClientRect().width - 5) /
                    window.innerWidth) *
                100
                ) + 'vw'
                : '1px'
        }
    }
}
</script>

<style>
img {
    aspect-ratio: attr(width) / attr(height);
}
</style>
