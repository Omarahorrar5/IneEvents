<template>
  <section class="py-20 px-8">
    <div class="max-w-6xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-8">
            Our <span class="text-primary">Mission</span>
          </h2>
          <p class="text-lg text-textMuted leading-relaxed mb-6">
            IneEvents was born from a simple observation: Morocco's engineering schools host incredible events—conferences, hackathons, workshops, and competitions—but information about these opportunities is scattered and hard to find.
          </p>
          <p class="text-lg text-textMuted leading-relaxed mb-6">
            We're here to change that. Our platform centralizes all engineering events from schools across Morocco, making it easy for students, professionals, and enthusiasts to discover, track, and participate in the opportunities that matter most to them.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 mt-8">
            <router-link to="/" class="bg-primary hover:bg-primary/90 text-dark px-8 py-3 rounded-lg font-semibold transition-colors">
              Join Our Community
            </router-link>
            <button class="border border-white/20 hover:border-primary text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Partner With Us
            </button>
          </div>
        </div>
        
        <div class="relative">
          <div class="bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
            <div class="space-y-6">
              <div class="flex items-center space-x-4">
                <div class="w-3 h-3 bg-primary rounded-full"></div>
                <p class="text-white">Centralized event discovery</p>
              </div>
              <div class="flex items-center space-x-4">
                <div class="w-3 h-3 bg-primary rounded-full"></div>
                <p class="text-white">Real-time event tracking</p>
              </div>
              <div class="flex items-center space-x-4">
                <div class="w-3 h-3 bg-primary rounded-full"></div>
                <p class="text-white">Direct school partnerships</p>
              </div>
              <div class="flex items-center space-x-4">
                <div class="w-3 h-3 bg-primary rounded-full"></div>
                <p class="text-white">Community-driven platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
