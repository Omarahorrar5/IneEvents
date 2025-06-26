<template>
  <div class="min-h-screen px-6 py-* flex items-center justify-center flex-1">

    <div class="bg-card p-8 rounded-xl shadow-neon w-full max-w-xl mr-4 md:mr-12 space-y-6">
      <h2 class="text-2xl font-semibold text-textMain">Reset Your Password</h2>

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
        <label class="block text-sm font-medium text-textMain mb-1">New Password</label>
        <input
          v-model="newpassword"
          type="password"
          placeholder="••••••••"
          class="w-full p-3 rounded bg-surface text-textMain placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <button
        class="w-full py-3 bg-primary text-dark font-semibold rounded hover:bg-secondary transition"
        @click="reset">
        Reset
      </button>

      <p class="text-center text-textMuted text-sm">
        Return to
        <router-link to="/login" class="text-primary hover:underline">Login</router-link>
      </p>

      <p class="mt-2 text-success font-medium">{{ message }}</p>

    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const newpassword = ref('')
const message = ref('')


async function reset() {

  try {
    const res = await axios.post('http://localhost:5000/api/resetpassword', {
      email: email.value,
      newpassword: newpassword.value
    })

    message.value = res.data.message
  }

  catch (err) {
    message.value = err.response?.data?.message || 'Reset Failed'
  }
}

</script>
