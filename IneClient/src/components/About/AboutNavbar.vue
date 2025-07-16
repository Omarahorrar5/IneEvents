<template>
  <nav class="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 h-16 bg-surface shadow-md">
    <div class="flex items-center">
      <img src="../../assets/logo.png" alt="IneEvents Logo" class="h-7 w-auto" />
    </div>

    <ul class="flex space-x-6 text-textMain font-medium text-base">
      <li>
        <router-link to="/home" class="hover:text-primary transition cursor-pointer">Home</router-link>
      </li>
    </ul>
  </nav>
</template>