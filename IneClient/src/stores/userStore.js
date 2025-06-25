/* import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [], // Registered users: { username, email, password }
        loggedInUser: null,
        loginMessage: '',
    }),

    actions: {
        registerUser(username, email, password) {
            const alreadyExists = this.users.find(u => u.email === email)
            if (!alreadyExists) {
                this.users.push({username, email, password})
            }
        },
        
        loginUser(email, password) {
            const user = this.users.find(
                u => u.email === email && u.password === password
            )
            if (user) {
                this.loggedInUser = user
                this.loginMessage = `Welcome, ${user.username}!`
            } else {
                this.loggedInUser = null
                this.loginMessage = "invalid credentials"
            }
        }
    }
}) */