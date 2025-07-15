<template>
  <div class="h-screen bg-hero m-0 p-0 overflow-x-hidden">
    <Navbar />
    
    <AboutHero />

    <AboutMission />
    
    <AboutFeatures />
    
    <AboutFooter />
  </div>
</template>

<script setup>
import Navbar from '../components/Landing/Navbar.vue';
import AboutHero from '../components/About/AboutHero.vue';
import AboutMission from '../components/About/AboutMission.vue';
import AboutFeatures from '../components/About/AboutFeatures.vue';
import AboutFooter from '../components/About/AboutFooter.vue';
</script>