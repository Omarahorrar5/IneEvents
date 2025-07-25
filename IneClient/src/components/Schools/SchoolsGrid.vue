<template>
    <!-- Schools Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
            v-for="school in schools" 
            :key="`${school.school}-${school.city}`"
            class="relative group"
        >
            <div class="flex flex-col w-full max-w-sm h-64 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1">    
                <!-- School header with gradient background -->
                <div class="relative w-full h-32 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <!-- School icon -->
                    <div class="bg-white/20 backdrop-blur-sm rounded-full p-4">
                        <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M5,5H19V4H5M5,8H15V7H5M5,11H19V10H5M5,14H15V13H5M5,17H19V16H5M2,20V18H4V20M11,20V18H13V20M20,20V18H22V20"/>
                        </svg>
                    </div>
                    
                    <!-- Decorative elements -->
                    <div class="absolute top-2 right-2 w-8 h-8 bg-white/10 rounded-full"></div>
                    <div class="absolute bottom-2 left-2 w-6 h-6 bg-white/10 rounded-full"></div>
                </div>
                
                <!-- School information -->
                <div class="flex flex-col flex-grow p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-3 leading-tight">
                        {{ school.school }}
                    </h3>
                    
                    <div class="flex items-center text-gray-600 mb-4">
                        <svg class="w-4 h-4 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                        </svg>
                        <span class="text-sm font-medium">{{ school.city }}</span>
                    </div>
                    
                    <!-- Action button -->
                    <div class="mt-auto">
                        <button 
                            @click="viewSchoolEvents(school)"
                            class="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v16a2 2 0 002 2z"/>
                            </svg>
                            View Events
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
    schools: {
        type: Array,
        required: true
    }
})

// Methods
const viewSchoolEvents = (school) => {
    // Navigate to events page with school filter
    router.push({
        path: '/home',
        query: { 
            school: school.school,
            city: school.city 
        }
    })
}
</script>