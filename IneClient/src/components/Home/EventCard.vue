<template>
  <div class="flex flex-col w-full max-w-xs h-[26rem] bg-white rounded shadow-lg overflow-hidden">
    <div class="w-full h-36 bg-top bg-cover rounded-t" :style="`background-image: url(${image})`"></div>

    <div class="flex flex-col w-full md:flex-row">
      <div class="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded md:flex-col md:items-center md:justify-center md:w-1/4">
        <div class="md:text-3xl">{{ formattedMonth }}</div>
        <div class="md:text-6xl">{{ formattedDay }}</div>
        <div class="md:text-xl">{{ formattedTime }}</div>
      </div>

      <div class="p-4 font-normal text-gray-800 md:w-3/4">
        <h1 class="mb-4 text-3xl font-bold leading-none tracking-tight text-gray-800">{{ title }}</h1>
        <p class="leading-normal">{{ description }}</p>
        <div class="flex flex-row items-center mt-4 text-gray-700">
          <div class="w-1/2 font-medium">
            {{ location }}
          </div>
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
