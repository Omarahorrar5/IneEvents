<template>
  <div class="relative group">
    <router-link
      :to="`/event/${id}`"
      class="flex flex-col w-full max-w-xs h-[26rem] bg-white rounded shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1 no-underline text-inherit"
    >    
      <!-- Fixed height image with overlays -->
      <div class="relative w-full h-36 bg-top bg-cover rounded-t shrink-0" :style="`background-image: url(${image})`">
        <div class="absolute bottom-2 left-2 bg-gray-800 bg-opacity-80 text-white text-xs px-2 py-1 rounded font-bold">
          {{ type }}
        </div>

        <!-- Like button at top right -->
        <button 
          @click.prevent="toggleLike"
          :disabled="likingInProgress"
          class="absolute top-2 right-2 w-10 h-10 bg-gray-800 bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all duration-200 disabled:opacity-50"
        >
          <svg 
            class="w-4 h-4 transition-colors duration-200" 
            :class="isLiked ? 'text-red-500' : 'text-white'"
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
      
      <div class="flex flex-col w-full md:flex-row flex-grow overflow-hidden">
        <!-- Date column -->
        <div class="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded md:flex-col md:items-center md:justify-center md:w-1/4 shrink-0">
          <div class="md:text-3xl">{{ formattedMonth }}</div>
          <div class="md:text-6xl">{{ formattedDay }}</div>
          <div class="md:text-xl">{{ formattedTime }}</div>
        </div>
        <!-- Text content -->
        <div class="p-4 font-normal text-gray-800 md:w-3/4 flex flex-col overflow-hidden">
          <h1 class="mb-2 text-2xl font-bold leading-tight tracking-tight text-gray-800">
            {{ title }}
          </h1>
          <p class="text-sm leading-snug text-gray-700 overflow-hidden" style="max-height: 4.5rem">
            {{ description }}
          </p>
         
          <div class="mt-auto pt-2 text-sm font-medium text-gray-600 truncate">
            {{ location }}
          </div>
        </div>
      </div>
    </router-link>

    <!-- Three-dot menu button -->
    <div class="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <div class="relative">
        <button 
          @click.prevent="toggleDropdown"
          class="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
          </svg>
        </button>

        <!-- Dropdown menu -->
        <div 
          v-if="showDropdown"
          class="absolute bottom-full right-0 mb-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
        >
        
          <button
            @click="handleEdit"
            class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            Edit
          </button>

          <button
            @click="handleDelete"
            class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            Delete
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

const props = defineProps({
  id: [String, Number],
  title: String,
  image: String,
  description: String,
  location: String,
  date: String,
  type: String,
  liked: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['edit', 'delete', 'like'])

const showDropdown = ref(false)
const isLiked = ref(props.liked)
const likingInProgress = ref(false)

const formattedDate = computed(() => new Date(props.date))
const formattedMonth = computed(() => formattedDate.value.toLocaleString('default', { month: 'short' }))
const formattedDay = computed(() => formattedDate.value.getDate())
const formattedTime = computed(() => formattedDate.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const toggleLike = async () => {
  if (likingInProgress.value) return
  
  likingInProgress.value = true
  const previousState = isLiked.value
  
  // Optimistic update
  isLiked.value = !isLiked.value
  
  try {
    const response = await axios.post(`http://localhost:5000/api/events/${props.id}/like`)
    
    // Update with server response
    isLiked.value = response.data.liked
    
    // Emit the like event to parent component
    emit('like', { 
      id: props.id, 
      liked: response.data.liked,
      message: response.data.message 
    })
    
  } catch (error) {
    // Revert on error
    isLiked.value = previousState
    console.error('Error toggling like:', error)
    
    // You can emit an error event or show a toast notification here
    emit('like-error', { 
      id: props.id, 
      error: error.response?.data?.message || 'Failed to update like status' 
    })
  } finally {
    likingInProgress.value = false
  }
}

const handleEdit = () => {
  showDropdown.value = false
  emit('edit', props.id)
}

const handleDelete = () => {
  showDropdown.value = false
  emit('delete', props.id)
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showDropdown.value = false
  }
}

// Watch for prop changes
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  isLiked.value = props.liked
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>