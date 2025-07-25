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
            <svg class="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5,5H19V4H5M5,8H15V7H5M5,11H19V10H5M5,14H15V13H5M5,17H19V16H5M2,20V18H4V20M11,20V18H13V20M20,20V18H22V20"/>
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