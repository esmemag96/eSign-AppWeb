<template>
    <div class="row logoWrapper">
        <router-link class="" :to="{ name: 'home', params: {} }">
            <!-- <div class="col text-left logoContainer">
                <img class="logo" src="https://f1.pngfuel.com/png/236/60/896/payment-icon-blockchain-bitcoin-symbol-icon-design-text-line-technology-png-clip-art.png" alt="">
            </div> -->
        </router-link>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.logo{
    width: 22em;
    margin-left: 4em;
}
.logoWrapper{
    background-color: #2dc596a1;
    height: 8em;
    margin-bottom: 2em;
    max-width: 105%;
}
</style>

