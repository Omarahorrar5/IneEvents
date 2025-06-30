<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <EventCard 
            v-for="event in events"
            :key="event.id"
            :title="event.title"
            :image="event.image_path"
            :description="event.description"
            :location="`${event.school}, ${event.city}`"
            :date="event.date"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue';
import EventCard from './EventCard.vue';

const events = ref([])

async function fetchEvents() {
    const res = await axios.get('http://localhost:5000/api/events');
    events.value = res.data
}

onMounted(() => {
    fetchEvents()
})

</script>