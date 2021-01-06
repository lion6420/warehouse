import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/home/views/home-index'
import Dashboard from '@/components/dashboard/dashboard-index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
]

const router = new VueRouter({
  mode: 'history',
  routes: routes,
})

export default router
