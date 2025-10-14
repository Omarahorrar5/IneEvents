<template>
    <div class="h-screen bg-gradient-to-b from-surface to-[#000D19] m-0 p-0 overflow-x-hidden">
        <TopBar />

        <!-- Schools Content -->
        <div class="container mx-auto px-6 py-8">
            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center items-center py-20">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>

            <!-- Empty State -->
            <div v-else-if="schools.length === 0" class="text-center py-20 bg-card rounded-lg">
                <h3 class="text-2xl font-medium text-textMain mb-6">No schools found</h3>
                <router-link 
                    to="/home" 
                    class="inline-flex items-center gap-2 px-6 py-3 text-dark bg-primary font-semibold rounded-lg hover:bg-secondary transition-colors"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2zM9 22V12h6v10"/>
                    </svg>
                    Browse Events
                </router-link>
            </div>

            <!-- Schools List -->
            <div v-else>
                <div class="mb-6 flex justify-between items-center">
                    <h2 class="text-2xl font-semibold text-textMain flex items-center gap-2">
                        <svg class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M5,5H19V4H5M5,8H15V7H5M5,11H19V10H5M5,14H15V13H5M5,17H19V16H5M2,20V18H4V20M11,20V18H13V20M20,20V18H22V20"/>
                        </svg>
                        {{ schools.length }} School{{ schools.length !== 1 ? 's' : '' }}
                    </h2>
                    <div class="flex gap-2">
                        <button 
                            @click="sortBy = 'name'"
                            :class="['px-4 py-2 rounded-lg transition-colors font-medium', sortBy === 'name' ? 'bg-primary text-dark' : 'bg-surface text-textMain border border-primary hover:bg-primary hover:text-dark']"
                        >
                            A-Z
                        </button>
                        <button 
                            @click="sortBy = 'city'"
                            :class="['px-4 py-2 rounded-lg transition-colors font-medium', sortBy === 'city' ? 'bg-primary text-dark' : 'bg-surface text-textMain border border-primary hover:bg-primary hover:text-dark']"
                        >
                            By City
                        </button>
                    </div>
                </div>

                <!-- Schools Grid -->
                <SchoolsGrid 
                    :schools="sortedSchools"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import TopBar from '../components/Schools/TopBar.vue'
import SchoolsGrid from '../components/Schools/SchoolsGrid.vue'

import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// Reactive data
const schools = ref([])
const loading = ref(true)
const sortBy = ref('name') // 'name' or 'city'

// Computed properties
const sortedSchools = computed(() => {
    if (sortBy.value === 'name') {
        return [...schools.value].sort((a, b) => a.school.localeCompare(b.school))
    } else {
        return [...schools.value].sort((a, b) => a.city.localeCompare(b.city))
    }
})

const fetchSchools = async () => {
    try {
        loading.value = true
        const response = await axios.get('http://localhost:5000/api/schools')
        schools.value = response.data
    } catch (error) {
        console.error('Error fetching schools:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchSchools()
})
</script>