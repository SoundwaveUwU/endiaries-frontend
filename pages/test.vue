<template>
    <div
        class="flex space-x-2 justify-around space-x-6 transition-colors duration-150 ease-in"
    >
        <div class="flex justify-center w-full lg:w-4/6">
            <div
                class="flex flex-col space-y-6 w-full mb-6"
                style="max-width: 629px"
            >
                <app-card
                    v-for="i in [1, 2, 3, 4, 5]"
                    :key="i"
                    class="row-auto"
                >
                    <div class="flex items-center p-2">
                        <img
                            class="w-8 h-8 mr-2 rounded"
                            src="https://yt3.ggpht.com/a/AATXAJwCNeSzjsdbx0LTpBLTl-IMh-wYSPfoehzCUdX7gl8=s176-c-k-c0xffffffff-no-rj-mo"
                        />
                        <span>blog-name-{{ i }}</span>
                    </div>
                    <div class="relative">
                        <!--                    <img-->
                        <!--                        ref="image"-->
                        <!--                        src="https://pbs.twimg.com/media/Ekc8rWIWkAExr0h?format=jpg&name=large"-->
                        <!--                        @load="calculateClientWidth"-->
                        <!--                    />-->

                        <img
                            src="https://via.placeholder.com/2000x1000.png?text=2000px"
                            :srcset="srcset"
                            :sizes="sizes"
                            alt=""
                        />
                        <span
                            class="absolute bottom-1 left-1 px-3 py-1 bg-opacity-25 bg-gray-800 text-white rounded"
                            >{{ clientWidth }}</span
                        >
                    </div>
                    <div class="p-3">Some post text</div>
                    <div class="border-b dark:border-gray-800"></div>
                    <div class="flex items-center p-2">
                        <img
                            class="w-8 h-8 mr-2 rounded"
                            src="https://yt3.ggpht.com/a/AATXAJwCNeSzjsdbx0LTpBLTl-IMh-wYSPfoehzCUdX7gl8=s176-c-k-c0xffffffff-no-rj-mo"
                        />
                        <span>blog-name-{{ i }}</span>
                    </div>
                    <img
                        ref="image"
                        src="https://pbs.twimg.com/media/Ekc8rWIWkAExr0h?format=jpg&name=large"
                        @load="calculateClientWidth"
                    />
                    <div class="p-3">Some post text</div>
                    <div
                        class="p-3 flex justify-between items-center text-gray-600"
                    >
                        <div class="hover:text-gray-300">2020-10-18 13:49</div>
                        <div class="flex">
                            <div class="hover:text-teal-300">
                                <span class="fas fa-bullhorn"></span>
                                <span>6 969</span>
                            </div>
                            <div class="ml-2 hover:text-red-300">
                                <span class="fas fa-heart"></span>
                                <span>6 969</span>
                            </div>
                        </div>
                    </div>
                </app-card>
            </div>
        </div>
        <div class="w-2/6 relative hidden lg:block space-y-5">
            <div>
                <h2 class="mb-1">Popular tags</h2>
                <div
                    class="border rounded dark:border-gray-800 overflow-hidden"
                >
                    <div
                        v-for="i in [1, 2, 3, 4, 5, 6]"
                        :key="i"
                        class="p-2 dark:hover:bg-gray-800 hover:bg-gray-400 flex justify-between items-center"
                    >
                        <span>tag #{{ i }}</span>
                        <span class="fas fa-chevron-right" />
                    </div>
                </div>
            </div>
            <div>
                <h2 class="mb-1">Recommended blogs</h2>
                <div class="border rounded dark:border-gray-800">
                    <div
                        v-for="i in [1, 2, 3, 4, 5, 6]"
                        :key="i"
                        class="p-2 dark:hover:bg-gray-800 hover:bg-gray-400 flex justify-between items-center"
                    >
                        <div class="flex items-center">
                            <img
                                class="w-8 h-8 mr-2 rounded"
                                src="https://yt3.ggpht.com/a/AATXAJwCNeSzjsdbx0LTpBLTl-IMh-wYSPfoehzCUdX7gl8=s176-c-k-c0xffffffff-no-rj-mo"
                            />
                            <span>blog-name</span>
                        </div>
                        <div class="flex items-center">
                            <span
                                class="fas fa-user-plus mr-2"
                                title="Follow this blog"
                            />
                            <span
                                class="fas fa-times"
                                title="Do not recommend this blog"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="sticky space-y-1 top-5">
                <div
                    class="h-64 bg-gray-800 text-white dark:text-gray-900 dark:bg-gray-300 flex justify-center items-center"
                >
                    Реклама №1
                </div>
                <div
                    class="h-64 bg-gray-800 text-white dark:text-gray-900 dark:bg-gray-300 flex justify-center items-center"
                >
                    Реклама №2
                </div>

                <AppFooter />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    middleware: 'auth',
    data() {
        return {
            clientWidth: 'unknown',
            breakpoints: [1536, 1280, 1024, 768, 640],
            widths: [963, 763, 629, 456, 598],
            heights: [],
        }
    },
    computed: {
        sizes() {
            const result = []

            for (const key in this.widths) {
                const width = this.widths[key]
                const breakpoint = this.breakpoints[key]
                if (breakpoint !== 640)
                    result.push(`(min-width: ${breakpoint}px) ${width}px`)
            }

            result.push('92vw')

            return result.join(',')
        },
        srcset() {
            const res = []

            res.push({
                width: 2000,
                url: `https://via.placeholder.com/2000x1000.png?text=2000px+x1 2000w`,
            })

            for (const density of [3, 2, 1]) {
                for (const key in this.widths) {
                    const width = this.widths[key] * density
                    const height = this.heights[key] * density

                    if (width <= 2000)
                        res.push({
                            width,
                            url: `https://via.placeholder.com/${width}x${height}.png?text=${this.widths[key]}px+x${density} ${width}w`,
                        })
                }
            }

            return res
                .sort((a, b) => {
                    return b.width - a.width
                })
                .map((item) => item.url)
                .join(',')
        },
    },
    mounted() {
        window.onresize = this.calculateClientWidth
        this.heights = this.widths.map((item) => parseInt(item / 2))
    },
    methods: {
        calculateClientWidth() {
            // const vwWidth =
            //     Math.ceil(
            //         (this.$refs.image[0].getBoundingClientRect().width /
            //             window.innerWidth) *
            //             100
            //     ) + 'vw'
            this.clientWidth =
                this.$refs.image[0].clientWidth +
                'px; ' +
                parseInt(
                    this.$refs.image[0].clientWidth * window.devicePixelRatio
                ) +
                'px'
        },
    },
}
</script>
