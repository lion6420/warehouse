const Order = {
  state: {
    orderList: [],
    keep_pn: {},
    loading: false,
  },
  mutations: {
    cart_loading(state) {
      state.loading = true
    },
    cart_resolve(state) {
      state.loading = false
    },
    add_one(state, order) {
      state.orderList.push({
        PN: order.PN,
        type: order.type,
        name: order.name,
        supplier: order.supplier,
        price: order.price,
        demand: (order.demand - order.stock) > 0 ? (order.demand - order.stock) : 100,
      })
      state.keep_pn[order.PN] = true

      window.localStorage.setItem('orderList', JSON.stringify(state.orderList))
      window.localStorage.setItem('keep_pn', JSON.stringify(state.keep_pn))
    },
    remove_one(state, PN) {
      for (let i=0; i<state.orderList.length; i++) {
        if (PN === state.orderList[i]['PN']) {
          let left_list = state.orderList.slice(0, i)
          let right_list = state.orderList.slice(i+1, state.orderList.length)
          state.orderList = left_list.concat(right_list)
          i--
        }
      }
      delete state.keep_pn[PN]

      window.localStorage.setItem('orderList', JSON.stringify(state.orderList))
      window.localStorage.setItem('keep_pn', JSON.stringify(state.keep_pn))
    },
    remove_all(state) {
      state.orderList = []
      state.keep_pn = {}
    },
    add_amount(state, PN) {
      for (let i=0; i<state.orderList.length; i++) {
        if (PN === state.orderList[i]['PN']) {
          state.orderList[i]['demand']++
        }
      }
    },
    cut_amount(state, PN) {
      for (let i=0; i<state.orderList.length; i++) {
        if (PN === state.orderList[i]['PN']) {
          state.orderList[i]['demand']--
        }
      }
    }
  },
  actions: {
    add_order({commit}, order) {
      //loading
      commit('cart_loading')

      commit('add_one', order)
      
      //resolved
      setTimeout(function mock_cart_loading() {
        commit('cart_resolve')
      }, 200)
    },
    remove_order({commit}, PN) {
      //loading
      commit('cart_loading')

      commit('remove_one', PN)
      
      //resolved
      setTimeout(function mock_cart_loading() {
        commit('cart_resolve')
      }, 200)
    },
    clear_order({commit}) {
      commit('remove_all')
    },
  },
  getters: {
    orderList(state) {
      let order_list = JSON.parse(window.localStorage.getItem('orderList'))
      if (order_list && order_list.length && !state.orderList.length) {
        state.orderList = order_list
      }
      return state.orderList
    },
    ordered_pn(state) {
      let ordered_pn = JSON.parse(window.localStorage.getItem('keep_pn'))
      if (ordered_pn && Object.keys(ordered_pn).length && !Object.keys(state.keep_pn).length) {
        state.keep_pn = ordered_pn
      }
      return state.keep_pn
    },
    orderAmount(state) {
      let order_list = JSON.parse(window.localStorage.getItem('orderList'))
      if (order_list && order_list.length && !state.orderList.length) {
        state.orderList = order_list
      }
      return state.orderList.length
    },
    cartState(state) {
      return state.loading ? 'loading':'resolved'
    }
  }
}

export default Order