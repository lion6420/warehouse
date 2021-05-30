import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/common/login'
import Dashboard from '@/components/dashboard/dashboard-index'
import Stock_Man_Efficiency from '@/components/stock/man_efficiency/index'

import Human_Resources_Maintenance from '@/components/human_resources/maintenance/hr-maintenance-index'
import Human_Resources_Statistics from '@/components/human_resources/statistics/index'


import Material_List from '@/components/material/material_list/material-list-index'
import Material_Apply from '@/components/material/material_apply/material-apply-index'
import Material_History from '@/components/material/material_history/material-history-index'
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
    path: '/achievement/man_efficiency',
    name: 'stock_man_efficiency',
    component: Stock_Man_Efficiency,
    meta: {
      requireAuth: true,
    }
  },

  // human resources
  {
    path: '/hr/statistics',
    name: 'hr_statistics',
    component: Human_Resources_Statistics,
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/hr/maintenance',
    name: 'hr_maintenance',
    component: Human_Resources_Maintenance,
    meta: {
      requireAuth: true,
    }
  },

  // material list
  {
    path: '/material/list',
    name: 'material_list',
    component: Material_List,
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/material/apply',
    name: 'material_apply',
    component: Material_Apply,
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
