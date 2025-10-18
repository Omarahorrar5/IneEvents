<template>
  <div class="space-y-4">
    <!-- Register Button (only shown when not registered) -->
    <button
      v-if="!isRegistered"
      @click="register"
      :disabled="isLoading"
      :class="[
        'w-full mt-12 py-4 px-6 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg bg-white text-black hover:bg-gray-100',
        isLoading ? 'opacity-70 cursor-not-allowed' : ''
      ]"
    >
      <span v-if="isLoading" class="flex items-center justify-center">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Registering...
      </span>
      <span v-else>Register Now</span>
    </button>

    <!-- Cancel Registration Button (only shown when registered) -->
    <button
      v-if="isRegistered && !isLoading"
      @click="cancelRegistration"
      :disabled="isLoading"
      class="w-full mt-12 bg-red-500 text-white py-4 px-6 rounded-full font-semibold text-lg hover:bg-red-600 transition-all duration-200 shadow-lg"
    >
      <span class="flex items-center justify-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        Cancel Registration
      </span>
    </button>

    <!-- Status Message -->
    <div v-if="statusMessage" class="text-center">
      <p :class="[
        'text-sm font-medium',
        statusMessage.includes('Successfully') || statusMessage.includes('registered') 
          ? 'text-green-600' 
          : statusMessage.includes('cancelled') || statusMessage.includes('Error')
          ? 'text-red-600'
          : 'text-gray-600'
      ]">
        {{ statusMessage }}
      </p>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isRegistered = ref(false)
const isLoading = ref(false)
const statusMessage = ref('')
const showDebug = ref(true) // Set to false in production

// Get event ID from route params
const eventId = route.params.id

// Check registration status when component mounts
onMounted(async () => {
  console.log('RegisterButton component mounted, checking registration status for event:', eventId)
  await checkRegistrationStatus()
})

// Function to check if user is registered for this event
const checkRegistrationStatus = async () => {
  try {
    console.log('Fetching registration status...')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}/registration-status`)
    
    console.log('Registration status response status:', response.status)
    
    if (response.ok) {
      const data = await response.json()
      console.log('Registration status response:', data)
      isRegistered.value = data.registered
    } else {
      console.error('Failed to fetch registration status:', response.status, response.statusText)
      const errorText = await response.text()
      console.error('Error response body:', errorText)
      statusMessage.value = 'Error loading registration status'
    }
  } catch (error) {
    console.error('Error checking registration status:', error)
    statusMessage.value = 'Error loading registration status'
  }
}

// Function to register for the event
const register = async () => {
  if (isLoading.value) return
  
  console.log('Registering for event...', eventId)
  isLoading.value = true
  statusMessage.value = ''
  
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    console.log('Registration response status:', response.status)
    console.log('Registration response headers:', [...response.headers.entries()])
    
    if (response.ok) {
      const data = await response.json()
      console.log('Registration response:', data)
      isRegistered.value = data.registered
      statusMessage.value = data.message
      console.log('New registration state:', isRegistered.value)
      
      // Clear status message after 5 seconds (increased for debugging)
      setTimeout(() => {
        statusMessage.value = ''
      }, 5000)
    } else {
      console.error('Error registering:', response.status, response.statusText)
      const errorData = await response.text()
      console.error('Error response body:', errorData)
      statusMessage.value = `Error processing registration (${response.status})`
    }
  } catch (error) {
    console.error('Error registering (network/other):', error)
    statusMessage.value = 'Network error - check connection'
  } finally {
    isLoading.value = false
  }
}

// Separate function specifically for cancelling registration
const cancelRegistration = async () => {
  if (isLoading.value || !isRegistered.value) return
  
  console.log('Cancelling registration...')
  isLoading.value = true
  statusMessage.value = ''
  
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    console.log('Cancel registration response status:', response.status)
    
    if (response.ok) {
      const data = await response.json()
      console.log('Cancel registration response:', data)
      isRegistered.value = data.registered
      statusMessage.value = data.message
      console.log('Registration cancelled, new state:', isRegistered.value)
      
      // Clear status message after 5 seconds
      setTimeout(() => {
        statusMessage.value = ''
      }, 5000)
    } else {
      console.error('Error cancelling registration:', response.status, response.statusText)
      const errorData = await response.text()
      console.error('Error response body:', errorData)
      statusMessage.value = `Error cancelling registration (${response.status})`
    }
  } catch (error) {
    console.error('Error cancelling registration (network/other):', error)
    statusMessage.value = 'Network error - check connection'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}
</style>