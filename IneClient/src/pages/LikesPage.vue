<template>
    <div class="h-screen bg-gradient-to-b from-surface to-[#000D19] m-0 p-0 overflow-x-hidden">
        <TopBar />

        <!-- Liked Events Content -->
        <div class="container mx-auto px-6 py-8">
            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center items-center py-20">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>

            <!-- Empty State -->
            <div v-else-if="likedEvents.length === 0" class="text-center py-20 bg-card rounded-lg">
                <h3 class="text-2xl font-medium text-textMain mb-6">No liked events yet</h3>
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

            <!-- Liked Events -->
            <div v-else>
                <div class="mb-6 flex justify-between items-center">
                    <h2 class="text-2xl font-semibold text-textMain flex items-center gap-2">
                        <svg class="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        {{ likedEvents.length }} Liked Event{{ likedEvents.length !== 1 ? 's' : '' }}
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
                    @toggleLike="toggleLike"
                    @shareEvent="shareEvent"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import TopBar from '../components/Likes/TopBar.vue'
import EventsGrid from '../components/Likes/EventsGrid.vue'

import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// Reactive data
const likedEvents = ref([])
const loading = ref(true)
const sortBy = ref('recent') // 'recent' or 'title'

// Computed properties
const sortedEvents = computed(() => {
    if (sortBy.value === 'recent') {
        return [...likedEvents.value].sort((a, b) => new Date(b.liked_at) - new Date(a.liked_at))
    } else {
        return [...likedEvents.value].sort((a, b) => a.title.localeCompare(b.title))
    }
})

// Methods
const fetchLikedEvents = async () => {
    try {
        loading.value = true
        const response = await axios.get('http://localhost:5000/api/events/liked')
        likedEvents.value = response.data.likedEvents
    } catch (error) {
        console.error('Error fetching liked events:', error)
        // You might want to show a toast notification here
    } finally {
        loading.value = false
    }
}

const toggleLike = async (event) => {
    try {
        await axios.post(`http://localhost:5000/api/events/${event.id}/like`)
        // Remove the event from the liked events list
        likedEvents.value = likedEvents.value.filter(e => e.id !== event.id)
    } catch (error) {
        console.error('Error unliking event:', error)
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
    fetchLikedEvents()
})
</script>