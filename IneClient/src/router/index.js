import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../pages/LandingPage.vue';
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import ResetPassword from '../components/ResetPassword.vue';

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
