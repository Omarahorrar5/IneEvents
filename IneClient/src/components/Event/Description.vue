<template>
  <div class="description-container text-white">
      <p class="text-gray-300">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  description: String
})
</script>