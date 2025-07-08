<template>
  <nav class="flex justify-between items-center px-6 h-16 bg-surface shadow-md">

    <router-link to="/home" class="flex items-center">
      <img src="../../assets/logo.png" alt="IneEvents Logo" class="h-7 w-auto" />
    </router-link>


    <ul class="flex space-x-6 text-textMain font-medium text-base">
      <li><router-link to="/home" class="hover:text-primary transition">Home</router-link></li>
      <li><a href="#About" class="hover:text-primary transition">About</a></li>
      <li><a href="#Contact" class="hover:text-primary transition">Contact</a></li>
      <li><router-link to="/" class="hover:text-danger transition">Logout</router-link></li>
    </ul>
  </nav>
</template>
