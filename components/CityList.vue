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
        <div v-if="cities.length > 0" class="city-list">
            <div v-for="(city, index) in cities" :key="`list-${index}`"  class="city-item">
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
</template>

<script>
import AddCity from '@/components/AddCity.vue'
export default {
    components: {
        AddCity,
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
            cities: [
                {
                    city: 'lju',
                    temp: '20'
                },
                {
                    city: 'gorica',
                    temp: '20'
                },
                {
                    city: 'koper',
                    temp: '20'
                }
            ],
            isToggled: false
        } 
    },
    methods: {
        openList () {
            this.isToggled = !this.isToggled;
        }
    }
}
</script>

<style>

</style>