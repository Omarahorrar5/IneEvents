<template>
  <div class="flex flex-col items-center justify-center h-[250px] bg-gradient-to-b from-surface to-[#000A14] relative px-6">
    <h1 class="text-4xl font-bold text-textMain mb-4 text-center">
      The Biggest Engineering Events Manager
    </h1>
    <p class="text-lg text-textMuted mb-6 text-center">
      Discover, search, and join the latest engineering events near you.
    </p>
    <div class="w-full max-w-md relative">
      
      <!-- Liked Events Button with Love Symbol -->
      <router-link 
        to="/likes"
        class="absolute left-0 top-1/2 -translate-x-[120%] -translate-y-1/2 flex items-center gap-2 py-3 px-6 text-textMain bg-surface border border-primary rounded-lg hover:bg-primary hover:text-dark transition-all duration-300 group"
      >
        <svg 
          class="w-5 h-5 text-red-500 group-hover:text-red-600 transition-colors" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <span class="font-medium">Liked Events</span>
      </router-link>

      <!-- Centered search input -->
      <input
        type="text"
        placeholder="Search for events..."
        class="w-full p-3 rounded bg-white shadow focus:outline-none focus:ring-2 focus:ring-primary"
        v-model="searchTerm"
        @input="handleSearchInput"
      />
      <!-- Absolutely positioned button on the right edge of the screen -->
      <button
        @click="openAddEventDialog"
        class="absolute right-0 top-1/2 translate-x-[300%] -translate-y-1/2 py-3 px-8 text-dark bg-primary font-semibold rounded hover:bg-secondary transition"
      >
        Add event
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchTerm = ref('')
const emit = defineEmits(['search', 'open-add-event'])

const handleSearchInput = () => {
  emit('search', searchTerm.value)
}

const openAddEventDialog = () => {
  emit('open-add-event')
}
</script>