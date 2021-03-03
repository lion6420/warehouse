import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//icons
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

//icons
import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

new Vue({
  router,
  render: h => h(App),
  store: store,
}).$mount('#app')
