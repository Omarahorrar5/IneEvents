<template>
  <div class="min-h-screen px-6 py-* flex items-center justify-center flex-1">

    <div class="bg-card p-8 rounded-xl shadow-neon w-full max-w-xl mr-4 md:mr-12 space-y-6">
      <h2 class="text-2xl font-semibold text-textMain">Create an account</h2>


      <div>
        <label class="block text-sm font-medium text-textMain mb-1">Username</label>
        <input
          type="username"
          placeholder="username"
          class="w-full p-3 rounded bg-surface text-textMain placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>


      <div>
        <label class="block text-sm font-medium text-textMain mb-1">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          class="w-full p-3 rounded bg-surface text-textMain placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>


      <div>
        <label class="block text-sm font-medium text-textMain mb-1">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          class="w-full p-3 rounded bg-surface text-textMain placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <button
        class="w-full py-3 bg-primary text-dark font-semibold rounded hover:bg-secondary transition">
        Register
      </button>

      <p class="text-center text-textMuted text-sm">
        Already have an account?
        <router-link to="/login" class="text-primary hover:underline">Login</router-link>
      </p>
    </div>
  </div>
</template>
