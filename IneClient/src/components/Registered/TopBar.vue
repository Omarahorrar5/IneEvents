<template>
    <div class="px-6 pt-6">
        <router-link to="/home" class="bg-white/10 border border-white/20 rounded-xl p-3 flex items-center justify-center w-12 h-12 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md group" aria-label="Go back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition-transform duration-200 group-hover:-translate-x-0.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
        </router-link>
    </div>

    <!-- Custom Hero Section for Registered Events Page -->
    <div class="flex flex-col items-center justify-center h-[160px] relative px-6">
        <div class="flex items-center gap-3 mb-4">
            <svg class="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
            </svg>
            <h1 class="text-4xl font-bold text-textMain text-center">
                Your Registered Events
            </h1>
        </div>
        <p class="text-lg text-textMuted mb-2 text-center">
            Events you've signed up to attend
        </p>
    </div>
</template>