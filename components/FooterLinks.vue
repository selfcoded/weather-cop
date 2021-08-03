<template>
    <div>
        <div class="header-container">
            <div class="back-icon"><NuxtLink to="/"><i class="fa fa-arrow-circle-left"></i></NuxtLink></div>
            <div class="title">{{staticData.title}}</div>
            <div v-for="(link, index) in staticData.links" :key="'links' + index" class="links">
                <a :href="`${link.site}`">{{ link.title }}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            staticData: {
                title: 'more links to Nuxt!',
                links: [
                    { title: 'home site', site: 'https://nuxtjs.org/'},
                    { title: 'documentation', site: 'https://nuxtjs.org/docs/2.x/get-started/installation'},
                    { title: 'examples', site: 'https://nuxtjs.org/examples'},
                    { title: 'blog', site: 'https://nuxtjs.org/blog'},
                ]
            }
        }
    }

}
</script>

<style>

</style>