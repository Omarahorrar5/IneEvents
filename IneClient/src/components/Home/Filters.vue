<template>
  <div class="w-1/5 p-4 text-white rounded h-full ml-1">
    <h2 class="text-xl font-bold mb-4">Filters</h2>

    <div class="mb-4">
      <label class="block mb-2">Type</label>
      <select v-model="tempType" class="w-full p-2 rounded bg-gray-700">
        <option>All</option>
        <option v-for="type in availableTypes" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block mb-2">City</label>
      <select v-model="tempCity" class="w-full p-2 rounded bg-gray-700">
        <option>All</option>
        <option v-for="city in availableCities" :key="city" :value="city">
          {{ city }}
        </option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block mb-2">School</label>
      <select v-model="tempSchool" class="w-full p-2 rounded bg-gray-700">
        <option>All</option>
        <option v-for="school in availableSchools" :key="school" :value="school">
          {{ school }}
        </option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block mb-2">Date</label>
      <input v-model="tempDate" type="date" class="w-full p-2 rounded bg-gray-700" />
    </div>

    <button class="w-full py-2 mt-4 bg-primary text-dark font-semibold rounded hover:bg-secondary transition"
    @click="applyFilters"
    >Apply</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Temporary variables for form inputs (not reactive to parent)
const tempType = ref('All')
const tempCity = ref('All')
const tempSchool = ref('All')
const tempDate = ref('')

const props = defineProps({
  events: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['filters-changed'])

// Computed properties to extract unique values from events
const availableTypes = computed(() => {
  const types = new Set()
  props.events.forEach(event => {
    if (event.type) {
      types.add(event.type)
    }
  })
  return Array.from(types).sort()
})

const availableCities = computed(() => {
  const cities = new Set()
  props.events.forEach(event => {
    if (event.city) {
      cities.add(event.city)
    }
  })
  return Array.from(cities).sort()
})

const availableSchools = computed(() => {
  const schools = new Set()
  props.events.forEach(event => {
    if (event.school) {
      schools.add(event.school)
    }
  })
  return Array.from(schools).sort()
})

const applyFilters = () => {
  const filters = {
    type: tempType.value,
    city: tempCity.value,
    school: tempSchool.value,
    date: tempDate.value
  }
  
  emit('filters-changed', filters)
}
</script>