<template>
  <div class="min-h-screen px-6 py-* flex items-center justify-center flex-1">

    <div class="bg-card p-8 rounded-xl shadow-neon w-full max-w-xl mr-4 md:mr-12 space-y-6">
      <h2 class="text-2xl font-semibold text-textMain">Create an account</h2>


      <div>
        <label class="block text-sm font-medium text-textMain mb-1">Username</label>
        <input
          v-model="username"
          type="username"
          placeholder="username"
          class="w-full p-3 rounded bg-surface text-textMain placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>


      <div>
        <label class="block text-sm font-medium text-textMain mb-1">Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="you@example.com"
          class="w-full p-3 rounded bg-surface text-textMain placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>


      <div>
        <label class="block text-sm font-medium text-textMain mb-1">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="••••••••"
          class="w-full p-3 rounded bg-surface text-textMain placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <button
        class="w-full py-3 bg-primary text-dark font-semibold rounded hover:bg-secondary transition"
        @click="register">
        Register
      </button>

      <p class="text-center text-textMuted text-sm">
        Already have an account?
        <router-link to="/login" class="text-primary hover:underline">Login</router-link>
      </p>


      <h3 class="mt-4 text-white">Registered Users:</h3>
      <ul class="text-white">
        <li v-for="u in store.users" :key="u.email">
          {{ u.username }} | {{ u.email }}
        </li>
      </ul>

    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore';

const store = useUserStore()

const username = ref('')
const email = ref('')
const password = ref('')

function register() {
  store.registerUser(username.value, email.value, password.value)
}
</script>