<template>
    <div class="header-container">
        <div v-if="getError">{{staticData.cityNoExist}}</div>
        <div v-else-if="!Boolean(getCityName) || typeof getCityData == 'undefined'">{{staticData.addACity}}</div>
        <div v-else class="header-wrapper">
            <div class="header-left"><img :src="imgSrc"></div>
            <div class="header-right">
                <div >{{staticData.city}}: {{getCityName}}</div>
                <div>
                    <span>{{staticData.temp}}: {{toCelsisus}}&#x00B0;</span>
                    <span>{{staticData.humidity}}: {{getCityData.main.humidity}}</span>
                    <div>{{staticData.description}}: {{getCityData.weather[0].description}}</div>
                </div>
            </div>
        </div>
  </div>
  
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            staticData: {
                city: 'city',
                temp: 'temp',
                humidity: 'humidity',
                description: 'description',
                cityNoExist: "The city doesn't exist",
                addACity: 'Please add a city'
            },
            imgSrc: ''
        }
    },
    computed: {
        ...mapGetters(['getList','getCityData','getCityName','getLoadingDataStatus','getError']),
        toCelsisus() {
            return (this.getCityData.main.temp - 273.15).toFixed(2)
        },
    },
    watch: {
        getCityData(value) {
            if (Boolean(value) && value.weather[0].description.includes('clouds')) this.imgSrc = require('../static/images/cloudy.gif');
            else if (Boolean(value) && value.weather[0].description.includes('rain')) this.imgSrc = require('../static/images/rainy.gif');
            else this.imgSrc = require('../static/images/sunny.gif');
        }
    },
    async created() {
        if(this.getCityName) {
            const payload = { city:this.getCityName, refresh:false };
            await this.searchCity(payload);
        }
    },
    methods: {
        ...mapActions(['searchCity'])
    }

}
</script>

<style>

</style>