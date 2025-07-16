<template>
  <nav class="flex justify-between items-center px-6 h-16 bg-surface shadow-md">

    <div class="flex items-center">
      <img src="../../assets/logo.png" alt="IneEvents Logo" class="h-7 w-auto" />
    </div>

    <ul class="flex space-x-6 text-textMain font-medium text-base">
      <li><a href="#home" @click="scrollToAbout" class="hover:text-primary transition cursor-pointer">Home</a></li>
      <li><a href="#about" @click="scrollToAbout" class="hover:text-primary transition cursor-pointer">About</a></li>
    </ul>
  </nav>
</template>

<script setup>
const scrollToAbout = (event) => {
  event.preventDefault();
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    aboutSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};
</script>