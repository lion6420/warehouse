import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//icons
import '@fortawesome/fontawesome-free/css/all.css'

import BootstrapVue from "bootstrap-vue"
import 'bootstrap/dist/css/bootstrap.css'

//Ant-design-vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false

//icons
import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(BootstrapVue)
Vue.use(Antd)

new Vue({
  router,
  render: h => h(App),
  store: store,
}).$mount('#app')
