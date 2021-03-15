import https from 'https'

export default function ({ $axios }) {
    $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })

    $axios.onRequest(async config => {
        if (config.method === 'post')
        {
            config.headers['X-CSRF-TOKEN'] = (await $axios.$get('security/csrf')).token
            return config
        }

        return config
    })
}
