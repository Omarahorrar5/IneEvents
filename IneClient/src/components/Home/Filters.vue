<template>
  <div class="w-1/4 p-4 bg-gray-800 text-white rounded h-full ml-1">
    <h2 class="text-xl font-bold mb-4">Filters</h2>

    <div class="mb-4">
      <label class="block mb-2">Category</label>
      <select class="w-full p-2 rounded bg-gray-700">
        <option>All</option>
        <option>Hackathon</option>
        <option>Workshop</option>
        <option>Conference</option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block mb-2">City</label>
      <select class="w-full p-2 rounded bg-gray-700">
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
      <select class="w-full p-2 rounded bg-gray-700">
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
      <input type="date" class="w-full p-2 rounded bg-gray-700" />
    </div>
    <button class="w-full py-2 mt-4 bg-primary text-dark font-semibold rounded hover:bg-secondary transition">Apply</button>
  </div>
</template>
