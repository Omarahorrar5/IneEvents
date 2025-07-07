<template>
  <div class="flex flex-col w-full max-w-xs h-[26rem] bg-white rounded shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
    <!-- Fixed height image -->
    <div class="w-full h-36 bg-top bg-cover rounded-t shrink-0" :style="`background-image: url(${image})`"></div>

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
  </div>
</template>


<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  image: String,
  description: String,
  location: String,
  date: String
})

const formattedDate = computed(() => new Date(props.date))
const formattedMonth = computed(() => formattedDate.value.toLocaleString('default', { month: 'short' }))
const formattedDay = computed(() => formattedDate.value.getDate())
const formattedTime = computed(() => formattedDate.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
</script>
