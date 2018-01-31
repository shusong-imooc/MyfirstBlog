import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login'
import Home from '../pages/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      name:'Login',
      component:Login
    },
    {
      path: '/index',
      name:'Home',
      component:Home,
      meta:{
        requireAuth: true
      }
    }
  ]
})
