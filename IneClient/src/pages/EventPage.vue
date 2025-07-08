<template>
    <div class="h-screen bg-surface m-0 p-0 overflow-x-hidden">
        <Navbar />

        <div class="flex h-full">
            <!-- Left side - Image (50% width) -->
            <div class="w-1/2 h-full">
                <Photo />
            </div>

            <!-- Right side - Content (50% width) -->
            <div class="w-1/2 h-full flex flex-col justify-start pr-8">
                <Infos />
                <Description />
                <RegisterButton />
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from '../components/Event/Navbar.vue';
import Photo from '../components/Event/Photo.vue';
import Infos from '../components/Event/Infos.vue';
import Description from '../components/Event/Description.vue';
import RegisterButton from '../components/Event/RegisterButton.vue';
</script>