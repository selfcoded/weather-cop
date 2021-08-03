<template>
    <div id="selectedCityPopup" :class="{ 'show' : isToggled}">
        <input id="popupInput" v-model="cityName" type="text">
        <div class="btn-wrapper">
            <button @click="clearCityName()">{{staticData.clear}}</button>
            <button @click="loadDetailOfCity()">{{staticData.done}}</button>
        </div>
  </div>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    props: {
        'isToggled': Boolean
    },
    data() {
        return {
            staticData: {
                clear: 'clear',
                done: 'done'
            },
            cityName: '',
            cityDetail: {
                city: '',
                temp: '30'
            }
            
        }
    },
    computed: {
        ...mapGetters(['getList'])
    },
    methods: {
        ...mapActions(['searchCity']),
        clearCityName() {
            this.cityName = '';
        },
        async loadDetailOfCity() {
            const payload = {city:this.cityName, refresh:false}
            await this.searchCity(payload)
            this.$cookies.set('cities', JSON.stringify(this.getList), { path: '/', maxAge: 60 * 60 * 24 * 7 })
        }
    }

}
</script>

<style>

</style>