<template>
  <div class="w-1/5 p-4 text-white rounded h-full ml-1">
    <h2 class="text-xl font-bold mb-4">Filters</h2>

    <div class="mb-4">
      <label class="block mb-2">Type</label>
      <select v-model="tempType" class="w-full p-2 rounded bg-gray-700">
        <option>All</option>
        <option>Hackathon</option>
        <option>Workshop</option>
        <option>Conference</option>
        <option>Competition</option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block mb-2">City</label>
      <select v-model="tempCity" class="w-full p-2 rounded bg-gray-700">
        <option>All</option>
        <option>Rabat</option>
        <option>Casablanca</option>
        <option>Fes</option>
        <option>Meknes</option>
        <option>Tanger</option>
        <option>Benguerir</option>
        <option>Agadir</option>
        <option>Marrakech</option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block mb-2">School</label>
      <select v-model="tempSchool" class="w-full p-2 rounded bg-gray-700">
        <option>All</option>
        <option>INPT</option>
        <option>ENSIAS</option>
        <option>INSEA</option>
        <option>EMI</option>
        <option>ENSAM</option>
        <option>ENSA</option>
        <option>ENCG</option>
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
import { ref } from 'vue'

// Temporary variables for form inputs (not reactive to parent)
const tempType = ref('All')
const tempCity = ref('All')
const tempSchool = ref('All')
const tempDate = ref('')

const emit = defineEmits(['filters-changed'])

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