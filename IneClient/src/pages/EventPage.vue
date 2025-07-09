<template>
  <div class="h-screen m-0 p-0 overflow-x-hidden bg-gradient-to-b from-surface to-[#000D19]">
    <Navbar />

    <div v-if="loading" class="text-white text-center mt-10">Loading...</div>
    <div v-else-if="error" class="text-red-500 text-center mt-10">{{ error }}</div>
    
    <div v-else class="flex h-full">
      <div class="w-1/2 h-full">
        <Photo :image="event.image_path" />
      </div>

      <div class="w-1/2 h-full flex flex-col justify-start pr-8">
        <Infos :title="event.title" :date="formattedDate" :location="`${event.school}, ${event.city}`" :organizer="event.organizer"  />
        <Description :description="event.description" />
        <RegisterButton :eventId="event.id" />
      </div>
    </div>
  </div>
</template>



<script setup>
import Navbar from '../components/Event/Navbar.vue';
import Photo from '../components/Event/Photo.vue';
import Infos from '../components/Event/Infos.vue';
import Description from '../components/Event/Description.vue';
import RegisterButton from '../components/Event/RegisterButton.vue';

import { ref, onMounted, computed} from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router';

// Route to get the :id param
const route = useRoute()
const eventId = route.params.id

const event = ref(null)
const loading = ref(true)
const error = ref(null)

const formattedDate = computed(() => {
  if (!event.value?.date) return ''
  const date = new Date(event.value.date)
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/events/${eventId}`)
    event.value = res.data
  }

  catch (err) {
    error.value = err.message
  }

  finally {
    loading.value = false
  }
})

</script>