import https from 'https'

export default async (context, locale) => {
    context.$axios.defaults.httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    })
    return (await context.$axios.get(`i18n/${locale}.json`)).data
}
