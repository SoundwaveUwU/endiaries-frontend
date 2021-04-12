<template>
    <div class="max-w-full">
        <h1>Sessions</h1>
        <div class="max-w-full overflow-auto">
            <table
                class="dark:bg-gray-800 bg-gray-200 overflow-hidden rounded w-full">
                <thead class="dark:bg-gray-700 bg-gray-100">
                    <tr>
                        <th class="px-3 py-2">
                            {{ $t('Device') }} / {{ $t('OS') }} / {{ $t('Browser') }}
                        </th>
                        <th class="px-3 py-2">
                            {{ $t('Location') }}
                        </th>
                        <th class="px-3 py-2">
                            {{ $t('IP') }}
                        </th>
                        <th class="px-3 py-2">
                            {{ $t('Logged in at') }}
                        </th>
                        <th class="px-3 py-2" />
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="session in sessions.data"
                        :key="session.id"
                        class="border-t-2 border-gray-300 dark:border-gray-700">
                        <td class="px-3 py-2 flex space-x-3 py-3 text-3xl">
                            <span :class="getDeviceIcon(session)" />
                            <span :class="getPlatformIcon(session)" />
                            <span :class="getBrowserIcon(session)" />
                        </td>
                        <td class="px-3 py-2">
                            Moscow, Russia
                        </td>
                        <td class="px-3 py-2">
                            127.***.***.1
                        </td>
                        <td class="p-3" :title="session.created_at">
                            {{ session.created_at_human_readable }}
                        </td>
                        <td class="px-3 py-2">
                            <app-button
                                :title="$t('Log out')"
                                class="dark:text-gray-300 dark:hover:text-white text-gray-700 hover:text-black">
                                <span class="fa fa-sign-out-alt" />
                            </app-button>
                        </td>
                    </tr>
                    <tr v-if="sessions.links.next !== null">
                        <td colspan="99" align="center" class="p-5">
                            <app-button
                                class="dark:bg-gray-700 bg-gray-300 w-1/3"
                                @click="loadNextPage">
                                {{ $t('Load older sessions') }}
                            </app-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="py-5">
            <app-button
                class="dark:bg-gray-700 bg-gray-300"
                size="large"
                icon="sign-out-alt">
                {{ $t('Logout everywhere else') }}
            </app-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AccountSessions',
    layout: 'account',
    middleware: 'auth',
    data () {
        return {
            sessions: {
                data: [],
                links: {
                    next: null
                }
            }
        }
    },
    async fetch () {
        await this.$axios
            .get('account/sessions')
            .then(res => (this.sessions = res.data))
    },
    methods: {
        getDeviceIcon (session) {
            const nameToIcon = {
                desktop: 'fas fa-desktop',
                phone: 'fas fa-mobile-alt',
                tablet: 'fas fa-tablet-alt',
                other: 'far fa-question-circle'
            }

            return nameToIcon[session.device]
        },
        getPlatformIcon (session) {
            const nameToIcon = {
                windows: 'fab fa-windows',
                linux: 'fab fa-linux',
                apple: 'fab fa-apple',
                android: 'fab fa-android',
                other: 'far fa-question-circle'
            }

            return nameToIcon[session.platform]
        },
        getBrowserIcon (session) {
            const nameToIcon = {
                chrome: 'fab fa-chrome',
                firefox: 'fab fa-firefox',
                safari: 'fab fa-safari',
                edge: 'fab fa-edge',
                'internet-explorer': 'fab fa-internet-explorer',
                other: 'question-circle'
            }

            return nameToIcon[session.browser]
        },
        async loadNextPage () {
            if (this.sessions.links.next == null) { return }

            await this.$axios.get(this.sessions.links.next).then(({ data }) => {
                this.sessions.data.push(...data.data)
                this.sessions.links.next = data.links.next
            })
        }
    }
}
</script>
