<template>
    <div class="relative overflow-hidden"
         ref="image"
         :style="{ 'padding-bottom': paddingBottom }">
        <img
            :src="finalSrc"
            :srcset="finalSrcset"
            :sizes="sizes"
            loading="lazy"
            @load="calculateSizes"
            v-bind="$attrs"
            v-on="$listeners"
            :width="finalWidth"
            :height="finalHeight"
            :alt="alt"
            class="absolute inset-0 w-full z-10"
        />
        <div class="absolute inset-0 dark:bg-gray-700 bg-gray-400 animate-pulse z-0"></div>
    </div>
</template>

<script>
export default {
    name: 'ResponsiveImage',
    props: {
        src: {
            type: String,
            default: '',
        },
        srcset: {
            type: String,
            default: '',
        },
        width: {
            type: Number,
            default: 0,
        },
        height: {
            type: Number,
            default: 0,
        },
        alt: {
            type: String,
        },
        image: {
            type: Object,
            default: () => {
            },
        },
    },
    data() {
        return {
            sizes: '1px',
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.calculateSizes();
        })
        window.addEventListener('resize', this.calculateSizes)
    },
    computed: {
        finalSrc() {
            return this.image.src ?? this.src
        },
        finalSrcset() {
            return this.image.srcset ?? this.srcset
        },
        finalWidth() {
            return this.image.width ?? this.width;
        },
        finalHeight() {
            return this.image.height ?? this.height;
        },
        paddingBottom() {
            return this.finalHeight / this.finalWidth * 100 + '%';
        },
    },
    methods: {
        calculateSizes() {
            this.sizes = this.$refs.image
                ? Math.ceil(
                ((this.$refs.image.getBoundingClientRect().width - 5) /
                    window.innerWidth) *
                100
            ) + 'vw'
                : '1px'
        },
    },
}
</script>

<style>
img {
    aspect-ratio: attr(width) / attr(height);
}
</style>