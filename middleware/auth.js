const routeOption = (route, key, value) => {
    return route.matched.some((m) => {
        if (process.browser) {
            // Browser
            return Object.values(m.components).some(
                (component) =>
                    component.options && component.options[key] === value
            )
        } else {
            // SSR
            return Object.values(m.components).some((component) =>
                Object.values(component._Ctor).some(
                    (ctor) => ctor.options && ctor.options[key] === value
                )
            )
        }
    })
}

export default async function (context) {
    const { redirect, $axios, store, route } = context

    if (store.state.auth.loggedIn != null) return

    try {
        const response = await $axios.get('account/current')
        const user = response.data

        if (user) {
            store.commit('auth/setUser', user)
            store.commit('auth/setLoggedIn', true)

            if (routeOption(route, 'auth', 'guest'))
                return redirect(302, '/feed')
        }
    } catch (e) {
        store.commit('auth/setUser', null)
        store.commit('auth/setLoggedIn', false)

        if (
            !routeOption(route, 'auth', 'guest') &&
            !routeOption(route, 'auth', false)
        )
            return redirect(302, '/account/login', {
                intended: route.fullPath,
            })
    }
}
