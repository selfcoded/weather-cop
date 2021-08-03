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
        }
    }

}
</script>

<style>

</style>