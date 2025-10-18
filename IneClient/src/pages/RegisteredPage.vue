<template>
    <div class="h-screen bg-gradient-to-b from-surface to-[#000D19] m-0 p-0 overflow-x-hidden">
        <TopBar />

        <!-- Registered Events Content -->
        <div class="container mx-auto px-6 py-8">
            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center items-center py-20">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>

            <!-- Empty State -->
            <div v-else-if="registeredEvents.length === 0" class="text-center py-20 bg-card rounded-lg">
                <h3 class="text-2xl font-medium text-textMain mb-6">No registered events yet</h3>
                <router-link 
                    to="/home" 
                    class="inline-flex items-center gap-2 px-6 py-3 text-dark bg-primary font-semibold rounded-lg hover:bg-secondary transition-colors"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                    Browse Events
                </router-link>
            </div>

            <!-- Registered Events -->
            <div v-else>
                <div class="mb-6 flex justify-between items-center">
                    <h2 class="text-2xl font-semibold text-textMain flex items-center gap-2">
                        <svg class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                        </svg>
                        {{ registeredEvents.length }} Registered Event {{ registeredEvents.length !== 1 ? 's' : '' }}
                    </h2>
                    <div class="flex gap-2">
                        <button 
                            @click="sortBy = 'recent'"
                            :class="['px-4 py-2 rounded-lg transition-colors font-medium', sortBy === 'recent' ? 'bg-primary text-dark' : 'bg-surface text-textMain border border-primary hover:bg-primary hover:text-dark']"
                        >
                            Most Recent
                        </button>
                        <button 
                            @click="sortBy = 'title'"
                            :class="['px-4 py-2 rounded-lg transition-colors font-medium', sortBy === 'title' ? 'bg-primary text-dark' : 'bg-surface text-textMain border border-primary hover:bg-primary hover:text-dark']"
                        >
                            A-Z
                        </button>
                    </div>
                </div>

                <!-- Events Grid using same layout as Home page -->
                <EventsGrid 
                    :events="sortedEvents"
                    @toggleRegister="toggleRegister"
                    @shareEvent="shareEvent"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import TopBar from '../components/Registered/TopBar.vue'
import EventsGrid from '../components/Registered/EventsGrid.vue'

import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// Reactive data
const registeredEvents = ref([])
const loading = ref(true)
const sortBy = ref('recent') // 'recent' or 'title'

// Computed properties
const sortedEvents = computed(() => {
    if (sortBy.value === 'recent') {
        return [...registeredEvents.value].sort((a, b) => new Date(b.registered_at) - new Date(a.registered_at))
    } else {
        return [...registeredEvents.value].sort((a, b) => a.title.localeCompare(b.title))
    }
})

// Methods
const fetchRegisteredEvents = async () => {
    try {
        loading.value = true
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/events/registered`)
        registeredEvents.value = response.data.events
    } catch (error) {
        console.error('Error fetching registered events:', error)
        // You might want to show a toast notification here
    } finally {
        loading.value = false
    }
}

const toggleRegister = async (event) => {
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/events/${event.id}/register`)
        // Remove the event from the registered events list
        registeredEvents.value = registeredEvents.value.filter(e => e.id !== event.id)
    } catch (error) {
        console.error('Error unregistering from event:', error)
        // You might want to show a toast notification here
    }
}

const shareEvent = (event) => {
    if (navigator.share) {
        navigator.share({
            title: event.title,
            text: event.description,
            url: `${window.location.origin}/events/${event.id}`
        })
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`${window.location.origin}/events/${event.id}`)
        // You might want to show a toast notification here
    }
}

// Lifecycle
onMounted(() => {
    fetchRegisteredEvents()
})
</script>