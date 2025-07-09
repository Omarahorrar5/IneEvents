<template>
  <nav class="w-full px-10 py-10 flex justify-between items-center min-h-20 md:min-h-24 bg-gradient-to-b from-surface to-[#151B33]">
    <router-link to="/home" class="bg-white/10 border border-white/20 rounded-xl p-3 flex items-center justify-center w-12 h-12 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md group" aria-label="Go back">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition-transform duration-200 group-hover:-translate-x-0.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </router-link>
    
    <button class="bg-white/10 border border-white/20 rounded-xl p-3 flex items-center justify-center w-12 h-12 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md group" aria-label="Like">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition-all duration-200 group-hover:scale-110 group-hover:fill-red-500 group-hover:stroke-red-500">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
  </nav>
</template>

<style scoped>
.liked svg {
  fill: #ef4444;
  stroke: #ef4444;
}

@media (max-width: 768px) {
  nav {
    padding: 12px 16px;
    min-height: 70px;
  }
  
  button {
    width: 44px;
    height: 44px;
    padding: 10px;
  }
}
</style>