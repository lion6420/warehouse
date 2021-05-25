const Auth = {
  state: {
    username: '',
    status: '',
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, username) {
      state.username = username
      state.status = 'loggedin'

      window.sessionStorage.setItem('username', username)
    },
    auth_error(state) {
      state.username = ''
    },
    logout(state) {
      state.username = ''
      state.status = ''

      window.sessionStorage.removeItem('username')
    }
  },
  actions: {
    login({commit}, username) {
      commit('auth_request')

      //call authentication api here

      commit('auth_success', username)
    },
    logout({commit}) {
      commit('logout')
    }
  },
  getters: {
    isLoggedIn(state) {
      if (state.status !== 'loggedin') {
        if (window.sessionStorage.getItem('username')) {
          state.username = window.sessionStorage.getItem('username')
          state.status = 'loggedin'
        }
      }
      return state.status === 'loggedin' ? true:false
    },
  }
}

export default Auth