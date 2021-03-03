import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './common'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Auth: Auth,
  }
})

export default store