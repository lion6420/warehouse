const Order = {
  state: {
    orderList: [],
    keep_pn: {},
    loading: false,
    total_price: 0,
  },
  mutations: {
    cart_loading(state) {
      state.loading = true
    },
    cart_resolve(state) {
      state.loading = false
    },
    add_one(state, order) {
      let newOrder = {
        PN: order.PN,
        type: order.type,
        name: order.name,
        supplier: order.supplier,
        price: order.price,
        demand: (order.demand - order.stock) > 0 ? (order.demand - order.stock) : 100,
      }
      state.orderList.push(newOrder)
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

      window.localStorage.removeItem('orderList')
      window.localStorage.removeItem('keep_pn')
    },
    add_amount(state, PN) {
      for (let i=0; i<state.orderList.length; i++) {
        if (PN === state.orderList[i]['PN']) {
          state.orderList[i]['demand']++
        }
      }
      
      window.localStorage.setItem('orderList', JSON.stringify(state.orderList))
    },
    cut_amount(state, PN) {
      for (let i=0; i<state.orderList.length; i++) {
        if (PN === state.orderList[i]['PN']) {
          state.orderList[i]['demand']--
        }
      }
      
      window.localStorage.setItem('orderList', JSON.stringify(state.orderList))
    },
    cal_price(state) {
      state.total_price = 0
      for (let i=0; i<state.orderList.length; i++) {
        state.total_price += state.orderList[i]['price']*state.orderList[i]['demand']
      }
      window.localStorage.setItem('total_price', state.total_price)
    }
  },
  actions: {
    add_order({commit}, order) {
      //loading
      commit('cart_loading')

      commit('add_one', order)
      commit('cal_price')
      
      //resolved
      setTimeout(function mock_cart_loading() {
        commit('cart_resolve')
      }, 200)
    },
    remove_order({commit}, PN) {
      //loading
      commit('cart_loading')

      commit('remove_one', PN)
      commit('cal_price')
      
      //resolved
      setTimeout(function mock_cart_loading() {
        commit('cart_resolve')
      }, 200)
    },
    add_amount({commit}, PN) {
      commit('add_amount', PN)
      commit('cal_price')
    },
    cut_amount({commit}, PN) {
      commit('cut_amount', PN)
      commit('cal_price')
    },
    clear_order({commit}) {
      commit('remove_all')
      commit('cal_price')
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
    total_price(state) {
      let total_price = parseInt(window.localStorage.getItem('total_price'))
      if (total_price && !state.total_price) {
        state.total_price = total_price
      }
      return state.total_price
    },
    cartState(state) {
      return state.loading ? 'loading':'resolved'
    }
  }
}

export default Order