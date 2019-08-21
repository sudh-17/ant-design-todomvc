import Vue from 'vue'
import App from './App.vue'
import './core/use.js'
import store from './store/store.js'
import router from './router.js'
import bootstrap from './core/bootstrap.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
  created () {
    bootstrap()
  }
}).$mount('#app')
