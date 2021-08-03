<template>
    <div class="header-container">
        <div class="header-wrapper">
            <div class="header-right">
                <div >{{staticData.city}}: </div>
                <div>
                    <span>{{staticData.temp}}: &#x00B0;</span>
                    <span>{{staticData.humidity}}: </span>
                    <div>{{staticData.description}}: </div>
                </div>
            </div>
        </div>
  </div>
  
</template>

<script>
export default {
    data() {
        return {
            staticData: {
                city: 'city',
                temp: 'temp',
                humidity: 'humidity',
                description: 'description'
            }
        }
    }

}
</script>

<style>

</style>