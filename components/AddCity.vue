<template>
    <div id="selectedCityPopup" :class="{ 'show' : isToggled}">
        <input id="popupInput" v-model="cityName" type="text">
        <div class="btn-wrapper">
            <button>{{staticData.clear}}</button>
            <button>{{staticData.done}}</button>
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
            
        }
    },
    methods: {
        clearCityName() {
            this.cityName = '';
        },
    }

}
</script>

<style>

</style>