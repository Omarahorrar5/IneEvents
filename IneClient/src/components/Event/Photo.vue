<template>
  <div class="photo-container">
    <img 
      :src="image" 
      alt="Event Photo" 
      class="w-full h-full pl-10 object-cover rounded-lg shadow-lg"
      loading="lazy"
    />
  </div>
</template>

<script setup>
defineProps({
  image: String // /events/inptJNJD.png
})
</script>

<style scoped>
.photo-container {
  width: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

@media (max-width: 768px) {
  .photo-container img {
    width: 6rem;
    height: 6rem;
    border-radius: 0.5rem;
  }
}
</style>