import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/common/login'
import Dashboard from '@/components/dashboard/dashboard-index'
import Stock from '@/components/stock/stock-index'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/achievement/dashboard'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/achievement/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/achievement/stock/:type',
    name: 'stock',
    component: Stock,
    meta: {
      requireAuth: true,
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes: routes,
})

router.beforeEach(function routerGuard(to, from, next) {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.getters.isLoggedIn) next()
    else next('/login')
  }
  else next()
})

export default router
