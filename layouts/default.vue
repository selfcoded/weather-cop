<template>
    <div>
        <PullToRefresh />
        <div class="body-container">
            <Nuxt />
        </div>
    </div>
</template>

<script>
import PullToRefresh from '../components/PullToRefresh.vue'

export default {
    components: {
        PullToRefresh
    }

}
</script>

<style>

</style>