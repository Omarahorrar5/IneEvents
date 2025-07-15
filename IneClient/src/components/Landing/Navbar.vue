<template>
  <nav class="flex justify-between items-center px-6 h-16 bg-surface shadow-md">

    <div class="flex items-center ml-2">
      <img src="../../assets/logo.png" alt="IneEvents Logo" class="h-7 w-auto" />
    </div>

    <ul class="flex mr-4 space-x-6 text-textMain font-medium text-base">
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