<template>
    <div class="h-screen bg-hero m-0 p-0 overflow-x-hidden">
        <InnerNavbar />

        <Hero />

        <div class="flex gap-2">
            <Filters />
            <Events />
        </div>
    </div>
</template>

<script setup>
import InnerNavbar from '../components/Home/InnerNavbar.vue';
import Hero from '../components/Home/Hero.vue'
import Events from '../components/Home/Events.vue';
import Filters from '../components/Home/Filters.vue';
</script>