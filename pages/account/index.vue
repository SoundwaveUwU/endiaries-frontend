<template>
    <div>hey</div>
</template>

<script>
export default {
    middleware({ store, redirect }) {
        return redirect('/account/overview')
    },
}
</script>
