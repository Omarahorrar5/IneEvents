<template>
  <section class="py-20 px-8">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Why Choose <span class="text-primary">IneEvents</span>?
        </h2>
        <p class="text-lg text-textMuted max-w-3xl mx-auto">
          We've built the most comprehensive platform for engineering events in Morocco, designed with students and professionals in mind.
        </p>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Feature 1 -->
        <div class="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 group">
          <div class="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-4">Comprehensive Event Calendar</h3>
          <p class="text-textMuted">Never miss another hackathon, conference, or workshop. Our calendar aggregates events from all major engineering schools across Morocco.</p>
        </div>
        
        <!-- Feature 2 -->
        <div class="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 group">
          <div class="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.73 21a2 2 0 01-3.46 0M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-4">Smart Notifications</h3>
          <p class="text-textMuted">Get personalized alerts for events that match your interests, field of study, and location preferences.</p>
        </div>
        
        <!-- Feature 3 -->
        <div class="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 group">
          <div class="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-4">School Network</h3>
          <p class="text-textMuted">Direct partnerships with engineering schools ensure you get the most up-to-date and accurate event information.</p>
        </div>
        
        <!-- Feature 4 -->
        <div class="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 group">
          <div class="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-4">Event Analytics</h3>
          <p class="text-textMuted">Track your participation, discover trending events, and get insights into Morocco's engineering event landscape.</p>
        </div>
        
        <!-- Feature 5 -->
        <div class="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 group">
          <div class="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-4">Learning Resources</h3>
          <p class="text-textMuted">Access preparation materials, past event recordings, and educational content to maximize your event experience.</p>
        </div>
        
        <!-- Feature 6 -->
        <div class="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 group">
          <div class="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-4">Mobile First</h3>
          <p class="text-textMuted">Built for mobile devices, so you can discover and track events on the go, wherever you are in Morocco.</p>
        </div>
      </div>
    </div>
  </section>
</template>