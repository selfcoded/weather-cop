<template>
    <div>
        <div v-touch:swipe.bottom="swipeHandler" class="pull-to-refresh"></div>
        <div v-if="isLoading" class="loader-container">
            <Loader />
        </div>
    </div>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from './Loader.vue'

export default {
    components: {
        Loader
    },
    data() {
        return {
            isLoading: false
        }
    },
    computed: {
        ...mapGetters(['getCityName','getLoadingDataStatus']),
    },
    methods: {
        ...mapActions(['searchCity']),
        async swipeHandler() {
            this.isLoading = true;
            if(Boolean(this.getCityName) && this.getCityName.length > 0 ) {
                await this.searchCity({ city:this.getCityName, refresh:true });
                this.isLoading = this.getLoadingDataStatus;
            }else{
                setTimeout(() => {
                    this.isLoading = false;
                }, 300);
            }
        }
    }

}
</script>

<style>
</style>