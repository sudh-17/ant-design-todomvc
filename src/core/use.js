import Vue from 'vue'
import VueStorage from 'vue-ls'
import { List, Avatar } from 'ant-design-vue';
Vue.use(List)
Vue.use(Avatar)

Vue.use(VueStorage, {
  namespace: 'pro__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local' // storage name session, local, memory
})