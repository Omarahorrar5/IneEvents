<template>
    <!-- Events Grid using Home page card style -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
            v-for="event in events" 
            :key="event.id"
            class="relative group"
        >
            <router-link
                :to="`/event/${event.id}`"
                class="flex flex-col w-full max-w-sm h-[26rem] bg-white rounded shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1 no-underline text-inherit"
            >    
                <!-- Fixed height image with overlays -->
                <div class="relative w-full h-36 bg-top bg-cover rounded-t shrink-0" :style="`background-image: url(${event.image_path})`">
                    <div class="absolute bottom-2 left-2 bg-gray-800 bg-opacity-80 text-white text-xs px-2 py-1 rounded font-bold">
                        {{ event.type }}
                    </div>

                    <!-- Register button at top right (always registered on this page) -->
                    <button 
                        @click.prevent="$emit('toggleRegister', event)"
                        class="absolute top-2 right-2 w-10 h-10 bg-gray-800 bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all duration-200"
                    >
                        <svg 
                            class="w-4 h-4 transition-colors duration-200 text-blue-500"
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                        </svg>
                    </button>
                </div>
                
                <div class="flex flex-col w-full md:flex-row flex-grow overflow-hidden">
                    <!-- Date column -->
                    <div class="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded md:flex-col md:items-center md:justify-center md:w-1/4 shrink-0">
                        <div class="md:text-3xl">{{ formatMonth(event.date) }}</div>
                        <div class="md:text-6xl">{{ formatDay(event.date) }}</div>
                        <div class="md:text-xl">{{ formatTime(event.date) }}</div>
                    </div>
                    <!-- Text content -->
                    <div class="p-4 font-normal text-gray-800 md:w-3/4 flex flex-col overflow-hidden">
                        <h1 class="mb-2 text-2xl font-bold leading-tight tracking-tight text-gray-800">
                            {{ event.title }}
                        </h1>
                        <p class="text-sm leading-snug text-gray-700 overflow-hidden" style="max-height: 4.5rem">
                            {{ event.description }}
                        </p>
                       
                        <div class="mt-auto pt-2 text-sm font-medium text-gray-600 truncate">
                            {{ event.city }}
                        </div>
                        
                        <!-- Registered time indicator -->
                        <div class="mt-1 text-xs text-gray-500 flex items-center">
                            <svg class="w-3 h-3 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                            </svg>
                            Registered {{ formatRelativeTime(event.registered_at) }}
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
defineProps({
    events: {
        type: Array,
        required: true
    }
})

// Emits
defineEmits(['toggleRegister', 'shareEvent'])

// Methods
const formatDate = (dateString) => {
    return new Date(dateString)
}

const formatMonth = (dateString) => {
    return new Date(dateString).toLocaleString('default', { month: 'short' })
}

const formatDay = (dateString) => {
    return new Date(dateString).getDate()
}

const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const formatRelativeTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)
    
    if (diffInSeconds < 60) return 'just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
    
    return date.toLocaleDateString()
}
</script>