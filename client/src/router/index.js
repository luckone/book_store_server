import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/components/auth'
import homePage from '@/components/homePage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'auth',
      component: auth
    },
    {
      path: '/home',
      name: 'homePage',
      component: homePage
    }
  ]
})
