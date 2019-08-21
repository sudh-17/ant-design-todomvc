import Vue from 'vue'
import Router from 'vue-router'
import BasicLayout from './components/BasicLayout'
import Antd from './views/Antd/Antd.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: BasicLayout,
      redirect: '/antd',
      children: [
        {
          path: '/antd',
          name: 'antd',
          component: Antd
        },
        {
          path: '/home',
          name: 'home',
          // route level code-splitting
          // 路由被访问时才加载
          component: () =>
            import(/* webpackChunkName: "antd" */ './views/Home/Home.vue')
        }
      ]
    }
  ]
})
