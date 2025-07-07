<template>
    <div class="h-screen bg-hero m-0 p-0 overflow-x-hidden">
        <InnerNavbar />

        <Hero @search="handleSearch"/>

        <div class="flex gap-5">
            <Filters @filters-changed="handleFiltersChanged"/>
            <Events :searchTerm="searchTerm" :filters="filters"/>
        </div>
    </div>
</template>

<script setup>
import InnerNavbar from '../components/Home/InnerNavbar.vue';
import Hero from '../components/Home/Hero.vue';
import Events from '../components/Home/Events.vue';
import Filters from '../components/Home/Filters.vue';

import { ref } from 'vue'

const searchTerm = ref('')

const filters = ref({
    type: 'All',
    city: 'All',
    school: 'All',
    date: '',
})

const handleSearch = (term) => {
    searchTerm.value = term
}

const handleFiltersChanged = (newFilters) => {
    filters.value = newFilters
}

</script>