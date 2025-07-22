<template>
    <div class="px-6 pt-6">
        <router-link to="/home" class="bg-white/10 border border-white/20 rounded-xl p-3 flex items-center justify-center w-12 h-12 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md group" aria-label="Go back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition-transform duration-200 group-hover:-translate-x-0.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
        </router-link>
    </div>

    <!-- Custom Hero Section for Likes Page -->
    <div class="flex flex-col items-center justify-center h-[160px] relative px-6">
        <div class="flex items-center gap-3 mb-4">
            <svg class="w-10 h-10 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <h1 class="text-4xl font-bold text-textMain text-center">
                Your Liked Events
            </h1>
        </div>
        <p class="text-lg text-textMuted mb-6 text-center">
            All the events you've saved for later
        </p>
    </div>
</template>