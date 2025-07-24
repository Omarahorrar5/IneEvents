<template>
  <div class="bg-hero m-0 p-0 overflow-x-hidden">
    <OuterAboutHero />
    <AboutMission />
    <AboutFeatures />
    <AboutFooter />
  </div>
</template>

<script setup>
import AboutMission from '../components/About/AboutMission.vue';
import AboutFeatures from '../components/About/AboutFeatures.vue';
import AboutFooter from '../components/About/AboutFooter.vue';
import OuterAboutHero from '../components/About/OuterAboutHero.vue';
</script>