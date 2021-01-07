import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/components/dashboard/dashboard-index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
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
