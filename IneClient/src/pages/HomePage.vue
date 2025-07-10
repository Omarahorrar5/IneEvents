<template>
    <div class="h-screen bg-hero m-0 p-0 overflow-x-hidden">
        <InnerNavbar />

        <Hero @search="handleSearch" @open-add-event="openAddEventDialog"/>

        <div class="flex gap-5">
            <Filters @filters-changed="handleFiltersChanged"/>
            <Events :searchTerm="searchTerm" :filters="filters"/>
        </div>
       
        <AddEventDialog 
          :isOpen="isAddEventDialogOpen" 
          @close="closeAddEventDialog"
        />
    </div>
</template>

<script setup>
import InnerNavbar from '../components/Home/InnerNavbar.vue';
import Hero from '../components/Home/Hero.vue';
import Events from '../components/Home/Events.vue';
import Filters from '../components/Home/Filters.vue';
import AddEventDialog from '../components/Event/AddEventDialog.vue';
import { ref } from 'vue'

const searchTerm = ref('')
const isAddEventDialogOpen = ref(false)
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

const openAddEventDialog = () => {
    isAddEventDialogOpen.value = true
}

const closeAddEventDialog = () => {
    isAddEventDialogOpen.value = false
}
</script>