<template>
    <div class="list-container">
        <div class="popup-wrapper">
            <button 
            :class="{ 'btn-typed': isToggled }" 
            @click="openList()">{{staticData.addCity}}
                <i class="fa" 
                :class="{ 'fa-caret-down': !isToggled, 'fa-caret-up': isToggled }" 
                aria-hidden="true"></i>
            </button>
            <AddCity :is-toggled="isToggled" />
        </div>
        <div class="city-list-title">{{staticData.history}}</div>
        <div v-if="!getLoadingDataStatus"  class="city-list-wrapper">
            <div v-if="getList !== null || (Boolean($cookies.get('cities')) && Object.keys($cookies.get('cities')).length > 0) " class="city-list">
                <div v-for="(city, index) in initList" :key="`list-${index}`"  class="city-item">
                    <div  class="city-name">
                        <span>{{city.city}} --</span>
                        <span>{{city.temp}}&#x00B0;</span>
                        </div>
                    <button @click="toHeader(city.city)">{{staticData.refresh}}</button>
                    <button @click="removeFromList(city.city)">{{staticData.delete}}</button>
                </div>
            </div>
            <div v-else class="city-list">{{staticData.noCities}}</div>
        </div>
        <div v-else>
          <Loader />
        </div>
    </div>
</template>

<script>
import AddCity from '@/components/AddCity.vue'
import Loader from '@/components/Loader.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
    components: {
        AddCity,
        Loader
    },
    data() {
        return {
            staticData: {
                addCity: 'add city',
                history: 'history',
                noCities: 'no cities',
                refresh: 'refresh',
                delete: 'delete'
            },
            cities: [],
            isToggled: false
        } 
    },
    computed: {
        ...mapGetters(['getList','getCityData','getCityName','getLoadingDataStatus']),
        initList() {
            return this.getList === null && Boolean(this.$cookies.get('cities')) ? this.$cookies.get('cities') : this.getList
        }
    },
    methods: {
        ...mapActions(['searchCity']),
        openList () {
            this.isToggled = !this.isToggled;
        },
        async toHeader (city) {
            const payload = {city, refresh:false}
            await this.searchCity(payload);
        },
        async removeFromList(removeCity) {
            const cityArray = Object.values(this.$cookies.get('cities'));
            const newArray = cityArray.filter(city => city.city !== removeCity);
            this.$cookies.set('cities', JSON.stringify(newArray), { path: '/', maxAge: 60 * 60 * 24 * 7 })
            const payload = newArray.length > 0 ? { city:newArray[0].city, refresh:true } : { city:undefined, refresh:true }
            await this.searchCity(payload);
        }
    },
}
</script>

<style>

</style>