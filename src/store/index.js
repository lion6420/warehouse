import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './common'
import Order from './order'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Auth: Auth,
    Order: Order,
  }
})

export default store