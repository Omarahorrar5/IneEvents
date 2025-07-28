<template>
    <div class="px-6 pt-6">
        <router-link to="/home" class="bg-white/10 border border-white/20 rounded-xl p-3 flex items-center justify-center w-12 h-12 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md group" aria-label="Go back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition-transform duration-200 group-hover:-translate-x-0.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
        </router-link>
    </div>

    <!-- Custom Hero Section for Schools Page -->
    <div class="flex flex-col items-center justify-center h-[160px] relative px-6">
        <div class="flex items-center gap-3 mb-4">
            <svg style="width: 48px; height: 48px; color: white;" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9L12 15L21 12V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"/>
            </svg>
            <h1 class="text-4xl font-bold text-textMain text-center">
                Schools & Universities
            </h1>
        </div>
        <p class="text-lg text-textMuted mb-2 text-center">
            Discover educational institutions hosting events
        </p>
    </div>
</template>