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
      
      <h2 class="text-xl font-semibold mb-4">{{ isEditMode ? 'Edit Event' : 'Add New Event' }}</h2>
      
      <div class="mb-4 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
          <input 
            v-model="title" 
            type="text" 
            placeholder="Event Title"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
          <input 
            v-model="type" 
            type="text" 
            placeholder="Event Type"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Event Description</label>
          <textarea 
            v-model="description" 
            placeholder="Event Description"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Event Organizer</label>
          <input 
            v-model="organizer" 
            type="text" 
            placeholder="Event Organizer"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">School</label>
          <input 
            v-model="school" 
            type="text" 
            placeholder="School"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input 
            v-model="city" 
            type="text" 
            placeholder="City"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
          <input 
            v-model="date" 
            type="datetime-local"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

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
          class="px-4 py-2 bg-primary text-dark rounded hover:bg-secondary transition font-semibold"
          @click="saveEvent"
          :disabled="loading"
        >
          {{ loading ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Event' : 'Add Event') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
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

const title = ref('')
const description = ref('')
const type = ref('')
const school = ref('')
const city = ref('')
const date = ref('')
const organizer = ref('')

const loading = ref(false)

const emit = defineEmits(['close', 'event-added', 'event-updated'])

const isEditMode = computed(() => props.eventData !== null)

const closeDialog = () => {
  resetForm()
  emit('close')
}

const resetForm = () => {
  title.value = ''
  description.value = ''
  type.value = ''
  school.value = ''
  city.value = ''
  date.value = ''
  organizer.value = ''
}

const populateForm = (eventData) => {
  if (eventData) {
    title.value = eventData.title || ''
    description.value = eventData.description || ''
    type.value = eventData.type || ''
    school.value = eventData.school || ''
    city.value = eventData.city || ''
    organizer.value = eventData.organizer || ''
    
    // Convert date to datetime-local format if it exists
    if (eventData.date) {
      const eventDate = new Date(eventData.date)
      // Format to YYYY-MM-DDTHH:MM (datetime-local format)
      date.value = eventDate.toISOString().slice(0, 16)
    }
  }
}

// Watch for changes in eventData prop to populate form
watch(() => props.eventData, (newEventData) => {
  if (newEventData) {
    populateForm(newEventData)
  } else {
    resetForm()
  }
}, { immediate: true })

const saveEvent = async () => {
  // Basic validation
  if (!title.value || !type.value || !date.value) {
    alert('Please fill in required fields: Title, Type, and Date')
    return
  }

  loading.value = true
  
  try {
    let response
    const eventPayload = {
      title: title.value,
      description: description.value,
      type: type.value,
      school: school.value,
      city: city.value,
      date: date.value,
      organizer: organizer.value,
    }

    if (isEditMode.value) {
      // Update existing event
      response = await axios.post(`http://localhost:5000/api/events/update/${props.eventData.id}`, eventPayload)
      console.log('Event updated successfully:', response.data)
      emit('event-updated', { ...eventPayload, id: props.eventData.id })
    } else {
      // Create new event
      response = await axios.post('http://localhost:5000/api/events', eventPayload)
      console.log('Event created successfully:', response.data)
      emit('event-added', response.data)
    }
    
    closeDialog()
    
  } catch (error) {
    console.error(`Error ${isEditMode.value ? 'updating' : 'creating'} event:`, error)
    alert(`Failed to ${isEditMode.value ? 'update' : 'create'} event. Please try again.`)
  } finally {
    loading.value = false
  }
}
</script>