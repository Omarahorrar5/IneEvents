<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <EventCard 
            title="FinTech Hackathon: 2030 World Cup Challenges"
            :image="EnsiasFinTech"
            description="Compete in world-class FinTech challenges at the ENSIAS Hackathon."
            location="ENSIAS, Rabat"
            date="2025-10-13T09:00:00"
        />
        <EventCard 
            title="FinTech Hackathon: 2030 World Cup Challenges"
            :image="EnsiasFinTech"
            description="Compete in world-class FinTech challenges at the ENSIAS Hackathon."
            location="ENSIAS, Rabat"
            date="2025-10-13 09:00:00"
        />
        <EventCard 
            title="FinTech Hackathon: 2030 World Cup Challenges"
            :image="EnsiasFinTech"
            description="Compete in world-class FinTech challenges at the ENSIAS Hackathon."
            location="ENSIAS, Rabat"
            date="2025-10-13T09:00:00"
        />
        <EventCard 
            title="FinTech Hackathon: 2030 World Cup Challenges"
            :image="EnsiasFinTech"
            description="Compete in world-class FinTech challenges at the ENSIAS Hackathon."
            location="ENSIAS, Rabat"
            date="2025-10-13T09:00:00"
        />
        <EventCard 
            title="FinTech Hackathon: 2030 World Cup Challenges"
            :image="EnsiasFinTech"
            description="Compete in world-class FinTech challenges at the ENSIAS Hackathon."
            location="ENSIAS, Rabat"
            date="2025-10-13T09:00:00"
        />
        <EventCard 
            title="FinTech Hackathon: 2030 World Cup Challenges"
            :image="EnsiasFinTech"
            description="Compete in world-class FinTech challenges at the ENSIAS Hackathon."
            location="ENSIAS, Rabat"
            date="2025-10-13T09:00:00"
        />
    </div>
</template>

<script setup>
import EnsiasFinTech from '../../assets/events/EnsiasFinTech.png'
import EventCard from './EventCard.vue';

import { ref } from 'vue'
import axios from 'axios'

const events = ref([])

async function fetchEvents() {
    const res = await axios.post('http://localhost:5000/api/events');
    events.value = res.data
}

</script>