<template>
  <div class="min-h-screen px-6 py-* flex items-center justify-center flex-1">

    <div class="bg-card p-8 rounded-xl shadow-neon w-full max-w-xl mr-4 md:mr-12 space-y-6">
      <h2 class="text-2xl font-semibold text-textMain">Login to your account</h2>

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

      <div class="text-right">
        <router-link to="/resetpassword" class="text-sm text-primary hover:underline">Forgot your password?</router-link>
      </div>

      <button
        class="w-full py-3 bg-primary text-dark font-semibold rounded hover:bg-secondary transition"
        @click="login">
        Log In
      </button>

      <p class="text-center text-textMuted text-sm">
        Need an account?
        <router-link to="/register" class="text-primary hover:underline">Register</router-link>
      </p>

      <p class="mt-2 text-success font-medium">{{ message }}</p>

    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const password = ref('')
const message = ref('')

async function login() {
  try {
    const res = await axios.post('http://localhost:5000/api/login', {
      email: email.value,
      password: password.value
    })
    message.value = res.data.message
  } 

  catch (err) {
    message.value = err.response?.data?.message || 'Login failed'
  }
}

</script>
