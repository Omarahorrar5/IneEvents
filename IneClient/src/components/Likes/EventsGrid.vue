<template>
    <!-- Events Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
            v-for="event in events" 
            :key="event.id"
            class="bg-surface rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-700"
        >
            <!-- Event Image -->
            <div class="h-48 bg-gradient-to-r from-primary to-secondary relative">
                <img 
                    v-if="event.image_url" 
                    :src="event.image_url" 
                    :alt="event.title"
                    class="w-full h-full object-cover"
                />
                <div class="absolute top-4 right-4">
                    <button 
                        @click="$emit('toggleLike', event)"
                        class="bg-surface rounded-full p-2 shadow-md hover:shadow-lg transition-all hover:scale-110"
                        title="Unlike this event"
                    >
                        <svg class="h-5 w-5 text-red-500 hover:text-red-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </button>
                </div>
                <div class="absolute bottom-4 left-4">
                    <span class="bg-dark bg-opacity-70 text-textMain px-3 py-1 rounded-full text-sm font-medium">
                        {{ event.type }}
                    </span>
                </div>
            </div>

            <!-- Event Content -->
            <div class="p-6">
                <h3 class="text-xl font-semibold text-textMain mb-2 line-clamp-2">
                    {{ event.title }}
                </h3>
                <p class="text-textMuted mb-4 line-clamp-3">
                    {{ event.description }}
                </p>
                
                <!-- Event Details -->
                <div class="space-y-2 text-sm text-textMuted">
                    <div class="flex items-center">
                        <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        {{ formatDate(event.date) }}
                    </div>
                    <div class="flex items-center">
                        <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        {{ event.city }}
                    </div>
                    <div class="flex items-center">
                        <svg class="h-4 w-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        Liked {{ formatRelativeTime(event.liked_at) }}
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="mt-6 flex gap-2">
                    <router-link 
                        :to="`/events/${event.id}`"
                        class="flex-1 bg-primary text-dark py-2 px-4 rounded-lg hover:bg-secondary transition-colors text-center font-semibold"
                    >
                        View Details
                    </router-link>
                    <button 
                        @click="$emit('shareEvent', event)"
                        class="px-4 py-2 border border-primary text-textMain rounded-lg hover:bg-primary hover:text-dark transition-colors"
                        title="Share this event"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Props
defineProps({
    events: {
        type: Array,
        required: true
    }
})

// Emits
defineEmits(['toggleLike', 'shareEvent'])

// Methods
const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
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

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>