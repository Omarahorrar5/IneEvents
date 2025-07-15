<template>
  <nav class="flex justify-between items-center px-6 h-16 bg-surface shadow-md">

    <div class="flex items-center">
      <img src="../../assets/logo.png" alt="IneEvents Logo" class="h-7 w-auto" />
    </div>

    <ul class="flex space-x-6 text-textMain font-medium text-base">
      <li><router-link to="/about" class="hover:text-primary transition">About</router-link></li>
      <li><router-link to="/contact" class="hover:text-primary transition">Contact</router-link></li>
    </ul>
  </nav>
</template>
