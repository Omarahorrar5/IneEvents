<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    @click="closeDialog"
  >
    <div 
      class="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative"
      @click.stop
    >
      <!-- Close button (X) -->
      <button
        @click="closeDialog"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold w-8 h-8 flex items-center justify-center"
      >
        x
      </button>
      
      <h2 class="text-xl font-semibold mb-4">Add New Event</h2>
      
      <!-- Just a placeholder content for now -->
      <div class="mb-4">
        <p class="text-sm text-gray-500">Event creation form will go here...</p>
      </div>
      
      <div class="flex gap-2 justify-end">
        <button
          @click="closeDialog"
          class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 bg-primary rounded hover:bg-secondary transition"
        >
          Add Event
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const closeDialog = () => {
  emit('close')
}
</script>