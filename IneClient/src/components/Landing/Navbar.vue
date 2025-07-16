<template>
  <nav class="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 h-16 bg-surface shadow-md">
    <div class="flex items-center">
      <img src="../../assets/logo.png" alt="IneEvents Logo" class="h-7 w-auto" />
    </div>
    <ul class="flex space-x-6 text-textMain font-medium text-base">
      <li>
        <a 
          href="#home" 
          @click="scrollToHome" 
          :class="[
            'hover:text-primary transition cursor-pointer',
            { 'text-primary': activeSection === 'home' }
          ]"
        >
          Home
        </a>
      </li>
      <li>
        <a 
          href="#about" 
          @click="scrollToAbout" 
          :class="[
            'hover:text-primary transition cursor-pointer',
            { 'text-primary': activeSection === 'about' }
          ]"
        >
          About
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const activeSection = ref('home');

const scrollToHome = (event) => {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

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

const handleScroll = () => {
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    const aboutTop = aboutSection.offsetTop;
    const scrollPosition = window.scrollY + 100; // Add offset for better UX
    
    if (scrollPosition >= aboutTop) {
      activeSection.value = 'about';
    } else {
      activeSection.value = 'home';
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>