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
    methods: {
        clearCityName() {
            this.cityName = '';
        },
        loadDetailOfCity() {
            this.cityDetail.city = this.cityName;
            this.$emit('loadDetailOfCity', this.cityDetail);
        }
    }

}
</script>

<style>

</style>