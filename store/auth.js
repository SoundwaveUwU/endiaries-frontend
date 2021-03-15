export const state = () => ({
    loggedIn: null,
    user: null,
})

export const getters = {
    loggedIn(state) {
        return state.loggedIn
    },
    user(state) {
        return state.user
    },
}

export const mutations = {
    setUser(state, user) {
        state.user = user
    },
    setLoggedIn(state, loggedIn) {
        state.loggedIn = loggedIn
    },
}
