import Vue from 'vue'
import Router from 'vue-router'
import BasicLayout from './components/BasicLayout'
import Home from './views/Home/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: BasicLayout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // 路由被访问时才加载
          component: () =>
            import(/* webpackChunkName: "antd" */ './views/About/About.vue')
        }
      ]
    }
  ]
})
