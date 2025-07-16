<template>
  <footer class="py-16 px-8 border-t border-white/10">
    <div class="max-w-6xl mx-auto">
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <!-- Company Info -->
        <div class="lg:col-span-2">
          <div class="flex items-center space-x-2 mb-6">
            <span class="text-2xl font-bold text-white">IneEvents</span>
          </div>
          <p class="text-textMuted mb-6 max-w-md">
            Connecting Morocco's engineering community through comprehensive event discovery and tracking. Stay informed, stay ahead.
          </p>
          <div class="flex space-x-4">
            <a href="https://www.linkedin.com/in/omar-ahorrar-02a5a9244/" class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://github.com/Omarahorrar5" class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-semibold mb-6">Quick Links</h3>
          <ul class="space-y-3">
            <li><router-link to="/" class="text-textMuted hover:text-primary transition-colors">Home</router-link></li>
            <li><a href="#" class="text-textMuted hover:text-primary transition-colors">Events</a></li>
            <li><a href="#" class="text-textMuted hover:text-primary transition-colors">Schools</a></li>
            <li><router-link to="/about" class="text-textMuted hover:text-primary transition-colors">About</router-link></li>
            <li><router-link to="/contact" class="text-textMuted hover:text-primary transition-colors">Contact</router-link></li>
          </ul>
        </div>
        
        <!-- Support -->
        <div>
          <h3 class="text-white font-semibold mb-6">Support</h3>
          <ul class="space-y-3">
            <li><a href="#" class="text-textMuted hover:text-primary transition-colors">Help Center</a></li>
            <li><a href="#" class="text-textMuted hover:text-primary transition-colors">FAQ</a></li>
            <li><a href="#" class="text-textMuted hover:text-primary transition-colors">Terms of Service</a></li>
            <li><a href="#" class="text-textMuted hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" class="text-textMuted hover:text-primary transition-colors">Report Issue</a></li>
          </ul>
        </div>
      </div>
      
      <!-- Newsletter Signup -->
      <div class="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-12">
        <div class="text-center">
          <h3 class="text-2xl font-bold text-white mb-4">Stay Updated</h3>
          <p class="text-textMuted mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to get the latest updates on engineering events, new features, and opportunities across Morocco.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              class="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-textMuted focus:border-primary focus:outline-none"
            >
            <button class="bg-primary hover:bg-primary/90 text-dark px-6 py-3 rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <!-- Bottom Section -->
      <div class="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
        <p class="text-textMuted text-sm mb-4 md:mb-0">
          © 2025 IneEvents. All rights reserved.
        </p>
        <div class="flex items-center space-x-6 text-sm text-textMuted">
          <span>Made for Morocco's engineering community</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>