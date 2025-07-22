<template>
  <nav class="flex justify-between items-center px-6 h-16 bg-surface shadow-md">

    <router-link to="/home" class="flex items-center">
      <img src="../../assets/logo.png" alt="IneEvents Logo" class="h-7 w-auto" />
    </router-link>


    <ul class="flex space-x-6 text-textMain font-medium text-base gap-2">
      <li><router-link to="/about" class="hover:text-primary transition">About</router-link></li>
      <li><router-link to="/" class="text-danger transition">Logout</router-link></li>
    </ul>
  </nav>
</template>