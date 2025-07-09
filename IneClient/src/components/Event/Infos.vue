<template>
  <div class="infos-container text-white">
    <!-- Organizer Badge -->
    <div class="flex items-center mb-4">
      <div class="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">{{ organizer }}</div>
    </div>

    <!-- Event Title -->
    <h1 class="text-2xl font-bold mb-4 leading-tight">{{ title }}</h1>

    <!-- Location and Time -->
    <div> 

      <div class="flex items-center text-gray-300">
        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        <span>{{ location }}</span>
      </div>

      <div class="flex items-center text-gray-300">
        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        <span>{{ date }}</span>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  organizer: String,
  title: String,
  location: String,
  date: String
})
</script>

<style scoped>
.infos-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 64px;
}
</style>

