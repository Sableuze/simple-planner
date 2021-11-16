import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const bgColors = ['rgba(87, 255, 219, .2)', 'rgba(180, 247, 203, 0.4)', 'rgba(64,180,229,0.4)'];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/completed',
    name: 'Completed',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/CompletedNotes.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});
router.beforeEach(() => {
  document.querySelector('#app').style.background = bgColors[Math.floor(Math.random() * bgColors.length)];
});
export default router;
