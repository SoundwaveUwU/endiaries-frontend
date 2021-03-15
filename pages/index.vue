<template>
    <div>Index page time {{ $store.state.auth.loggedIn }}</div>
</template>

<script>
export default {
    auth: 'guest',
    name: 'IndexVue',
}
</script>
