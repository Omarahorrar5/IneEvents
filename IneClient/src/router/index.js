import { createRouter, createWebHistory } from 'vue-router';

import LandingPage from '../pages/LandingPage.vue';
import HomePage from '../pages/HomePage.vue';
import EventPage from '../pages/EventPage.vue';

import LoginForm from '../components/Landing/LoginForm.vue';
import RegisterForm from '../components/Landing/RegisterForm.vue';
import ResetPassword from '../components/Landing/ResetPassword.vue';

const routes = [
  {
    path: '/',
    component: LandingPage,
    
    children: [
      { path: '', redirect: '/login' },
      { path: 'login', component: LoginForm },
      { path: 'register', component: RegisterForm },
      { path: 'resetpassword', component: ResetPassword }
    ]
  },

  {
    path: '/home',
    component: HomePage
  },

  {
    path: '/event/:id',
    component: EventPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
