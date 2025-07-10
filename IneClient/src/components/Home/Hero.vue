<template>
  <div class="flex flex-col items-center justify-center h-[250px] bg-gradient-to-b from-surface to-[#000D19] relative px-6">
    <h1 class="text-4xl font-bold text-textMain mb-4 text-center">
      The Biggest Engineering Events Manager
    </h1>
    <p class="text-lg text-textMuted mb-6 text-center">
      Discover, search, and join the latest engineering events near you.
    </p>
    <div class="w-full max-w-md relative">
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