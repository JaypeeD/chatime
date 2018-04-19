import Vue from 'vue'
import Router from 'vue-router'
import Chatlayout from '@/components/ChatLayout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Chatlayout',
      component: Chatlayout
    }
  ]
})
