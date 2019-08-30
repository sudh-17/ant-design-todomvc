import Vue from 'vue'
import VueStorage from 'vue-ls'
import { List, Avatar, Card, Icon, Input, Radio, Message, Popconfirm } from 'ant-design-vue';
Vue.use(List)
Vue.use(Avatar)
Vue.use(Card)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Popconfirm)
Vue.prototype.$message = Message
Message.config({
  top: '38px',
  duration: 2.5,
  maxCount: 1
});
Vue.use(VueStorage, {
  namespace: 'pro__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local' // storage name session, local, memory
})