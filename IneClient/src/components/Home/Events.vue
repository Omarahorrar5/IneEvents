<template>
    <div v-if="filteredEvents.length === 0" class="text-center py-12">
        <p class="text-xl text-textMuted">No events found matching your search.</p>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <EventCard 
            v-for="event in filteredEvents"
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
import { ref, computed } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue';
import EventCard from './EventCard.vue'; 

const events = ref([])

const props = defineProps({
    searchTerm: {
        type: String,
        default: ''
    }
})

async function fetchEvents() {
    const res = await axios.get('http://localhost:5000/api/events');
    events.value = res.data
}

const filteredEvents = computed(() => {
    if (!props.searchTerm) {
        return events.value
    }

    const searchLower = props.searchTerm.toLowerCase()
    return events.value.filter(event =>
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.city.toLowerCase().includes(searchLower) ||
        event.school.toLowerCase().includes(searchLower) ||
        event.organizer.toLowerCase().includes(searchLower)
    )
})

onMounted(() => {
    fetchEvents()
})

</script>