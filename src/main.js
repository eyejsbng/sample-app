'use strict';

import Vue from 'vue'
import App from './App.vue'
import VueLazyLoad from 'vue-lazyload'
import VueRouter from 'vue-router'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  error: './assets/blank.png'
})
Vue.use(VueRouter)


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
