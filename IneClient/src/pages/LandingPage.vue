<template>
  <div class="bg-hero m-0 p-0 overflow-x-hidden">
    <Navbar />

    <!-- Main Landing Section -->
    <div class="min-h-screen flex w-full max-w-7xl mx-auto">
      <WelcomeMessage />
      
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>

    <!-- About Section -->
    <div id="about" class="min-h-screen">
      <AboutPage />
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Landing/Navbar.vue';
import WelcomeMessage from '../components/Landing/WelcomeMessage.vue';
import AboutPage from './AboutPage.vue';
</script>

<style>
/* Smooth scrolling for the entire page */
html {
  scroll-behavior: smooth;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

body {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>