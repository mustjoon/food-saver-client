import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Counter from '../views/Counter.vue';
import Login from '@/views/Login.vue';
import Logout from '@/views/Logout.vue';
import Register from '@/views/Register.vue';
import Profile from '@/views/Profile.vue';
import CreateOpportunity from '@/views/CreateOpportunity.vue';
import SingleOpportunity from '@/views/SingleOpportunity.vue';
import Chat from '@/views/Chat.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/create-opporunity',
    name: 'CreateOpportunity',
    component: CreateOpportunity,
  },
  {
    path: '/opportunity/:id',
    name: 'SingleOpportunity',
    component: SingleOpportunity,
  },
  {
    path: '/opportunity/:id/chat',
    name: 'Chat',
    component: Chat,
  },
  {
    path: '/chat/:chatId',
    name: 'Chat',
    component: Chat,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/authed/',
    name: 'Authed',
    component: () => import(/* webpackChunkName: "about" */ '../views/Authed.vue'),
  },
  {
    path: '/counter',
    name: 'Counter',
    component: Counter,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
