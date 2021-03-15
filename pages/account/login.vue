<template>
    <div class="flex flex-col flex-grow justify-center items-center">
        <app-card class="w-full md:w-1/3 mx-auto">
            <form class="flex flex-col" @submit.prevent="userLogin">
                <div class="flex flex-col space-y-5 p-5">
                    <h1 class="text-bold text-2xl">{{ $t('Login') }}</h1>
                    <div
                        v-if="errors.other && errors.other.length"
                        class="border border-red-300 bg-red-200 text-red-900 rounded p-3"
                    >
                        <ul>
                            <li v-for="error in errors.other">{{ error }}</li>
                        </ul>
                    </div>
                    <app-input
                        v-model="login.email"
                        autocomplete="email"
                        type="email"
                        placeholder="me@example.com"
                        required
                        :label="$t('Email')"
                        name="email"
                        :error="errors.email"
                    />
                    <app-input
                        v-model="login.password"
                        autocomplete="current-password"
                        type="password"
                        required
                        :label="$t('Password')"
                        name="password"
                        :error="errors.password"
                    />
                </div>
                <div
                    class="-mx-1 mt-4 p-5 justify-between items-center flex flex-col md:flex-row bg-gray-200 dark:bg-gray-800"
                >
                    <div class="flex flex-col">
                        <nuxt-link to="/account/create"
                            >{{ $t("Don't have an account?") }}</nuxt-link
                        >
                        <nuxt-link to="/account/password/forgot">{{
                            $t('Forgot password?')
                        }}</nuxt-link>
                    </div>

                    <app-button
                        type="submit"
                        class="w-full md:w-1/3 dark:bg-blue-400 bg-blue-700 dark:text-white text-gray-100"
                        icon="sign-in-alt"
                        size="large"
                    >
                        {{ $t('Sign in') }}
                    </app-button>
                </div>
            </form>
        </app-card>
        <div class="text-center text-white my-3">{{ $t('OR') }}</div>
        <app-card
            class="w-full md:w-1/3 mx-auto p-5 grid grid-cols-1 md:grid-cols-2"
        >
            <app-button
                :icon="['fab', 'google']"
                size="large"
                class="bg-white text-gray-900 border-gray-300"
            >
                Google
            </app-button>
            <app-button
                :icon="['fab', 'twitter']"
                size="large"
                class="bg-blue-500 text-gray-100"
            >
                Twitter
            </app-button>
            <app-button
                :icon="['fab', 'facebook']"
                size="large"
                text="text-white"
                class="bg-indigo-500 text-gray-100"
            >
                Facebook
            </app-button>
            <app-button
                :icon="['fab', 'vk']"
                size="large"
                class="bg-blue-600 text-gray-100"
            >
                {{ $t('VK') }}
            </app-button>
        </app-card>
    </div>
</template>

<script>
export default {
    auth: 'guest',
    name: 'Login',
    data() {
        return {
            login: {
                email: '',
                password: '',
            },
            errors: {
                email: [],
                password: [],
                other: [],
            },
        }
    },
    mounted() {
        if (process.env.NODE_ENV === 'development') {
            this.login = {
                email: 'test1@endiaries.test',
                password: 'secret',
            };
        }
    },
    methods: {
        async userLogin() {
            this.errors = {
                email: [],
                password: [],
                other: [],
            }

            try {
                const response = await this.$axios.post('account/login', this.login)
                const data = response.data

                await this.$router.push({
                    path: this.$route.query.intended ?? '/feed',
                })

                console.log('succ', data)
            } catch (err) {
                const { response } = err
                console.log('err', err, response)

                if (response?.data?.errors)
                    for (const [field, errors] of Object.entries(
                        err.response.data.errors
                    )) {
                        if (this.errors[field]) this.errors[field] = errors
                        else {
                            this.errors.other.push(...errors)
                        }
                    }
            }
        },
    },
}
</script>
