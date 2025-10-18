<template>
  <nav class="w-full px-10 py-10 flex justify-between items-center min-h-20 md:min-h-24 bg-gradient-to-b from-surface to-[#151B33]">
    <router-link to="/home" class="bg-white/10 border border-white/20 rounded-xl p-3 flex items-center justify-center w-12 h-12 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md group" aria-label="Go back">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition-transform duration-200 group-hover:-translate-x-0.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </router-link>
    
    <button 
      @click="toggleLike" 
      :class="['bg-white/10 border border-white/20 rounded-xl p-3 flex items-center justify-center w-12 h-12 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md group', { 'liked': isLiked }]"
      :disabled="isLoading"
      aria-label="Like"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        :fill="isLiked ? '#ef4444' : 'none'" 
        :stroke="isLiked ? '#ef4444' : 'currentColor'" 
        stroke-width="2" 
        class="transition-all duration-200 group-hover:scale-110"
        :class="{ 'group-hover:fill-red-500 group-hover:stroke-red-500': !isLiked }"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isLiked = ref(false)
const isLoading = ref(false)

// Get event ID from route params
const eventId = route.params.id

// Check like status when component mounts
onMounted(async () => {
  console.log('Component mounted, checking like status for event:', eventId)
  await checkLikeStatus()
})

// Function to check if user has liked this event
const checkLikeStatus = async () => {
  try {
    console.log('Fetching like status...')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}/like-status`)
    
    if (response.ok) {
      const data = await response.json()
      console.log('Like status response:', data)
      isLiked.value = data.liked
    } else {
      console.error('Failed to fetch like status:', response.status, response.statusText)
    }
  } catch (error) {
    console.error('Error checking like status:', error)
  }
}

// Function to toggle like/unlike
const toggleLike = async () => {
  if (isLoading.value) return
  
  console.log('Toggling like, current state:', isLiked.value)
  isLoading.value = true
  
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('Toggle like response:', data)
      isLiked.value = data.liked
      console.log('New like state:', isLiked.value)
    } else {
      console.error('Error toggling like:', response.status, response.statusText)
      const errorData = await response.text()
      console.error('Error response:', errorData)
    }
  } catch (error) {
    console.error('Error toggling like:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.liked svg {
  fill: #ef4444 !important;
  stroke: #ef4444 !important;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  nav {
    padding: 12px 16px;
    min-height: 70px;
  }
  
  button {
    width: 44px;
    height: 44px;
    padding: 10px;
  }
}
</style>