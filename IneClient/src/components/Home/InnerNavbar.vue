<template>
  <nav class="flex justify-between items-center px-6 h-16 bg-surface shadow-md">

    <div class="flex items-center">
      <img src="../../assets/logo.png" alt="IneEvents Logo" class="h-7 w-auto" />
    </div>

    <ul class="flex space-x-6 text-textMain font-medium text-base">
      <li><a href="#Home" class="hover:text-primary transition">Home</a></li>
      <li><a href="#Events" class="hover:text-primary transition">Events</a></li>
      <li><a href="#About" class="hover:text-primary transition">About</a></li>
      <li><a href="#Contact" class="hover:text-primary transition">Contact</a></li>
      <li><router-link to="/" class="hover:text-danger transition">Logout</router-link></li>
    </ul>
  </nav>
</template>
