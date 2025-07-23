<template>
  <section class="min-h-screen flex items-center justify-center px-8 py-20">
    <div class="max-w-6xl mx-auto text-center">
      <div class="px-6 pt-6">
        <router-link to="/home" class="bg-white/10 border border-white/20 rounded-xl p-3 flex items-center justify-center w-12 h-12 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md group" aria-label="Go back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition-transform duration-200 group-hover:-translate-x-0.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
        </router-link>
    </div>
    
      <div class="mb-8">
        <h1 class="text-6xl md:text-6xl font-bold text-white mb-10">
          About <span class="text-primary">IneEvents</span>
        </h1>
        <p class="text-xl md:text-2xl text-textMuted leading-relaxed max-w-4xl mx-auto">
          Bridging the gap between engineering talent and opportunities across Morocco's educational landscape.
        </p>
      </div>
      
      <div class="grid md:grid-cols-3 gap-8 mt-16">
        <div class="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          <div class="text-primary text-4xl font-bold mb-2">500+</div>
          <p class="text-textMuted">Events Tracked</p>
        </div>
        <div class="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          <div class="text-primary text-4xl font-bold mb-2">50+</div>
          <p class="text-textMuted">Partner Schools</p>
        </div>
        <div class="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          <div class="text-primary text-4xl font-bold mb-2">10K+</div>
          <p class="text-textMuted">Students Connected</p>
        </div>
      </div>
    </div>
  </section>
</template>