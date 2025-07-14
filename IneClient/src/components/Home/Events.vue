<template>
    <div v-if="filteredEvents.length === 0" class="text-center py-12">
        <p class="text-xl text-textMuted">No events found matching your search.</p>
    </div>
   
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <EventCard
            v-for="event in filteredEvents"
            :key="event.id"
            :id="event.id"
            :title="event.title"
            :image="event.image_path"
            :description="event.description"
            :location="`${event.school}, ${event.city}`"
            :date="event.date"
            @edit="handleEditEvent"
            @delete="handleDeleteEvent"
        />
    </div>
    
    <!-- Edit Dialog -->
    <EditEventDialog
        :isOpen="showEditDialog"
        :eventData="selectedEvent"
        @close="closeEditDialog"
        @event-updated="onEventUpdated"
    />
    
    <!-- Delete Dialog -->
    <DeleteEventDialog
        :isOpen="showDeleteDialog"
        :eventData="selectedEvent"
        @close="closeDeleteDialog"
        @event-deleted="onEventDeleted"
    />
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue';
import EventCard from './EventCard.vue';
import EditEventDialog from '../Event/EditEventDialog.vue';
import DeleteEventDialog from '../Event/DeleteEventDialog.vue';

const events = ref([])
const showEditDialog = ref(false)
const showDeleteDialog = ref(false)
const selectedEvent = ref(null)

const props = defineProps({
    searchTerm: {
        type: String,
        default: ''
    },
    filters: {
        type: Object,
        default: () => ({
            type: 'All',
            city: 'All',
            school: 'All',
            date: 'All',
        })
    }
})

async function fetchEvents() {
    const res = await axios.get('http://localhost:5000/api/events');
    events.value = res.data
}

const handleEditEvent = (eventId) => {
    // Find the event to edit
    selectedEvent.value = events.value.find(event => event.id === eventId)
    showEditDialog.value = true
}

const handleDeleteEvent = (eventId) => {
    // Find the event to delete
    selectedEvent.value = events.value.find(event => event.id === eventId)
    showDeleteDialog.value = true
}

const closeEditDialog = () => {
    showEditDialog.value = false
    selectedEvent.value = null
}

const closeDeleteDialog = () => {
    showDeleteDialog.value = false
    selectedEvent.value = null
}

const onEventUpdated = (updatedEvent) => {
    // Update the event in the array
    const index = events.value.findIndex(event => event.id === updatedEvent.id)
    if (index !== -1) {
        events.value[index] = { ...events.value[index], ...updatedEvent }
    }
}

const onEventDeleted = (deletedEventId) => {
    // Remove the event from the array
    events.value = events.value.filter(event => event.id !== deletedEventId)
}

const filteredEvents = computed(() => {
    let filtered = events.value

    if (props.searchTerm) {
        const searchLower = props.searchTerm.toLowerCase()
        filtered = filtered.filter(event =>
            event.title.toLowerCase().includes(searchLower) ||
            event.description.toLowerCase().includes(searchLower) ||
            event.city.toLowerCase().includes(searchLower) ||
            event.school.toLowerCase().includes(searchLower) ||
            event.organizer.toLowerCase().includes(searchLower)
        )
    }

    if (props.filters.type && props.filters.type !== 'All') {
        filtered = filtered.filter(event => {
            return event.type === props.filters.type
        })
    }

    if (props.filters.city && props.filters.city !== 'All') {
        filtered = filtered.filter(event => {
            return event.city === props.filters.city
        })
    }

    if (props.filters.school && props.filters.school !== 'All') {
        filtered = filtered.filter(event => {
            return event.school === props.filters.school
        })
    }

    if (props.filters.date && props.filters.date !== 'All') {
        filtered = filtered.filter(event => {
            return event.date === props.filters.date
        })
    }

    return filtered
})

onMounted(() => {
    fetchEvents()
})
</script>