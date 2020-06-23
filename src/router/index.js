import { createRouter, createWebHistory } from 'vue-router';
import homeT from '../views/homeT.vue'

const routes = [
{
  path: '/',
  name: 'home',
  component: homeT
},
{
  path: '/about',
  name: 'about',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/about.vue')
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
