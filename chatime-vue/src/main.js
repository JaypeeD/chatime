// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vuetify from 'vuetify'
import {store} from './store.js'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

import('../node_modules/vuetify/dist/vuetify.min.css')
import('../node_modules/material-design-icons/iconfont/material-icons.css')
import('../node_modules/font-awesome/css/font-awesome.min.css');

Vue.use(Vuetify)
Vue.use(VueSocketIO, socketio('http://192.168.110.131:8081'), store)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
