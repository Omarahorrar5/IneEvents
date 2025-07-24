<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    @click="closeDialog"
  >
    <div
      class="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative max-h-[90vh] overflow-y-auto"
      @click.stop
    >
     
      <h2 class="text-2xl font-semibold mb-4 text-red-500">Delete Event</h2>
     
      <div class="mb-4 space-y-4">
        <p class="text-gray-600">Are you sure you want to delete this event?</p>
        <div v-if="eventData" class="bg-gray-100 p-3 rounded">
          <p class="font-medium">{{ eventData.title }}</p>
          <p class="text-sm text-gray-600">{{ eventData.description }}</p>
          <p class="text-sm text-gray-600">{{ eventData.school }}, {{ eventData.city }}</p>
        </div>
        <p class="text-sm text-red-600">This action cannot be undone.</p>
      </div>
     
      <div class="flex gap-2 justify-end">
        <button
          @click="closeDialog"
          class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition font-semibold"
          :disabled="loading"
        >
          Cancel
        </button>
        
        <button
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-semibold"
          @click="deleteEvent"
          :disabled="loading"
        >
          {{ loading ? 'Deleting...' : 'Delete Event' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  eventData: {
    type: Object,
    default: null
  }
})

const loading = ref(false)
const emit = defineEmits(['close', 'event-deleted'])

const closeDialog = () => {
  emit('close')
}

const deleteEvent = async () => {
  if (!props.eventData || !props.eventData.id) {
    alert('No event selected for deletion')
    return
  }

  loading.value = true

  try {
    await axios.post(`http://localhost:5000/api/events/delete/${props.eventData.id}`)
    
    console.log('Event deleted successfully')
    
    // Emit event to parent component
    emit('event-deleted', props.eventData.id)
    
    // Close dialog
    closeDialog()
    
  } catch (error) {
    console.error('Error deleting event:', error)
    alert('Failed to delete event. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>