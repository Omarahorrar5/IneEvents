<template>
  <div class="h-screen bg-hero m-0 p-0 overflow-x-hidden">
    <Navbar />

    <div class="flex w-full max-w-7xl mx-auto">
      <WelcomeMessage />
      
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import WelcomeMessage from '../components/WelcomeMessage.vue';
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
