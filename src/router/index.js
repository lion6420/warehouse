import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/common/login'
import Dashboard from '@/components/dashboard/dashboard-index'
import Stock from '@/components/stock/stock-index'
import Material_List from '@/components/material/material_list/material-list-index'
import Material_History from '@/components/material/material_apply_history/material-history-index'
import Stock_Efficiency from '@/components/stock_efficiency/stock-adjust-index'
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
  {
    path: '/material/list',
    name: 'material_list',
    component: Material_List,
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/material/history',
    name: 'material_history',
    component: Material_History,
    meta: {
      requireAuth: true,
    } 
  },
  {
    path: '/stock_efficiency',
    name: 'stock_efficiency',
    component: Stock_Efficiency,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: 'warehouse',
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
