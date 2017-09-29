// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import store from './vuex'

import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial) //Required to boot vue material

Vue.material.registerTheme('default', {
  primary: 'yellow',
  accent: 'cyan',
  warn: 'light-blue',
  background: 'white',
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
